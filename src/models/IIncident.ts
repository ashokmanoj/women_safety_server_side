import mongoose, { Schema, Document } from "mongoose";

export interface IIncident extends Document {
    user: mongoose.Schema.Types.ObjectId;
    type: string;
    description: string;
    location: string
    timestamp: string;
}

let incidentSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    type: {type: String, required: true},
    description: {type: String, required: true},
    location: { type: String, required: true },
    timestamp: {type: String, required: true}
});

export default mongoose.model<IIncident>('Incident', incidentSchema);
