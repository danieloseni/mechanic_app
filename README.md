# FIXIT ([Preview](https://fixit-neon.vercel.app/))
A system for the remote location and hiring of auto mechanics.
![Screenshot (5)](https://user-images.githubusercontent.com/45489948/174280182-257666b9-6eda-415e-8499-0c19d7eecc2e.png)
_________
![Screenshot (12)](https://user-images.githubusercontent.com/45489948/174280211-c5414534-ea99-4a7b-8918-3bd41887bd72.png)

## Stack
- React(Typescript)
- Node and Express (Typescript)
- MongoDB
- Firebase
- Node v16.13.1

## Sub-Systems
This repository has 4 sub-systems

### Fixit customer mobile app
A mobile app designed with Flutter with which customers can locate and hire mechanics.
### Fixit mechanic mobile app
A mobile app designed with Flutter with which mechanics can see request, accept them and track their projects/works.
### Fixit web application
The web interface built with React and Typescript with which mechanics can view and accept or decline requests, and track their works. Customers can also use it to locate mechanics and place requests.
### Fixit server
The REST API that handles all requests from the client application.


## How To Run

- First of all clone the repository. To clone run:
  `git clone https://github.com/danieloseni/mechanic_app`
- `cd` into the `mechanic_server` folder and run: `npm install`
- Next go to [your firebase console](https://console.firebase.google.com) and create a new project.
- Then, click on your newly created firebase project and select realtime database.
- Click `create database` and select `Start in test mode` from the popup
- Next, setup your necessary environment variables. <br />
  Create a .env file in your `mechanic_server` folder.
  Copy the content of you [mechanic_server/.env.example](mechanic_server/.env.example) file into your newly created .env file. These are your environment variables. <br />
  Variables i to x below are your firebase credentials and can be found by going to [your firebase console](https://console.firebase.google.com) > 
  1. FIREBASE_TYPE_PARAMETER
  2. FIREBASE_PROJECT_ID
  3. FIREBASE_PRIVATE_KEY_ID
  4. FIREBASE_PRIVATE_KEY
  5. FIREBASE_CLIENT_EMAIL
  6. FIREBASE_CLIENT_ID
  7. FIREBASE_AUTH_URI
  8. FIREBASE_TOKEN_URI
  9. FIREBASE_AUTH_PROVIDER_X509_CERT_URL
  10. FIREBASE_CLIENT_X509_CERT_URL
  11. FIREBASE_DATABASE_URL

- `cd` into the `web` folder and run `npm install`
- To start the server `cd` into the `mechanic_server` and run `npm start`
- Repeat step 4 in the `web` folder to run the web application as well.
- Voilla! The app is now running. Accessible ports for each application will be displayed in each terminal.
> Note: You have to have mongodb installed and setup.


## Hosting
The web server was hosted on Heroku, and the web client, vercel. Follow the steps below to host on your preferred provider.
### Hosting the web server
- 3 Environment variables need to be setup on the host for the web server to function properly.
  1. `PORT`: This tells the application what port to run on. Setup the listening port of your webserver by setting the `PORT` environment variable on your preferred host. The web server defaults to port 5000 if no port is specified.
  2. `DATABASE_URL`: This server run on a mongodb database so a url to a mongodb instance will be required. [MongoDB Atlas](https://www.mongodb.com/atlas/database) can be used. Create a `DATABASE_URL` environment variable and set its value to your preferred mongodb instance url. The server defaults to mongodb://localhost/mechanic-app if no DATABASE_URL is set.
  3. `TOKEN_DECODE_STRING`: The token decode string is the string that will be used to encode and decode user jwt tokens. Ensure that you setup a `TOKEN_DECODE_STRING` environment variable with your preferred decode string value. The server defaults to `A good man never hits a woman Because true power doesn\'t let little things get to them Only the weak see the need to fight and hit people in every little situation` if no decode string is specified.
- Once all Environment variables are setup, publish the [mechanic_server/dist](mechanic_server/dist) folder to your prefered host. 
- Assuming all is set up well, everything should run correctly.
> A docker image would be created soon to ease up the hosting.

### Hosting the React app
- 1 environment variable needs to be setup for the app to function properly
  1. `REACT_APP_PROXY`: This variable tells the react app where to send all its API requests. if this variable is not set, the app defaults to `http://localhost:5000`/
  > The link **MUST** be preceeded with `http://` or `https://`.
- Once all environment variables are set, run: ```npm run build```.
- Then, publish the new created `build` folder to your preferred host.
- If all is setup well, the app should be accessible and function properly.
> A docker image would be provided soon to ease up the hosting.


