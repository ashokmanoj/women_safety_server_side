import express  from "express";
import {saveLocation} from "../database/location-data-store";


let locationRouter = express.Router();

locationRouter.post("/save", async (req, res) => {
    try{
        let location = req.body;
        let response = await saveLocation(location);
        res.status(200).json({ message: "Location saved successfully" });
    }catch (e) {
        console.log("error : ", e);
    }
});

export default locationRouter;