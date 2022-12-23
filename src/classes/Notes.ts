import { createNoteList } from "../util/CreateNote.js";
export class Notes {
    public noteArray: object = this.getNoteArray();

    constructor(
        public fullDate: string,
        public note: string,
        public removeID: number,
    ) { }

    getNoteArray() {
        const sNotes = localStorage.getItem("notes");
        let aNotes = {};
        if (sNotes) aNotes = JSON.parse(sNotes);
        return aNotes;
    }

    setNoteArray(fullDate: string, noteItem: { id: number, note: string }[]) {
        const input = document.getElementById("cn-input") as HTMLInputElement;
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
                // Push to the existing date array.
                type tExisting = keyof typeof this.noteArray;
                const existingFullDate = this.fullDate as tExisting;
                const existingDate: { id: number, note: string }[] = this.noteArray[existingFullDate];
                const latestRecord: { id: number, note: string } = existingDate[existingDate.length - 1];
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
        type tExisting = keyof typeof this.noteArray;
        const existingFullDate = this.fullDate as tExisting;
        const selectedDateNotes:  { id: number, note: string }[] = this.noteArray[existingFullDate];
        const filteredDateNotes = selectedDateNotes.filter(x => x.id !== this.removeID);
        this.setNoteArray(this.fullDate, filteredDateNotes);
    }
}