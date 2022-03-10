export {}
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const Job = require('../models/job');

const maxAge = 7 * 24 * 60 * 60; //1 week

const createToken = (id:string) => {

    return jwt.sign({id}, 'A good man never hits a woman Because true power doesn\'t let little things get to them Only the weak see the needd to fight and hit people in every little situation', {
        expiresIn: maxAge
    })
}
const login = async (req:any, res:any) => {
	console.log(req.body)
	try{
		const {email, password} = req.body;
				console.log(email,password)

		const user = await User.login(email, password)
		const {firstname, lastname, email:loginEmail, phone, role, id} = user
		
		res.json({firstname, lastname, email:loginEmail, phone, role, id, jwt: createToken(id)});
	}catch(e){
		console.log(e);
		res.status(401).json({message: "Incorrect Credentials"})
	}
}

const get_jobs = async (req:any, res:any) => {

	const {tokenDetails: {id}, tokenDetails} = req;

	if(tokenDetails){
		const userDetails = User.findOne({_id: id});
		console.log(userDetails)
		let jobs:any = null
		if(userDetails.role === "mechanic"){
			console.log('its mechanic')
			jobs = await Job.find({assignedMechanic: id}).populate("userId").populate("vehicleId").populate("assignedMechanic")

		}else {
			jobs = await Job.find({userId: id}).populate("userId").populate("vehicleId").populate("assignedMechanic")

		}
		res.json(jobs);
		

	}else {
		res.status(401).json({message: "Unauthorized"});
	}
}
module.exports = {login, get_jobs}