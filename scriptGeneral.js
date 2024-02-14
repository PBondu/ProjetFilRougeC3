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

$.when($.ready).then(() => {
  fetch('/products.json')
    .then(response => { return response.json(); })
    .then(data => {
      const products = data.products || [];

      let menuProducts = document.querySelectorAll('.produit-info-div');

      menuProducts.forEach((item, index) => {
        item.addEventListener('click', () => {
          choiceProduct = products[index];
          sessionStorage.setItem("productSelected", JSON.stringify(choiceProduct));
          window.location = "/produit.html";
        });
      });
    });                   
});             


let cartCtr = [];


// ESPACE TEST CREATION PANIER
$.when($.ready).then(() => {
  fetch('/products.json')
    .then(response => { return response.json(); })
    .then(data => {
      const products = data.products || [];

      // Lien avec la div présente dans le HTML
      let productContainerCart = document.getElementsByClassName("panier-products-ctr")[0];

      // Get les items du panier stockés dans la session
      let cartSessionStorage = sessionStorage.getItem("cartCtr") ? JSON.parse(sessionStorage.getItem("cartCtr")) : [];
      let productContainerCartSessionStorage = sessionStorage.getItem("productContainerCart") ? JSON.parse(sessionStorage.getItem("productContainerCart")) : null;

      productContainerCart.innerHTML = productContainerCartSessionStorage;

      let buttonAddToCartBoutique = document.querySelectorAll('.panier-produit');
      let buttonDeleteItem = document.querySelectorAll('.product-cart-dyn button');

      // Défini le panier avec les éléments de la session
      cartCtr = cartSessionStorage;

      if(cartCtr[0] != undefined) {
      updateTotalQuantity();
      };


      $('body').on('change', () => {
        updateTotalQuantity();
      });

      deleteItemfromCart();

      keepQuantityOnRefresh();

      getQuantityOnUserChange();

      // Ajout au panier page BOUTIQUE.HTML
      buttonAddToCartBoutique.forEach((item, index) => {
        item.addEventListener('click', () => {
          addToCart(index);
        });
      });

      // Ajout au panier page PRODUIT.HTML
      for (let index = 0; index < products.length; index++) {
        $(`produit-button-${index + 1}`).on('click', () => {
          //addToCart(index + 1);
          console.log('ok')
        });
      };


      function addToCart (index) {
        let dataFromJson = products[index];

        // Déclaration de l'objet contenant les infos du produit affichées dans le panier
        let productInCart = {
          id: '',
          image: '',
          title: '',
          price: '',
          quantity: 1,
          delete: 'X',
          use: 0
        };

        // Transfert des infos désirée, du json vers l'objet
        productInCart.id = dataFromJson.id;
        productInCart.image = dataFromJson.image;
        productInCart.title = dataFromJson.title;
        productInCart.price = dataFromJson.price;

        // push l'objet avec les infos voulus
        cartCtr.push(productInCart);

        // Permet de chercher si l'id du produit est déjà dans le panier
        let clickedObject = cartCtr.find(objet => objet.id == index + 1);
        console.log(clickedObject)
        console.log(cartCtr)


        // SI le produit n'est pas dans le panier -->
        if (clickedObject.use == 0) {
          PrintHtmlProductInCart();
          getQuantityOnUserChange();
            

        } else { // SI le produit est déjà dans le panier
          // Pop out le dernier produit ajouté en double
          cartCtr.pop()

          getQuantityOnUserChange();

          // Incrémente la quantité de l'objet dans le cart
          clickedObject.quantity++

          let quantityInput = document.getElementsByClassName(`cart-item${clickedObject.id}`)[0];
          quantityInput.value = clickedObject.quantity // Qté dans le cart = qté dans l'input

          sessionStorage.setItem("cartCtr", JSON.stringify(cartCtr));
          sessionStorage.setItem("productContainerCart", JSON.stringify(productContainerCart.innerHTML));
        };
        
        updateTotalQuantity();


        function PrintHtmlProductInCart() {
          // Création du container HTML pour le produit dans le panier
          // ProductContainerCart = document.getElementsByClassName("panier-products-ctr")[0];
          let productElementCart = document.createElement('div');
          productElementCart.className = `product-cart-dyn cart${clickedObject.id} flexRow`;

          // Création de l'HTML pour créer l'emplacement du produit dans le panier avec toutes les bonnes infos, image, titre etc...
          productElementCart.innerHTML = `
          <button id="${clickedObject.id}" class="close-cart close-cart${clickedObject.id} supr-item">${clickedObject.delete}</button>
          <img src="${clickedObject.image}" alt="${clickedObject.title}">
          <div>
              <p class="text-style3">${clickedObject.title}</p>
              <p class="text-style3 price">${clickedObject.price} &#x20AC;</p>
          </div>
          <input class="cart-item-number cart-item${clickedObject.id}" type="number" value="${clickedObject.quantity}" min="1"></input>
          `;
          // Les assignes en tant qu'enfant de produit
          productContainerCart.appendChild(productElementCart);

          // Incrémente "use" pour signaler que le produit est déjà dans le panier
          clickedObject.use++

          sessionStorage.setItem("cartCtr", JSON.stringify(cartCtr));
          sessionStorage.setItem("productContainerCart", JSON.stringify(productContainerCart.innerHTML));
        };
      };

      // Au click vide le tableau correspondant au panier et vide l'HTML pour vider les éléments visuels contenus dans le panier
      let cartResetButton = document.getElementsByClassName('cart-reset')[0];
      $(cartResetButton).on('click', () => {
        cartCtr = [];
        productContainerCart.innerHTML = '';

        sessionStorage.setItem("cartCtr", JSON.stringify(cartCtr));
        sessionStorage.setItem("productContainerCart", JSON.stringify(productContainerCart.innerHTML));

        updateTotalQuantity();
      });

      // Garde la quantité du produit au sein du cart quand l'user change la quantité manuellement
      function getQuantityOnUserChange() {
        for (let index = 1; index < products.length; index++) {
          $(`.cart-item${(index)}`).on("change", () => {
            let quantityInputOnchange = document.getElementsByClassName(`cart-item${(index)}`)[0]; // Récupère l'input
            let objectToChangeQuantity = cartCtr.find(objet => objet.id == index); // Récupère l'objet
            objectToChangeQuantity.quantity = parseInt(quantityInputOnchange.value); // La quantité dans le cart = quantité de l'input

            sessionStorage.setItem("cartCtr", JSON.stringify(cartCtr));
          });
        };
      };

      // Garde la quantité des produits au refresh
      function keepQuantityOnRefresh() {
        for (let index = 0; index < cartCtr.length; index++) {
          let quantityInputRefresh = document.getElementsByClassName(`cart-item${cartCtr[index].id}`)[0]; // Récupère l'input lié à l'id du produit en question
          quantityInputRefresh.value = cartCtr[index].quantity; // la valeur de l'input est égale à la valeur de la quantity dans le cart
        };
      };

      function updateTotalQuantity() {
        let totalCounter = document.getElementsByClassName('user-price')[0];
        let totalQuantityInCart = 0;
        for (let product of cartCtr) {
          totalQuantityInCart += product.quantity;
        }
        totalCounter.innerHTML = totalQuantityInCart;
      };


      function deleteItemfromCart() {
        for (let index = 0; index < cartCtr.length; index++) {
          $(buttonDeleteItem[index]).on('click', () => {
            let nia = document.getElementsByClassName(`cart${cartCtr[index].id}`)[0];
            nia.remove()
            cartCtr.splice(cartCtr[index], 1)
            console.log(index)
            sessionStorage.setItem("cartCtr", JSON.stringify(cartCtr));
            sessionStorage.setItem("productContainerCart", JSON.stringify(productContainerCart.innerHTML));
          });
        };
      };
    });
});


