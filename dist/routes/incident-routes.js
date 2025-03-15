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
const incident_data_store_1 = require("../database/incident-data-store");
let incidentRouter = express_1.default.Router();
incidentRouter.post("/save", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incident = req.body;
        console.log(incident.user);
        const response = yield (0, incident_data_store_1.saveIncident)(incident);
        res.status(200).json({ message: "Incident saved successfully" });
    }
    catch (e) {
        console.log("error : ", e);
    }
}));
incidentRouter.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let incidents = yield (0, incident_data_store_1.getAllIncidents)();
        res.status(200).json(incidents);
    }
    catch (e) {
        console.log("error : ", e);
    }
}));
incidentRouter.put("/update/:incidentId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incidentId = req.params.incidentId;
        const updatedData = req.body;
        const updatedIncident = yield (0, incident_data_store_1.updateIncident)(incidentId, updatedData);
        res.status(200).json({ message: "Incident updated successfully", data: updatedIncident });
    }
    catch (e) {
        console.log("error : ", e);
    }
}));
incidentRouter.delete("/delete/:incidentId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incidentId = req.params.incidentId;
        const deletedIncident = yield (0, incident_data_store_1.deleteIncident)(incidentId);
        res.status(200).json({ message: "Incident deleted successfully", data: deletedIncident });
    }
    catch (e) {
        console.log("error : ", e);
    }
}));
incidentRouter.get("/incidents/:userId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const contacts = yield (0, incident_data_store_1.getIncidents)(userId);
        console.log(`Incidents for user ${userId}: ${JSON.stringify(contacts)}`);
        res.status(200).json(contacts);
    }
    catch (e) {
        next(e);
    }
}));
exports.default = incidentRouter;
