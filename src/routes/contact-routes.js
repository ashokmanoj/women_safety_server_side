"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const contact_data_store_1 = require("../database/contact-data-store");
const contactRouter = express_1.default.Router();
const validateContactId = (req, res, next) => {
    const contactId = req.params.contactId;
    if (!contactId || !mongoose_1.default.Types.ObjectId.isValid(contactId)) {
        res.status(400).json({ message: "Invalid contact ID" });
        return;
    }
    next();
};
contactRouter.post("/save", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`req.body: ${JSON.stringify(req.body)}`);
        const contact = req.body;
        const response = yield (0, contact_data_store_1.saveContact)(contact);
        res.status(200).json({ message: "Contact saved successfully", data: response });
    }
    catch (e) {
        next(e); // Pass the error to the centralized error handler
    }
}));
contactRouter.get("/all", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield (0, contact_data_store_1.getAllContacts)();
        res.status(200).json(contacts);
    }
    catch (e) {
        /*console.log(`No contacts to show...`)*/
        next(e);
    }
}));
contactRouter.get("/user/:userId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const contacts = yield (0, contact_data_store_1.getContacts)(userId);
        res.status(200).json(contacts);
    }
    catch (e) {
        next(e);
    }
}));
contactRouter.put("/update/:contactId", validateContactId, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactId = req.params.contactId;
        const updatedData = req.body;
        const updatedContact = yield (0, contact_data_store_1.updateContact)(contactId, updatedData);
        res.status(200).json({ message: "Contact updated successfully", data: updatedContact });
    }
    catch (e) {
        next(e);
    }
}));
contactRouter.delete("/delete/:contactId", validateContactId, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactId = req.params.contactId;
        const deletedContact = yield (0, contact_data_store_1.deleteContact)(contactId);
        res.status(200).json({ message: "Contact deleted successfully", data: deletedContact });
    }
    catch (e) {
        next(e);
    }
}));
contactRouter.get("/getContactNumbers/:userId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const phoneNumbers = yield (0, contact_data_store_1.getContactNumbers)(userId);
        res.status(200).json(phoneNumbers);
    }
    catch (e) {
        next(e);
    }
}));
// Centralized error handler
contactRouter.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
});
exports.default = contactRouter;
