export {}
const {model, Schema} = require('mongoose');

const JobSchema = new Schema({
	userId: {type: Schema.Types.ObjectId, ref: "user"},
	vehicleId: {type: Schema.Types.ObjectId, ref: "vehicle"},
	assignedMechanic: {type: Schema.Types.ObjectId, ref: "user"},
	dateCreated: Date,
	dateAssigned: Date,
	met: Boolean,
	done: Boolean
})

module.exports = model('job', JobSchema);
