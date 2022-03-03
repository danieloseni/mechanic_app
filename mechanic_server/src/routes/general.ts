export {}
const {Router} = require('express')
const {login, get_jobs} = require('../controllers/general');
const appendTokenDetailsToRequest = require('../helpers/appendTokenDetailsToRequest');


const router = Router();

router.get("/jobs", appendTokenDetailsToRequest, get_jobs);
router.post("/login", login);



module.exports = router;
