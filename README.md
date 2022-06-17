# FIXIT
A system for the remote location and hiring of auto mechanics.

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
- `cd` into the `web` folder and run `npm install`
- To start the server `cd` into the `mechanic_server` and run `npm start`
- Repeat step 4 in the `web` folder to run the web application as well.
- Voilla! The app is now running. Accessible ports for each application will be displayed in each terminal.

## Hosting
The web server was hosted on Heroku, and the web client, vercel. Follow the steps below to host on your preferred provider.
### Hosting the web server
- 3 Environment variables need to be setup on the host for the web server to function properly.
  1. `PORT`: This tells the application what port to run on. Setup the listening port of your webserver by setting the `PORT` environment variable on your preferred host. The web server defaults to port 5000 if no port is specified.
  2. `DATABASE_URL`: This server run on a mongodb database so a url to a mongodb instance will be required. [MongoDB Atlas](https://www.mongodb.com/atlas/database) can be used. Create a `DATABASE_URL` environment variable and set its value to your preferred mongodb instance url. The server defaults to mongodb://localhost/mechanic-app if no DATABASE_URL is set.
  3. `tokenDecodeString`: The token decode string is the string that will be used to encode and decode user jwt tokens. Ensure that you setup a `tokenDecodeString` environment variable with your preferred decode string value. The server defaults to `A good man never hits a woman Because true power doesn\'t let little things get to them Only the weak see the needd to fight and hit people in every little situation` if no decode string is specified.
- Once all Environment variables are setup, publish the [mechanic_server/dist](mechanic_server/dist) folder to your prefered host. 
- Assuming all is set up well, everything should run correctly.
> A docker image would be created soon to ease up the hosting.

### Hosting the React app
- 1 environment variable needs to be setup for the app to function properly
  1. `REACT_APP_PROXY`: This variable tells the react app where to send all its API requests. if this variable is not set, the app defaults to `http://localhost:5000`/
  > The link **MUST** be preceeded with `http://`.
- Once all environment variables are set, run: ```npm run build```.
- Then, publish the new created `build` folder to your preferred host.
- If all is setup well, the app should be accessible and function properly.
> A docker image would be provided soon to ease up the hosting.


