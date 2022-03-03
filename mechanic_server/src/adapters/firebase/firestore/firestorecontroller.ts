const {getFirestore, Timestamp, FieldValue} = require('firebase-admin/firestore');
const {getDatabase} = require('firebase-admin/database');
const {initialize} = require('../app');
let db:any;
let ref:any

let usersRef:any;

const setup = async () => {
	await initialize();
	db = getDatabase();
	ref = db.ref()
	
}

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

const setRequest = async (request: MechanicRequest) => {
	await setup();
	let requestRef = ref.child(`requests/${request.jobId}/${request.mechanicId}`);
	// requestRef.push().set(request)
	 requestRef.set(request)
}


const rejectRequest = async (request: MechanicRequest) => {
	await setup();
	let requestRef = ref.child(`requests/${request.jobId}/${request.mechanicId}`);
	// requestRef.push().set(request)
	 requestRef.update({declined: true})
}

const acceptRequest = async (request: MechanicRequest) => {
	await setup();
	let jobRef = ref.child(`requests/${request.jobId}`);
	let requestRef = ref.child(`requests/${request.jobId}/${request.mechanicId}`);

	// requestRef.push().set(request)
	 requestRef.remove()
	 jobRef.remove()
}

module.exports = {set,  setRequest, rejectRequest, acceptRequest}
