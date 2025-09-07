// --- Sélection des éléments HTML ---
const gameContainer = document.getElementById("gameContainer");
const resultContainer = document.getElementById("resultContainer");
const indiceButton = document.getElementById("indiceButton");
const saisie = document.getElementById("saisie");
const btnValider = document.getElementById("btnValider");
const affichagePts = document.getElementById("affichagePts");

// --- Variables du jeu ---
let score = 0;
let essais = 3;

// --- Tirage aléatoire ---
const personnageAleatoire =
  listePersonnage[Math.floor(Math.random() * listePersonnage.length)];
const personnageChoisi = personnageAleatoire.nom;

// --- Action du bouton "Valider" ---
btnValider.addEventListener("click", () => {
  const reponse = input.value.trim();

  if (!reponse) {
    resultMessage.textContent = "Entrez un nom avant de valider!";
    return;
  }

  essais--;

  if (reponse.toLowerCase() === personnageChoisi.toLowerCase()) {
    score += 40;
    majScore();
    finDePartie("Bravo, vous avez deviné le personnage !");
  } else if (essais > 0) {
    resultMessage.innerHTML =
      "Dommage, essayez encore !<br>Il vous reste " + essais + " essais.";
  } else {
    finDePartie("Plus d'essais ! Le personnage était : " + personnageChoisi);
  }
});
