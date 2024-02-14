fetch('/products.json')
  .then(response => {return response.json()})
  .then(data => {
    const products = data.products || [];       

    // MENU BURGER DEROULANT
    // Fonction qui permet l'ouverture et la fermeture de la barre de nav
    $("#burgerMenu img").on("click", function () {
      $(".header-mobile").slideToggle(300);
      const slided = true;
      return slided;
    });


    $.when( $.ready ).then(() => {
      let getProductObj = sessionStorage.getItem("productSelected");
      const choiceProduct = JSON.parse(getProductObj);

      let pageProductCtr = document.getElementsByClassName("page-product-dyn")[0];

      let pageProductElement = document.createElement('div');

      // Html créé représentant les produits créés en dynamiques 
      let produitTitle = document.getElementById("produit-title");
      produitTitle.innerHTML = choiceProduct.title;

      let produitPrice = document.getElementById("produit-prix");
      produitPrice.innerHTML = `${choiceProduct.price} €`;

      let produitDesc = document.getElementById("produit-desc");
      produitDesc.innerHTML = choiceProduct.description;

      let produitImg = document.getElementById("produit-img");
      produitImg.src = choiceProduct.image;

      produitImg.alt = choiceProduct.title;

      let produitIngre = document.getElementById("produit-ingre");
      produitIngre.innerHTML = choiceProduct.ingredients;

      let inputButtonCtr = document.getElementById("input-button-ctr");
      inputButtonCtr.innerHTML = `
      <input id="produit-input-${choiceProduct.id}" type="number" id="qte" value="1" min="1">
      <div id="produit-button-${choiceProduct.id}" class="text-style2">AJOUTER AU PANIER</div></div>`;

      // Les assignes en tant qu'enfant de produit
      pageProductCtr.appendChild(pageProductElement);
    });

});


