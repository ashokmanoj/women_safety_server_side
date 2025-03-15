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
exports.getContactNumbers = exports.deleteContact = exports.updateContact = exports.getContacts = exports.getAllContacts = exports.saveContact = void 0;
const IContact_1 = __importDefault(require("../models/IContact"));
const user_data_store_1 = require("./user-data-store");
const saveContact = (contactData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('save');
        const contact = yield IContact_1.default.create(contactData);
        yield (0, user_data_store_1.addUserContact)(contactData.user, contact._id);
        return contact;
    }
    catch (error) {
        console.log(`Error saving contact: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to save contact.");
    }
});
exports.saveContact = saveContact;
const getAllContacts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('getall');
        const contacts = yield IContact_1.default.find();
        return contacts;
    }
    catch (error) {
        console.log(`Error getting contacts: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to get contacts.");
    }
});
exports.getAllContacts = getAllContacts;
const getContacts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('getacontact');
        const contacts = yield IContact_1.default.find({ user: userId });
        return contacts;
    }
    catch (error) {
        console.log(`Error getting contacts: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to get contacts.");
    }
});
exports.getContacts = getContacts;
const updateContact = (contactId, contactData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('update');
        const updatedContact = yield IContact_1.default.findByIdAndUpdate(contactId, contactData, { new: true });
        if (!updatedContact) {
            throw new Error("Contact not found.");
        }
        return updatedContact;
    }
    catch (error) {
        console.log(`Error updating contact: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to update contact.");
    }
});
exports.updateContact = updateContact;
const deleteContact = (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('delete');
        const deletedContact = yield IContact_1.default.findByIdAndDelete(contactId);
        if (!deletedContact) {
            throw new Error("Contact not found.");
        }
        return deletedContact;
    }
    catch (error) {
        console.log(`Error deleting contact: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to delete contact.");
    }
});
exports.deleteContact = deleteContact;
const getContactNumbers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('getcontactnumber');
        const contacts = yield IContact_1.default.find({ user: userId }, "name phone");
        if (!contacts || contacts.length === 0) {
            return [];
        }
        return contacts.map(contact => ({
            name: contact.name,
            phone: contact.phone
        }));
    }
    catch (error) {
        console.error(`Error getting contacts: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to get contacts.");
    }
});
exports.getContactNumbers = getContactNumbers;
