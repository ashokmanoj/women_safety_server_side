import IUser from "../models/IUser";
import {User} from "../models/User";



export const registerUser = async (user: User) => {
    try {
        const fetchedUser = await IUser.findOne({email: user.email});

        if (!fetchedUser) {
            const newUser = new User(user.email, user.name, user.password, user.incidents,user.contacts,user.location);
            await IUser.create(newUser);
            return newUser;

        } else {
            throw new Error('User already exists');
        }
    } catch (error) {
        throw error instanceof Error ? error : new Error('Failed to register user');
    }
}

export const loginUser = async (user: User) => {
    try {
        const fetchedUser = await IUser.findOne({email: user.email});
        if (fetchedUser && fetchedUser.password === user.password) {
            return fetchedUser;
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        throw error instanceof Error ? error : new Error('Failed to login user');
    }
}

export const addUserIncident = async (id: string, incidentId: string | any) => {
    try {
        const user = await IUser.findByIdAndUpdate(id,
            {
                $push: {incidents: incidentId}
            },
            {new: true}
        );
        if(!user){
            throw new Error('User not found');
        }
    } catch (error) {
        throw error instanceof Error ? error : new Error('Failed to add user incident');
    }
}
export const addUserContact = async (id: string, contactId: string | any) => {
    try {
        const user = await IUser.findByIdAndUpdate(id,
            {
                $push: {contacts: contactId}
            },
            {new: true}
        );
        if(!user){
            throw new Error('User not found');
        }
    } catch (error) {
        throw error instanceof Error ? error : new Error('Failed to add user contact');
    }
}
export const addUserLocation = async (id: string, locationId: string | any) => {
    try {
        const user = await IUser.findByIdAndUpdate(id,
            {
                $push: {location: locationId}
            },
            {new: true}
        );
        if(!user){
            throw new Error('User not found');
        }
    } catch (error) {
        throw error instanceof Error ? error : new Error('Failed to add user location');
    }
}
export const addUserCycle = async (id: string, cycleId: string | any) => {
    try {
        const user = await IUser.findByIdAndUpdate(id,
            {
                $push: {cycles: cycleId}
            },
            {new: true}
        );
        if(!user){
            throw new Error('User not found');
        }
    } catch (error) {
        throw error instanceof Error ? error : new Error('Failed to add user cycle');
    }
}

