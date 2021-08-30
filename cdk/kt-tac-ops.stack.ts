import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudfront from "@aws-cdk/aws-cloudfront";

export class KtTacOpsStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3
    const bucket = new s3.Bucket(this, "WebStaticBucket", {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html",
    });

    // Deployment
    const src = new s3Deploy.BucketDeployment(this, "WebStaticDeployment", {
      sources: [s3Deploy.Source.asset("./build/public")],
      destinationBucket: bucket,
    });

    // Cloudfront
    const cf = new cloudfront.CloudFrontWebDistribution(
      this,
      "WebStaticDistribution",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      }
    );
  }
}
