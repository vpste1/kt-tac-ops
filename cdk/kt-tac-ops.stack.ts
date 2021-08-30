import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as route53 from "@aws-cdk/aws-route53";
import * as acm from "@aws-cdk/aws-certificatemanager";
import * as targets from "@aws-cdk/aws-route53-targets";
import * as s3Deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudfront from "@aws-cdk/aws-cloudfront";

type CustomDomainProps = {
  customDomainHostedZone: string;
  customDomainName: string;
};
class CustomDomain extends cdk.Construct {
  hostedZone: route53.IHostedZone;
  acmCertificate: acm.ICertificate;

  constructor(scope: cdk.Construct, id: string, props: CustomDomainProps) {
    super(scope, id);

    this.hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: props.customDomainHostedZone,
    });

    this.acmCertificate = new acm.DnsValidatedCertificate(
      this,
      "SiteCertificate",
      {
        domainName: props.customDomainName,
        hostedZone: this.hostedZone,
        region: "us-east-1",
      }
    );
  }
}

type CloudfrontDistributionProps = {
  acmCertificate: acm.ICertificate;
  websiteS3bucket: s3.IBucket;
  customDomainName: string;
};

class CloudfrontDistribution extends cloudfront.CloudFrontWebDistribution {
  hostedZone: route53.IHostedZone;
  acmCertificate: acm.ICertificate;

  constructor(
    scope: cdk.Construct,
    id: string,
    props: CloudfrontDistributionProps
  ) {
    const aliases = [props.customDomainName];

    const viewerCertificate = props.acmCertificate
      ? cloudfront.ViewerCertificate.fromAcmCertificate(props.acmCertificate, {
          aliases,
        })
      : cloudfront.ViewerCertificate.fromCloudFrontDefaultCertificate();

    super(scope, id, {
      viewerCertificate,
      originConfigs: [
        {
          customOriginSource: {
            domainName: props.websiteS3bucket.bucketRegionalDomainName,
            originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTPS_ONLY,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
      errorConfigurations: [
        {
          errorCode: 403,
          errorCachingMinTtl: 0,
          responseCode: 200,
          responsePagePath: "/index.html",
        },
      ],
    });
  }
}

export class KtTacOpsStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const customDomainName = "kt-tac-ops.com";

    const customDomain = new CustomDomain(this, "CustomDomain", {
      customDomainHostedZone: customDomainName,
      customDomainName: customDomainName,
    });

    const websiteS3bucket = new s3.Bucket(this, "WebStaticBucket", {
      bucketName: "kt-tac-ops-site",
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html",
    });

    const distribution = new CloudfrontDistribution(
      this,
      "CloudfrontDistribution",
      {
        acmCertificate: customDomain.acmCertificate,
        websiteS3bucket,
        customDomainName: customDomainName,
      }
    );

    new route53.ARecord(this, "DNSAddressRecord", {
      recordName: customDomainName,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
      zone: customDomain.hostedZone,
    });

    new s3Deploy.BucketDeployment(this, "WebStaticDeployment", {
      sources: [s3Deploy.Source.asset("./build/public")],
      destinationBucket: websiteS3bucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}
