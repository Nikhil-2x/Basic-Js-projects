const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const convertBtn = document.getElementById("convert-btn");
const reverseBtn = document.getElementById("reverse-btn");
const clearLogBtn = document.getElementById("clear-log-btn");
const resultPara = document.getElementById("result");
const conversionLog = document.getElementById("conversion-log");
const chartCanvas = document.getElementById("rates-chart");

const apiEndpoint = "https://api.exchangerate-api.com/v4/latest/";

// Fetch currencies for dropdowns
fetch(apiEndpoint + "USD")
  .then((response) => response.json())
  .then((data) => {
    const currencies = Object.keys(data.rates);
    currencies.forEach((currency) => {
      const option1 = new Option(currency, currency);
      const option2 = new Option(currency, currency);
      fromSelect.add(option1);
      toSelect.add(option2);
    });
  });

// Convert currencies
convertBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = parseFloat(amountInput.value);
  const fromCurrency = fromSelect.value;
  const toCurrency = toSelect.value;

  if (!amount || !fromCurrency || !toCurrency) return alert("Fill all fields!");

  fetch(apiEndpoint + fromCurrency)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[toCurrency];
      const converted = (amount * rate).toFixed(2);

      // Display result
      resultPara.textContent = `${amount} ${fromCurrency} = ${converted} ${toCurrency}`;

      // Log
      const logItem = document.createElement("li");
      logItem.textContent = `${amount} ${fromCurrency} -> ${converted} ${toCurrency}`;
      conversionLog.prepend(logItem);

      // Fetch and display historical data
      fetchHistoricalRates(fromCurrency, toCurrency);
    });
});

// Reverse currencies
reverseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
});

// Clear logs
clearLogBtn.addEventListener("click", () => {
  conversionLog.innerHTML = "";
});
