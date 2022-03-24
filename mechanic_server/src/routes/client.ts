export {}
const {Router} = require('express')
const {register: registerController, add_vehicle, get_vehicles, add_job, send_request, add_appointment} = require('../controllers/client')
const appendTokenDetailsToRequest = require('../helpers/appendTokenDetailsToRequest');

const router = Router();

router.get("/vehicles", get_vehicles);

router.post('/appointment', appendTokenDetailsToRequest, add_appointment);
router.post("/register", registerController);
router.post('/vehicles', add_vehicle);
router.post('/job', appendTokenDetailsToRequest, add_job)
router.post('/request', appendTokenDetailsToRequest, send_request)


module.exports = router;
