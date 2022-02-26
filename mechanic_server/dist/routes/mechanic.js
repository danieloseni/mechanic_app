"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const { register: registerController, get_mechanics } = require('../controllers/mechanic');
const router = Router();
router.get("/", get_mechanics);
router.post("/register", registerController);
module.exports = router;
