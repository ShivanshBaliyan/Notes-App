const btnEle = document.querySelector(".customBtn");
const appEle = document.querySelector(".notes");

// Load saved notes from localStorage
getNotes().forEach((note) => {
    const noteEl = createNoteEl(note.id, note.content);
    appEle.insertBefore(noteEl, btnEle.closest(".col-lg-3"));
});

function deleteNote(id, noteDiv) {
    let notes = getNotes().filter((note) => note.id !== id);
    saveNote(notes);
    noteDiv.remove();
}

function updateNote(id, content) {
    const notes = getNotes();
    const target = notes.find((note) => note.id === id);
    if (target) {
        target.content = content;
        saveNote(notes);
    }
}

function createNoteEl(id, content) {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("col-lg-3", "col-sm-6", "col-12", "d-flex", "flex-column", "align-items-center", "justify-content-center", "text-center", "p-3");

    const textarea = document.createElement("textarea");
    textarea.classList.add("form-control", "note", "fs-4", "p-3", "fw-bold");
    textarea.placeholder = "Empty Note";
    textarea.value = content;
    textarea.cols = 30;
    textarea.rows = 6;

    textarea.addEventListener('dblclick', () => {
        const warning = confirm("Do you want to delete this note?");
        if (warning) {
            deleteNote(id, noteDiv);
        }
    });

    textarea.addEventListener("input", () => {
        updateNote(id, textarea.value);
    });

    noteDiv.appendChild(textarea);
    return noteDiv;
} 

function saveNote(notes) {
    localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNotes() {
    return JSON.parse(localStorage.getItem("note-app") || "[]");
}

function addNote() {
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 10000),
        content: "",
    };
    const noteEl = createNoteEl(noteObj.id, noteObj.content);
    
    // Insert before the button itself
    appEle.insertBefore(noteEl, btnEle.closest(".col-lg-3"));

    notes.push(noteObj);
    saveNote(notes);
}

btnEle.addEventListener('click', addNote);
