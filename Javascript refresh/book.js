const myLibrary = [];
// var NUM_BOOKS = 0;
var CURRENT_ID = 0;

function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
    this.identifier = CURRENT_ID;
    CURRENT_ID++;
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
    this.changeIsRead = function() {
        this.isRead = !this.isRead;
    }
}

function updatePage(book) {
    var container = document.getElementById('library-container');
    //The div container
    var newDiv = document.createElement("div");
    newDiv.className = "card";
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
    //toggle button
    var button = document.createElement("button")
    button.innerHTML = "Toggle Read Status"
    button.type = "button"
    button.id = book.identifier
    button.onclick = function() {changeReadStatus(this)};
    newDiv.appendChild(button)
    //delete button
    button = document.createElement("button")
    button.innerHTML = "Remove"
    button.type = "button"
    button.onclick = function(){removeParent(this)};
    newDiv.appendChild(button);
}

function displayForm() {
    document.getElementById('form-container').style.display = 'block';
}

function changeReadStatus(button) {
    console.log("alter book with id=" + button.id)
    // change value in library
    var idx = myLibrary.findIndex((book) => book.identifier == button.id)
    var book = myLibrary[idx]
    book.changeIsRead()
    // change what <p> displays 
    var parent = button.parentNode
    var p = parent.firstElementChild
    p.innerHTML = `${book.title} written by ${book.author} has ${book.numPages} pages `
    if (book.isRead) {
        p.innerHTML += `and has been read.`
    }
    else {
        p.innerHTML += 'and has not been read.'
    }
    
}

function hideForm() {
    document.getElementById('form-container').style.display = 'none';
}

function removeParent(button) {
    button.parentNode.remove();
}

document.getElementById("new-book").addEventListener("submit", submitForm);

    async function submitForm(event) {
      event.preventDefault();
      addBookToLibrary(document.getElementById("title").value, document.getElementById("author").value, document.getElementById("pages").value, document.getElementById("read").value)
      document.getElementById("new-book").reset();
    }


function addBookToLibrary(title, author, numPages, isRead) {
    var book = new Book(title, author, numPages, isRead)
    console.log("my id is" + book.identifier)
    myLibrary.push(book)
    updatePage(book)
  }
  
function initialSetup() {
    var book1 = new Book("The Hobbit", "J.R.R. Tolkien", 310, true)
    var book2 = new Book("Dune","Frank Herbert",412,false)
    var book3 = new Book("Pride and Prejudice", "Jane Austen", 279, false)
    var book4 = new Book("The Catcher in the Rye", "J.D.Salinger", 277, false)
    var book5 = new Book("1984", "George Orwell", 328, true)
    myLibrary.push(book1, book2, book3, book4, book5)
    updatePage(book1)
    updatePage(book2)
    updatePage(book3)
    updatePage(book4)
    updatePage(book5)
    console.log(myLibrary)
}

initialSetup()