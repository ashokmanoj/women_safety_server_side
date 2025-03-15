import express, { Request, Response } from 'express';
import dotenv from "dotenv"
import cors from 'cors';
import mongoose from "mongoose";
import userRouter, {authenticateToken} from "./routes/user-routes";
import incidentRouter from "./routes/incident-routes";
import contactRouter from "./routes/contact-routes";
import locationRouter from "./routes/location-routes";
import emergencyRouter from "./routes/emergency-routes";
import cycleRouter from "./routes/cycle-routes";


const app = express();
const port = 5002;

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI as string)
    .then(()=>{
        console.log("connected to DB")
    })
    .catch((err)=>{
        console.log(err)
    })


app.use("/api/user",userRouter);

app.use(authenticateToken);

app.use("/api/incident",incidentRouter);
app.use("/api/contact",contactRouter);
app.use("/api/location",locationRouter);
app.use("/api/emergency",emergencyRouter);
app.use("/api/cycle",cycleRouter);




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Simulated delay function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));