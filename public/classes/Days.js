export class Days {
    constructor(dayNumber, passive, isToday) {
        this.dayNumber = dayNumber;
        this.passive = passive;
        this.isToday = isToday;
    }
    renderDay() {
        let dayClass = "calendar-days";
        this.passive ? dayClass += " passive" : "";
        this.isToday && !this.passive ? dayClass += " current" : "";
        return `<div class="${dayClass}">${this.dayNumber}</div>`;
    }
}
