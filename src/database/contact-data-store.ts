import {Contact} from "../models/Contact";
import IContact from "../models/IContact";
import {addUserContact} from "./user-data-store";



export const saveContact = async (contactData: Contact) => {
    try {
        console.log('save')
        const contact = await IContact.create(contactData);
        await addUserContact(contactData.user, contact._id);
        return contact;
    } catch (error) {
        console.log(`Error saving contact: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to save contact.");
    }
}
export const getAllContacts = async () => {

    try {
        console.log('getall')
        const contacts = await IContact.find();
        return contacts
    } catch (error) {
        console.log(`Error getting contacts: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to get contacts.");
    }
};
export const getContacts = async (userId: string) => {
    try {
        console.log('getacontact')
        const contacts = await IContact.find({user: userId});
        return contacts
    } catch (error) {
        console.log(`Error getting contacts: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to get contacts.");
    }
}
export const updateContact = async (contactId: string, contactData: Partial<Contact>) => {
    try {
        console.log('update')
        const updatedContact = await IContact.findByIdAndUpdate(
            contactId,
            contactData,
            { new: true }
        );

        if (!updatedContact) {
            throw new Error("Contact not found.");
        }

        return updatedContact;
    } catch (error) {
        console.log(`Error updating contact: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to update contact.");
    }
};

export const deleteContact = async (contactId: string) => {
    try {
        console.log('delete')
        const deletedContact = await IContact.findByIdAndDelete(contactId);

        if (!deletedContact) {
            throw new Error("Contact not found.");
        }

        return deletedContact;
    } catch (error) {
        console.log(`Error deleting contact: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to delete contact.");
    }
};
export const getContactNumbers = async (userId: string) => {
    try {
        console.log('getcontactnumber')
        const contacts = await IContact.find({user: userId}, "name phone");

        if (!contacts || contacts.length === 0) {
            return []
        }

        return contacts.map(contact => ({
            name: contact.name,
            phone: contact.phone
        }));

    } catch (error) {
        console.error(`Error getting contacts: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to get contacts.");
    }
};

