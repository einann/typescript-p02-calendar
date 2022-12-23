export class Calendar {
    constructor(month, year) {
        this.month = month;
        this.year = year;
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth();
        this.currentDay = new Date().getDate();
    }
    getDateObj() {
        // Days in that month
        const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
        // First day of that month
        const specDate = new Date(this.year, this.month);
        const firstDayIndex = (new Date(specDate.getFullYear(), specDate.getMonth(), 1).getDay() + 6) % 7;
        // Selected month and year
        const month = new Date(this.year, this.month).getMonth();
        const monthName = new Date(this.year, this.month).toLocaleDateString('default', { month: 'long' });
        const year = new Date(this.year, this.month).getFullYear();
        // Day number of previous month
        const daysInPrevMonth = new Date(this.year, this.month, 0).getDate();
        const currentDay = month == this.currentMonth && year == this.currentYear ? this.currentDay : 0;
        let firstDayInCalendar = ((daysInPrevMonth - firstDayIndex) + 1) % (daysInPrevMonth + 1);
        if (firstDayInCalendar == 0)
            firstDayInCalendar = 1;
        let CURRENT_MONTH = firstDayInCalendar == 1 ? true : false;
        const dayArray = [];
        let dm = month, dy = year;
        if (!CURRENT_MONTH)
            dm--;
        for (let i = 0; i < 42; i++) {
            dayArray.push({
                YEAR: dm == -1 ? dy - 1 : (dm == 12 ? dy + 1 : dy),
                MONTH: (dm + 12) % 12,
                DAY: firstDayInCalendar,
                CURRENT_MONTH,
                CURRENT_DAY: firstDayInCalendar == this.currentDay && dm == this.currentMonth && dy == this.currentYear ? true : false,
            });
            firstDayInCalendar++;
            if (firstDayInCalendar > daysInPrevMonth && !CURRENT_MONTH) {
                firstDayInCalendar = 1, CURRENT_MONTH = true, dm++;
            }
            if (firstDayInCalendar > daysInMonth && CURRENT_MONTH) {
                firstDayInCalendar = 1, CURRENT_MONTH = false, dm++;
            }
        }
        return {
            daysInMonth,
            firstDayIndex,
            daysInPrevMonth,
            fullDate: `${monthName} - ${year}`,
            currentDay,
            month,
            year,
            dayArray,
        };
    }
}
