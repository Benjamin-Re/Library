let myLibrary = [];
let i = 0;

// the constructor...
function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

// Store a new book in myLibrary
function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  createCard();
}

// Add a book manually to myLibrary
const starterBook = {
  title: "Fiesta",
  author: "Hemmingway",
  pages: 200,
  read: true,
};
myLibrary.push(starterBook);

// Populate the card that already is in the html with the starter book
populateCard(
  0,
  myLibrary[0]["title"],
  myLibrary[0]["author"],
  myLibrary[0]["pages"],
  myLibrary[0]["read"]
);
// The starter book doesn't add a delete event listener bc it serves as clone

// Populate a card with the book data
function populateCard(n, t, a, p, r) {
  let title = document.querySelector(`.num${n} .card-title`);
  title.textContent = t;

  let author = document.querySelector(`.num${n} .card-subtitle`);
  author.textContent = a;

  let pages = document.querySelector(`.num${n} p:first-of-type`);
  pages.textContent = p;

  let read = document.querySelector(`.num${n} p:last-of-type`);
  read.textContent = r;
}

// Enable user to add a new book from user input
const form = document.getElementById("addBook");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(form.elements[0].value);
  author = form.elements[0].value;
  title = form.elements[1].value;
  pages = form.elements[2].value;
  read = form.elements[3].value;
  addBookToLibrary(author, title, pages, read);
  // Clear the form fields (because we can't refresh the page without loosing our data)
  clearInputs();
});

// Add a second book manually for test purposes
addBookToLibrary("Fortune de France", "Robert Merle", 600, true);

function clearInputs() {
  const inputs = document.querySelectorAll("input");
  for (const input of inputs) {
    input.value = "";
  }
}

// Display the books in myLibrary as cards
function createCard() {
  i++;
  // Create a card for each book
  let clone = document.querySelector(".card").cloneNode(true);

  clone.classList.remove(`num0`);
  console.log(clone.classList)
  clone.classList.add(`num${i}`);
  document.querySelector(".card-container").appendChild(clone);

  // Update the data of the clone
  populateCard(
    i,
    myLibrary[i]["title"],
    myLibrary[i]["author"],
    myLibrary[i]["pages"],
    myLibrary[i]["read"]
  );
  // Add an event listener to its delete link
  allowDeleteCard();
}

// Add delete function to delete link
function allowDeleteCard() {
  // Get the delete link
  const deleteLink = document.querySelector(`.num${i} .delete`);

  
  // Add an event listener
  deleteLink.addEventListener("click", (event) => {
    console.log("Clicked on" + event.currentTarget);
    // Delete the book ( with class .num${i}) from myLibrary
    let indexToDelete = event.currentTarget.parentNode.parentNode.classList[1].substring(3);
    myLibrary.pop(indexToDelete);
    // Delete the card from the .card-container
    let cardContainer = event.currentTarget.parentNode.parentNode.parentNode;
    cardContainer.removeChild(event.currentTarget.parentNode.parentNode);
  });
  
}

