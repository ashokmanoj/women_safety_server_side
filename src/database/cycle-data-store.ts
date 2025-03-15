
import { addUserCycle } from "./user-data-store";
import {Cycle} from "../models/Cycle";
import ICycle from "../models/ICycle";

export const saveCycle = async (cycleData: Cycle) => {
    try {
        const cycleToSave = {
            ...cycleData,
            startDate: new Date(cycleData.startDate),
            endDate: cycleData.endDate ? new Date(cycleData.endDate) : new Date(),
        };

        const cycle = await ICycle.create(cycleToSave);
        await addUserCycle(cycleData.user, cycle._id);
        return cycle;
    } catch (error) {
        console.log(`Error saving cycle: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to save cycle.");
    }
};

export const updateCycle = async (cycleId: string, updateData: Partial<Cycle>) => {
    try {
        return await ICycle.findByIdAndUpdate(cycleId, updateData, { new: true });
    } catch (error) {
        console.log(`Error updating cycle: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to update cycle.");
    }
};

export const deleteCycle = async (cycleId: string) => {
    try {
        await ICycle.findByIdAndDelete(cycleId);
        return true;
    } catch (error) {
        console.log(`Error deleting cycle: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to delete cycle.");
    }
};

export const getCycle = async (cycleId: string) => {
    try {
        return await ICycle.findById(cycleId);
    } catch (error) {
        console.log(`Error getting cycle: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to get cycle.");
    }
};