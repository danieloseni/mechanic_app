export {}

//Import the user model. The user model comes with functions for perfoming crud operations on on the users table
const User = require('../models/users');
//Import the Vehicle model. The appointment model comes with functions for perfoming crud operations on on the vehicles table
const Vehicle = require('../models/vehicle');
//Import the appointment model. The appoointment model comes with functions for perfoming crud operations on on the appointments table
const Appointment = require('../models/appointment');

//import the gettokenfromheaders function. This function checks the user's request for their authentication token, decodes it, and makes the data stored in it available for use in the application
const getTokenFromHeaders = require('../helpers/getTokenFromHeader');

//import the jwt library. This library is what is used for creating the jwt autheitcation token
const jwt = require('jsonwebtoken');

////Import the job model. The job model comes with functions for perfoming crud operations on on the jobs table
const Job = require('../models/job');

//import the setrequest function from the firebasecontroller. The setrequest function is what is used to add a new request on firebase so that mechanics can view the requests when they log in
const {setRequest} = require('../adapters/firebase/firestore/firestorecontroller');


//This maxage variable is used in the encoding of the jwt authentication token. It defines how long the token should last before becoming inalid 
const maxAge = 7 * 24 * 60 * 60; //1 week


//The createtoken function is responsible for creating the jwt token. It takes an id as a parameter, this is the id of the user. It then encodes that id into the jwt token
const createToken = (id:string) => {

	//After encoding,it returns the resulting jwt. The string you're seeing below is called the decode string. It is the key used in encrypting and decrypting the jwt.
    return jwt.sign({id}, 'A good man never hits a woman Because true power doesn\'t let little things get to them Only the weak see the needd to fight and hit people in every little situation', {
       	//Here, the maxage variable is used. As it can be seen, it is used to indicate when the token should expire, and that is, in a week
        expiresIn: maxAge
    })
}


//This is the registration controller. It registers both mechanics and clients. It takes 2 objects, the request object and the response object. The request object contains information about the request made to the server such as, header values, the data sent, the host from which the request was sent and so on. While the response object, contains functions for returning a response to the user
const register = async (req:any, res:any) => {

	try{
		//first of all get the user's information from the request
		const {firstname, lastname, email, password, phone} = req.body;

		//Using the user's model, store the information in the database with the create function that comes with the user model. This is an asynchronous operation, hence it needs to be awaited, thus the "await" keyword
		const user = await User.create({firstname, lastname, email, password, phone, role: "client"});

		//after the user has been saved in the database, information about the user is returned. Get the role and id of the user from the information returned
		const { role, id} = user;

		//return the stored information back to the client alongside a jwt
		res.json({firstname, lastname, email, phone, role, id, jwt: createToken(id)});
	}catch(ex){
		//if there's any error, return an error message
		res.status(400).json({message: "incorrect credentials"})
	}
	
	
}

//the controller for saving vehicles in the database
const add_vehicle = async (req:any, res:any) => {
	//get the vehicle information from the request
	const {brand, make, model, color, plateNumber} = req.body;

	//get the user token from the header of the request
	const tokenDetails = await getTokenFromHeaders(req);

	//if the request was sent with a valid token, perform the following operatinos
	if(tokenDetails){

		//save the vehicle details in the database using the create function provided by the vehicle model		
		const vehicle = await Vehicle.create({brand, make, model, color, plateNumber, userId: tokenDetails.id});
		
		// return the vehicle details to the client
		res.json(vehicle);

	} else{
		//If the request does not come with a valide token, return a response of unauthorized
		res.status(401).json({
			message: "Unauthorized"
		})
	}

	
}


//this is the cntroller for getting vehicles stored in the databse
const get_vehicles = async (req:any, res:any) => {
	//first of all get the token details from the deader
	const tokenDetails = await getTokenFromHeaders(req);

	//If the user has proided valid authentication token, proceed. Otherwise return a 401 (Unauthorized) error
	if(tokenDetails){
		//Get all the vehicles belonging to the particular user requesting
		const vehicles = await Vehicle.find({userId: tokenDetails.id});

		//Return the list of vehicles 
		res.json(vehicles);

	} else{
		//Return 401 if invalid token is provided
		res.status(401).json({
			message: "Unauthorized"
		})
	}
	

}

//The controller for adding jobs to the databse
const add_job = async(req:any, res:any) => {
	//Get the vehicleid for which the job is to be assigned, from the request
	const {vehicleId} = req.body;

	//Get the token details from the request
	const {tokenDetails: {id}, tokenDetails} = req;

	//If valid token has been provided, proceed
	if(tokenDetails){
		//Save the job in the database with the vehicleid, and userId as well as the current data
		const job = await Job.create({vehicleId, userId: id, dateCreated: new Date()});

		//Send the details of the job back  to the client
		res.send(job)
	}else {
		//If invalid token has been provided, return 401
		res.status(401).json({message: "Unauthorized"});
	}
}

//this is the controller for adding requests to the firestore
const send_request = async(req:any, res:any) => {
	//get the jobid and the id of the mechanic who the request is meant for
	const {jobId, mechanicId} = req.body;

	//get the token details from the request
	const {tokenDetails: {id}, tokenDetails} = req;

	//if valid token details have been provided proceed
	if(tokenDetails || !jobId || !mechanicId){
		//Send message, done to the client along with a staus code of 200 indicating that all is well
		res.json({message: "done"})

		//fetch job details from database
		const {userId: {firstname, lastname, email, phone, id}, vehicleId: {brand, make, model, color, plateNumber, id: vehicleid}} = await Job.findOne({_id: jobId}).populate("userId").populate("vehicleId");
		
		//send request to  firebase real time database using the setrequest function provided int he firestore controller file
		setRequest({
		jobId,
		client: {firstname, lastname, email, phone, id},
		mechanicId,
		vehicle: {brand, make, model, color, plateNumber, id:vehicleid},
		declined: false
	})


	}else {
		//If invalid token detials were provided, return 401
		res.status(401).json({message: "Unauthorized"});
	}
}

//Controller for adding appointment
const add_appointment = async(req:any, res:any) => {
	//get the date of the appointment, the mechanic, the service to be rendered and the address where the service will take place, from the request
	const {date, mechanic, service, address} = req.body

	//Get the token details from the request
	const {tokenDetails: {id}, tokenDetails} = req;

	if(tokenDetails){
		//Save the appointment details in the database
		const appointment = await Appointment.create({date, mechanic, service, address, user:id});

		//return the newly save appointment information back to the client
		res.json(appointment);
	}else{

		res.status(401).json({message: "Unauthorized"})
	}
}


//Export all the necessary controllers so it is available upon importation of the file
module.exports = {
	register, add_vehicle, get_vehicles, add_job, send_request, add_appointment
}