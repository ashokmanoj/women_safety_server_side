import ILocation from "../models/ILocation";
import {addUserLocation} from "./user-data-store";
import {Location} from "../models/Location";

export const saveLocation = async (locationData: Location) => {
    try {
        const location = await ILocation.create(locationData);
        await addUserLocation(locationData.user, location._id);
        return location;
    } catch (error) {
        console.log(`Error saving location: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to save location.");
    }
}

