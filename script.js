document.addEventListener('DOMContentLoaded', () => {
    fetchCryptoData();
});

async function fetchCryptoData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            qs: {
                vs_currency: 'usd'
            }
        });
        const data = await response.json();
        displayCryptoData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayCryptoData(data) {
    const cryptoList = document.getElementById('crypto-list');
    cryptoList.innerHTML = '';
    data.forEach(crypto => {
        const cryptoItem = document.createElement('div');
        cryptoItem.className = 'crypto-item';
        cryptoItem.innerHTML = `
            <h2>${crypto.name} (${crypto.symbol.toUpperCase()})</h2>
            <p>Price: $${crypto.current_price}</p>
            <p>Market Cap: $${crypto.market_cap}</p>
            <p>24h Volume: $${crypto.total_volume}</p>
        `;
        cryptoList.appendChild(cryptoItem);
    });
}
