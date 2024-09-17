import express from "express";
import { getUser, GrantType, protectRoute, setupKinde, jwtVerify } from '@kinde-oss/kinde-node-express';

import * as dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3333;

const kindeConfig = {
  grantType: GrantType.AUTHORIZATION_CODE,
  clientId: process.env.KINDE_CLIENT_ID as string,
  issuerBaseUrl: process.env.KINDE_ISSUER_URL as string,
  siteUrl: process.env.KINDE_SITE_URL as string,
  secret: process.env.KINDE_CLIENT_SECRET as string,
  redirectUrl: process.env.KINDE_REDIRECT_URL as string,
  unAuthorisedUrl: process.env.KINDE_SITE_URL as string,
  postLogoutRedirectUrl: process.env.KINDE_POST_LOGOUT_REDIRECT_URL as string,
};

//Kinde middlewares
const client = setupKinde(kindeConfig, app);
const verifier = await jwtVerify(process.env.KINDE_ISSUER_URL as string, {})

// Public route
import { Request } from 'express';

// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

app.get("/", async (req: Request, res) => {
  if (await client.isAuthenticated(req as any)) {
    res.redirect("/admin");
  } else {
    res.redirect("/login");
  }
});

// Protected route with Kinde session middleware
// This route will only be accessible if the user is authenticated
// Redirect to login if the user is not authenticated
app.get("/admin", protectRoute, getUser, async (req, res) => {
  const token = await client.getToken(req as any)
  res.json({ message: "Hello Admin!", user: req.user, token });
});

// Protected route with Kinde JWT verifier middleware
// This route will only be accessible if the JWT token is valid
// Return forbidden if the token is invalid
app.get("/jwt-route", verifier, (req, res) => {
  console.log(req.user);
  res.json({ message: "Hello World!", user: req.user });
});

app.listen(port, () => {
  const data = new Date();
  console.log(`Node server started in ${data.toLocaleString()} at http://localhost:${port}`);
})