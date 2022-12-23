import { CalendarFormatter, DayArray } from "../interfaces/CalendarFormatter";
import { createNoteList } from "../util/CreateNote.js";

export class CalendarTemplate {
    private days: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    private selectedDay: string = "YYYYMMDD";

    constructor(
        private headerContainer: HTMLDivElement,
        private daysContainer: HTMLDivElement
    ) { }

    getSelectedDay() {
        return this.selectedDay;
    }

    renderDays(dateObj: CalendarFormatter) {
        let daysTemplate: string = "";
        this.days.forEach(day => {
            daysTemplate += `<div class="calendar-day-names">${day}</div>`;
        });
        dateObj.dayArray.forEach((day: DayArray) => {
            let clsName = "calendar-days";
            if (!day.CURRENT_MONTH) clsName += " passive";
            if (day.CURRENT_DAY) clsName += " current selected";
            daysTemplate += `<div class="${clsName}" data-month="${day.MONTH}" data-year="${day.YEAR}">${day.DAY}</div>`;
        });
        this.selectedDay = `${dateObj.year}${dateObj.month + 1}${dateObj.currentDay}`;
        this.renderNotes(this.selectedDay);
        return daysTemplate;
    }

    render(item: CalendarFormatter) {
        this.headerContainer.innerHTML = item.fullDate;
        this.daysContainer.innerHTML = this.renderDays(item);
        this.onSelectCalendarDay(item);
    }

    onSelectCalendarDay(item: CalendarFormatter) {
        const dayElements = document.querySelectorAll(".calendar-days");
        dayElements.forEach(elem => {
            elem.addEventListener("click", (e: Event) => {
                const elemTarget = e.target as HTMLElement;
                dayElements.forEach(x => x.classList.remove("selected"));
                elemTarget.classList.add("selected");
                const selectedDay = item.dayArray.find(x =>
                    x.DAY == +elemTarget.innerText
                    && x.MONTH == +elemTarget.getAttribute("data-month")!
                    && x.YEAR == +elemTarget.getAttribute("data-year")!
                )!;
                const sMonth: string = `${selectedDay.MONTH}`.length === 1 ? `0${selectedDay.MONTH + 1}` : `${selectedDay.MONTH + 1}`;
                const sDay: string = `${selectedDay.DAY}`.length === 1 ? `0${selectedDay.DAY}` : `${selectedDay.DAY}`;
                this.selectedDay = `${selectedDay.YEAR}${sMonth}${sDay}`;
                this.renderNotes(this.selectedDay);
            });
        });
    }

    renderNotes(fullDate: string) {
        const notes = localStorage.getItem("notes");
        if (notes) {
            const oNotes: { fullDate: { id: number, note: string }[] } = JSON.parse(notes);
            const existingNote: number = Object.keys(oNotes).findIndex(x => x == fullDate)!;
            if (existingNote !== -1) {
                type ObjectKey = keyof typeof oNotes;
                const selectedDate = fullDate as ObjectKey;
                const notesOfSelectedDate = oNotes[selectedDate];
                createNoteList(notesOfSelectedDate);
            }
            else createNoteList([]);
        }
    }
}