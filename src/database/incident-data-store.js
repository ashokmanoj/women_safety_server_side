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
exports.deleteIncident = exports.getAllIncidents = exports.updateIncident = exports.getIncidents = exports.saveIncident = void 0;
const IIncident_1 = __importDefault(require("../models/IIncident"));
const user_data_store_1 = require("./user-data-store");
const saveIncident = (incidentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incidentToSave = Object.assign(Object.assign({}, incidentData), { timestamp: incidentData.timestamp ? new Date(incidentData.timestamp) : new Date() });
        const incident = yield IIncident_1.default.create(incidentToSave);
        yield (0, user_data_store_1.addUserIncident)(incidentData.user, incident._id);
        return incident;
    }
    catch (error) {
        console.log(`Error saving incident: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to save incident.");
    }
});
exports.saveIncident = saveIncident;
const getIncidents = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incidents = yield IIncident_1.default.find({ user: userId });
        console.log(`Incidents for user ID ${userId}: ${JSON.stringify(incidents)}`);
        return incidents;
    }
    catch (error) {
        console.log(`Error getting incidents: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to get incidents.");
    }
});
exports.getIncidents = getIncidents;
const updateIncident = (incidentId, incidentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedIncident = yield IIncident_1.default.findByIdAndUpdate(incidentId, incidentData, { new: true });
        if (!updatedIncident) {
            throw new Error("Incident not found.");
        }
        return updatedIncident;
    }
    catch (error) {
        console.log(`Error updating incident: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to update incident.");
    }
});
exports.updateIncident = updateIncident;
const getAllIncidents = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incidents = yield IIncident_1.default.find({});
        return incidents;
    }
    catch (error) {
        console.log(`Error getting incidents: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to get incidents.");
    }
});
exports.getAllIncidents = getAllIncidents;
const deleteIncident = (incidentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedIncident = yield IIncident_1.default.findByIdAndDelete(incidentId);
        if (!deletedIncident) {
            throw new Error("Incident not found.");
        }
        return deletedIncident;
    }
    catch (error) {
        console.log(`Error deleting incident: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to delete incident.");
    }
});
exports.deleteIncident = deleteIncident;
