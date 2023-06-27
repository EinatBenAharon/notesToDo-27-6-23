"use strict";

class Task {
  constructor(_parent, _item) {
    this.parent = _parent;
    this.note = _item.note;
    this.date = _item.date;
    this.time = _item.time;
    this.id = _item.id;
  }
  render() {
    let newDiv = document.createElement("div");
    newDiv.className = "imgNote";
    document.querySelector(this.parent).append(newDiv);
    newDiv.innerHTML += `
    <button class="btn btn-danger float-end">X</button>
    <br><br>
    <h5>${this.note}</h5>
    <div>
    <h6>${this.date}</h6>
    <h6>${this.time}</h6>
    </div>
    `;
    let btnX = newDiv.querySelector("button");
    btnX.addEventListener(
      "click",
      function () {
        deleteOneNote(this.id);
      }.bind(this)
    );
  }
}
