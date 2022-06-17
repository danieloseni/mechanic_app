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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const config_1 = __importDefault(require("../config"));
const { tokenDecodeString } = config_1.default;
// this function gets the token details from the header and returns the details to whatever function called it
module.exports = (req) => {
    return new Promise((resolve, reject) => {
        var _a, _b, _c;
        const token = (_c = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split) === null || _c === void 0 ? void 0 : _c.call(_b, " ")[1];
        jwt.verify(token, tokenDecodeString, (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                resolve(null);
            }
            else {
                resolve(decodedToken);
            }
        }));
    });
};
