// Elements
const container = document.querySelector('.container');
let removeSvg = document.getElementById('TemplateSVG').cloneNode(true);
removeSvg.removeAttribute('id');
removeSvg.classList.remove('display');
// Dialogs / modal
const show_dialog = document.getElementById('Add');
const close_dialog = document.getElementById('close');
const dialog = document.querySelector('dialog');
const form = document.getElementById('form');
const submit = document.getElementById('submit');
// Modal Form
const author = document.getElementById('author');
const title = document.getElementById('title');
const pages = document.getElementById('pages');
const isRead = document.getElementById('read');

const titleMsg = document.getElementById('titleMsg');
const authorMsg = document.getElementById('authorMsg');
const pagesMsg = document.getElementById('pagesMsg');
// Cards Button
let deletes = document.querySelectorAll('.deletes');
let edits = document.querySelectorAll('.reads');
// Library Data
const myLibrary = [];

class Book {
  constructor(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
  }

  readStatus = () => {
    return this.isRead ? 'Already read' : 'Not yet read';
  };

  classForReadStatus = () => {
    return this.isRead ? 'black' : 'red';
  };
}

// Add a default Book
myLibrary.push(new Book('One Piece', 'Eichiro Oda', 1000, false));

function addBookToLibrary() {
  const book = new Book(title.value, author.value, pages.value, isRead.checked);
  myLibrary.push(book);
  showLibrary();
}

function showLibrary() {
  container.innerHTML = '';
  myLibrary.forEach((book, index) => {
    const card = document.createElement('div');
    card.classList.add('card');

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

// Dialog Modal controls
show_dialog.addEventListener('click', () => dialog.showModal());
close_dialog.addEventListener('click', (e) => {
  e.preventDefault();
  dialog.close();
});

// Form action
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!title.validity.valid || !author.validity.valid || !pages.validity.valid) {
    showErrorTitle();
    showErrorAuthor();
    showErrorPages();
    return;
  }

  addBookToLibrary();
  dialog.close();
});

// Input Event
title.addEventListener('input', (event) => {
  if (title.validity.valid) titleMsg.textContent = '';
  else showErrorTitle();
});

author.addEventListener('input', (event) => {
  if (author.validity.valid) authorMsg.textContent = '';
  else showErrorAuthor();
});

pages.addEventListener('input', (event) => {
  if (pages.validity.valid) pagesMsg.textContent = '';
  else showErrorPages();
});

function showErrorTitle() {
  if (title.validity.valueMissing) {
    titleMsg.textContent = 'You need to enter book title';
  }
}

function showErrorAuthor() {
  if (author.validity.valueMissing) authorMsg.textContent = 'You need to enter Authors Name';
  if (author.validity.tooShort)
    authorMsg.textContent = `Name should be at least ${author.minLength} characters; you entered ${author.value.length}.`;
}

function showErrorPages() {
  if (title.validity.valueMissing) {
    titleMsg.textContent = 'You need to enter book title';
  }
}

function attachEventListeners() {
  document.querySelectorAll('.deletes').forEach((btn) =>
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      myLibrary.splice(index, 1);
      showLibrary();
    })
  );

  document.querySelectorAll('.reads').forEach((btn) =>
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      myLibrary[index].isRead = !myLibrary[index].isRead;
      showLibrary();
    })
  );
}
// Initialize
document.addEventListener('DOMContentLoaded', showLibrary);
