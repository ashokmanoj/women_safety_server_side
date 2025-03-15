import mongoose, { Schema, Document } from "mongoose";

export interface ICycle extends Document {
    user: mongoose.Schema.Types.ObjectId;
    startDate: string;
    endDate: string;
    cycleLength: number;
    periodLength: number;
    symptoms: {
        date: string;
        flow: 'light' | 'medium' | 'heavy';
        symptoms: string[];
        notes: string;
    }[];
}

const cycleSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    cycleLength: {
        type: Number,
        required: true
    },
    periodLength: {
        type: Number,
        required: true
    },
    symptoms: [{
        date: {
            type: String,
            required: true
        },
        flow: {
            type: String,
            enum: ['light', 'medium', 'heavy'],
            required: true
        },
        symptoms: [{
            type: String
        }],
        notes: {
            type: String
        }
    }]
});

export default mongoose.model<ICycle>('Cycle', cycleSchema);