import { createNoteList } from "../util/CreateNote.js";
export class CalendarTemplate {
    constructor(headerContainer, daysContainer) {
        this.headerContainer = headerContainer;
        this.daysContainer = daysContainer;
        this.days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
        this.selectedDay = "YYYYMMDD";
    }
    getSelectedDay() {
        return this.selectedDay;
    }
    renderDays(dateObj) {
        let daysTemplate = "";
        this.days.forEach(day => {
            daysTemplate += `<div class="calendar-day-names">${day}</div>`;
        });
        dateObj.dayArray.forEach((day) => {
            let clsName = "calendar-days";
            if (!day.CURRENT_MONTH)
                clsName += " passive";
            if (day.CURRENT_DAY)
                clsName += " current selected";
            daysTemplate += `<div class="${clsName}" data-month="${day.MONTH}" data-year="${day.YEAR}">${day.DAY}</div>`;
        });
        this.selectedDay = `${dateObj.year}${dateObj.month + 1}${dateObj.currentDay}`;
        this.renderNotes(this.selectedDay);
        return daysTemplate;
    }
    render(item) {
        this.headerContainer.innerHTML = item.fullDate;
        this.daysContainer.innerHTML = this.renderDays(item);
        this.onSelectCalendarDay(item);
    }
    onSelectCalendarDay(item) {
        const dayElements = document.querySelectorAll(".calendar-days");
        dayElements.forEach(elem => {
            elem.addEventListener("click", (e) => {
                const elemTarget = e.target;
                dayElements.forEach(x => x.classList.remove("selected"));
                elemTarget.classList.add("selected");
                const selectedDay = item.dayArray.find(x => x.DAY == +elemTarget.innerText
                    && x.MONTH == +elemTarget.getAttribute("data-month")
                    && x.YEAR == +elemTarget.getAttribute("data-year"));
                const sMonth = `${selectedDay.MONTH}`.length === 1 ? `0${selectedDay.MONTH + 1}` : `${selectedDay.MONTH + 1}`;
                const sDay = `${selectedDay.DAY}`.length === 1 ? `0${selectedDay.DAY}` : `${selectedDay.DAY}`;
                this.selectedDay = `${selectedDay.YEAR}${sMonth}${sDay}`;
                this.renderNotes(this.selectedDay);
            });
        });
    }
    renderNotes(fullDate) {
        const notes = localStorage.getItem("notes");
        if (notes) {
            const oNotes = JSON.parse(notes);
            const existingNote = Object.keys(oNotes).findIndex(x => x == fullDate);
            if (existingNote !== -1) {
                const selectedDate = fullDate;
                const notesOfSelectedDate = oNotes[selectedDate];
                createNoteList(notesOfSelectedDate);
            }
            else
                createNoteList([]);
        }
    }
}
