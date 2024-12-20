const author = document.getElementById("author");
const title = document.getElementById("title");
const pages = document.getElementById("pages");
const isRead = document.getElementById("read");

const container = document.querySelector(".container");
const removeSvg = document.getElementById("TemplateSVG");

const show_dialog = document.getElementById("Add");
const dialog = document.querySelector("dialog");
let deletes = document.querySelectorAll(".deletes");
let edits = document.querySelectorAll(".reads");
const close_dialog = document.getElementById("close");
const submit = document.getElementById("submit");
const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.read = function () {
        return this.isRead === true ? "Already read" : "Not yet read";
    };
    this.addClass = function () {
        return this.isRead === true ? "black" : "red";
    };
}

// Temp Book
const op = new Book("One Piece", "Eichiro Oda", 1000, false);
myLibrary.push(op);

document.addEventListener("DOMContentLoaded", show());

function addBookToLibrary() {
    let book = new Book(title.value, author.value, pages.value, isRead.checked);
    myLibrary.push(book);
    show();
}

function show() {
    container.innerHTML = "";
    myLibrary.forEach((book, index) => {
        const temp = document.createElement("div");
        temp.classList.add("card");

        const title_book = document.createElement("h2");
        title_book.textContent = book.title;
        temp.appendChild(title_book);

        const author_book = document.createElement("h5");
        author_book.textContent = book.author;
        temp.appendChild(author_book);

        const pages_book = document.createElement("span");
        pages_book.textContent = book.pages + " Pages";
        temp.appendChild(pages_book);

        const read_book = document.createElement("button");
        read_book.textContent = book.read();
        read_book.setAttribute("arr-idx", index);
        read_book.classList.add("reads", book.addClass());
        temp.appendChild(read_book);

        const btn_svg = removeSvg.cloneNode(true);
        btn_svg.removeAttribute("id");
        btn_svg.classList.remove("display");

        const remove_book = document.createElement("button");
        remove_book.appendChild(btn_svg);
        remove_book.setAttribute("arr-idx", index);
        remove_book.classList.add("svg", "deletes");
        temp.appendChild(remove_book);

        container.appendChild(temp);
    });

    reaplyDelete();
    reaplyRead();
}

show_dialog.addEventListener("click", () => {
    dialog.showModal();
});

close_dialog.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});

submit.addEventListener("click", (e) => {
    e.preventDefault();
    addBookToLibrary();
    dialog.close();
});

function reaplyDelete() {
    deletes = document.querySelectorAll(".deletes");
    deletes.forEach((item) => {
        item.addEventListener("click", () => {
            const idx = parseInt(item.getAttribute("arr-idx"), 10);
            myLibrary.splice(idx, 1);
            show();
        });
    });
}

function reaplyRead() {
    reads = document.querySelectorAll(".reads");
    reads.forEach((item) => {
        item.addEventListener("click", () => {
            const idx = parseInt(item.getAttribute("arr-idx"), 10);
            myLibrary[idx].isRead = myLibrary[idx].isRead ? false : true;
            show();
        });
    });
}
