"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Incident = void 0;
class Incident {
    constructor(user, type, description, location, timestamp) {
        this.user = user;
        this.type = type;
        this.description = description;
        this.location = location;
        this.timestamp = timestamp;
    }
}
exports.Incident = Incident;
