export {}
const User = require('../models/users');
const jwt = require('jsonwebtoken');

const maxAge = 7 * 24 * 60 * 60; //1 week

const createToken = (id:string) => {

    return jwt.sign({id}, 'A good man never hits a woman Because true power doesn\'t let little things get to them Only the weak see the needd to fight and hit people in every little situation', {
        expiresIn: maxAge
    })
}
const login = async (req:any, res:any) => {
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
module.exports = {login}