// Panier V1

/*buttonAddToCartBoutique.forEach((item, index) => {
                                item.addEventListener('click', () => {
                                        let dataFromJson = products[index];


                                        // Permet de chercher si l'id du produit est déjà dans le panier, si "non" retourne undefined, si oui, retourne l'objet
                                        let clickedObject = cartCtr.find(objet => objet.id == index + 1);

                                        // création du container HTML pour le produit dans le panier
                                        //productContainerCart = document.getElementsByClassName("panier-products-ctr")[0];
                                        let productElementCart = document.createElement('div');
                                        productElementCart.className = 'product-cart-dyn flexRow';

                                        // SI le produit n'est pas dans le panier -->
                                        if (clickedObject === undefined) {

                                                console.log("if")
                                                // Déclaration de l'objet contenant les infos du produit affichées dans le panier
                                                let productInCart = {
                                                        id: '',
                                                        image: '',
                                                        title: '',
                                                        price: '',
                                                        quantity: 1,
                                                        delete: 'X'
                                                };

                                                // Transfert des infos désirée, du json vers l'objet
                                                productInCart.id = dataFromJson.id;
                                                productInCart.image = dataFromJson.image;
                                                productInCart.title = dataFromJson.title;
                                                productInCart.price = dataFromJson.price;

                                                // push l'objet avec les infos voulus
                                                cartCtr.push(productInCart);

                                                // Find qui récupère l'objet que l'on souhaite ajouter au panier au click
                                                let objectToPrint = cartCtr.find(objet => objet.id == index + 1);

                                                // Création de l'HTML pour créer l'emplacement du produit dans le panier avec toutes les bonnes infos, image, titre etc...
                                                productElementCart.innerHTML = `
                                                <button class="close-cart supr-item">${objectToPrint.delete}</button>
                                                <img src="${objectToPrint.image}" alt="${objectToPrint.title}">
                                                <div>
                                                        <p class="text-style3">${objectToPrint.title}</p>
                                                        <p class="text-style3 price">${objectToPrint.price} &#x20AC;</p>
                                                </div>
                                                <input class="cart-item-number cart-item${(objectToPrint.id)}" type="number" value="${objectToPrint.quantity}" min="1"></input>
                                                `;
                                                // Les assignes en tant qu'enfant de produit
                                                productContainerCart.appendChild(productElementCart);  

                        //--------		
                        let quantityInputInCart = document.getElementsByClassName(`cart-item${objectToPrint.id}`)[0];
                        //----------
                        $(quantityInputInCart).on('change', () => {
                            console.log('nana')
                        })

                                                sessionStorage.setItem("cartCtr", JSON.stringify(cartCtr));
                                                sessionStorage.setItem("productContainerCart", JSON.stringify(productContainerCart.innerHTML));


                                        } else { // SI le produit est déjà dans le panier
                                                // Trouve l'objet en question

                                                console.log("else")

                                                objectToChangeQuantity = cartCtr.find(objet => objet.id == index + 1);

                                                let quantityInputInCart = document.getElementsByClassName(`cart-item${objectToChangeQuantity.id}`)[0];

                                                objectToChangeQuantity.quantity = quantityInputInCart.value;

                                                // Incrémente la quantité
                                                let objectIncremented = parseInt(objectToChangeQuantity.quantity);
                                                objectIncremented++;

                                                // Change la quantité directement dans l'input de choix de quantité situé dans le panier et assigne le nombre en valeur par défaut
                                                quantityInputInCart.defaultValue = objectIncremented;

                        // ------------
                        $(quantityInputInCart).on('change', () => {
                                                quantityInputInCart.defaultValue = quantityInputInCart.value;
                        console.log(quantityInputInCart)
                        })
                        console.log(quantityInputInCart)

                                                objectToChangeQuantity.quantity = parseInt(quantityInputInCart.defaultValue);

                                                sessionStorage.setItem("cartCtr", JSON.stringify(cartCtr));
                                                sessionStorage.setItem("productContainerCart", JSON.stringify(productContainerCart.innerHTML));
                                        };
                                });
                        });*/






