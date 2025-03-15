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
const express_1 = __importDefault(require("express"));
const emergenct_data_store_1 = require("../database/emergenct-data-store");
const emergencyRouter = express_1.default.Router();
emergencyRouter.post("/save", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let emergency = req.body;
        let response = yield (0, emergenct_data_store_1.saveEmergency)(emergency);
        res.status(200).json({ message: "Emergency saved successfully" });
    }
    catch (e) {
        console.log("error : ", e);
    }
}));
emergencyRouter.get("/get/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        let response = yield (0, emergenct_data_store_1.getEmergency)(userId);
        res.status(200).json(response);
    }
    catch (e) {
        console.log("error : ", e);
    }
}));
emergencyRouter.post("/toggle", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = req.body.userId;
        let response = yield (0, emergenct_data_store_1.togglePanicMode)(userId);
        res.status(200).json(response);
    }
    catch (e) {
        console.log("error : ", e);
    }
}));
emergencyRouter.post("/updateLocation", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = req.body.userId;
        let location = req.body.location;
        let response = yield (0, emergenct_data_store_1.updateLocation)(userId, location);
        res.status(200).json(response);
    }
    catch (e) {
        console.log("error : ", e);
    }
}));
emergencyRouter.post("/setRecording", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = req.body.userId;
        let recording = req.body.recording;
        let response = yield (0, emergenct_data_store_1.setRecording)(userId, recording);
        res.status(200).json(response);
    }
    catch (e) {
        console.log("error : ", e);
    }
}));
exports.default = emergencyRouter;
