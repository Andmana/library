const myLibrary = [];

// Temp Book
const author = "Eichiro Oda";
const title = "One Piece";
const pages = 1000;
const isRead = false;

const container = document.querySelector(".container");
const show_dialog = document.getElementById("Add");
const removeSvg = document.getElementById("TemplateSVG");

const dialog = document.querySelector("dialog");
const close_dialog = document.querySelector(".close");

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary() {
    // dialog.showModal();
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    show();
}

function show() {
    container.innerHTML = "";
    myLibrary.forEach((book) => {
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

        const read_book = document.createElement("h3");
        read_book.textContent = book.isRead ? "Already read" : "Not read yet";
        read_book.classList.add(isRead ? "black" : "red");
        temp.appendChild(read_book);

        const btn_svg = removeSvg.cloneNode(true);
        btn_svg.removeAttribute("id");
        btn_svg.classList.remove("display");

        const remove_book = document.createElement("button");
        remove_book.appendChild(btn_svg);
        remove_book.classList.add("svg");
        temp.appendChild(remove_book);

        container.appendChild(temp);
    });
}

show_dialog.addEventListener("click", () => {
    // addBookToLibrary();
    dialog.showModal();
});

close_dialog.addEventListener("click", () => {
    dialog.close();
});
