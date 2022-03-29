export {}
//import the router library
const {Router} = require('express')

//import the necessary controllers handling network calls
const {login, get_jobs} = require('../controllers/general');


//imort the middlewar for getting token details from requests
const appendTokenDetailsToRequest = require('../helpers/appendTokenDetailsToRequest');


const router = Router();


//define an endpoint for getting jobs
router.get("/jobs", appendTokenDetailsToRequest, get_jobs);

//define an endpoint for logging in
router.post("/login", login);


//export the router with the grouped routes
module.exports = router;
