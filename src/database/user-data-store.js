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
exports.addUserCycle = exports.addUserLocation = exports.addUserContact = exports.addUserIncident = exports.loginUser = exports.registerUser = void 0;
const IUser_1 = __importDefault(require("../models/IUser"));
const User_1 = require("../models/User");
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedUser = yield IUser_1.default.findOne({ email: user.email });
        if (!fetchedUser) {
            const newUser = new User_1.User(user.email, user.name, user.password, user.incidents, user.contacts, user.location);
            yield IUser_1.default.create(newUser);
            return newUser;
        }
        else {
            throw new Error('User already exists');
        }
    }
    catch (error) {
        throw error instanceof Error ? error : new Error('Failed to register user');
    }
});
exports.registerUser = registerUser;
const loginUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedUser = yield IUser_1.default.findOne({ email: user.email });
        if (fetchedUser && fetchedUser.password === user.password) {
            return fetchedUser;
        }
        else {
            throw new Error('Invalid credentials');
        }
    }
    catch (error) {
        throw error instanceof Error ? error : new Error('Failed to login user');
    }
});
exports.loginUser = loginUser;
const addUserIncident = (id, incidentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield IUser_1.default.findByIdAndUpdate(id, {
            $push: { incidents: incidentId }
        }, { new: true });
        if (!user) {
            throw new Error('User not found');
        }
    }
    catch (error) {
        throw error instanceof Error ? error : new Error('Failed to add user incident');
    }
});
exports.addUserIncident = addUserIncident;
const addUserContact = (id, contactId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield IUser_1.default.findByIdAndUpdate(id, {
            $push: { contacts: contactId }
        }, { new: true });
        if (!user) {
            throw new Error('User not found');
        }
    }
    catch (error) {
        throw error instanceof Error ? error : new Error('Failed to add user contact');
    }
});
exports.addUserContact = addUserContact;
const addUserLocation = (id, locationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield IUser_1.default.findByIdAndUpdate(id, {
            $push: { location: locationId }
        }, { new: true });
        if (!user) {
            throw new Error('User not found');
        }
    }
    catch (error) {
        throw error instanceof Error ? error : new Error('Failed to add user location');
    }
});
exports.addUserLocation = addUserLocation;
const addUserCycle = (id, cycleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield IUser_1.default.findByIdAndUpdate(id, {
            $push: { cycles: cycleId }
        }, { new: true });
        if (!user) {
            throw new Error('User not found');
        }
    }
    catch (error) {
        throw error instanceof Error ? error : new Error('Failed to add user cycle');
    }
});
exports.addUserCycle = addUserCycle;
