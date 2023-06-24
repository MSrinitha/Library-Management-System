
document.addEventListener("DOMContentLoaded", function() {
  // Define an array of objects representing the book inventory
  var bookInventory = [
    {
      bookName: "1984",
      authorName: "George Orwell",
      yearPublication: 1949,
      genre: "Dystopian",
      availability: "Available",
      numOfCopies: 5,
      
    },
    {
      bookName: "To Kill a Mockingbird",
      authorName: "Harper Lee",
      yearPublication: 1960,
      genre: "Fiction",
      availability: "Available",
      numOfCopies: 3
    },
    {
      bookName: "The Great Gatsby",
      authorName: "F. Scott Fitzgerald",
      yearPublication: 1925,
      genre: "Classic",
      availability: "Not Available",
      numOfCopies: 0
    },
    {
      bookName: "Pride and Prejudice",
      authorName: "Jane Austen",
      yearPublication: 1813,
      genre: "Romance",
      availability: "Available",
      numOfCopies: 2
    },
    {
      bookName: "The Hobbit",
      authorName: "J.R.R. Tolkien",
      yearPublication: 1937,
      genre: "Fantasy",
      availability: "Available",
      numOfCopies: 4
    },
    {
      bookName: "The Guide",
      authorName: "R. K. Narayan",
      yearPublication: 1958,
      genre: "Classics",
      availability: "Available",
      numOfCopies: 7
    },
    {
      bookName: "Malgudi Days",
      authorName: "R. K. Narayan",
      yearPublication: 1943,
      genre: "Classics",
      availability: "Available",
      numOfCopies: 39
    },
    {
      bookName: "The Private Life of an Indian Prince",
      authorName: "Mulk Raj Anand",
      yearPublication: 1953,
      genre: "Classics",
      availability: "Available",
      numOfCopies: 11
    },
    {
      bookName: "Untouchable",
      authorName: "Mulk Raj Anand",
      yearPublication: 1957,
      genre: "Classics",
      availability: "Available",
      numOfCopies: 4
    },
    {
      bookName: "Train to Pakistan ",
      authorName: "KHUSHWANT SINGH",
      yearPublication: 1947,
      genre: "Classics",
      availability: "Available",
      numOfCopies: 7
    },
    {
      bookName: "Godan",
      authorName: "Jai Ratan",
      yearPublication: 1957,
      genre: "Classics",
      availability: "Available",
      numOfCopies: 12
    },
    {
      bookName: "The Room on the Roof",
      authorName: "JMr. Harrison",
      yearPublication: 1978,
      genre: "Classics",
      availability: "Available",
      numOfCopies: 18
    },
    {
      bookName: "The God of Small Things",
      authorName: "Arundhati Roy",
      yearPublication: 1997,
      genre: "Fiction",
      availability: "Available",
      numOfCopies: 7
    },
    {
      bookName: "The white tiger",
      authorName: "Aravind Adiga",
      yearPublication: 1998,
      genre: "Fiction",
      availability: "Available",
      numOfCopies: 6
    },
    {
      bookName: "The Inheritance of Loss",
      authorName: "Kiran Desai ",
      yearPublication: 1998,
      genre: "Fiction",
      availability: "Available",
      numOfCopies: 9
    },
    {
      bookName: "A Suitable Boy",
      authorName: "Vikram Seth ",
      yearPublication: 2008,
      genre: "Fiction",
      availability: "Available",
      numOfCopies: 15
    },
    {
      bookName: "Sea of Poppies",
      authorName: "Amitav Ghosh ",
      yearPublication: 1978,
      genre: "Fiction",
      availability: "Available",
      numOfCopies: 14
    }

  ];

 
  

  // Array to store the cart items
  var cartItems = [];

  // Function to generate the table HTML
  function generateTable(data) {
    var table = document.createElement("table");

    // Create the table headers
    var headers = Object.keys(data[0]);
    headers.push("Cart"); // Add "Cart" header
    var headerRow = document.createElement("tr");
    headers.forEach(function(header) {
      var th = document.createElement("th");
      th.appendChild(document.createTextNode(header));
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Create table rows and cells
    data.forEach(function(item) {
      var row = document.createElement("tr");

      // Add book details cells
      Object.values(item).forEach(function(value) {
        var cell = document.createElement("td");
        cell.appendChild(document.createTextNode(value));
        row.appendChild(cell);
      });

      // Add cart button cell
      var cartCell = document.createElement("td");
      var cartButton = document.createElement("button");
      cartButton.innerHTML = "Add to Cart";
      cartButton.addEventListener("click", function() {
        addToCart(item);
      });
      cartCell.appendChild(cartButton);
      row.appendChild(cartCell);

      table.appendChild(row);
    });

    return table;
  }

  // Function to handle adding a book to the cart
  function addToCart(book) {
    if (book.numOfCopies > 0) {
      var bookCopy = Object.assign({}, book);
      cartItems.push(bookCopy);
      updateNumOfCopies(bookCopy, 1); // Update the book inventory
      updateAvailability(book, -1);
      saveCartItems();
      alert("Book added to cart!");
  
      // Regenerate the table with updated availability
      var container = document.getElementById("table-container");
      container.innerHTML = '';
      var table = generateTable(bookInventory);
      container.appendChild(table);
    } else {
      alert("This book is currently out of stock and cannot be added to the cart.");
    }
  }
  
  // Function to update the availability of a book
  function updateAvailability(book, change) {
    var index = bookInventory.findIndex(function(item) {
      return item.bookName === book.bookName;
    });

    if (index !== -1) {
      bookInventory[index].availability =
        bookInventory[index].numOfCopies - change > 0 ? "Available" : "Not Available";
    }
  }

  // Function to update the number of copies of a book
  function updateNumOfCopies(book, change) {
  var index = bookInventory.findIndex(function(item) {
    return item.bookName === book.bookName;
  });

  if (index !== -1) {
    bookInventory[index].numOfCopies -= change;
  }
  }
  //Function to save the cart items in localStorage
  function saveCartItems() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  

  // Function to filter the table based on search input
  function filterTable() {
    var searchInput = document.getElementById("search-input");
    var filterValue = searchInput.value.toUpperCase();
    var rows = table.getElementsByTagName("tr");

    for (var i = 1; i < rows.length; i++) {
      var bookNameCell = rows[i].getElementsByTagName("td")[0];
      var authorNameCell = rows[i].getElementsByTagName("td")[1];
      var yearCell = rows[i].getElementsByTagName("td")[2];
      var genreCell = rows[i].getElementsByTagName("td")[3];

      var bookName = bookNameCell.textContent || bookNameCell.innerText;
      var authorName = authorNameCell.textContent || authorNameCell.innerText;
      var year = yearCell.textContent || yearCell.innerText;
      var genre = genreCell.textContent || genreCell.innerText;

      if (
        bookName.toUpperCase().indexOf(filterValue) > -1 ||
        authorName.toUpperCase().indexOf(filterValue) > -1 ||
        year.toString().indexOf(filterValue) > -1 ||
        genre.toUpperCase().indexOf(filterValue) > -1
      ) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }

  // Get the container element where the table will be displayed
  var container = document.getElementById("table-container");

  // Generate the table and append it to the container
  var table = generateTable(bookInventory);
  container.appendChild(table);

  // Attach event listener to search input
  var searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keyup", filterTable);
});
