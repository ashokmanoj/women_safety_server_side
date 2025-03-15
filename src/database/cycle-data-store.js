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
exports.getCycle = exports.deleteCycle = exports.updateCycle = exports.saveCycle = void 0;
const user_data_store_1 = require("./user-data-store");
const ICycle_1 = __importDefault(require("../models/ICycle"));
const saveCycle = (cycleData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cycleToSave = Object.assign(Object.assign({}, cycleData), { startDate: new Date(cycleData.startDate), endDate: cycleData.endDate ? new Date(cycleData.endDate) : new Date() });
        const cycle = yield ICycle_1.default.create(cycleToSave);
        yield (0, user_data_store_1.addUserCycle)(cycleData.user, cycle._id);
        return cycle;
    }
    catch (error) {
        console.log(`Error saving cycle: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to save cycle.");
    }
});
exports.saveCycle = saveCycle;
const updateCycle = (cycleId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield ICycle_1.default.findByIdAndUpdate(cycleId, updateData, { new: true });
    }
    catch (error) {
        console.log(`Error updating cycle: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to update cycle.");
    }
});
exports.updateCycle = updateCycle;
const deleteCycle = (cycleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ICycle_1.default.findByIdAndDelete(cycleId);
        return true;
    }
    catch (error) {
        console.log(`Error deleting cycle: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to delete cycle.");
    }
});
exports.deleteCycle = deleteCycle;
const getCycle = (cycleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield ICycle_1.default.findById(cycleId);
    }
    catch (error) {
        console.log(`Error getting cycle: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to get cycle.");
    }
});
exports.getCycle = getCycle;
