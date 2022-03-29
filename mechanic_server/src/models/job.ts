export {}

//import the model and schema libraries
const {model, Schema} = require('mongoose');


//This is the job schema. This is how a job should 
const JobSchema = new Schema({
	userId: {type: Schema.Types.ObjectId, ref: "user"},
	vehicleId: {type: Schema.Types.ObjectId, ref: "vehicle"},
	assignedMechanic: {type: Schema.Types.ObjectId, ref: "user"},
	dateCreated: Date,
	dateAssigned: Date,
	met: Boolean,
	done: Boolean
})

//Export the newly created model
module.exports = model('job', JobSchema);
