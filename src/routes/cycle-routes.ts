import express from "express";
import { saveCycle, updateCycle, deleteCycle, getCycle } from "../database/cycle-data-store";

const cycleRouter = express.Router();

cycleRouter.post("/save", async (req: express.Request, res: express.Response) => {
    try {
        const cycleData = req.body;
        const response = await saveCycle(cycleData);
        res.status(200).json({
            message: "Cycle saved successfully",
            cycle: response
        });
    } catch (e) {
        console.log("error : ", e);
        res.status(500).json({ message: "Failed to save cycle" });
    }
});

cycleRouter.put("/:id", async (req: express.Request, res: express.Response) => {
    try {
        const cycleId = req.params.id;
        const updateData = req.body;
        const updatedCycle = await updateCycle(cycleId, updateData);
        res.status(200).json(updatedCycle);
    } catch (e) {
        console.log("error : ", e);
        res.status(500).json({ message: "Failed to update cycle" });
    }
});

cycleRouter.delete("/:id", async (req: express.Request, res: express.Response) => {
    try {
        const cycleId = req.params.id;
        await deleteCycle(cycleId);
        res.status(200).json({ message: "Cycle deleted successfully" });
    } catch (e) {
        console.log("error : ", e);
        res.status(500).json({ message: "Failed to delete cycle" });
    }
});


cycleRouter.get("/user/:id", async (req: express.Request, res: express.Response) => {
    try {
        const cycleId = req.params.id;
        const cycle = await getCycle(cycleId);
        res.status(200).json(cycle);
    } catch (e) {
        console.log("error : ", e);
        res.status(500).json({ message: "Failed to get cycle" });
    }
});

export default cycleRouter;