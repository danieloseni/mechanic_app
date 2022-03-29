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
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { getDatabase } = require('firebase-admin/database');
const { initialize } = require('../app');
let db;
let ref;
let usersRef;
//this is the function that sets up firebase and prepares the database to be accessed
const setup = () => __awaiter(void 0, void 0, void 0, function* () {
    yield initialize();
    db = getDatabase();
    ref = db.ref();
});
//a test
const set = () => __awaiter(void 0, void 0, void 0, function* () {
    yield setup();
    usersRef = ref.child('users');
    usersRef.set({
        alanisawesome: {
            date_of_birth: 'June 23, 1912',
            full_name: 'Alan Turing'
        }
    });
});
//This is the function for adding a request to firebase
const setRequest = (request) => __awaiter(void 0, void 0, void 0, function* () {
    yield setup();
    let requestRef = ref.child(`requests/${request.jobId}/${request.mechanicId}`);
    // requestRef.push().set(request)
    requestRef.set(request);
});
//function for rejecting request
const rejectRequest = (request) => __awaiter(void 0, void 0, void 0, function* () {
    yield setup();
    let requestRef = ref.child(`requests/${request.jobId}/${request.mechanicId}`);
    // requestRef.push().set(request)
    requestRef.update({ declined: true });
});
//function for accepting request
const acceptRequest = (request) => __awaiter(void 0, void 0, void 0, function* () {
    yield setup();
    let jobRef = ref.child(`requests/${request.jobId}`);
    let requestRef = ref.child(`requests/${request.jobId}/${request.mechanicId}`);
    // requestRef.push().set(request)
    requestRef.remove();
    jobRef.remove();
});
//export all firebase function
module.exports = { set, setRequest, rejectRequest, acceptRequest };
