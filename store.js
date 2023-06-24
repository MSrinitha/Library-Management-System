document.addEventListener("DOMContentLoaded", function() {
  // Get the cart container element
  var cartContainer = document.getElementById("cart-container");

  function generateCartItem(bookName) {
    var cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
  
    var bookNameElement = document.createElement("span");
    bookNameElement.textContent = bookName;
  
    var rentButton = document.createElement("button");
    rentButton.textContent = "Rent";
    rentButton.classList.add("rent-button");
    rentButton.addEventListener("click", function() {
      rentBook(bookName);
    });
  
    cartItem.appendChild(bookNameElement);
    cartItem.appendChild(rentButton);
  
    return cartItem;
  }
  

// Rent button click handler
function rentBook(bookName) {
 
  // display an alert message
  alert("Renting book: " + bookName);
}


// Get the cart items from localStorage
var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// book names from the cart items
var bookNames = cartItems.map(function(item) {
  return item.bookName;
});

// Clear the cart container
//cartContainer.innerHTML = "";

// Display the cart items
bookNames.forEach(function(bookName) {
  var cartItem = generateCartItem(bookName);
  cartContainer.appendChild(cartItem);
});
});




