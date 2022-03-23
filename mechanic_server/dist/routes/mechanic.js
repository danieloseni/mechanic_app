"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const { register: registerController, get_mechanics, reject_request, accept_request, mark_met, mark_done } = require('../controllers/mechanic');
const appendTokenDetailsToRequest = require('../helpers/appendTokenDetailsToRequest');
const router = Router();
router.get("/", get_mechanics);
router.post("/register", registerController);
router.post("/reject-request", appendTokenDetailsToRequest, reject_request);
router.post("/accept-request", appendTokenDetailsToRequest, accept_request);
router.post("/mark-met", appendTokenDetailsToRequest, mark_met);
router.post("/mark-done", appendTokenDetailsToRequest, mark_done);
module.exports = router;
