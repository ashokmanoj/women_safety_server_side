import express, {NextFunction, Request, Response} from "express";
import {
    deleteIncident,
    getAllIncidents,
    getIncidents,
    saveIncident,
    updateIncident
} from "../database/incident-data-store";



let incidentRouter = express.Router();


incidentRouter.post("/save", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const incident = req.body;
        console.log(incident.user)
        const response = await saveIncident(incident);

        res.status(200).json({ message: "Incident saved successfully" });
    }catch (e) {
        console.log("error : ", e);
    }
});

incidentRouter.get("/all", async (req, res) => {
    try{
        let incidents = await getAllIncidents();
        res.status(200).json(incidents);
    }catch (e) {
        console.log("error : ", e);
    }
});
incidentRouter.put("/update/:incidentId", async (req, res) => {
    try{
        const incidentId = req.params.incidentId;
        const updatedData = req.body;
        const updatedIncident = await updateIncident(incidentId, updatedData);
        res.status(200).json({ message: "Incident updated successfully", data: updatedIncident });
    }catch (e) {
        console.log("error : ", e);
    }
})

incidentRouter.delete("/delete/:incidentId", async (req, res) => {
    try{
        const incidentId = req.params.incidentId;
        const deletedIncident = await deleteIncident(incidentId);
        res.status(200).json({ message: "Incident deleted successfully", data: deletedIncident });
    }catch (e) {
        console.log("error : ", e);
    }
})
incidentRouter.get("/incidents/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const contacts = await getIncidents(userId);
        console.log(`Incidents for user ${userId}: ${JSON.stringify(contacts)}`);
        res.status(200).json(contacts);
    } catch (e) {
        next(e);
    }
});


export default incidentRouter;