// Initialisation du panier
let cartCtr = [];

// Fetch du JSON
$.when($.ready).then(() => {
  fetch('/products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(async data => {
      let products = await data.products || [];
      sessionStorage.setItem("products", JSON.stringify(products)); // Récupère les données du JSON
    });
});
//Permet de sortir du fetch les données JSON
let products = sessionStorage.getItem("products") ? JSON.parse(sessionStorage.getItem("products")) : [];

// Get les items du panier stockés dans la session
let cartSessionStorage = sessionStorage.getItem("cartCtr") ? JSON.parse(sessionStorage.getItem("cartCtr")) : [];
cartCtr = cartSessionStorage;

// Lien avec la div présente dans le HTML
let productContainerCart = document.getElementsByClassName("panier-products-ctr")[0];
// Défini le panier avec les éléments de la session
var totalPrice = document.getElementsByClassName('user-price')[0];

// Call des fonctions de mise à jour des données
PrintCartQuantity()
resetPrintHtml();
getQuantityOnUserChange();
updateTotalPrice();

// Fait le lien avec la page boutique pour l'ajout au panier
function addToCartlinkBoutique(prod){
  let clickedObject = products.find(objet => objet.id == prod);
  addToCartBoutique(clickedObject)
  getQuantityOnUserChange();
  updateTotalPrice();
  PrintCartQuantity();
}
// Fait le lien avec la page produit pour l'ajout au panier
function addToCartlinkProduit(prod){
  let clickedObject = products.find(objet => objet.id == prod);
  addToCartProduit(clickedObject)
  getQuantityOnUserChange();
  updateTotalPrice();
  PrintCartQuantity();
}

// Ajoute le produit au panier depuis la page boutique
function addToCartBoutique(productToAdd) {
  let objInCart = cartCtr.find(objet => objet.id == productToAdd.id);
  if (objInCart === undefined) {
    productToAdd.quantity = 1;
    productToAdd.totalPrice = productToAdd.quantity * productToAdd.price;
    cartCtr.push(productToAdd);
    PrintHtmlProductInCart(productToAdd);
    sessionStorage.setItem("cartCtr", JSON.stringify(cartCtr));
  } else {
    objInCart.quantity++;
    objInCart.totalPrice = objInCart.quantity * objInCart.price;
    document.getElementsByClassName(`cart-item${(objInCart.id)}`)[0].value = objInCart.quantity;
    sessionStorage.setItem("cartCtr", JSON.stringify(cartCtr));
  }
};

// Ajoute le produit au panier depuis la page produit / nuance sur la quatité d'ajout
function addToCartProduit(productToAdd) {
  let objInCart = cartCtr.find(objet => objet.id == productToAdd.id);
  let inputProduct = document.querySelector(`#produit-input-${productToAdd.id}`);
  if (objInCart === undefined) {
    productToAdd.quantity = inputProduct.valueAsNumber;
    productToAdd.totalPrice = productToAdd.quantity * productToAdd.price;
    cartCtr.push(productToAdd);
    PrintHtmlProductInCart(productToAdd);
    sessionStorage.setItem("cartCtr", JSON.stringify(cartCtr));
  } else {
    objInCart.quantity += inputProduct.valueAsNumber;
    objInCart.totalPrice = objInCart.quantity * objInCart.price;
    document.getElementsByClassName(`cart-item${(objInCart.id)}`)[0].value = objInCart.quantity;
    sessionStorage.setItem("cartCtr", JSON.stringify(cartCtr));
  }
};

