export interface CalendarFormatter {
    daysInMonth: number,
    firstDayIndex: number,
    daysInPrevMonth: number,
    fullDate: string,
    currentDay: number
    month: number,
    year: number,
    dayArray: Array<DayArray>,
}

export interface StorageObject {
    year: number,
    month: number,
    day: number,
    note: string,
    id: number,
}

export interface DayArray {
    DAY: number,
    MONTH: number,
    YEAR: number,
    CURRENT_MONTH: boolean,
    CURRENT_DAY: boolean,
}