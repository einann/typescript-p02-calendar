import { createNoteList } from "../util/CreateNote.js";
export class Notes {
    constructor(fullDate, note, removeID) {
        this.fullDate = fullDate;
        this.note = note;
        this.removeID = removeID;
        this.noteArray = this.getNoteArray();
    }
    getNoteArray() {
        const sNotes = localStorage.getItem("notes");
        let aNotes = {};
        if (sNotes)
            aNotes = JSON.parse(sNotes);
        return aNotes;
    }
    setNoteArray(fullDate, noteItem) {
        const input = document.getElementById("cn-input");
        let notes = this.getNoteArray();
        Object.defineProperty(notes, fullDate, {
            value: noteItem,
            enumerable: true,
        });
        localStorage.setItem("notes", JSON.stringify(notes));
        this.noteArray = notes;
        input.value = "";
        createNoteList(noteItem);
    }
    setNote() {
        const noteItem = [{ id: 1, note: this.note }];
        if (!this.noteArray) {
            this.setNoteArray(this.fullDate, noteItem);
        }
        else {
            const existingDays = Object.keys(this.noteArray);
            const existingIndex = existingDays.findIndex(x => x === this.fullDate);
            if (existingIndex === -1) {
                this.setNoteArray(this.fullDate, noteItem);
            }
            else {
                const existingFullDate = this.fullDate;
                const existingDate = this.noteArray[existingFullDate];
                const latestRecord = existingDate[existingDate.length - 1];
                existingDate.push({
                    id: latestRecord.id + 1,
                    note: this.note,
                });
                delete this.noteArray[existingFullDate];
                this.setNoteArray(this.fullDate, existingDate);
            }
        }
    }
    removeNote() {
        const existingFullDate = this.fullDate;
        const selectedDateNotes = this.noteArray[existingFullDate];
        const filteredDateNotes = selectedDateNotes.filter(x => x.id !== this.removeID);
        this.setNoteArray(this.fullDate, filteredDateNotes);
    }
}