function PrintHtmlProductInCart(productToAdd) {
  // Création du container HTML pour le produit dans le panier
  let productElementCart = document.createElement('div');
  productElementCart.className = `product-cart-dyn cart${productToAdd.id} flexRow`;

  // Création de l'HTML pour créer l'emplacement du produit dans le panier avec toutes les bonnes infos, image, titre etc...
  productElementCart.innerHTML = `
        <button onClick="deleteCall(${productToAdd.id})" id="suppr${productToAdd.id}" class="supr-item text-style3">X</button>
        <img src="${productToAdd.image}" alt="${productToAdd.title}">
        <div>
            <p class="text-style3">${productToAdd.title}</p>
            <p class="text-style3 price">${productToAdd.price} &#x20AC;</p>
        </div>
        <input class="cart-item-number input-button cart-item${productToAdd.id}" type="number" value="${productToAdd.quantity}" min="1"></input>
        `;
  // Les assignes en tant qu'enfant de produit
  productContainerCart.appendChild(productElementCart);

  sessionStorage.setItem("cartCtr", JSON.stringify(cartCtr));
};

// Au click vide le tableau correspondant au panier et vide l'HTML pour vider les éléments visuels contenus dans le panier
let cartResetButton = document.getElementsByClassName('cart-reset')[0];
$(cartResetButton).on('click', () => {
  cartCtr = [];
  sessionStorage.setItem("cartCtr", JSON.stringify(cartCtr));
  updateTotalPrice();
  resetPrintHtml();
  PrintCartQuantity()
});

// Garde la quantité du produit au sein du cart quand l'user change la quantité manuellement
function getQuantityOnUserChange() {
  for (let index = 1; index < products.length + 1; index++) {
    $(`.cart-item${(index)}`).on("change", () => {
      let quantityInputOnchange = document.getElementsByClassName(`cart-item${(index)}`)[0]; // Récupère l'input
      let objectToChangeQuantity = cartCtr.find(objet => objet.id == index); // Récupère l'objet
      objectToChangeQuantity.quantity = parseInt(quantityInputOnchange.value); // La quantité dans le cart = quantité de l'input
      objectToChangeQuantity.totalPrice = objectToChangeQuantity.quantity * objectToChangeQuantity.price;
      sessionStorage.setItem("cartCtr", JSON.stringify(cartCtr));
      updateTotalPrice();
      PrintCartQuantity()
    });
  };
};

// Met à jour le prix du panier
function updateTotalPrice() {
  let priceAdd = 0;
  for (let i = 0; i < cartCtr.length; i++) {
    priceAdd += cartCtr[i].totalPrice;
  };
  totalPrice.innerHTML = `${priceAdd.toFixed(2)} €`;
};

// Supprime l'item du panier en cliquant sur X
function deleteCall(prod) {
  let clickedObject = cartCtr.find(objet => objet.id == prod);
  cartCtr.splice(cartCtr.indexOf(clickedObject), 1);
  resetPrintHtml();
  PrintCartQuantity()
  updateTotalPrice();
  getQuantityOnUserChange()
  sessionStorage.setItem("cartCtr", JSON.stringify(cartCtr));
};

// affiche tous les produits qui sont dans le panier
function resetPrintHtml() {
  productContainerCart.innerHTML = '';
  cartCtr.forEach(element => {
    PrintHtmlProductInCart(element);
  });
};

// Affiche la quantité totale du panier
function PrintCartQuantity() {
  let quantOfProduct = 0;
  for (let i = 0; i < cartCtr.length; i++) {
    quantOfProduct += cartCtr[i].quantity;
  };
  let cartNumber = document.getElementById('cart-number');
  cartNumber.innerHTML = quantOfProduct;
};

// PANIER DEROULANT
// Ferme le panier en cliquant sur le bouton en forme de croix
$(".close-cart").on("click", () => {
  $(".panier-ctr").slideToggle(400);
  const slided = true;
  return slided;
});
// Déroule la panier au click sur l'icone cart
$(".panier img").on("click", () => {
  $(".panier-ctr").slideToggle(400);
  const slided = true;
  return slided;
});

// MENU BURGER DEROULANT
// Fonction qui permet l'ouverture et la fermeture de la barre de nav
$("#burgerMenu img").on("click", function () {
  $(".header-mobile").slideToggle(300);
  const slided = true;
  return slided;
});

