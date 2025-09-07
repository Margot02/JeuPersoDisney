"use strict";

// --- Sélection des éléments HTML ---
const resultMessage = document.getElementById("resultMessage");
const affichagePts = document.getElementById("affichagePts");
const saisie = document.getElementById("saisie");
const btnValider = document.getElementById("btnValider");
const indiceBtns = Array.from(
  document.querySelectorAll("#indiceContainer button")
);

// Constantes base
const BASE_REWARD = 40;
const BASE_PENALTY = 10;

// Infos joueur
const nomJoueur = localStorage.getItem("nomJoueur") || "Joueur";
let niveau = localStorage.getItem("niveau") || "simple";

// Config par niveau (directement dans essais)
let essais;
let multiplicateurGain;
let multiplicateurPerte;

if (niveau === "simple") {
  essais = 10;
  multiplicateurGain = 1;
  multiplicateurPerte = 0.5;
} else if (niveau === "moyen") {
  essais = 3;
  multiplicateurGain = 1;
  multiplicateurPerte = 1;
} else {
  essais = 1; // mort subite
  multiplicateurGain = 2;
  multiplicateurPerte = 3;
}

// Score
let score = Number(localStorage.getItem("score")) || 0;

// Etat partie
let personnageAleatoire;
let personnageChoisi;
let indicesUtilises = 0;

// Zone d'affichage indices
const resultContainer = document.getElementById("resultContainer");
const indicesList =
  document.getElementById("indicesList") ||
  (() => {
    const ul = document.createElement("ul");
    ul.id = "indicesList";
    (resultContainer || document.body).appendChild(ul);
    return ul;
  })();

// Helpers
function majScore() {
  affichagePts.textContent = "Nombre de points : " + score;
  localStorage.setItem("score", String(score));
}
function lockUI(lock) {
  btnValider.disabled = lock;
  indiceBtns.forEach((b) => (b.disabled = lock));
}
function addIndice(text) {
  const li = document.createElement("li");
  li.textContent = text;
  indicesList.appendChild(li);
}

// Manche
function nouvelleManche(prevName = null) {
  if (!Array.isArray(listePersonnage) || listePersonnage.length === 0) {
    resultMessage.textContent = "Erreur : liste de personnages introuvable.";
    lockUI(true);
    return;
  }

  do {
    personnageAleatoire =
      listePersonnage[Math.floor(Math.random() * listePersonnage.length)];
  } while (prevName && personnageAleatoire.nom === prevName);

  personnageChoisi = personnageAleatoire.nom;
  localStorage.setItem("personnageChoisi", personnageChoisi);

  // reset essais selon niveau
  if (niveau === "simple") essais = 10;
  else if (niveau === "moyen") essais = 3;
  else essais = 1;

  indicesUtilises = 0;
  saisie.value = "";
  resultMessage.textContent =
    "Nouveau personnage, bonne chance " + nomJoueur + " !";

  indicesList.innerHTML = "";
  indiceBtns.forEach((b) => (b.disabled = false));

  lockUI(false);
}

function finDePartie(message) {
  resultMessage.innerHTML = message;
  lockUI(true);
}

// Validation
btnValider.addEventListener("click", () => {
  const reponse = saisie.value.trim();
  if (!reponse) {
    resultMessage.textContent = "Entrez un nom avant de valider !";
    return;
  }

  if (reponse.toLowerCase() === String(personnageChoisi).toLowerCase()) {
    score += Math.floor(BASE_REWARD * multiplicateurGain);
    majScore();
    finDePartie("Bravo, vous avez deviné le personnage !");
    setTimeout(() => nouvelleManche(personnageChoisi), 800);
  } else {
    score -= Math.floor(BASE_PENALTY * multiplicateurPerte);
    majScore();

    essais--;
    if (essais > 0) {
      resultMessage.innerHTML =
        "Dommage, essayez encore !<br>Il vous reste " + essais + " essais.";
    } else {
      score = Math.floor(score * multiplicateurPerte);
      majScore();
      window.location.href = "gameover.html";
    }
  }
});

// Démarrage
majScore();
nouvelleManche();
