"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import the router library, the router library is used for grouping routes that have a common prefix. for example, /user/history and /user/books both have the user prefix in common, and instead of defining each route with user prefix you just used the router library to group them together and it will automatically append the prefix
const { Router } = require('express');
//import the neccessary controllers that responnd to network calls on each route
const { register: registerController, add_vehicle, get_vehicles, add_job, send_request, add_appointment } = require('../controllers/client');
//This is the middleware that gets the token from request header and appends it to the request object
const appendTokenDetailsToRequest = require('../helpers/appendTokenDetailsToRequest');
const router = Router();
//Define the route for getting vehicles
router.get("/vehicles", get_vehicles);
//define the route for creating appointment
router.post('/appointment', appendTokenDetailsToRequest, add_appointment);
//define the route for registering a client
router.post("/register", registerController);
//define the router for add a vehicle
router.post('/vehicles', add_vehicle);
//define the route for creating a job
router.post('/job', appendTokenDetailsToRequest, add_job);
//define the route for sending a new reques the mechainc
router.post('/request', appendTokenDetailsToRequest, send_request);
//export the router with the routes grouped
module.exports = router;
