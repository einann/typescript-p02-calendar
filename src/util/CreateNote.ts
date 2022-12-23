// Triggers on init, on adding a new note and on selecting a day
export const createNoteList = (notes: { id: number, note: string }[]) => {
    let ul = document.querySelector(".cn-notes-ul") as HTMLUListElement;
    ul.innerHTML = "";
    notes.forEach(note => {
        let li = document.createElement("li") as HTMLLIElement;
        let span = document.createElement("span") as HTMLSpanElement;
        let button = document.createElement("button") as HTMLButtonElement;
        span.innerHTML = note.note;
        button.innerHTML = "X";
        button.classList.add("cn-remove-button");
        li.classList.add("cn-notes-li");
        li.setAttribute("note-id", note.id.toString());
        li.append(span);
        li.append(button);
        ul.append(li);
    });
};