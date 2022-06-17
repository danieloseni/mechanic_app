"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig = {
    database_url: process.env.DATABASE_URL || 'mongodb://localhost/mechanic-app',
    port: parseInt(process.env.PORT) || 5000,
    tokenDecodeString: process.env.TOKEN_DECODE_STRING || "A good man never hits a woman Because true power doesn't let little things get to them Only the weak see the need to fight and hit people in every little situation"
};
exports.default = appConfig;
