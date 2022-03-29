export {}


//import the schema library from the mongoose library. The schema library is used for defining database schemas while the model library is used for creating models withthat schema
const {Schema, model} = require('mongoose');

//This is an appintment schema. This is the way an appointnt should look
const AppointmentSchema = new Schema({
	mechanic: {type: Schema.Types.ObjectId, ref: "user"},
	user: {type: Schema.Types.ObjectId, ref: "user"},
	date: Date,
	address: String,
	service: String
})

//export the newly created model
module.exports = model('appointment', AppointmentSchema);