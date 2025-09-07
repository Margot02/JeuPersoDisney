// Récup données
const score = localStorage.getItem("score") || 0;
const personnageChoisi =
  localStorage.getItem("personnageChoisi") || "non défini";

const affichagePtsresult = document.getElementById("affichagePtsresult");
const affichageErreur = document.getElementById("affichageErreur");
const rejouerbtn = document.getElementById("rejouerbtn");
const btnEnvoyer = document.getElementById("btnEnvoyer");
const inputMail = document.getElementById("mail");

affichagePtsresult.textContent = "Score final : " + score;
affichageErreur.textContent = "La réponse était : " + personnageChoisi;

rejouerbtn.addEventListener("click", () => {
  window.location.href = "info.html";
});

btnEnvoyer.addEventListener("click", () => {
  const email = (inputMail.value || "").trim();
  if (!email) {
    alert("Merci d’entrer un email.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Email invalide.");
    return;
  }

  const subject = encodeURIComponent("Résultat du jeu Disney");
  const body = encodeURIComponent(
    `Bonjour,\n\nMon score est : ${score}\nLe personnage était : ${personnageChoisi}\n\nBonne journée !`
  );
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
});
