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
if (myUrl.includes("boutique") == true){

  // Début du IF pour délpoyer les menus déroulants uniquement sur mobiles
  if (window.innerWidth < 768){

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
    getClass("filtre-category-button").innerHTML = "Cat&eacute;gories &#43;"
    getClass("filtre-price-button").innerHTML = "Prix &#43;";
    getClass("filtre-note-button").innerHTML = "Notes &#43;";


    // Initialise une variable pour comparer si l'icone à côté du menu deroulant est un "+" ou un "-"
    let plusCat = "+";
    getClass("filtre-category-button").innerHTML = "Cat&eacute;gories &#43;"
    // Fonction qui, au click, change l'icone à côté de "Catégories" du "+" au "-" et inversement
    getClass("filtre-category-button").addEventListener("click",function(){
      if (plusCat == "+"){
      getClass("filtre-category-button").innerHTML = "Cat&eacute;gories &#45;";
      plusCat = "-";
    }
    else if(plusCat == "-"){
      getClass("filtre-category-button").innerHTML = "Cat&eacute;gories &#43;";
      plusCat = "+";
    }});

    // répétition de la fonction ci-dessus pour le filtre sur les prix et sur les notes
    // Prix
    let plusPrice = "+";

    getClass("filtre-price-button").addEventListener("click",function(){
      if (plusPrice == "+"){
      getClass("filtre-price-button").innerHTML = "Prix &#45;";
      plusPrice = "-";
    }
    else if(plusPrice == "-"){
      getClass("filtre-price-button").innerHTML = "Prix &#43;";
      plusPrice = "+";
    }});

    // Notes
    let plusNote = "+";

    getClass("filtre-note-button").addEventListener("click",function(){
      if (plusNote == "+"){
      getClass("filtre-note-button").innerHTML = "Notes &#45;";
      plusNote = "-";
    }
    else if(plusNote == "-"){
      getClass("filtre-note-button").innerHTML = "Notes &#43;";
      plusNote = "+";
    }});

    // Fonction pour récupérer la class name
    function getClass(maClass){
      return document.getElementsByClassName(maClass)[0];
    };};

//--------------------

// Produits
function ajoutProduit(image, title, price, note, blanc, lait, noir, caramel, noix, fruit, liqueur) {

  let div_produit = document.createElement("div");
  div_produit.className = "produit";


  //Boucle qui comprends des IF qui créent des classes en fonction des chocolats
  for (let i = 0; i < 7; i++) {

    if (blanc == true && div_produit.className.includes("Blanc") == false){
      div_produit.className = div_produit.className + " chBlanc";
    }
    else if (lait == true && div_produit.className.includes("Lait") == false){
      div_produit.className = div_produit.className + " chLait";
    }
    else if (noir == true && div_produit.className.includes("Noir") == false){
      div_produit.className = div_produit.className + " chNoir";
    }
    else if (caramel == true && div_produit.className.includes("Caramel") == false){
      div_produit.className = div_produit.className + " chCaramel";
    }
    else if (noix == true && div_produit.className.includes("Noix") == false){
      div_produit.className = div_produit.className + " chNoix";
    }
    else if (fruit == true && div_produit.className.includes("Fruit") == false){
      div_produit.className = div_produit.className + " chFruit";
    }
    else if (liqueur == true && div_produit.className.includes("Liqueur") == false){
      div_produit.className = div_produit.className + " chLiqueur";
    }
    else{};
  }; // Fin de la boucle d'association de categorie


  let image_produit = document.createElement("img");
  image_produit.src = image;

  let nom_produit = document.createElement("p");
  nom_produit.textContent = title;
  nom_produit.className = "text-style3";

  let prix_produit = document.createElement("p");
  prix_produit.textContent = price + " €";
  prix_produit.className = "text-style3";

  let note_produit = document.createElement("p");
  note_produit.textContent = "Note : " + note +" ★";
  note_produit.className = "text-style3";
  
  let ajoutBouton = document.createElement("button");
  ajoutBouton.textContent = "Ajouter au panier";
  ajoutBouton.className = "panier-produit pointer border-style text-style3";

  div_produit.appendChild(image_produit);
  div_produit.appendChild(nom_produit);
  div_produit.appendChild(prix_produit);
  div_produit.appendChild(note_produit);
  div_produit.appendChild(ajoutBouton);

  document.getElementById("produit-ctr").appendChild(div_produit);
}


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
}; // FIN DU IF


function checkType(type) {
  return document.getElementsByClassName(type)[0].checked;
};

if (checkType("ch-all") == true){
};
//document.getElementsByClassName("produit")[1].style.color = "red";

console.log(document.getElementsByClassName("produit"));




//--------------------


// Début du if permettant de vérifier dêtre sur la page index.html
if (myUrl.includes("index") == true){
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

  if (SlideButton1.style.background == "deepskyblue"){
    SlideButton1.style.background = "white";
    SlideButton2.style.background = "deepskyblue";
  }else if(SlideButton2.style.background == "deepskyblue"){
    SlideButton2.style.background = "white";
    SlideButton3.style.background = "deepskyblue";
  }
});

prevButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft -= slideWidth;  
  
  if (SlideButton2.style.background == "deepskyblue"){
    SlideButton2.style.background = "white";
    SlideButton1.style.background = "deepskyblue";
  }else if(SlideButton3.style.background == "deepskyblue"){
    SlideButton3.style.background = "white";
    SlideButton2.style.background = "deepskyblue";
  }
});
// Permet de revenir à la slide d'origine en cas de changement de device
slide.clientWidth.onchange = slidesContainer.scrollLeft -= 10000;

}; // FIN DU IF
