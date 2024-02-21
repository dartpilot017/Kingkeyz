"use strict";

//./js/products.js
// loop thorough data and display each field
function displayData(data) {
  data.items.forEach(function (item, index) {
    var div = document.createElement('div');
    div.classList.add('product-item');
    div.id = item.sys.id;
    div.innerHTML = "\n            <div class=\"product__".concat(index + 1, "\">\n            <h3 class=\"product__").concat(index + 1, "--title\">").concat(item.fields.title, "</h3>\n            <div class=\"product__").concat(index + 1, "--image\">\n            <img\n                class=\"image--").concat(index + 1, "\"\n                src=\"").concat(item.fields.image.fields.file.url, "\"\n                alt=\"product ").concat(index + 1, "\"\n                class=\"product-image\"\n            />\n            </div>\n            <h5 class=\"product__1--price\">").concat(item.fields.price, " $</h5>\n            <button class=\"btn add-cart\">Add product</button>\n            </div>\n        ");
    productContainer.append(div);
  });
  loadListeners();
  loadPreviousCart();
  loadPreviousQtyCart();
}

function loadListeners() {
  var addCartBtn = document.querySelectorAll('.add-cart');
  addCartBtn.forEach(function (btn) {
    return btn.addEventListener('click', handleAddProduct);
  });
}

function loadPreviousCart() {
  var prevCart = getLocalStorage('currentCart');
  currentCart = prevCart ? prevCart : [];
  prevCart && displayCartItems(currentCart);
}

function loadPreviousQtyCart() {
  displayCartIcon('initialState');
}
//# sourceMappingURL=cart.dev.js.map
