import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import {
    saveContact,
    updateContact,
    deleteContact,
    getContacts,
    getAllContacts, getContactNumbers,

} from "../database/contact-data-store";


const contactRouter = express.Router();


const validateContactId = (req: Request, res: Response, next: NextFunction): void => {
    const contactId = req.params.contactId;

    if (!contactId || !mongoose.Types.ObjectId.isValid(contactId)) {
        res.status(400).json({ message: "Invalid contact ID" });
        return;
    }

    next();
};


contactRouter.post("/save", async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(`req.body: ${JSON.stringify(req.body)}`);
        const contact = req.body;
        const response = await saveContact(contact);
        res.status(200).json({ message: "Contact saved successfully", data: response });
    } catch (e) {
        next(e); // Pass the error to the centralized error handler
    }
});


contactRouter.get("/all", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contacts = await getAllContacts();
        res.status(200).json(contacts);
    } catch (e){
        /*console.log(`No contacts to show...`)*/
        next(e);
    }
});

contactRouter.get("/user/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const contacts = await getContacts(userId);
        res.status(200).json(contacts);
    } catch (e) {
        next(e);
    }
});

contactRouter.put("/update/:contactId", validateContactId, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contactId = req.params.contactId;
        const updatedData = req.body;
        const updatedContact = await updateContact(contactId, updatedData);
        res.status(200).json({ message: "Contact updated successfully", data: updatedContact });
    } catch (e) {
        next(e);
    }
});
contactRouter.delete("/delete/:contactId", validateContactId, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contactId = req.params.contactId;
        const deletedContact = await deleteContact(contactId);
        res.status(200).json({ message: "Contact deleted successfully", data: deletedContact });
    } catch (e) {
        next(e);
    }
});
contactRouter.get("/getContactNumbers/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const phoneNumbers = await getContactNumbers(userId);
        res.status(200).json(phoneNumbers);
    } catch (e) {
        next(e);
    }
});

// Centralized error handler
contactRouter.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
});


export default contactRouter;