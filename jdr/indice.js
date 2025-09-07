// Récup des boutons d’indices
const btnAge = document.getElementById("btnAge");
const btnLieu = document.getElementById("btnLieu");
const btnPremiere = document.getElementById("btnPremiere");
const btnDate = document.getElementById("btnDate");
const btnCheveux = document.getElementById("btnCheveux");
const btnYeux = document.getElementById("btnYeux");
const btnTaille = document.getElementById("btnTaille");
const btnRole = document.getElementById("btnRole");

// Utilitaire : consomme un indice avec coût (pénalité dépend du niveau)
function useHint(btn, text, baseCost) {
  if (!btn || btn.disabled) return;
  addIndice(text); // fourni par index.js
  const cost = Math.floor(
    baseCost *
      (typeof multiplicateurPerte === "number" ? multiplicateurPerte : 1)
  );
  score -= cost; // 'score' et 'majScore' viennent d'index.js
  majScore();
  btn.disabled = true;

  // notifier index.js (compte et mort subite si besoin)
  if (typeof onIndiceUsed === "function") onIndiceUsed();
}

// Handlers (concaténation avec +)
if (btnAge)
  btnAge.addEventListener("click", () =>
    useHint(btnAge, "Âge : " + personnageAleatoire.age + " ans", 2)
  );
if (btnLieu)
  btnLieu.addEventListener("click", () =>
    useHint(
      btnLieu,
      "Lieu de naissance : " + personnageAleatoire.lieuNaissance,
      3
    )
  );
if (btnPremiere)
  btnPremiere.addEventListener("click", () =>
    useHint(
      btnPremiere,
      "Première apparition : " + personnageAleatoire.premiereApparition,
      10
    )
  );
if (btnDate)
  btnDate.addEventListener("click", () =>
    useHint(
      btnDate,
      "Date de sortie : " + personnageAleatoire.dateSortieFilm,
      3
    )
  );
if (btnCheveux)
  btnCheveux.addEventListener("click", () =>
    useHint(btnCheveux, "Cheveux : " + personnageAleatoire.cheveux, 5)
  );
if (btnYeux)
  btnYeux.addEventListener("click", () =>
    useHint(btnYeux, "Yeux : " + personnageAleatoire.yeux, 3)
  );
if (btnTaille)
  btnTaille.addEventListener("click", () =>
    useHint(btnTaille, "Taille : " + personnageAleatoire.taille + " m", 2)
  );
if (btnRole)
  btnRole.addEventListener("click", () =>
    useHint(btnRole, "Rôle : " + personnageAleatoire.role, 10)
  );
