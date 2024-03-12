fetch('/products.json')
  .then(response => { return response.json() })
  .then(data => {
    const products = data.products || [];

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
    let productContainerOfAllProducts = document.getElementById('produit-ctr');

    // Crée dynamiquement des éléments pour chaque produit
    products.forEach(function (product) {
      let productElement = document.createElement('div');

      let productElementInfo = document.createElement('div');
      let productElementButton = document.createElement('div');
      productElement.className = 'produit';
      productElementInfo.className = 'produit-info-div'
      productElementButton.className = 'produit-button-div'

      // Ajoute des classes en fonction des catégories
      Object.keys(product.category).forEach(category => {
        if (product.category[category]) {
          productElement.classList.add('ch' + category.charAt(0).toUpperCase() + category.slice(1));
        }
      });

      // Html créé représentant les produits créés en dynamiques 
      productElementInfo.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <p class="text-style3">${product.title}</p>
            <p class="text-style3 price">${product.price} &#x20AC;</p>
            <p class="text-style3 note">Note: ${product.note}</p>
            `;
      productElementButton.innerHTML =
        '<button class="panier-produit pointer border-style text-style3">Ajouter au Panier</button>'
      //<button onclick="myFunction()">Click me</button>

      productElement.appendChild(productElementInfo);
      productElement.appendChild(productElementButton);

      // Les assignes en tant qu'enfant de produit
      productContainerOfAllProducts.appendChild(productElement);

    });


    // Récupère les classes des checkbox des Filtres
    let filterAll = document.getElementsByClassName('ch-all')[0];
    let filterBlanc = document.getElementsByClassName('ch-blanc')[0];
    let filterLait = document.getElementsByClassName('ch-lait')[0];
    let filterNoir = document.getElementsByClassName('ch-noir')[0];
    let filterCaramel = document.getElementsByClassName('ch-caramel')[0];
    let filterNoix = document.getElementsByClassName('ch-noix')[0];
    let filterFruit = document.getElementsByClassName('ch-fruit')[0];
    let filterLiqueur = document.getElementsByClassName('ch-liqueur')[0];

    /********************************/

    let minPriceInput = document.getElementById('prix-min');
    let maxPriceInput = document.getElementById('prix-max');

    minPriceInput.addEventListener('change', filterProducts);
    maxPriceInput.addEventListener('change', filterProducts);

    /********************************/

    let minNoteInput = document.getElementById('note-min');
    let maxNoteInput = document.getElementById('note-max');

    minNoteInput.addEventListener('change', filterProducts);
    maxNoteInput.addEventListener('change', filterProducts);

    /********************************/

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
    // Permet de changer d'afficher la page du produit sur lequel l'utilisateur clique en étant sur la page boutique.
    let menuProducts = document.querySelectorAll('.produit-info-div');
    menuProducts.forEach((item, index) => {
      item.addEventListener('click', () => {
        choiceProduct = products[index];
        sessionStorage.setItem("productSelected", JSON.stringify(choiceProduct));
        window.location.href = "/produit.html";
      });
    });

  });