import mongoose , { Schema, Document } from "mongoose";

export interface IUser extends Document {
    email : string,
    name : string,
    password : string,
    incidents : string[],
    contacts : string[]
}

let UserSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    incidents : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Incident"
    }],
    contacts : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Contact"
    }]
});

export default mongoose.model<IUser>("User", UserSchema);