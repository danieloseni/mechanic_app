const {getFirestore, Timestamp, FieldValue} = require('firebase-admin/firestore');
const {getDatabase} = require('firebase-admin/database');
const {initialize} = require('../app');
let db:any;
let ref:any

let usersRef:any;


//this is the function that sets up firebase and prepares the database to be accessed
const setup = async () => {
	await initialize();
	db = getDatabase();
	ref = db.ref()
	
}


//a test
const set = async () => {
	await setup();
	usersRef = ref.child('users');
	usersRef.set({
		alanisawesome: {
			date_of_birth: 'June 23, 1912',
	    	full_name: 'Alan Turing'
		}
	})
}


//an interface defining what a mechanic request must contain
interface MechanicRequest{
	jobId: string
	client: {
		firstname: string,
		lastname: string,
		email:string, 
		phone: string,
		id: string
	},
	mechanicId: string,
	vehicle: {
		brand: string,
		make: string,
		model: string,
		plateNumber: string,
		color: string
	},
	declined: boolean

}


//This is the function for adding a request to firebase
const setRequest = async (request: MechanicRequest) => {
	await setup();
	let requestRef = ref.child(`requests/${request.jobId}/${request.mechanicId}`);
	// requestRef.push().set(request)
	 requestRef.set(request)
}

//function for rejecting request
const rejectRequest = async (request: MechanicRequest) => {
	await setup();
	let requestRef = ref.child(`requests/${request.jobId}/${request.mechanicId}`);
	// requestRef.push().set(request)
	 requestRef.update({declined: true})
}


//function for accepting request
const acceptRequest = async (request: MechanicRequest) => {
	await setup();
	let jobRef = ref.child(`requests/${request.jobId}`);
	let requestRef = ref.child(`requests/${request.jobId}/${request.mechanicId}`);

	// requestRef.push().set(request)
	 requestRef.remove()
	 jobRef.remove()
}

//export all firebase function

module.exports = {set,  setRequest, rejectRequest, acceptRequest}
