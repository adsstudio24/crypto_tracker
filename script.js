const ctx = document.getElementById('priceChart').getContext('2d');
let chart;

async function fetchCryptoPrice() {
    const crypto = document.getElementById('crypto').value;
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
    const data = await response.json();
    
    const price = data[crypto].usd;
    document.getElementById('price').textContent = `💰 Ціна: $${price}`;

    updateChart(crypto, price);
}

function updateChart(crypto, price) {
    if (!chart) {
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [new Date().toLocaleTimeString()],
                datasets: [{
                    label: `${crypto.toUpperCase()} Price`,
                    data: [price],
                    borderColor: 'green',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: { display: true },
                    y: { beginAtZero: false }
                }
            }
        });
    } else {
        chart.data.labels.push(new Date().toLocaleTimeString());
        chart.data.datasets[0].data.push(price);
        chart.update();
    }
}

window.onload = fetchCryptoPrice;
