export class Contact {
    name: string;
    phone: string;
    email: string;
    relationship: string;
    isEmergencyContact: boolean;
    isFavorite: boolean;
    user: string;

    constructor(name: string, phone: string, email: string, relationship: string, isEmergencyContact: boolean, isFavorite: boolean, user: string) {
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
