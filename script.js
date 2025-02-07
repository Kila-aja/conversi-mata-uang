const apiKey = "7ed4937b1ea0e61d92306ffd";
const apiUrl = "https://v6.exchangerate-api.com/v6/" + apiKey + "/latest/";

document.addEventListener("DOMContentLoaded", () => {
    fetch(apiUrl + "USD")
        .then(response => response.json())
        .then(data => {
            const currencyKeys = Object.keys(data.conversion_rates);
            const fromCurrency = document.getElementById("from-currency");
            const toCurrency = document.getElementById("to-currency");

            currencyKeys.forEach(currency => {
                let option1 = document.createElement("option");
                let option2 = document.createElement("option");
                option1.value = option2.value = currency;
                option1.textContent = option2.textContent = currency;
                fromCurrency.appendChild(option1);
                toCurrency.appendChild(option2);
            });

            fromCurrency.value = "USD";
            toCurrency.value = "IDR";
        });
});

function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;
    
    fetch(apiUrl + fromCurrency)
        .then(response => response.json())
        .then(data => {
            const rate = data.conversion_rates[toCurrency];
            const result = amount * rate;
            document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        })
        .catch(error => console.error("Error fetching data:", error));
}
