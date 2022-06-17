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
const jwt = require('jsonwebtoken');
const { createToken } = require('../client');
describe("Create Token Function Test", () => {
    it("properly encodes the data in the jwt", () => {
        const jwt = createToken(24);
        jwt.verify(jwt, "A good man never hits a woman Because true power doesn\'t let little things get to them Only the weak see the needd to fight and hit people in every little situation", (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
            if (!err) {
                expect(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.id).toBe(24);
            }
        }));
    });
});
