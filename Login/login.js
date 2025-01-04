const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const incorrectAlert = document.getElementById("incorrect-error");

const BASE_URL = "http://api.alikooshesh.ir:3000";
const API_KEY =
  "api-new-maktabIPcJWrxO3VF72hgLGHmPxV7pJpnrLzoaS2WSj2YzWcobuYdGrtUAb2QRl5V36VtqUToNlJk3Lf3E4vXsDoYvezYljJpxPGw3DtEyQv5XsyQkpfUlrX";

function loginHandler() {
  const email = emailInput.value;
  const password = passwordInput.value;
  fetch(`${BASE_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      api_key: API_KEY,
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((result) => {
      localStorage.setItem("accessToken", result.accessToken);
      window.location.href = "../Home/home.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      setTimeout(() => {
        incorrectAlert.style.display = "block";
      }, 2000);
    });
}
