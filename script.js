// Retourne l'URL de la page pour adapter le srcipt en fonction de la page
let myUrl = document.URL;

// MENU BURGER DEROULANT
// Fonction qui permet l'ouverture et la fermeture de la barre de nav
$("#burgerMenu img").on("click", function () {
  $(".header-mobile").slideToggle(300);
  const slided = true;
  return slided;
});

//--------------------
/*
setInterval(function() {
    console.log(window.innerWidth);
  }, 1000);*/
// FILTRES BOUTIQUE
// Début du IF qui vérifie que l'on soit positionné sur la page boutique
if (myUrl.includes("boutique") == true) {

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

  // Fonction pour ajouter des produits dynamiquement
  /*document.addEventListener("DOMContentLoaded", function(e) { function ajoutProduit(image, title, price, note, blanc, lait, noir, caramel, noix, fruit, liqueur) {

    let div_produit = document.createElement("div");// Création de la div contenant les infos produits
    div_produit.className = "produit";

    const categories = ["Blanc", "Lait", "Noir", "Caramel", "Noix", "Fruit", "Liqueur"];

    categories.forEach(category => {
        if (eval(category.toLowerCase())) {
            div_produit.classList.add("ch" + category);
        }
    });
    //Boucle qui comprends des IF qui créent des classes en fonction des catégories des chocolats
    /*for (let i = 0; i < 7; i++) {
      if (blanc == true && div_produit.className.includes("Blanc") == false) {
        div_produit.className = div_produit.className + " chBlanc";
      }
      else if (lait == true && div_produit.className.includes("Lait") == false) {
        div_produit.className = div_produit.className + " chLait";
      }
      else if (noir == true && div_produit.className.includes("Noir") == false) {
        div_produit.className = div_produit.className + " chNoir";
      }
      else if (caramel == true && div_produit.className.includes("Caramel") == false) {
        div_produit.className = div_produit.className + " chCaramel";
      }
      else if (noix == true && div_produit.className.includes("Noix") == false) {
        div_produit.className = div_produit.className + " chNoix";
      }
      else if (fruit == true && div_produit.className.includes("Fruit") == false) {
        div_produit.className = div_produit.className + " chFruit";
      }
      else if (liqueur == true && div_produit.className.includes("Liqueur") == false) {
        div_produit.className = div_produit.className + " chLiqueur";
      }
      else { };
    }; // Fin de la boucle d'association des categories

    // Création image produit
    let image_produit = document.createElement("img");
    image_produit.src = image;

    // Création title produit
    let nom_produit = document.createElement("p");
    nom_produit.textContent = title;
    nom_produit.className = "text-style3";

    // Création <p> price
    let prix_produit = document.createElement("p");
    prix_produit.textContent = price + " €";
    prix_produit.className = "text-style3";

    // Création <p> note
    let note_produit = document.createElement("p");
    note_produit.textContent = "Note : " + note + " ★";
    note_produit.className = "text-style3";

    //Création button add to cart
    let ajoutBouton = document.createElement("button");
    ajoutBouton.textContent = "Ajouter au panier";
    ajoutBouton.className = "panier-produit pointer border-style text-style3";

    // Set la div produit en parent des images, noms etc ...
    div_produit.appendChild(image_produit);
    div_produit.appendChild(nom_produit);
    div_produit.appendChild(prix_produit);
    div_produit.appendChild(note_produit);
    div_produit.appendChild(ajoutBouton);

    // set la div produit en enfant de produit-ctr qui est présent dans le HMTL
    document.getElementById("produit-ctr").appendChild(div_produit);

  };// Fin de la fonction

  // IMPORT JSON pour données des produits
  fetch("/products.json")
    .then(response => response.json())
    .then(data => {
      // Récupère les données du JSON et les associe aux variables créées ci-dessus
      data.products.forEach(product => {
        ajoutProduit(product.image, product.title, product.price, product.note, product.category.blanc, product.category.lait, product.category.noir, product.category.caramel, product.category.noix, product.category.fruit, product.category.liqueur);
      });
    })
    .catch(error => console.error('Error fetching JSON:', error));

  
    */

    // Fonction qui crée les produits dynamiquement ET qui intègre les filtres
  document.addEventListener('DOMContentLoaded', function () {
    // Charge le fichier JSON
    fetch('products.json')
      .then(response => response.json())
      .then(data => {
        const products = data.products || [];

        // Récupère le conteneur des produits
        var productContainer = document.getElementById('produit-ctr');

        // Crée dynamiquement des éléments pour chaque produit
        products.forEach(function (product) {
          var productElement = document.createElement('div');
          productElement.className = 'produit';

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
            <p class="text-style3">Price: ${product.price}</p>
            <p class="text-style3">Note: ${product.note}</p>
            <button class="panier-produit pointer border-style text-style3">Ajouter au Panier</button> `;
          // Les assignes en tant qu'enfant de produit
          productContainer.appendChild(productElement);
        });

        // Récupère les classes des checkbox des Filtres
        var filterAll = document.getElementsByClassName('ch-all')[0];
        var filterBlanc = document.getElementsByClassName('ch-blanc')[0];
        var filterLait = document.getElementsByClassName('ch-lait')[0];
        var filterNoir = document.getElementsByClassName('ch-noir')[0];
        var filterCaramel = document.getElementsByClassName('ch-caramel')[0];
        var filterNoix = document.getElementsByClassName('ch-noix')[0];
        var filterFruit = document.getElementsByClassName('ch-fruit')[0];
        var filterLiqueur = document.getElementsByClassName('ch-liqueur')[0];

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
        function closeOnAll () {
          filterBlanc.checked = false;
          filterLait.checked = false;
          filterNoir.checked = false;
          filterCaramel.checked = false;
          filterNoix.checked = false;
          filterFruit.checked = false;
          filterLiqueur.checked = false;
        };
        // Fonction qui décoche TOUS quand l'on coche une autre case
        function closeAllOnOther () {
          filterAll.checked = false;
        };

        // Récupère le chargement de la page et lance la fonction ci-dessous
        document.querySelector(".content").onload = closeFilter();
        // Fonction pour décocher les filtres au chargement de la page
        function closeFilter() {
          filterAll.checked = false;
          filterBlanc.checked = false;
          filterLait.checked = false;
          filterNoir.checked = false;
          filterCaramel.checked = false;
          filterNoix.checked = false;
          filterFruit.checked = false;
          filterLiqueur.checked = false;
        };
        
        // Fonction pour filtrer les produits en fonction des cases à cocher
        function filterProducts() {
          var selectedCategories = [];
          // Si case est cochée -> push la catégorie cochée
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

          // Affiche ou masque les produits en fonction des catégories sélectionnées
          var allProducts = document.getElementsByClassName('produit');
          for (var i = 0; i < allProducts.length; i++) {
            var product = allProducts[i];
            var isVisible = selectedCategories.length === 0 || selectedCategories.some(cat => product.classList.contains(cat));
            product.style.display = isVisible ? 'flex' : 'none';
          }
        }
      })
      .catch(error => console.error('Error loading JSON:', error));
  });
}; // FIN DU IF BOUTIQUE


//--------------------


// Début du if permettant de vérifier dêtre sur la page index.html
if (myUrl.includes("index") == true) {
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

}; // FIN DU IF INDEX

