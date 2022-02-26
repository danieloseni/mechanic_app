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
	let requestRef = ref.child('requests');
	requestRef.push().set(request)
}

module.exports = {set,  setRequest}
