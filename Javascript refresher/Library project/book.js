const myLibrary = [];
let CURRENT_ID = 0;

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.identifier = CURRENT_ID;
    CURRENT_ID++;
    this.info = function() {
        let info = `${this.title}, written by ${author} has ${this.pages} pages and `;
        if (this.isRead) {
            info += "has been read.";
        }
        else {
            info += "has not been read.";
        }

        return info;
    }
    this.changeIsRead = function() {
        this.isRead = !this.isRead;
    }
}

function updatePage(book) {
    const container = document.getElementById('library-container');
    //The div container
    let newDiv = document.createElement("div");
    newDiv.className = "card";
    container.appendChild(newDiv);
    //text element
    let newP = document.createElement("p") 
    newP.innerHTML = book.info()
   
    newDiv.appendChild(newP);
    //toggle button
    let button = document.createElement("button")
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
    // change value in library
    var idx = myLibrary.findIndex((book) => book.identifier == button.id)
    var book = myLibrary[idx]
    book.changeIsRead()
    // change what <p> displays 
    var parent = button.parentNode
    var p = parent.firstElementChild
    p.innerHTML = book.info()
    
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
      let book = new Book(document.getElementById("title").value, document.getElementById("author").value, document.getElementById("pages").value, document.getElementById("read").value)
      myLibrary.push(book)
      updatePage(book)
      document.getElementById("new-book").reset();
    }


  
function initialSetup() {
    let book1 = new Book("The Hobbit", "J.R.R. Tolkien", 310, true)
    let book2 = new Book("Dune","Frank Herbert",412,false)
    let book3 = new Book("Pride and Prejudice", "Jane Austen", 279, false)
    let book4 = new Book("The Catcher in the Rye", "J.D.Salinger", 277, false)
    let book5 = new Book("1984", "George Orwell", 328, true)
    myLibrary.push(book1, book2, book3, book4, book5)
    updatePage(book1)
    updatePage(book2)
    updatePage(book3)
    updatePage(book4)
    updatePage(book5)
    console.log(myLibrary)
}

initialSetup()