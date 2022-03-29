"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const path = require('path');
let app;
//import the service account credentials. The service account credentials are what will be used to access firebase
const serviceAccount = require("./firebase-service-account-key.json");
const initialize = () => {
    return new Promise((resolve, reject) => {
        if (!app) {
            console.log('here');
            //initialize firebase with all the necessary credentials 
            app = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: "https://mechanic-app-49aec-default-rtdb.firebaseio.com"
            });
            setTimeout(() => {
                resolve("");
            }, 5000);
        }
        else {
            resolve("");
        }
    });
};
const get_app = () => {
    return app;
};
//export the function for getting the initialized app
module.exports = { initialize, get_app };
