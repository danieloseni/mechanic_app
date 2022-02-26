"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../models/users');
const Vehicle = require('../models/vehicle');
const getTokenFromHeaders = require('../helpers/getTokenFromHeader');
const jwt = require('jsonwebtoken');
const Job = require('../models/job');
const { setRequest } = require('../adapters/firebase/firestore/firestorecontroller');
const maxAge = 7 * 24 * 60 * 60; //1 week
const createToken = (id) => {
    return jwt.sign({ id }, 'A good man never hits a woman Because true power doesn\'t let little things get to them Only the weak see the needd to fight and hit people in every little situation', {
        expiresIn: maxAge
    });
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('register was hit');
    const { firstname, lastname, email, password, phone } = req.body;
    const user = yield User.create({ firstname, lastname, email, password, phone, role: "client" });
    const { role, id } = user;
    res.json({ firstname, lastname, email, phone, role, id, jwt: createToken(id) });
});
const add_vehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('vehicle registration was hit');
    const { brand, make, model, color, plateNumber } = req.body;
    const tokenDetails = yield getTokenFromHeaders(req);
    if (tokenDetails) {
        console.log(tokenDetails);
        const vehicle = yield Vehicle.create({ brand, make, model, color, plateNumber, userId: tokenDetails.id });
        res.json(vehicle);
    }
    else {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
});
const get_vehicles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenDetails = yield getTokenFromHeaders(req);
    if (tokenDetails) {
        console.log(tokenDetails);
        const vehicles = yield Vehicle.find({ userId: tokenDetails.id });
        res.json(vehicles);
    }
    else {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
});
const add_job = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vehicleId } = req.body;
    const { tokenDetails: { id }, tokenDetails } = req;
    if (tokenDetails) {
        const job = yield Job.create({ vehicleId, userId: id, dateCreated: new Date() });
        res.send(job);
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
});
const send_request = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobId, mechanicId } = req.body;
    const { tokenDetails: { id }, tokenDetails } = req;
    if (tokenDetails) {
        res.json({ message: "done" });
        //fetch job details from database
        const { userId: { firstname, lastname, email, phone, id }, vehicleId: { brand, make, model, color, plateNumber, id: vehicleid } } = yield Job.findOne({ _id: jobId }).populate("userId").populate("vehicleId");
        //send request to  firebase rtb
        setRequest({
            jobId,
            client: { firstname, lastname, email, phone, id },
            mechanicId,
            vehicle: { brand, make, model, color, plateNumber, id: vehicleid },
            declined: false
        });
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
});
module.exports = {
    register, add_vehicle, get_vehicles, add_job, send_request
};
