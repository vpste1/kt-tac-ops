import { cleanEnv, str, bool } from "envalid";

require('dotenv').config()
require('dotenv').config({ path: '.env.local' })

export const env = cleanEnv(process.env, {
  STAGE: str(),
  AWS_ACCOUNT_ID: str(),

  CUSTOM_DOMAIN_ENABLED: bool(),
  CUSTOM_DOMAIN_NAME: str(),
  CUSTOM_DOMAIN_HOSTED_ZONE: str(),
});
