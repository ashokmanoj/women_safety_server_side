export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Location {
    latitude: number;
    longitude: number;
}

export interface EmergencyAlert {
    userId: string;
    location: Location | null;
    timestamp: string;
}

export interface Incident {
    id: string;
    type: string;
    description: string;
    location: Location;
    timestamp: string;
}