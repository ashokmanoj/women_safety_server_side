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
exports.saveLocation = void 0;
const ILocation_1 = __importDefault(require("../models/ILocation"));
const user_data_store_1 = require("./user-data-store");
const saveLocation = (locationData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const location = yield ILocation_1.default.create(locationData);
        yield (0, user_data_store_1.addUserLocation)(locationData.user, location._id);
        return location;
    }
    catch (error) {
        console.log(`Error saving location: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to save location.");
    }
});
exports.saveLocation = saveLocation;
