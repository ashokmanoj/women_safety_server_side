"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cycle = void 0;
class Cycle {
    constructor(startDate, endDate, cycleLength, periodLength, symptoms, user) {
        {
            this.startDate = startDate;
            this.endDate = endDate;
            this.cycleLength = cycleLength;
            this.periodLength = periodLength;
            this.symptoms = symptoms;
            this.user = user;
        }
    }
}
exports.Cycle = Cycle;
