<h1 align="center">Login with Express & Kinde</h1> 

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
This app is a Node.Js server built with Express thats authenticate users using Kinde services.

## Routes
- **http://localhost:3333**
  - **GET** -> If authenticated by session, redirect to ***/admin***. If not redirect to **/login** route by Kinde.
- **http://localhost:3333/admin**
  - **GET** -> If authenticated by session, returns Kinde JWT token. If not redirect to **/login** route by Kinde.
- **http://localhost:3333/login**
  - **GET** -> Kinde login route, if already authenticated by session, redirect to ***/***.
- **http://localhost:3333/register**
  - **GET** -> Kinde register route, if already authenticated by session, redirect to ***/***.
- **http://localhost:3333/logout**
  - **GET** -> Kinde logout route, after redirect to ***/***.
- **http://localhost:3333/jwt-route**
  - **GET** -> Verifies and validate ***Kinde JWT token*** on header. If success return user, if not returns ***forbidden***

## Running the server
#### Requirements
- [NodeJs](https://nodejs.org/en) version 20 or greater.
- [Kinde](https://kinde.com/) registered account.

#### Installation
1. Download or clone this repository
2. Run command `npm install` to install node files.

#### Configuration
1. Create a ***backend project*** in Kinde dashboard.
2. Rename ***.env.example*** to ***.env***.
3. Set Kinde project keys in ***.env***.
4. Run command `npm run dev` to start development server.
  - Runs by default in ***http://localhost:3333***