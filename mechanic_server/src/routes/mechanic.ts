export {}
const {Router} = require('express')
const {register: registerController, get_mechanics, reject_request, accept_request} = require('../controllers/mechanic')
const appendTokenDetailsToRequest = require('../helpers/appendTokenDetailsToRequest');

const router = Router();

router.get("/", get_mechanics);

router.post("/register", registerController);
router.post("/reject-request", appendTokenDetailsToRequest, reject_request)
router.post("/accept-request", appendTokenDetailsToRequest, accept_request)


module.exports = router;
