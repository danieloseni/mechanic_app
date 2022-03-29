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
//import the model and schema library
const { model, Schema } = require('mongoose');
//import the brcrypt. the bcrypt library is used to encode passwords before storing in the database
const bcrypt = require('bcrypt');
//This is the user schema, it is what a user info should look like
const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: String
});
//This an event listener that is fired before a user is saved in the database
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //Salt is generated to append to the alraady encrypted password so that it becomes harder to crack. Salts are random characters
        const salt = yield bcrypt.genSalt();
        //Save the hashed password to the database
        this.password = yield bcrypt.hash(this.password, salt);
        //Move on to saving the data in the database
        next();
    });
});
//Method to log in user. It takes in 2 parameters, the email of the user and the password
UserSchema.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        //first of all check if there's an existing user with that email
        const user = yield this.findOne({ email });
        //if there is, check that the password passed is a match with the one hashed in the database
        if (user) {
            const auth = yield bcrypt.compare(password, user.password);
            if (auth) {
                delete user.password;
                return user;
            }
            //if it's not a match, throw an error
            throw Error("Incorrect password");
        }
        //if the email doesn't exist, throw an error
        throw Error("Incorrect email");
    });
};
//export the newly created model
module.exports = model("user", UserSchema);
