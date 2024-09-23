import express from "express";
import { jwtVerify } from '@kinde-oss/kinde-node-express';
import axios from 'axios';

import * as dotenv from 'dotenv'
dotenv.config()

// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
    };
  }
}

interface KindeUser {
  id: string;
  sub: string;
  email: string;
  email_verified: boolean;
  picture?: string;
  given_name?: string;
  family_name?: string;
  name: string;
  preferred_username?: string;
  updated_at: number; //Timestamp
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 3333;

const kindeConfig = {
  clientId: process.env.KINDE_CLIENT_ID as string,
  issuerBaseUrl: process.env.KINDE_ISSUER_URL as string,
  siteUrl: process.env.KINDE_SITE_URL as string,
  secret: process.env.KINDE_CLIENT_SECRET as string,
  redirectUrl: process.env.KINDE_REDIRECT_URL as string,
  postLogoutRedirectUrl: process.env.KINDE_LOGOUT_REDIRECT_URL as string,
  googleConnectionId: process.env.KINDE_GOOGLE_CONNECTION_ID as string,
  githubConnectionId: process.env.KINDE_GITHUB_CONNECTION_ID as string,
  emailConnectionId: process.env.KINDE_EMAIL_CONNECTION_ID as string,
  language: process.env.KINDE_LANGUAGE as string,
};

const state = "asd67nj2903jdio";

//Kinde middlewares
const verifier = await jwtVerify(process.env.KINDE_ISSUER_URL as string, {})

app.get("/", async (req, res) => {
  res.send("Hello! This is a public route. To login, go to /login. To access the protected route, go to /jwt-route.");
});

app.get("/login", async (req, res) => {
  const { provider } = req.query;
  const { email } = req.query;

  const baseUrl = `${kindeConfig.issuerBaseUrl}/oauth2/auth?response_type=code&client_id=${kindeConfig.clientId}&redirect_uri=${kindeConfig.redirectUrl}&scope=openid%20profile%20email&state=${state}&lang=${kindeConfig.language}`

  switch (provider as string) {
    case "google":
      res.redirect(`${baseUrl}&connection_id=${kindeConfig.googleConnectionId}`)
      break;
    case "github":
      res.redirect(`${baseUrl}&connection_id=${kindeConfig.githubConnectionId}`)
      break;
    case "email":
      if (!email) {
        res.status(400).json({ message: "Email not provided" });
        return;
      } else {
        res.redirect(`${baseUrl}&connection_id=${kindeConfig.emailConnectionId}&login_hint=${email}`)
      }
      break;
    default:
      res.redirect(baseUrl)
      break;
  }
})

app.get("/register", async (req, res) => {
  const { provider } = req.query;
  const { email } = req.query;

  const baseUrl = `${kindeConfig.issuerBaseUrl}/oauth2/auth?response_type=code&client_id=${kindeConfig.clientId}&redirect_uri=${kindeConfig.redirectUrl}&scope=openid%20profile%20email&state=${state}&lang=${kindeConfig.language}&prompt=create`

  switch (provider as string) {
    case "google":
      res.redirect(`${baseUrl}&connection_id=${kindeConfig.googleConnectionId}`)
      break;
    case "github":
      res.redirect(`${baseUrl}&connection_id=${kindeConfig.githubConnectionId}`)
      break;
    case "email":
      if (!email) {
        res.status(400).json({ message: "Email not provided" });
        return;
      } else {
        res.redirect(`${baseUrl}&connection_id=${kindeConfig.emailConnectionId}&login_hint=${email}`)
      }
      break;
    default:
      res.redirect(baseUrl)
      break;
  }
})

app.get("/kinde_callback", async (req, res) => {
  try {
    const { code } = req.query;
    const { state: reqState } = req.query;

    if (!code) {
      res.status(400).json({ message: "Code not provided" });
      return;
    }

    if (reqState !== state) {
      res.status(400).json({ message: "Invalid state" });
    }

    //Must send as form data
    const response = await axios.post(`${kindeConfig.issuerBaseUrl}/oauth2/token`, `grant_type=authorization_code&client_id=${kindeConfig.clientId}&client_secret=${kindeConfig.secret}&code=${code}&redirect_uri=${kindeConfig.redirectUrl}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    const { access_token, id_token } = response.data;

    // Get user data from kinde server and save/update in db if needed
    const userResponse = await axios.get<KindeUser>(`${kindeConfig.issuerBaseUrl}/oauth2/v2/user_profile`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })

    // Return the JWT token to the client
    res.json({ token: access_token });

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
})

// Protected route with Kinde JWT verifier middleware
// This route will only be accessible if the JWT token is valid
// Return forbidden if the token is invalid
app.get("/jwt-route", verifier, async (req, res) => {
  try {
    const token = req.headers.authorization;

    //Get id from token
    if (!req.user?.id) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    const { id } = req.user;

    // Get user data from kinde server
    const userResponse = await axios.get<KindeUser>(`${kindeConfig.issuerBaseUrl}/oauth2/v2/user_profile`, {
      headers: {
        'Authorization': token
      }
    })

    res.json({
      message: "Your data",
      kindeJWTUserId: id,
      kindeUserData: userResponse.data
    });
  } catch (error) {
    res.status(403).json({ message: "Forbidden" });
  }
});


// Start the server
app.listen(port, () => {
  const data = new Date();
  console.log(`Node server started in ${data.toLocaleString()} at http://localhost:${port}`);
})