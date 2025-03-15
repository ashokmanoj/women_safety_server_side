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
const express_1 = __importDefault(require("express"));
const cycle_data_store_1 = require("../database/cycle-data-store");
const cycleRouter = express_1.default.Router();
cycleRouter.post("/save", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cycleData = req.body;
        const response = yield (0, cycle_data_store_1.saveCycle)(cycleData);
        res.status(200).json({
            message: "Cycle saved successfully",
            cycle: response
        });
    }
    catch (e) {
        console.log("error : ", e);
        res.status(500).json({ message: "Failed to save cycle" });
    }
}));
cycleRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cycleId = req.params.id;
        const updateData = req.body;
        const updatedCycle = yield (0, cycle_data_store_1.updateCycle)(cycleId, updateData);
        res.status(200).json(updatedCycle);
    }
    catch (e) {
        console.log("error : ", e);
        res.status(500).json({ message: "Failed to update cycle" });
    }
}));
cycleRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cycleId = req.params.id;
        yield (0, cycle_data_store_1.deleteCycle)(cycleId);
        res.status(200).json({ message: "Cycle deleted successfully" });
    }
    catch (e) {
        console.log("error : ", e);
        res.status(500).json({ message: "Failed to delete cycle" });
    }
}));
cycleRouter.get("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cycleId = req.params.id;
        const cycle = yield (0, cycle_data_store_1.getCycle)(cycleId);
        res.status(200).json(cycle);
    }
    catch (e) {
        console.log("error : ", e);
        res.status(500).json({ message: "Failed to get cycle" });
    }
}));
exports.default = cycleRouter;
