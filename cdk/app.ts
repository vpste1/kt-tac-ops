#!/usr/bin/env node

import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { KtTacOpsStack } from "./kt-tac-ops.stack";

const app = new cdk.App();

new KtTacOpsStack(app, "KtTacOpsSite", {
  env: {
    account: "871688412327",
    region: "ap-southeast-2",
  },
});
