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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const express_1 = __importDefault(require("express"));
const user_data_store_1 = require("../database/user-data-store");
const jwt_1 = require("../util/jwt");
let userRouter = express_1.default.Router();
userRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.body;
        let response = yield (0, user_data_store_1.registerUser)(user);
        res.status(200).json({ message: "User registered successfully" });
    }
    catch (e) {
        console.log("error : ", e);
    }
}));
userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.body;
        let response = yield (0, user_data_store_1.loginUser)(user);
        if (response) {
            const { accessToken, refreshToken } = yield (0, jwt_1.generateToken)(response.email);
            const filteredResponse = {
                id: response._id,
                email: response.email,
                name: response.name,
                accessToken: accessToken,
                refreshToken: refreshToken
            };
            res.status(200).send(filteredResponse);
        }
    }
    catch (e) {
        console.log("error : ", e);
    }
}));
function authenticateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method === 'GET' || req.method === 'OPTIONS') {
            console.log(`Method: ${req.method} || URL: ${req.url}`);
            next();
            return;
        }
        const authHeader = req.headers.authorization;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
        if (!token)
            res.status(401).send('No token provided');
        try {
            const payload = yield (0, jwt_1.verifyToken)(token);
            next();
            /*if(payload){
                next();
            }else{
                res.status(403).send('Invalid or expired token');
            }*/
        }
        catch (err) {
            res.status(401).send(err);
        }
    });
}
exports.default = userRouter;
