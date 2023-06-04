// Obtener elementos del DOM
var cartIcon = document.getElementById("cart-icon");
var modal = document.getElementById("modal");
var closeModalBtn = document.getElementsByClassName("close")[0];
var clearCartBtn = document.getElementById("clear-cart-btn");
var cartCount = document.getElementById("cart-count");
var cartList = document.getElementById("cart-list");
var totalElement = document.getElementById("total");

// Variables del carrito
var cart = [];
var total = 0;

// Función para abrir la ventana modal
function openModal() {
  modal.style.display = "block";
}

// Función para cerrar la ventana modal
function closeModal() {
  modal.style.display = "none";
}

// Función para limpiar el carrito
function clearCart() {
  cart = [];
  updateCart();
}

// Función para agregar un producto al carrito
function addToCart(product) {
  var productId = product.getAttribute("data-id");
  var productName = product.getAttribute("data-name");
  var productPrice = Number(product.getAttribute("data-price"));
  
  // Verificar si el producto ya está en el carrito
  var foundProduct = cart.find(function(item) {
    return item.id === productId;
  });
  
  if (foundProduct) {
    foundProduct.quantity++;
  } else {
    // Si el producto no está en el carrito, agregarlo
    var newItem = {
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1
    };
    cart.push(newItem);
  }
  
  updateCart();
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
  // Buscar el índice del producto en el carrito
  var index = cart.findIndex(function(item) {
    return item.id === productId;
  });
  
  // Si se encontró el producto, eliminarlo del carrito
  if (index !== -1) {
    cart.splice(index, 1);
    updateCart();
  }
}

// Función para actualizar el carrito y el total
function updateCart() {
  // Limpiar el carrito
  cartList.innerHTML = "";
  total = 0;
  
  // Recorrer los elementos del carrito y agregarlos al HTML
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    var listItem = document.createElement("li");
    listItem.innerHTML = item.name + " - $" + item.price;
    listItem.setAttribute("data-id", item.id);
    listItem.addEventListener("click", function(event) {
      var productId = event.target.getAttribute("data-id");
      removeFromCart(productId);
    });
    cartList.appendChild(listItem);
    
    total += item.price;
  }
  
  // Actualizar el total
  totalElement.textContent = total;
  
  // Actualizar el contador de productos
  cartCount.textContent = cart.length;
}

// Manejador de eventos para abrir la ventana modal
cartIcon.addEventListener("click", openModal);

// Manejador de eventos para cerrar la ventana modal
closeModalBtn.addEventListener("click", closeModal);

// Manejador de eventos para vaciar el carrito
clearCartBtn.addEventListener("click", clearCart);

// Obtener los productos del DOM y agregar el manejador de eventos para agregar al carrito
var products = document.getElementsByClassName("product");
for (var i = 0; i < products.length; i++) {
  var product = products[i];
  product.addEventListener("click", function(event) {
    addToCart(event.target);
  });
}
