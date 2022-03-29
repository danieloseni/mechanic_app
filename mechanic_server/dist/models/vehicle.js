"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import the moodel and schema libraries
const { model, Schema } = require('mongoose');
//this is the vehicle schema, it defines how a vehicle info should look and what it should contain
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
//export the newly created vehicle model
module.exports = model('vehicle', VehicleSchema);
