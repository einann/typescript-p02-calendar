import { Calendar } from "./classes/Calendar.js";
import { CalendarTemplate } from "./classes/CalendarTemplate.js";
import { Notes } from "./classes/Notes.js";
import { calcMonthYear } from "./util/CalculateMonthAndYear.js";

let year: number, month: number, day: number;
year = new Date().getFullYear();
month = new Date().getMonth();
day = new Date().getDate();
let date = { month, year };

const headerContainer = document.querySelector(".header-month-and-year") as HTMLDivElement;
const daysContainer = document.querySelector(".calendar-days-container") as HTMLDivElement;
const arrowPrev = document.querySelector("#prev") as HTMLDivElement;
const arrowNext = document.querySelector("#next") as HTMLDivElement;
const form = document.querySelector("#cn-form") as HTMLFormElement;
const cal = new Calendar(month, year);
const calendarTemplate = new CalendarTemplate(headerContainer, daysContainer);

calendarTemplate.render(cal.getDateObj())

arrowPrev.addEventListener("click", () => {
    date = calcMonthYear("dec", date.month, date.year);
    let prevMonthCalendar = new Calendar(date.month, date.year);
    calendarTemplate.render(prevMonthCalendar.getDateObj());
});

arrowNext.addEventListener("click", () => {
    date = calcMonthYear("inc", date.month, date.year);
    let nextMonthCalendar = new Calendar(date.month, date.year);
    calendarTemplate.render(nextMonthCalendar.getDateObj());
});

form.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const selectedDay = calendarTemplate.getSelectedDay();
    const input = document.getElementById("cn-input") as HTMLInputElement;
    const inputValue = input.value;
    const notes = new Notes(selectedDay, inputValue, 0);
    notes.setNote();
});

// Remove note button event listener
document.addEventListener("click", (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const isRemoveButton = target.closest(".cn-remove-button");
    if (isRemoveButton) {
        const noteID = target.parentElement?.getAttribute("note-id")!;
        const selectedDay = calendarTemplate.getSelectedDay();
        const notes = new Notes(selectedDay, "", +noteID);
        notes.removeNote();
    }
});