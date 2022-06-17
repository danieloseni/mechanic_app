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
- 3 Environment variables need to be setup on the host for the web server to function properly

