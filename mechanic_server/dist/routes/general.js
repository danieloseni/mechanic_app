"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const { login } = require('../controllers/general');
const router = Router();
router.post("/login", login);
module.exports = router;
