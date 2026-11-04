import "dotenv/config";

const port = Number(process.env.PORT ?? 3000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("Invalid PORT environment variable");
}

const auth0Domain = process.env.AUTH0_DOMAIN;
const auth0Audience = process.env.AUTH0_AUDIENCE;

if (!auth0Domain || !auth0Audience) {
  throw new Error("Missing Auth0 configuration");
}

export const env = {
  port,
  nodeEnv: process.env.NODE_ENV ?? "development",
  auth0Domain,
  auth0Audience,
};
