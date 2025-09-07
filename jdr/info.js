const form = document.getElementById("formJoueur");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nom = document.getElementById("nom").value.trim();
  const niveau = document.querySelector('input[name="niveau"]:checked').value;

  localStorage.setItem("nomJoueur", nom);
  localStorage.setItem("niveau", niveau); // "simple" | "moyen" | "complique"

  window.location.href = "index.html";
});
