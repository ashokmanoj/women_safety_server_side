"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(email, name, password, incidents, contacts, location) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.incidents = incidents;
        this.contacts = contacts;
        this.location = location;
    }
}
exports.User = User;
