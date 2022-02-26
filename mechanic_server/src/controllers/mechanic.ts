export {}
const User = require('../models/users');

const get_mechanics = async (req:any, res:any) => {
	console.log('mechanic endpoint hit')
	const mechanics:any = await User.find({role: "mechanic"});
	res.json(mechanics.map(({firstname, lastname, email, phone, _id}:any) => ({firstname, lastname, email, phone, _id})));

}

const register = async (req:any, res:any) => {
	const {firstname, lastname, email, password, phone} = req.body;

	const user = await User.create({firstname, lastname, email, password, phone, role: "mechanic"})
	res.json(user)
}

module.exports = {
	register,
	get_mechanics
}