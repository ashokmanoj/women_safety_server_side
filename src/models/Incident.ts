export class Incident{
    user: string;
    type: string;
    description: string;
    location: string;
    timestamp: string;

    constructor(user: string, type: string, description: string, location: string, timestamp: string){
        this.user = user;
        this.type = type;
        this.description = description;
        this.location = location;
        this.timestamp = timestamp;
    }
}