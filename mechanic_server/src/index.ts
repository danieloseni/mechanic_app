export {}

//This is the root application, it is where all the node server execution starts
import 'dotenv/config'
import config from './config';
const {port,database_url} = config
//import express. Express is used for creating backend services
const express = require('express');

//import the cors library. The cors library is used for configuring cross-origin resource sharing
const cors = require('cors');

//import the mongoose library for communicating with and connecting to the mongodb
const mongoose = require('mongoose')


//import all the routes
const clientRoutes = require("./routes/client");
const mechanicRoutes = require("./routes/mechanic");
const generalRoutes = require('./routes/general');

//initialize firebase
const {initialize} = require('./adapters/firebase/app');

const {set, setRequest, MechanicRequest} = require('./adapters/firebase/firestore/firestorecontroller');

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
app.get("/", (req:any, res:any) => {
	res.json({
		message: "here"
	})
})



//connect to the database
mongoose.connect(database_url).then(() => {
	//if connection to the databse was successful, start the server and listen on the defined port   
	app.listen(port, () => {
		
		console.log(`Listening on ${port}`);
	})
}).catch((err: any) => {
	//if there are any errors connecting to the database log them
    console.log(err)
})
