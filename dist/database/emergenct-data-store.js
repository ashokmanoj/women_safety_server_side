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
exports.setRecording = exports.updateLocation = exports.togglePanicMode = exports.getEmergency = exports.saveEmergency = exports.saveEmergencyHandler = void 0;
const IEmergency_1 = require("../models/IEmergency");
const mongoose_1 = __importDefault(require("mongoose"));
const saveEmergencyHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, lastLocation } = req.body;
    // Validate required fields
    if (!userId || !lastLocation || !lastLocation.latitude || !lastLocation.longitude) {
        return res.status(400).json({
            message: 'Missing required fields: userId, lastLocation.latitude, or lastLocation.longitude'
        });
    }
    try {
        const emergency = yield (0, exports.saveEmergency)(req.body);
        res.status(200).json({ message: "Emergency saved successfully", emergency });
    }
    catch (error) {
        console.error("Error saving emergency:", error);
        res.status(500).json({ message: "Failed to save emergency" });
    }
});
exports.saveEmergencyHandler = saveEmergencyHandler;
const saveEmergency = (emergencyData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emergency = yield IEmergency_1.EmergencyModel.create(emergencyData);
        return emergency;
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            console.error('Validation Error:', error.errors);
        }
        else {
            console.error('Unexpected Error:', error);
        }
        throw error instanceof Error ? error : new Error('Failed to save emergency.');
    }
});
exports.saveEmergency = saveEmergency;
const getEmergency = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emergency = yield IEmergency_1.EmergencyModel.findOne({ userId });
        return emergency;
    }
    catch (error) {
        console.log(`Error getting emergency: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to get emergency.");
    }
});
exports.getEmergency = getEmergency;
const togglePanicMode = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emergency = yield IEmergency_1.EmergencyModel.findOneAndUpdate({ userId }, { $set: { "panicMode.active": true } }, { new: true });
        return emergency;
    }
    catch (error) {
        console.log(`Error toggling panic mode: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to toggle panic mode.");
    }
});
exports.togglePanicMode = togglePanicMode;
const updateLocation = (userId, location) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emergency = yield IEmergency_1.EmergencyModel.findOneAndUpdate({ userId }, { $set: { "lastLocation": location } }, { new: true });
        return emergency;
    }
    catch (error) {
        console.log(`Error updating location: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to update location.");
    }
});
exports.updateLocation = updateLocation;
const setRecording = (userId, recording) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emergency = yield IEmergency_1.EmergencyModel.findOneAndUpdate({ userId }, { $set: { "panicMode.recording": recording } }, { new: true });
        return emergency;
    }
    catch (error) {
        console.log(`Error updating recording: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to update recording.");
    }
});
exports.setRecording = setRecording;
