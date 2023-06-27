"use strict";
const notes_ar = [];

window.onload = function () {
  declareEvents();
  checkLocal();
};

const checkLocal = function () {
  if (localStorage["notes"]) {
    let _ar = JSON.parse(localStorage["notes"]);
    _ar.forEach(function (item) {
      notes_ar.push(item);
    });
    createNotes(notes_ar);
  }
};

const textEl = document.querySelector("#id_textArea");
const dateEl = document.querySelector("#id_date");
const timeEl = document.querySelector("#id_time");
// const parent = document.querySelector("#id_parent");
const today = new Date();
const todayDate = `${today.getFullYear()}-0${today.getMonth()}-${today.getDate()}`;
const todayTime = `${today.getHours()}:${today.getMinutes()}`;

dateEl.value = todayDate;
timeEl.value = todayTime;

const declareEvents = function () {
  let resetBtn = document.querySelector("#btn_reset");
  resetBtn.addEventListener("click", function () {
    notes_ar.splice(0, notes_ar.length);
    createNotes(notes_ar);
  });
  let form = document.querySelector("#id_form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const note = textEl.value;
    const date = dateEl.value;
    const time = timeEl.value;
    const notes_obj = {
      note,
      date,
      time,
      id: Date.now(),
    };
    if (notes_obj.note === "") {
      return alert("pleasa enter a note");
    }

    textEl.value = "";
    dateEl.value = todayDate;
    timeEl.value = todayTime;

    notes_ar.push(notes_obj);
    console.log(notes_ar);
    createNotes(notes_ar);
  });
};
const deleteOneNote = function (_idDelete) {
  notes_ar.forEach(function (item, i) {
    if (item.id == _idDelete) {
      notes_ar.splice(i, 1);
    }
  });
  createNotes(notes_ar);
};

const createNotes = function (_ar) {
  document.querySelector("#id_parent").innerHTML = "";
  _ar = _.sortBy(_ar, "time");
  localStorage.setItem("notes", JSON.stringify(_ar));
  _ar.forEach(function (item) {
    let newNote = new Task("#id_parent", item);
    newNote.render();
  });
};
