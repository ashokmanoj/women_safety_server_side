import mongoose,{Schema,Document} from "mongoose";

export interface IContact extends Document{
    user: mongoose.Schema.Types.ObjectId
    name: string;
    phone: string;
    email: string;
    relationship: string;
    isEmergencyContact: boolean;
    isFavorite: boolean
}
let contactSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    relationship: {type: String, required: true},
    isEmergencyContact: {type: Boolean, required: true},
    isFavorite: {type: Boolean, required: true}
});

export default mongoose.model<IContact>('Contact', contactSchema);