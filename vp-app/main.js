import parse from "./vp-parser.js";

const form = document.getElementById("vp-search-form");
const inputElement = document.getElementById("vp");
const resultElement = document.getElementById("result");
const errorElement = document.getElementById("error");

const dayOfWeekNames = [
  "Maandag",
  "Dinsdag",
  "Woensdag",
  "Donderdag",
  "Vrijdag",
  "Zaterdag",
  "Zondag"
]

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let vp = inputElement.value;
  try {
    resultElement.innerHTML = "";
    errorElement.innerHTML = "";
    parse(vp).forEach(day => {
      let dayElement = document.createElement("li");
      dayElement.innerText = dayOfWeekNames[day];
      resultElement.appendChild(dayElement);
    });
  } catch (e) {
    resultElement.innerHTML = "";
    errorElement.innerText = `Incorrecte VP: ${e}`;
  }
});
