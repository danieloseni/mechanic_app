"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//This is the root application, it is where all the node server execution starts
//import express. Express is used for creating backend services
const express = require('express');
//import the cors library. The cors library is used for configuring cross-origin resource sharing
const cors = require('cors');
//import the mongoose library for communicating with and connecting to the mongodb
const mongoose = require('mongoose');
//import all the routes
const clientRoutes = require("./routes/client");
const mechanicRoutes = require("./routes/mechanic");
const generalRoutes = require('./routes/general');
//initialize firebase
const { initialize } = require('./adapters/firebase/app');
const { set, setRequest, MechanicRequest } = require('./adapters/firebase/firestore/firestorecontroller');
//run the express library so as to get necessary functions and variables for creating a functioning node server
const app = express();
//initialize firebase app
initialize();
//add the json middleware so that all requests that come in are seen as json. and those that don't come in that format are not attended to
app.use(express.json());
//apply the cors middleware for cross-origin resource sharing
app.use(cors());
//give the grouped routes their respective prefixes
app.use("/client", clientRoutes);
app.use("/mechanics", mechanicRoutes);
app.use(generalRoutes);
//this is just a test. Don't mind this
app.get("/", (req, res) => {
    res.json({
        message: "here"
    });
});
//define the port to be either the one provided upon hosting or a default port of 5000 if the host doesn't provide a port
const port = process.env.PORT || 5000;
//connect to the database
mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/mechanic-app').then(() => {
    //if connection to the databse was successful, start the server and listen on the defined port   
    app.listen(port, () => {
        process.env.tokenDecodeString = 'A good man never hits a woman Because true power doesn\'t let little things get to them Only the weak see the needd to fight and hit people in every little situation';
        console.log(`Listening on ${port}`);
    });
}).catch((err) => {
    //if there are any errors connecting to the database log them
    console.log(err);
});
