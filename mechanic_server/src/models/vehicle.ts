export {};
const {model, Schema} = require('mongoose');


const VehicleSchema = Schema({
	userId: Schema.Types.ObjectId,
	brand: {
		type: String
	},
	make: {
		type: String
	},
	model: {
		type: String
	},
	plateNumber: {
		type: String
	},
	color: {
		type: String
	}
});

module.exports = model('vehicle', VehicleSchema);

