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
//imort the jwt library
const jwt = require('jsonwebtoken');
//this function get the token from the request header, and makes it available to the controller by appending the details to the request object
module.exports = (req, res, next) => {
    var _a, _b, _c;
    //get the token from the authorization value in the header
    const token = (_c = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split) === null || _c === void 0 ? void 0 : _c.call(_b, " ")[1];
    //ensure that the token is valid and decodable
    jwt.verify(token, process.env.tokenDecodeString, (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            //if there's an error, it means the token is invalid, therefore add null to the request object
            req.tokenDetails = null;
        }
        else {
            //if no errors get the details encoded inside the token and append it to the request object
            req.tokenDetails = decodedToken;
        }
        //push the newly generated strutured request object to the controller
        next();
    }));
};
