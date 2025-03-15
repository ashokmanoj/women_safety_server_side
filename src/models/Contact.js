"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
class Contact {
    constructor(name, phone, email, relationship, isEmergencyContact, isFavorite, user) {
        {
            this.name = name;
            this.phone = phone;
            this.email = email;
            this.relationship = relationship;
            this.isEmergencyContact = isEmergencyContact;
            this.isFavorite = isFavorite;
            this.user = user;
        }
    }
}
exports.Contact = Contact;