/*
    const { createApp } = Vue

    createApp({
        data() {
            return {
                products: [], // to store the imported products
            };

        },

        methods: {
            
            
            
            
        },

        mounted() {

            $.getJSON( "/products.json", function( data ) {
                var items = [];
                $.each( data, function( product, id ) {
                    items.push( "<li id='" + key + "'>" + val + "</li>" );
                });
            
                $( "<ul/>", {
                    "class": "my-new-list",
                    html: items.join( "" )
                }).appendTo( "body" );
                
            });
        },
    });
            


            /*
            fetch('products.json')
            .then(response => response.json())
            .then(data => { 
                this.products = data.products || [];
                console.log(this.products[0].title)

            }).catch(error => {
                console.error('Error loading products:', error);
            });
                
        }
    }).mount('.page-product-ctr')



    // Tentative de fonction fetch
    /*async function createFetch () {

        return fetch('/products.json')
        .then(response => {return response.json()})
        .then(data => {
            console.log(data)
            return products = data.products || [];
        })

    };

    createFetch()
    .then((products) => { console.log(products) })

    //console.log(createFetch());
    //console.log(products)



    // Retourne l'URL de la page pour adapter le srcipt en fonction de la page
    let myUrl = document.URL;

    // MENU BURGER DEROULANT
    // Fonction qui permet l'ouverture et la fermeture de la barre de nav
    $("#burgerMenu img").on("click", function () {
        $(".header-mobile").slideToggle(300);
        const slided = true;
        return slided;
    });

    // PANIER DEROULANT
    // Ferme le panier en cliquant sur le bouton en forme de croix
    $(".close-cart").on("click", function () {
        $(".panier-ctr").slideToggle(400);
        const slided = true;
        return slided;
    });
    // Déroule la panier au click sur l'icone cart
    $(".panier").on("click", function () {
        $(".panier-ctr").slideToggle(400);
        const slided = true;
        return slided;
    });

    function getClassByQ(selector) {
        return document.querySelector(selector);
    };


    pageProduct(products[2]);

    async function pageProduct(product) {
                                
    let pageProductCtr = document.getElementsByClassName("page-product-dyn")[0];
                
    let pageProductElement = document.createElement('div');
    
    // Html créé représentant les produits créés en dynamiques 
    pageProductElement.innerHTML = `
    <div class="table flexCol alignBaseline width100">
    <div class="text-style1">${product.title}</div>
    <div class="text-style3">${product.price} €</div>
    <div class="text-style4">${product.description}</div>
    <input type="number" id="qte" value="1">
    <div class="text-style2">AJOUTER AU PANIER</div>
    </div>
    <div class="table-product flexCol">
    <img src="${product.image}" alt="produit1">
    </div>
    <div class="ingre content flexCol alignBaseline width100">
    <div class="text-style1">Ingrédients</div>
    <div>${product.ingredients}</div>
    </div>
        `;
    // Les assignes en tant qu'enfant de produit
    pageProductCtr.appendChild(pageProductElement);
    };*/
    //--------------------


    // FILTRES BOUTIQUE
