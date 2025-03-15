import mongoose,{Schema,Document} from "mongoose";

export interface ILocation extends Document {
    user: mongoose.Schema.Types.ObjectId;
    latitude: number;
    longitude: number
}
let locationSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true}
});
export default mongoose.model<ILocation>('Location', locationSchema);