<h1 align="center">Login with Manual Backend</h1> 

<p align="center">
<a href="https://nodejs.org/">
  <img src="https://img.shields.io/badge/Node.js-000000?style=for-the-badge&logo=node.js&logoColor=339933" />
</a>
<a href="https://expressjs.com/">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
</a>
<a href="https://www.typescriptlang.org">
<img src="https://img.shields.io/badge/TypeScript-black?style=for-the-badge&logo=typescript" />
</a>
<a href="https://kinde.com/">
  <img src="https://img.shields.io/badge/Kinde-000000?style=for-the-badge&logoColor=white" />
</a>
</p>

## Introduction
This app is a Node.Js server built with Express thats authenticate users using Kinde services manually.

## Routes
- **http://localhost:3333/login**
  - **GET** -> Kinde login route, can pass params to select provider.
  - **Params** -> provider -> "google | github | email"
  - **Params** -> email -> "user email"
- **http://localhost:3333/register**
  - **GET** -> Kinde register route, works same as /login
- **http://localhost:3333/jwt-route**
  - **GET** -> Verifies and validate ***Kinde JWT token*** on header. If success return user, if not returns ***forbidden***

## Running the server
#### Requirements
- [NodeJs](https://nodejs.org/en) version 20 or greater.
- [Kinde](https://kinde.com/) registered account.

#### Installation
1. Download or clone this repository
2. Run command `npm install` to install node files.

#### Kinde Configuration
1. Create a ***backend project*** in Kinde dashboard and select ***Node.js*** as framework.
2. In Kinde project dashboard select ***Authentication*** and enable the following options:
  - Email + code
  - Github
  - Google
3. In Kinde project dashboard select ***Details*** and fill the options:
  - Application homepage URI (*e.g. http//localhost:3333* )
  - Application login URI (*e.g. http//localhost:3333/login* )
  - Allowed callback URLs (*e.g. http//localhost:3333/kinde_callback* )
  - Allowed logout redirect URLs (*e.g. http//localhost:3333* )
4. In Kinde project dashboard select ***Details*** and enable ***Use your own sign-up and sign-in screens***.
2. Rename ***.env.example*** to ***.env***.
3. Set Kinde project keys in ***.env***.
4. Run command `npm run dev` to start development server.
  - Runs by default in ***http://localhost:3333***