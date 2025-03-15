import mongoose, { Document, Schema } from 'mongoose';
import {IContact} from "./IContact";

export interface IEmergency extends Document {
    userId: string;
    contacts: IContact[];
    lastLocation: {
        latitude: number;
        longitude: number;
    };
    panicMode: {
        active: boolean;
        recording: boolean;
    };
}

const ContactSchema: Schema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    relationship: { type: String, required: true },
    isEmergencyContact: { type: Boolean, default: false },
    isFavorite: { type: Boolean, default: false },
    user: { type: String, required: true },
});

const EmergencySchema: Schema = new Schema({
    userId: { type: String, required: true },
    contacts: [ContactSchema],
    lastLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    panicMode: {
        active: { type: Boolean, default: false },
        recording: { type: Boolean, default: false },
    },
});

export const EmergencyModel = mongoose.model<IEmergency>('Emergency', EmergencySchema);