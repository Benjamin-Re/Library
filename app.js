// Book class
class Book {
  title;
  author;
  pages;
  read;
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// Library class
class Library {
  myLibrary = [];
  addBookToLibrary(book) {
    this.myLibrary.push(book);
  }
  getBook(index) {
    return this.myLibrary[index];
  }
  deleteBook(index){
    this.myLibrary.pop(index);
  }
}

// View Controller
class ViewController {
  myLibrary = new Library();
  i=0;
  populateCard(n, book) {
    let title = document.querySelector(`.num${n} .card-title`);
    title.textContent = book.title;

    let author = document.querySelector(`.num${n} .card-subtitle`);
    author.textContent = book.author;

    let pages = document.querySelector(`.num${n} p:first-of-type`);
    pages.textContent = book.pages;

    let read = (document.querySelector(
      `.num${n} input[type='checkbox']`
    ).checked = book.read);
    // read.textContent = book.read;
  }

  initialize() {
    // Add a starter book to the lib
    const starterBook = new Book("Fiesta", "Hemmingway", 200, "true");
    this.myLibrary.addBookToLibrary(starterBook);
    this.populateCard(0, this.myLibrary.getBook(0));
    // Enable user to add a new book using the form
    const form = document.getElementById("addBook");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let title = form.elements[0].value;
      let author = form.elements[1].value;
      let pages = form.elements[2].value;
      let read = form.elements[3].checked;
      const tempBook = new Book(title, author, pages, read);
      this.myLibrary.addBookToLibrary(tempBook);
      this.createCard(tempBook);
      // Clear the form fields (because we can't refresh the page without loosing our data)
      this.clearInputs();
    });
  }

  clearInputs() {
    const inputs = document.querySelectorAll("input");
    for (const input of inputs) {
      input.value = "";
    }
  }
  
  createCard(tempBook) {

    // Create a card for each book
    let clone = document.querySelector(".card").cloneNode(true);
    clone.classList.remove("num0");
    this.i++;
    clone.classList.add(`num${this.i}`);
    document.querySelector(".card-container").appendChild(clone);
    this.populateCard(this.i, tempBook);
    // Add event listener to the delete button of this new card
    const deleteLink = document.querySelector(`.num${this.i} .delete`);
    deleteLink.addEventListener("click", (event) => {
      console.log("Clicked on" + event.currentTarget);
      // Delete the book ( with class .num${i}) from myLibrary
      let indexToDelete =
        event.currentTarget.parentNode.parentNode.classList[1].substring(3);
      this.myLibrary.deleteBook(indexToDelete);
      // Delete the card from the .card-container
      let cardContainer = event.currentTarget.parentNode.parentNode.parentNode;
      cardContainer.removeChild(event.currentTarget.parentNode.parentNode);
    });
  }
}

const myViewController = new ViewController();
myViewController.initialize();