/*

    // Début du IF pour délpoyer les menus déroulants uniquement sur mobiles
    if (window.innerWidth < 768) {

        // Fonction qui permet de créer un dropdown sur le filtre CATEGORIE de la boutique
        $(".filtre-category-button").on("click", function () {
            $(".filtre-category").slideToggle(300);
            const slidedCat = true;
            return slidedCat;
        });

        // Fonction qui permet de créer un dropdown sur le filtre PRICE de la boutique
        $(".filtre-price-button").on("click", function () {
            $(".filtre-price").slideToggle(300);
            const slidedCat = true;
            return slidedCat;
        });

        // Fonction qui permet de créer un dropdown sur le filtre NOTE de la boutique
        $(".filtre-note-button").on("click", function () {
            $(".filtre-note").slideToggle(300);
            const slidedCat = true;
            return slidedCat;
        });

        // Ajoute un "+" derrière le filtre en version mobile
        getClass("filtre-category-button").innerHTML = "Cat&eacute;gories &#43;";
        getClass("filtre-price-button").innerHTML = "Prix &#43;";
        getClass("filtre-note-button").innerHTML = "Notes &#43;";


        // Initialise une variable pour comparer si l'icone à côté du menu deroulant est un "+" ou un "-"
        let plusCat = "+";
        getClass("filtre-category-button").innerHTML = "Cat&eacute;gories &#43;"
        // Fonction qui, au click, change l'icone à côté de "Catégories" du "+" au "-" et inversement
        getClass("filtre-category-button").addEventListener("click", function () {
            if (plusCat == "+") {
                getClass("filtre-category-button").innerHTML = "Cat&eacute;gories &#45;";
                plusCat = "-";
            }
            else if (plusCat == "-") {
                getClass("filtre-category-button").innerHTML = "Cat&eacute;gories &#43;";
                plusCat = "+";
            };
        });

        // répétition de la fonction ci-dessus pour le filtre sur les prix et sur les notes
        // Prix
        let plusPrice = "+";

        getClass("filtre-price-button").addEventListener("click", function () {
            if (plusPrice == "+") {
                getClass("filtre-price-button").innerHTML = "Prix &#45;";
                plusPrice = "-";
            }
            else if (plusPrice == "-") {
                getClass("filtre-price-button").innerHTML = "Prix &#43;";
                plusPrice = "+";
            }
        });

        // Notes
        let plusNote = "+";

        getClass("filtre-note-button").addEventListener("click", function () {
            if (plusNote == "+") {
                getClass("filtre-note-button").innerHTML = "Notes &#45;";
                plusNote = "-";
            }
            else if (plusNote == "-") {
                getClass("filtre-note-button").innerHTML = "Notes &#43;";
                plusNote = "+";
            }
        });

        // Fonction pour récupérer la class name
        function getClass(maClass) {
            return document.getElementsByClassName(maClass)[0];
        };
    }; //Fin du IF pour réserver à la patie mobile


    //--------------------


    // Fonction qui crée les produits dynamiquement ET qui intègre les filtres

        // Charge le fichier JSON
    
            // Récupère le conteneur des produits
            let productContainer = document.getElementById('produit-ctr');

            // Crée dynamiquement des éléments pour chaque produit
            products.forEach(function (product) {
                let productElement = document.createElement('article');
                productElement.className = `produit prodId${product.id}`;

                // Ajoute des classes en fonction des catégories
                Object.keys(product.category).forEach(category => {
                    if (product.category[category]) {
                        productElement.classList.add('ch' + category.charAt(0).toUpperCase() + category.slice(1));
                    }
                });

                // Html créé représentant les produits créés en dynamiques 
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <p class="text-style3">${product.title}</p>
                    <p class="text-style3 price">${product.price} &#x20AC;</p>
                    <p class="text-style3 note">Note: ${product.note}</p>
                    <button class="panier-produit pointer border-style text-style3">Ajouter au Panier</button> `;
                // Les assignes en tant qu'enfant de produit
                productContainer.appendChild(productElement);
            });


            
                var robin = document.getElementsByTagName("article")[0];





                /*
                var loadNewContent = function (){
                    $.ajax("produit.html", {
                        success: function() {
                            $( "#cola" ).on( "click", function() {
                            var htmlString = $( this ).html();
                            $( this ).text( htmlString );
                        });
                        }
                    }); 
                };*/
                
                
                /*
                pageProduct(products[0]);

                function pageProduct(product) {
                                    
                    let pageProductCtr = document.getElementsByClassName("page-product-ctr")[0];
                                
                    let pageProductElement = document.createElement('div');
                    pageProductElement.className = '';
                    
                    // Html créé représentant les produits créés en dynamiques 
                    pageProductElement.innerHTML = `
                    <div class="table flexCol alignBaseline width100">
                    <div class="text-style1">${product.title}</div>
                    <div class="text-style3">${product.price} €</div>
                    <div class="text-style4">${product.description}</div>
                    <input type="number" id="qte" value="1">
                    <div class="text-style2">AJOUTER AU PANIER</div>
                </div>
                <div class="table-product flexCol">
                    <img src="${product.image}" alt="produit1">
                </div>
                <div class="ingre content flexCol alignBaseline width100">
                    <div class="text-style1">Ingrédients</div>
                    <div>${product.ingredients}</div>
                </div>
                        `;
                    // Les assignes en tant qu'enfant de produit
                    pageProductCtr.appendChild(pageProductElement);
                };*/

                /*
                // ESPACE TEST CREATION PANIER

                function getClassByQ(selector) {
                    return document.querySelector(selector);
                };

                let panier = [];

                
                function addToCart(product) {

                };

                function CreateCartProduct(product) {

                    let productContainerCart = document.getElementsByClassName("panier-products-ctr")[0];

                    let productElementCart = document.createElement('div');
                    productElementCart.className = 'product-cart-dyn flexRow';

                    // Html créé représentant les produits créés en dynamiques 
                    productElementCart.innerHTML = `
                        <button class="close-cart supr-item">X</button>
                        <img src="${product.image}" alt="${product.title}">
                        <div>
                            <p class="text-style3">${product.title}</p>
                            <p class="text-style3 price">${product.price} &#x20AC;</p>
                        </div>
                        <input id="cart-item-number" type="number" value="1" min="1"></input>
                        `;
                    // Les assignes en tant qu'enfant de produit
                    productContainerCart.appendChild(productElementCart);
                };

                /*getClassByQ(".cart-reset").addEventListener('click', cleanCart);

                function cleanCart(){
                    productContainerCart.style.display ="none"

                }


                

                // ESPACE TEST CREATION PRODUIT.HTML DYNAMIQUES






                // Récupère les classes des checkbox des Filtres
                let filterAll = document.getElementsByClassName('ch-all')[0];
                let filterBlanc = document.getElementsByClassName('ch-blanc')[0];
                let filterLait = document.getElementsByClassName('ch-lait')[0];
                let filterNoir = document.getElementsByClassName('ch-noir')[0];
                let filterCaramel = document.getElementsByClassName('ch-caramel')[0];
                let filterNoix = document.getElementsByClassName('ch-noix')[0];
                let filterFruit = document.getElementsByClassName('ch-fruit')[0];
                let filterLiqueur = document.getElementsByClassName('ch-liqueur')[0];



                let minPriceInput = document.getElementById('prix-min');
                let maxPriceInput = document.getElementById('prix-max');

                minPriceInput.addEventListener('change', filterProducts);
                maxPriceInput.addEventListener('change', filterProducts);



                let minNoteInput = document.getElementById('note-min');
                let maxNoteInput = document.getElementById('note-max');

                minNoteInput.addEventListener('change', filterProducts);
                maxNoteInput.addEventListener('change', filterProducts);



                // Au check les produits s'affichent ou se masquent
                // Egalement les cases de cochent et se décochent si on coche la case TOUT
                filterAll.addEventListener('change', closeOnAll);
                filterAll.addEventListener('change', filterProducts);

                filterBlanc.addEventListener('change', closeAllOnOther);
                filterBlanc.addEventListener('change', filterProducts);

                filterLait.addEventListener('change', closeAllOnOther);
                filterLait.addEventListener('change', filterProducts);

                filterNoir.addEventListener('change', closeAllOnOther);
                filterNoir.addEventListener('change', filterProducts);

                filterCaramel.addEventListener('change', closeAllOnOther);
                filterCaramel.addEventListener('change', filterProducts);

                filterNoix.addEventListener('change', closeAllOnOther);
                filterNoix.addEventListener('change', filterProducts);

                filterFruit.addEventListener('change', closeAllOnOther);
                filterFruit.addEventListener('change', filterProducts);

                filterLiqueur.addEventListener('change', closeAllOnOther);
                filterLiqueur.addEventListener('change', filterProducts);

                // Fonction qui décoche toutes les cases quand l'on coche TOUS
                function closeOnAll() {
                    filterBlanc.checked = false;
                    filterLait.checked = false;
                    filterNoir.checked = false;
                    filterCaramel.checked = false;
                    filterNoix.checked = false;
                    filterFruit.checked = false;
                    filterLiqueur.checked = false;
                };
                // Fonction qui décoche TOUS quand l'on coche une autre case
                function closeAllOnOther() {
                    filterAll.checked = false;
                };

                // Récupère le chargement de la page et lance la fonction ci-dessous
                document.querySelector(".content").onload = closeFilterOnLoad();
                // Fonction pour décocher les filtres au chargement de la page
                function closeFilterOnLoad() {
                    filterAll.checked = true;
                    filterBlanc.checked = false;
                    filterLait.checked = false;
                    filterNoir.checked = false;
                    filterCaramel.checked = false;
                    filterNoix.checked = false;
                    filterFruit.checked = false;
                    filterLiqueur.checked = false;
                    minPriceInput.value = 0;
                    maxPriceInput.value = 20;
                    minNoteInput.value = 1;
                    maxNoteInput.value = 5;
                };

                // Fonction pour filtrer les produits en fonction des cases à cocher
                function filterProducts() {
                    let selectedCategories = [];
                    // Si case est cochée -> push la catégorie cochée au tableau catégories sélectionnées
                    if (filterAll.checked) {
                        selectedCategories.push('chBlanc');
                        selectedCategories.push('chLait');
                        selectedCategories.push('chNoir');
                        selectedCategories.push('chCaramel');
                        selectedCategories.push('chNoix');
                        selectedCategories.push('chFruit');
                        selectedCategories.push('chLiqueur');
                    }
                    if (filterBlanc.checked) {
                        selectedCategories.push('chBlanc');
                    }
                    if (filterLait.checked) {
                        selectedCategories.push('chLait');
                    }
                    if (filterNoir.checked) {
                        selectedCategories.push('chNoir');
                    }
                    if (filterCaramel.checked) {
                        selectedCategories.push('chCaramel');
                    }
                    if (filterNoix.checked) {
                        selectedCategories.push('chNoix');
                    }
                    if (filterFruit.checked) {
                        selectedCategories.push('chFruit');
                    }
                    if (filterLiqueur.checked) {
                        selectedCategories.push('chLiqueur');
                    }

                    const minNote = parseFloat(minNoteInput.value) || 1;
                    const maxNote = parseFloat(maxNoteInput.value) || 5;

                    const minPrice = parseFloat(minPriceInput.value) || 0;
                    const maxPrice = parseFloat(maxPriceInput.value) || 20;

                    // Affiche ou masque les produits en fonction des catégories sélectionnées
                    let allProducts = document.getElementsByClassName('produit');
                    for (let i = 0; i < allProducts.length; i++) {
                        let product = allProducts[i];
                        const productPrice = parseFloat(product.querySelector('.price').textContent.split(' €')[0]);// Récupère le prix du produit
                        const productNote = parseFloat(product.querySelector('.note').textContent.split('Note: ')[1]);// Récupère la note du produit
                        const isVisible = selectedCategories.length === 0 || selectedCategories.some(cat => product.classList.contains(cat));
                        const isInPriceRange = productPrice >= minPrice && productPrice <= maxPrice; // Affiche le produit si le prix est dans la range sélectionnée par l'utilisateur
                        const isInNoteRange = productNote >= minNote && productNote <= maxNote; // Same pour la note
                        product.style.display = (isVisible && isInPriceRange && isInNoteRange) ? 'flex' : 'none'; // Si le produit respecte les conditions de prix, note et catégories display:flex / si non :none
                    };
                };
*/
/* PAGE INDEX

    //--------------------


    // Carrousel
    // Définition des variables
    const slidesContainer = document.getElementsByClassName("carrousel-flow")[0];
    const slide = document.querySelector(".slide");
    const prevButton = document.getElementsByClassName("arrow-prev")[0];
    const nextButton = document.getElementsByClassName("arrow-next")[0];

    // Stockage des dots d'indication des slides
    const SlideButton1 = document.getElementsByClassName("dot-one")[0];
    const SlideButton2 = document.getElementsByClassName("dot-two")[0];
    const SlideButton3 = document.getElementsByClassName("dot-three")[0];

    SlideButton1.style.background = "deepskyblue";

    // Fonction d'écoute de click sur le bouton pour scroll à la largeur de l'écran et ainsi changer de slide
    nextButton.addEventListener("click", () => {
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft += slideWidth;

        if (SlideButton1.style.background == "deepskyblue") {
            SlideButton1.style.background = "white";
            SlideButton2.style.background = "deepskyblue";
        } else if (SlideButton2.style.background == "deepskyblue") {
            SlideButton2.style.background = "white";
            SlideButton3.style.background = "deepskyblue";
        }
    });

    prevButton.addEventListener("click", () => {
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft -= slideWidth;

        if (SlideButton2.style.background == "deepskyblue") {
            SlideButton2.style.background = "white";
            SlideButton1.style.background = "deepskyblue";
        } else if (SlideButton3.style.background == "deepskyblue") {
            SlideButton3.style.background = "white";
            SlideButton2.style.background = "deepskyblue";
        }
    });
    // Permet de revenir à la slide d'origine en cas de changement de device
    slide.clientWidth.onchange = slidesContainer.scrollLeft -= 10000;
*/
    
 // FIN DU FETCH 