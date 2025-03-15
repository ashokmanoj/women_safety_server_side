import express from "express";
import mongoose from "mongoose";
import {
    saveEmergency,
    getEmergency,
    togglePanicMode,
    updateLocation,
    setRecording, saveEmergencyHandler,
} from "../database/emergenct-data-store";



const emergencyRouter = express.Router();



emergencyRouter.post("/save", async (req, res) => {
    try{
        let emergency = req.body;
        let response = await saveEmergency(emergency);
        res.status(200).json({ message: "Emergency saved successfully" });
    }catch (e) {
        console.log("error : ", e);
    }
});

emergencyRouter.get("/get/:userId", async (req, res) => {
    try{
        const userId : string = req.params.userId;
        let response = await getEmergency(userId);
        res.status(200).json(response);
    }catch (e) {
        console.log("error : ", e);
    }
});

emergencyRouter.post("/toggle", async (req, res) => {
    try{
        let userId = req.body.userId;
        let response = await togglePanicMode(userId);
        res.status(200).json(response);
    }catch (e) {
        console.log("error : ", e);
    }
});

emergencyRouter.post("/updateLocation", async (req, res) => {
    try{
        let userId = req.body.userId;
        let location = req.body.location;
        let response = await updateLocation(userId, location);
        res.status(200).json(response);
    }catch (e) {
        console.log("error : ", e);
    }
});

emergencyRouter.post("/setRecording", async (req, res) => {
    try{
        let userId = req.body.userId;
        let recording = req.body.recording;
        let response = await setRecording(userId, recording);
        res.status(200).json(response);
    }catch (e) {
        console.log("error : ", e);
    }
});

export default emergencyRouter;


