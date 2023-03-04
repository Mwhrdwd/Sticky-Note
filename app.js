const noteConteiner = document.querySelector("#app");
const addNoteBtn = document.querySelector(".add-note");

addNoteBtn.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function createNote(id, content) {
  const noteElement = document.createElement("textarea");
  noteElement.classList.add("note");
  noteElement.value = content;
  noteElement.addEventListener("change", () => {
    updateNote(id, noteElement.value);
  });
  noteElement.addEventListener("dblclick", () => {
    deleteNote(id, noteElement);
  });
  return noteElement;
}

function addNote() {
  let notes = getNotes();
  const newNote = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };

  let noteElement = createNote(newNote.id, newNote.content);
  noteConteiner.insertBefore(noteElement, addNoteBtn);
  notes.push(newNote);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const noteElement = notes.filter((item) => item.id == id)[0];
  noteElement.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((item) => item.id != id);

  saveNotes(notes);
  noteConteiner.removeChild(element);
}

document.addEventListener("DOMContentLoaded", () => {
  getNotes().forEach((item) => {
    const note = createNote(item.id, item.content);
    noteConteiner.insertBefore(note, addNoteBtn);
  });
});
