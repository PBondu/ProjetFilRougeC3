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


let cartCtr = [];


// PANIER
$.when($.ready).then(() => {
  fetch('/products.json')
    .then(response => { return response.json(); })
    .then(data => {
      const products = data.products || [];

      // Lien avec la div présente dans le HTML
      let productContainerCart = document.getElementsByClassName("panier-products-ctr")[0];

      // Get les items du panier stockés dans la session
      let cartSessionStorage = sessionStorage.getItem("cartCtr") ? JSON.parse(sessionStorage.getItem("cartCtr")) : [];

      let buttonAddToCartBoutique = document.querySelectorAll('.panier-produit');

      // Défini le panier avec les éléments de la session
      cartCtr = cartSessionStorage;
      var totalPrice = document.getElementsByClassName('user-price')[0];

      function resetPrintHtml() {
        productContainerCart.innerHTML = '';
        cartCtr.forEach(element => {
          PrintHtmlProductInCart(element);
        });
      };
      
      function PrintCartQuantity() {
        var quantOfProduct = 0;
        for (let i = 0; i < cartCtr.length; i++) {
          quantOfProduct += cartCtr[i].quantity;
        };
        var truc = document.getElementById('cart-number');
        truc.innerHTML = quantOfProduct;
      };

      PrintCartQuantity()

      resetPrintHtml();

      getQuantityOnUserChange();

      updateTotalPrice();

      deleteCall();

      // Ajout au panier page BOUTIQUE.HTML
      buttonAddToCartBoutique.forEach((item, index) => {
        item.addEventListener('click', () => {
          let clickedObject = products.find(objet => objet.id == index + 1);
          addToCartBoutique(clickedObject);
          getQuantityOnUserChange();
          deleteCall();
          updateTotalPrice();
          PrintCartQuantity()
        });
      });

      // Ajout au panier page PRODUIT.HTML
      for (let i = 0; i < products.length + 1; i++) {
        $(`#produit-button-${i}`).on('click', () => {
          addToCartProduit(products[i - 1]);
          getQuantityOnUserChange();
          deleteCall();
          updateTotalPrice();
          PrintCartQuantity()
        });
      };


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
        <button id="close-cart${productToAdd.id}" class="close-cart supr-item">X</button>
        <img src="${productToAdd.image}" alt="${productToAdd.title}">
        <div>
            <p class="text-style3">${productToAdd.title}</p>
            <p class="text-style3 price">${productToAdd.price} &#x20AC;</p>
        </div>
        <input class="cart-item-number cart-item${productToAdd.id}" type="number" value="${productToAdd.quantity}" min="1"></input>
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

      function updateTotalPrice() {
        let priceAdd = 0;
        for (let i = 0; i < cartCtr.length; i++) {
          priceAdd += cartCtr[i].totalPrice;
        };
        totalPrice.innerHTML = `${priceAdd.toFixed(2)} €`;
      };

      function deleteCall() {
        cartCtr.forEach(element => {
          deleteItemfromCart(element);
        });
      };

      function deleteItemfromCart(element) {
        $(`#close-cart${element.id}`).on('click', () => {
          PrintCartQuantity()
          cartCtr.splice(cartCtr.indexOf(element), 1);
          resetPrintHtml();
          /*
          let itemToDelete = document.getElementsByClassName(`cart${element.id}`)[0];
          itemToDelete.remove();*/
          console.log(cartCtr)
          sessionStorage.setItem("cartCtr", JSON.stringify(cartCtr));
          updateTotalPrice();
        });
      };
    });
});