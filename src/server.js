"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importStar(require("./routes/user-routes"));
const incident_routes_1 = __importDefault(require("./routes/incident-routes"));
const contact_routes_1 = __importDefault(require("./routes/contact-routes"));
const location_routes_1 = __importDefault(require("./routes/location-routes"));
const emergency_routes_1 = __importDefault(require("./routes/emergency-routes"));
const cycle_routes_1 = __importDefault(require("./routes/cycle-routes"));
const app = (0, express_1.default)();
const port = 5002;
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("connected to DB");
})
    .catch((err) => {
    console.log(err);
});
app.use("/api/user", user_routes_1.default);
app.use(user_routes_1.authenticateToken);
app.use("/api/incident", incident_routes_1.default);
app.use("/api/contact", contact_routes_1.default);
app.use("/api/location", location_routes_1.default);
app.use("/api/emergency", emergency_routes_1.default);
app.use("/api/cycle", cycle_routes_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
// Simulated delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
