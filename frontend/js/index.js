const login = document.querySelector("#login");
const logup = document.querySelector("#logup");
const linkToLogup = login.querySelector("#link-logup");
const linkToLogin = logup.querySelector("#link-login");
const registerButton = document.querySelector("#btn-logup");

const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content");

if (login) {
  linkToLogup.addEventListener("click", () => {
    login.classList.remove("flex");
    login.classList.add("hidden");
    logup.classList.remove("hidden");
    logup.classList.add("flex");
  });

  linkToLogin.addEventListener("click", () => {
    logup.classList.remove("flex");
    logup.classList.add("hidden");
    login.classList.remove("hidden");
    login.classList.add("flex");
  });
}

registerButton.addEventListener("click", async (event) => {
  event.preventDefault();

  // Récupérer les valeurs des champs
  const fullName = document.querySelector('input[name="logup_name"]').value;
  const phone = document.querySelector('input[name="logup_phone"]').value;
  const email = document.querySelector('input[name="logup_email"]').value;
  const dateBirth = document.querySelector('input[name="dateBirth"]').value;
  const password = document.querySelector("#pwd1").value;
  const confirmPassword = document.querySelector("#pwd2").value;
  // Vérification des mots de passe
  if (password !== confirmPassword) {
    alert("Les mots de passe ne correspondent pas");
    return;
  }

  // Construire l'objet de données
  const data = { fullName, phone, email, dateBirth, password };

  try {
    const response = await fetch("http://127.0.0.1:3333/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken, // Assurez-vous que csrfToken est défini
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      alert("Inscription réussie !");
      // Redirection ou autre action
    } else {
      alert("Erreur : " + result.message);
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
  }
});
