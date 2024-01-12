// Fonction qui permet l'ouverture et la fermeture de la barre de nav
$("#burgerMenu img").on("click", function () {
    $(".header-mobile").slideToggle(300);
    const slided = true;
    return slided;
});
