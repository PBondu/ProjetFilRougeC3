// Fonction qui permet l'ouverture et la fermeture de la barre de nav
$("#burgerMenu img").on("click", function () {
    $(".header-mobile").slideToggle(300);
    const slided = true;
    return slided;
});

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


