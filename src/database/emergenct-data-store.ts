import { EmergencyModel,  } from "../models/IEmergency";


import express, { Request, Response } from 'express';
import mongoose from "mongoose";


export const saveEmergencyHandler = async (req: express.Request, res: express.Response) => {
    const { userId, lastLocation } = req.body;

    // Validate required fields
    if (!userId || !lastLocation || !lastLocation.latitude || !lastLocation.longitude) {
        return res.status(400).json({
            message: 'Missing required fields: userId, lastLocation.latitude, or lastLocation.longitude'
        });
    }

    try {
        const emergency = await saveEmergency(req.body);
        res.status(200).json({ message: "Emergency saved successfully", emergency });
    } catch (error) {
        console.error("Error saving emergency:", error);
        res.status(500).json({ message: "Failed to save emergency" });
    }
};
export const saveEmergency = async (emergencyData: any) => {
    try {
        const emergency = await EmergencyModel.create(emergencyData);
        return emergency;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error('Validation Error:', error.errors);
        } else {
            console.error('Unexpected Error:', error);
        }
        throw error instanceof Error ? error : new Error('Failed to save emergency.');
    }
};

export const getEmergency = async (userId: string) => {
    try {
        const emergency = await EmergencyModel.findOne({ userId });
        return emergency;
    } catch (error) {
        console.log(`Error getting emergency: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to get emergency.");
    }
}

export const togglePanicMode = async (userId: string) => {
    try {
        const emergency = await EmergencyModel.findOneAndUpdate({ userId }, { $set: { "panicMode.active": true } }, { new: true });
        return emergency;
    } catch (error) {
        console.log(`Error toggling panic mode: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to toggle panic mode.");
    }
}
export const updateLocation = async (userId: string, location: { latitude: number, longitude: number }) => {
    try {
        const emergency = await EmergencyModel.findOneAndUpdate({ userId }, { $set: { "lastLocation": location } }, { new: true });
        return emergency;
    } catch (error) {
        console.log(`Error updating location: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to update location.");
    }
}
export const setRecording = async (userId: string, recording: boolean) => {
    try {
        const emergency = await EmergencyModel.findOneAndUpdate({ userId }, { $set: { "panicMode.recording": recording } }, { new: true });
        return emergency;
    } catch (error) {
        console.log(`Error updating recording: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to update recording.");
    }
}
