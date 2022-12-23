import { Calendar } from "./classes/Calendar.js";
import { CalendarTemplate } from "./classes/CalendarTemplate.js";
import { Notes } from "./classes/Notes.js";
import { calcMonthYear } from "./util/CalculateMonthAndYear.js";
let year, month, day;
year = new Date().getFullYear();
month = new Date().getMonth();
day = new Date().getDate();
let date = { month, year };
const headerContainer = document.querySelector(".header-month-and-year");
const daysContainer = document.querySelector(".calendar-days-container");
const arrowPrev = document.querySelector("#prev");
const arrowNext = document.querySelector("#next");
const form = document.querySelector("#cn-form");
const cal = new Calendar(month, year);
const calendarTemplate = new CalendarTemplate(headerContainer, daysContainer);
calendarTemplate.render(cal.getDateObj());
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
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedDay = calendarTemplate.getSelectedDay();
    const input = document.getElementById("cn-input");
    const inputValue = input.value;
    const notes = new Notes(selectedDay, inputValue, 0);
    notes.setNote();
});
// Remove note button event listener
document.addEventListener("click", (e) => {
    var _a;
    e.preventDefault();
    const target = e.target;
    const isRemoveButton = target.closest(".cn-remove-button");
    if (isRemoveButton) {
        const noteID = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute("note-id");
        const selectedDay = calendarTemplate.getSelectedDay();
        const notes = new Notes(selectedDay, "", +noteID);
        notes.removeNote();
    }
});
