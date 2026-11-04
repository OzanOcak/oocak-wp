import { auth } from "express-oauth2-jwt-bearer";
import { env } from "../config/env.js";

export const requireAuth = auth({
  audience: env.auth0Audience,
  issuerBaseURL: `https://${env.auth0Domain}/`,
  tokenSigningAlg: "RS256",
});
