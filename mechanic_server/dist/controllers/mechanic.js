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
const get_mechanics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('mechanic endpoint hit');
    const mechanics = yield User.find({ role: "mechanic" });
    res.json(mechanics.map(({ firstname, lastname, email, phone, _id }) => ({ firstname, lastname, email, phone, _id })));
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, phone } = req.body;
    const user = yield User.create({ firstname, lastname, email, password, phone, role: "mechanic" });
    res.json(user);
});
module.exports = {
    register,
    get_mechanics
};
