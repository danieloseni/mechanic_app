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
const jwt = require('jsonwebtoken');
const Job = require('../models/job');
const maxAge = 7 * 24 * 60 * 60; //1 week
const createToken = (id) => {
    return jwt.sign({ id }, 'A good man never hits a woman Because true power doesn\'t let little things get to them Only the weak see the needd to fight and hit people in every little situation', {
        expiresIn: maxAge
    });
};
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const user = yield User.login(email, password);
        const { firstname, lastname, email: loginEmail, phone, role, id } = user;
        res.json({ firstname, lastname, email: loginEmail, phone, role, id, jwt: createToken(id) });
    }
    catch (e) {
        console.log(e);
        res.status(401).json({ message: "Incorrect Credentials" });
    }
});
const get_jobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tokenDetails: { id }, tokenDetails } = req;
    if (tokenDetails) {
        const userDetails = User.findOne({ _id: id });
        console.log(userDetails);
        let jobs = null;
        if (userDetails.role === "mechanic") {
            console.log('its mechanic');
            jobs = yield Job.find({ assignedMechanic: id }).populate("userId").populate("vehicleId").populate("assignedMechanic");
        }
        else {
            jobs = yield Job.find({ userId: id }).populate("userId").populate("vehicleId").populate("assignedMechanic");
        }
        res.json(jobs);
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
});
module.exports = { login, get_jobs };
