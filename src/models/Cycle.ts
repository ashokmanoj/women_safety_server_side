export class Cycle {
    startDate: string;
    endDate: string;
    cycleLength: number;
    periodLength: number;
    symptoms: {
        date: string;
        flow: 'light' | 'medium' | 'heavy';
        symptoms: string[];
        notes: string;
    }[];
    user: string;

    constructor(
        startDate: string,
        endDate: string,
        cycleLength: number,
        periodLength: number,
        symptoms: {
            date: string;
            flow: 'light' | 'medium' | 'heavy';
            symptoms: string[];
            notes: string;
        }[],
        user: string
    ) {
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