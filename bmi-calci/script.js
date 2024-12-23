const forms = document.querySelector("form");

forms.addEventListener("submit", function (e) {
  e.preventDefault();

  const height = document.querySelector("#height").value;
  const weight = document.querySelector("#weight").value;
  const results = document.querySelector("#results");

  if (height === "" || height <= 0 || isNaN(height)) {
    alert("pls enter valid height");
  } else if (weight === "" || weight <= 0 || isNaN(weight)) {
    alert("pls enter valid weight");
  } else {
    const bmi = (weight / ((height * height) / 10000)).toFixed(2);
    results.innerHTML = `<span>BMI: ${bmi}</span>`;
  }
});
