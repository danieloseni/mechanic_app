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
//import the user model
const User = require('../models/users');
//import the jwt library
const jwt = require('jsonwebtoken');
//import the job model
const Job = require('../models/job');
//import the mongoose library, which is a library for making use of mongodb with nodejs
const mongoose = require('mongoose');
const maxAge = 7 * 24 * 60 * 60; //1 week
//Used to create jwt token
const createToken = (id) => {
    return jwt.sign({ id }, 'A good man never hits a woman Because true power doesn\'t let little things get to them Only the weak see the needd to fight and hit people in every little situation', {
        expiresIn: maxAge
    });
};
//This is the login controller. It logs in both mechanics and cliet
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get the email and password from the request
        const { email, password } = req.body;
        //Using the login function, defined in the users model, confirm that the credentials are correct, if the credentials are correct, the user's details are returned
        const user = yield User.login(email, password);
        //Get the firstname, lastname, email, phone number, role and id from the user's details retured
        const { firstname, lastname, email: loginEmail, phone, role, id } = user;
        //return the user'd details back to the client with a newly generated jwt
        res.json({ firstname, lastname, email: loginEmail, phone, role, id, jwt: createToken(id) });
    }
    catch (e) {
        console.log(e);
        //return 401 if credentials are incorrect
        res.status(401).json({ message: "Incorrect Credentials" });
    }
});
//this is the controller for getting jobs
const get_jobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get the token details from the request
    const { tokenDetails: { id }, tokenDetails } = req;
    //if valid authenticaton token has been provided, proceed
    if (tokenDetails) {
        //get the details of the user who is trying to get jobs from the databse
        const userDetails = yield User.findById(id);
        let jobs = null;
        //if the user is a mechanic, return the jobs that have been assigned to that mechanic
        if (userDetails.role === "mechanic") {
            jobs = yield Job.find({ assignedMechanic: id }).populate("userId").populate("vehicleId").populate("assignedMechanic");
        }
        else {
            //otherwise get the jobs created by the clent
            jobs = yield Job.find({ userId: id }).populate("userId").populate("vehicleId").populate("assignedMechanic");
        }
        //return the jobs		
        res.json(jobs);
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
});
module.exports = { login, get_jobs };
