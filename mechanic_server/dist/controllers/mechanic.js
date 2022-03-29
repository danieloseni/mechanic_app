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
//import the users model
const User = require('../models/users');
const Jobs = require('../models/job');
//import the jwt library
const jwt = require('jsonwebtoken');
const { rejectRequest, acceptRequest } = require('../adapters/firebase/firestore/firestorecontroller');
const maxAge = 7 * 24 * 60 * 60; //1 week
const createToken = (id) => {
    return jwt.sign({ id }, 'A good man never hits a woman Because true power doesn\'t let little things get to them Only the weak see the needd to fight and hit people in every little situation', {
        expiresIn: maxAge
    });
};
//This is the function for getting all the registered mechanics
const get_mechanics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Get all the users with roles of "mechanic"
    const mechanics = yield User.find({ role: "mechanic" });
    //return the list back to the client
    res.json(mechanics.map(({ firstname, lastname, email, phone, _id }) => ({ firstname, lastname, email, phone, _id })));
});
//This is the function for registering mechanic
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('register was hit');
        //Get all the details from the request
        const { firstname, lastname, email, password, phone } = req.body;
        console.log(firstname, lastname, email, password, phone);
        //create a new user in the database with those details
        const user = yield User.create({ firstname, lastname, email, password, phone, role: "mechanic" });
        //get the role and id from the save details
        const { role, id } = user;
        //return all the necessary details back to the client with a newly generated jwt token
        res.json({ firstname, lastname, email, phone, role, id, jwt: createToken(id) });
    }
    catch (ex) {
        //return 400 if there's a validation error
        res.status(400).json({ message: "incorrect credentials" });
    }
});
const reject_request = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobId } = req.body;
    const { tokenDetails: { id }, tokenDetails } = req;
    if (tokenDetails) {
        res.json({ message: "done" });
        //send request to  firebase rtb
        rejectRequest({
            jobId,
            mechanicId: id,
        });
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
});
const accept_request = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobId } = req.body;
    const { tokenDetails: { id }, tokenDetails } = req;
    if (tokenDetails) {
        yield Jobs.findOneAndUpdate({ _id: jobId }, { assignedMechanic: id, dateAssigned: new Date() });
        res.json({ message: "done" });
        //send request to  firebase rtb
        acceptRequest({
            jobId,
            mechanicId: id,
        });
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
});
const mark_met = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobId } = req.body;
    const { tokenDetails: { id }, tokenDetails } = req;
    if (tokenDetails) {
        yield Jobs.findOneAndUpdate({ _id: jobId, assignedMechanic: id }, { met: true });
        res.json({ message: "done" });
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
});
const mark_done = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobId } = req.body;
    const { tokenDetails: { id }, tokenDetails } = req;
    if (tokenDetails) {
        yield Jobs.findOneAndUpdate({ _id: jobId, assignedMechanic: id }, { done: true });
        res.json({ message: "done" });
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
});
module.exports = {
    register,
    get_mechanics,
    reject_request,
    accept_request,
    mark_met,
    mark_done
};
