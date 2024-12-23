// Elements
const container = document.querySelector(".container");
let removeSvg = document.getElementById("TemplateSVG").cloneNode(true);
removeSvg.removeAttribute("id");
removeSvg.classList.remove("display");
// Dialogs / modal
const show_dialog = document.getElementById("Add");
const close_dialog = document.getElementById("close");
const dialog = document.querySelector("dialog");
const submit = document.getElementById("submit");
// Modal Form
const author = document.getElementById("author");
const title = document.getElementById("title");
const pages = document.getElementById("pages");
const isRead = document.getElementById("read");
// Cards Button
let deletes = document.querySelectorAll(".deletes");
let edits = document.querySelectorAll(".reads");
// Library Data
const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.readStatus = function () {
        return this.isRead ? "Already read" : "Not yet read";
    };
    this.classForReadStatus = function () {
        return this.isRead ? "black" : "red";
    };
}

// Add a default Book
myLibrary.push(new Book("One Piece", "Eichiro Oda", 1000, false));

function addBookToLibrary() {
    const book = new Book(
        title.value,
        author.value,
        pages.value,
        isRead.checked
    );
    myLibrary.push(book);
    showLibrary();
}

function showLibrary() {
    container.innerHTML = "";
    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h2>${book.title}</h2>
            <h5>${book.author}</h5>
            <span>${book.pages} Pages</span>
            <button class="reads ${book.classForReadStatus()}" data-index="${index}">${book.readStatus()}</button>
            <button class="svg deletes" data-index="${index}">
                ${removeSvg.cloneNode(true).outerHTML}
            </button>
        `;
        container.appendChild(card);
    });

    attachEventListeners();
}

// Dialog M,odal controls
show_dialog.addEventListener("click", () => dialog.showModal());
close_dialog.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});
submit.addEventListener("click", (e) => {
    e.preventDefault();
    addBookToLibrary();
    dialog.close();
});

function attachEventListeners() {
    document.querySelectorAll(".deletes").forEach((btn) =>
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            myLibrary.splice(index, 1);
            showLibrary();
        })
    );

    document.querySelectorAll(".reads").forEach((btn) =>
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            myLibrary[index].isRead = !myLibrary[index].isRead;
            showLibrary();
        })
    );
}

// Initialize
document.addEventListener("DOMContentLoaded", showLibrary);
