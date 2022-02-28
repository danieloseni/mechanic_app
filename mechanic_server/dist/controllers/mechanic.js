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
const maxAge = 7 * 24 * 60 * 60; //1 week
const createToken = (id) => {
    return jwt.sign({ id }, 'A good man never hits a woman Because true power doesn\'t let little things get to them Only the weak see the needd to fight and hit people in every little situation', {
        expiresIn: maxAge
    });
};
const get_mechanics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('mechanic endpoint hit');
    const mechanics = yield User.find({ role: "mechanic" });
    res.json(mechanics.map(({ firstname, lastname, email, phone, _id }) => ({ firstname, lastname, email, phone, _id })));
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('register was hit');
    const { firstname, lastname, email, password, phone } = req.body;
    const user = yield User.create({ firstname, lastname, email, password, phone, role: "mechanic" });
    const { role, id } = user;
    res.json({ firstname, lastname, email, phone, role, id, jwt: createToken(id) });
});
module.exports = {
    register,
    get_mechanics
};
