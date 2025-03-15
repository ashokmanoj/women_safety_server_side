import express from "express";
import { loginUser, registerUser} from "../database/user-data-store";
import {generateToken, verifyToken} from "../util/jwt";



let userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    try{
        let user = req.body;
        let response = await registerUser(user);
        res.status(200).json({ message: "User registered successfully" });
    }catch (e) {
        console.log("error : ", e);
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        let user = req.body;
        let response = await loginUser(user);

        if(response){
            const {accessToken, refreshToken} = await generateToken(response.email);
            const filteredResponse = {
                id: response._id,
                email: response.email,
                name: response.name,
                accessToken: accessToken,
                refreshToken: refreshToken
            };
            res.status(200).send(filteredResponse);
        }
    } catch (e) {
        console.log("error : ", e);
    }
});

export async function authenticateToken(req : express.Request, res : express.Response, next : express.NextFunction){
    if (req.method === 'GET' || req.method === 'OPTIONS') {
        console.log(`Method: ${req.method} || URL: ${req.url}`);
        next();
        return;
    }

    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if(!token)res.status(401).send('No token provided');

    try{
        const payload = await verifyToken(token as string)
        next();
        /*if(payload){
            next();
        }else{
            res.status(403).send('Invalid or expired token');
        }*/
    }catch(err){
        res.status(401).send(err);
    }
}

export default userRouter;