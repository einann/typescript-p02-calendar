// Triggers on init, on adding a new note and on selecting a day
export const createNoteList = (notes) => {
    let ul = document.querySelector(".cn-notes-ul");
    ul.innerHTML = "";
    notes.forEach(note => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        let button = document.createElement("button");
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
