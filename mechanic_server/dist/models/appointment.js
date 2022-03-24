"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Schema, model } = require('mongoose');
const AppointmentSchema = new Schema({
    mechanic: { type: Schema.Types.ObjectId, ref: "user" },
    user: { type: Schema.Types.ObjectId, ref: "user" },
    date: Date,
    address: String,
    service: String
});
module.exports = model('appointment', AppointmentSchema);
