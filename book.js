// Write a constructor for making “Book” objects. 
// We will revisit this in the next project. 
// Your book objects should have the book’s title, 
// author, the number of pages, and whether or not you have read the book.

const myLibrary = [];
var NUM_BOOKS = 0;

function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
    this.finishReading = function() {
        isRead = true;
    }
    this.info = function() {
        var info = title + " by " + author + ", " + numPages + ", ";
        if (this.isRead) {
            info += "have read.";
        }
        else {
            info += "not read yet.";
        }

        return info;
    }
}

function updatePage(book) {
    NUM_BOOKS++;
    var container = document.getElementById('library-container');
    //The div container
    var newDiv = document.createElement("div");
    newDiv.className = "card";
    // newDiv.id = "book" + NUM_BOOKS;
    container.appendChild(newDiv);
    //text element
    var newP = document.createElement("p") 
    newP.innerHTML = `${book.title} written by ${book.author} has ${book.numPages} pages `
    if (book.isRead) {
        newP.innerHTML += `and has been read.`
    }
    else {
        newP.innerHTML += 'and has not been read.'
    }
    newDiv.appendChild(newP);
    //delete button
    var button = document.createElement("button")
    // button.id = "button"+ NUM_BOOKS;
    button.innerHTML = "Remove"
    button.type = "button"
    button.onclick = removeParent;
    newDiv.appendChild(button);
}

function displayForm() {
    document.getElementById('form-container').style.display = 'block';
}

function removeParent(button) {
    this.parentNode.remove();
}

function submitForm() {
    // addBookToLibrary()
    document.getElementById('form-container').style.display = 'none';
}

function addBookToLibrary(title, author, numPages, isRead) {
    var book = new Book(title, author, numPages, isRead)
    myLibrary.push(book)
    updatePage(book)
  }
  
  
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Harry Potter", "J.K. Rowling", 342, true);




