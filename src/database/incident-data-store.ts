import IIncident from "../models/IIncident";
import {Incident} from "../models/Incident";
import {addUserIncident} from "./user-data-store";


export const saveIncident = async (incidentData: Incident) => {
    try {

        const incidentToSave = {
            ...incidentData,
            timestamp: incidentData.timestamp ? new Date(incidentData.timestamp) : new Date(),
        };
        const incident = await IIncident.create(incidentToSave)
        await addUserIncident(incidentData.user, incident._id);
        return incident
    } catch (error) {
        console.log(`Error saving incident: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to save incident.");
    }
};
export const getIncidents = async (userId: string) => {
    try {
        const incidents = await IIncident.find({user: userId});
        console.log(`Incidents for user ID ${userId}: ${JSON.stringify(incidents)}`);
        return incidents
    } catch (error) {
        console.log(`Error getting incidents: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to get incidents.");
    }
};
export const updateIncident = async (incidentId: string, incidentData: Partial<Incident>) => {
    try {
        const updatedIncident = await IIncident.findByIdAndUpdate(
            incidentId,
            incidentData,
            { new: true }
        );

        if (!updatedIncident) {
            throw new Error("Incident not found.");
        }

        return updatedIncident;
    } catch (error) {
        console.log(`Error updating incident: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to update incident.");
    }
};
export const getAllIncidents = async () => {
    try {
        const incidents = await IIncident.find({});
        return incidents
    } catch (error) {
        console.log(`Error getting incidents: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to get incidents.");
    }
};
export const deleteIncident = async (incidentId: string) => {
    try {
        const deletedIncident = await IIncident.findByIdAndDelete(incidentId);

        if (!deletedIncident) {
            throw new Error("Incident not found.");
        }return deletedIncident;
    } catch (error) {
        console.log(`Error deleting incident: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to delete incident.");
    }
};
