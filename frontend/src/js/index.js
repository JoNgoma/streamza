const login = document.querySelector("#login");
const logup = document.querySelector("#logup");
const home = document.querySelector("#home");
const linkToLogup = login.querySelector("#link-logup");
const linkToLogin = logup.querySelector("#link-login");
const registerButton = document.querySelector("#btn-logup");
const loginButton = document.querySelector("#btn-login");

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

  const data = { fullName, phone, email, dateBirth, password };

  try {
    const resLogup = await fetch("http://127.0.0.1:3333/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    if (resLogup.ok) {
      alert("Inscription réussie !");
      logup.classList.remove("flex");
      logup.classList.add("hidden");
      home.classList.remove("hidden");
      home.classList.add("flex");
    } else {
      alert("Erreur : " + result.message);
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
  }
});

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const phone = document.querySelector('input[name="login_phone"]').value;
  const password = document.querySelector('input[name="login_password"]').value;
  const data = { phone, password };
  try {
    const resLogin = await fetch("http://127.0.0.1:3333/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
      body: JSON.stringify(data),
    });
    const result = await resLogin.json()
    if (resLogin.ok) {
      alert("Connexion reussie");
      login.classList.remove("flex");
      login.classList.add("hidden");
      home.classList.remove("hidden");
      home.classList.add("flex");
    } else {
      if (result.type === "INVALID_CREDENTIALS") {
        alert(result.message) 
      } else {
        alert("Erreur : " + result.message) 
      }
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
    alert("Une erreur réseau s'est produite. Veuillez réessayer.")
  }
});
