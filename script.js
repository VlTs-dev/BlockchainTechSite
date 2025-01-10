document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".sidebar ul li a");
    const sections = document.querySelectorAll(".section");

    // Функция для переключения разделов
    const switchSection = (event, sectionId) => {
        event.preventDefault();
        console.log(`Switching to section: ${sectionId}`); // Логируем переключение

        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.remove("hidden");
                console.log(`Showing section: ${sectionId}`);
            } else {
                section.classList.add("hidden");
                console.log(`Hiding section: ${section.id}`);
            }
        });
    };

    // Привязываем обработчики событий
    links.forEach(link => {
        const sectionId = link.getAttribute("data-section");

        // Обрабатываем как click, так и touchstart
        link.addEventListener("click", (event) => {
            console.log("Click event triggered");
            switchSection(event, sectionId);
        });
        link.addEventListener("touchstart", (event) => {
            console.log("Touch event triggered");
            switchSection(event, sectionId);
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    updateCryptoTable(); // Первичное обновление таблицы

    // Обновляем таблицу каждые 2 минуты
    setInterval(updateCryptoTable, 120000);

    // Назначение события на кнопки "Сделка" после обновления таблицы
    document.querySelector("#crypto-table").addEventListener("click", (event) => {
        if (event.target.classList.contains("deal-btn")) {
            const url = event.target.getAttribute("data-url");
            window.location.href = url; // Переход на указанную страницу
        }
    });
});

// Функция для получения данных о криптовалютах
async function fetchCryptoData() {
    const url = "https://api.coingecko.com/api/v3/coins/markets";
    const params = new URLSearchParams({
        vs_currency: "usd", // Валюта
        order: "market_cap_desc", // Сортировка по рыночной капитализации
        per_page: 20, // Количество монет
        page: 1,
        sparkline: false
    });

    try {
        const response = await fetch(`${url}?${params}`);
        if (!response.ok) throw new Error("Ошибка при получении данных");
        const data = await response.json();
        console.log("Fetched data:", data); // Проверка данных
        return data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}


// Обновление карточек на главной странице
async function updateMainPageCards() {
    const data = await fetchCryptoData();

    // Bitcoin
    const bitcoin = data.find(coin => coin.id === "bitcoin");
    if (bitcoin) {
        document.querySelector("#bitcoin-price").textContent = `$${bitcoin.current_price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        const changeElement = document.querySelector("#bitcoin-change");
        changeElement.textContent = `${bitcoin.price_change_percentage_24h.toFixed(2)}%`;
        changeElement.className = `price-change ${bitcoin.price_change_percentage_24h > 0 ? "positive" : "negative"}`;
        changeElement.textContent = `${bitcoin.price_change_percentage_24h > 0 ? "+" : ""}${bitcoin.price_change_percentage_24h.toFixed(2)}%`;

    }

    // Ethereum
    const ethereum = data.find(coin => coin.id === "ethereum");
    if (ethereum) {
        document.querySelector("#ethereum-price").textContent = `$${ethereum.current_price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        const changeElement = document.querySelector("#ethereum-change");
        changeElement.textContent = `${ethereum.price_change_percentage_24h.toFixed(2)}%`;
        changeElement.className = `price-change ${ethereum.price_change_percentage_24h > 0 ? "positive" : "negative"}`;
        changeElement.textContent = `${ethereum.price_change_percentage_24h > 0 ? "+" : ""}${ethereum.price_change_percentage_24h.toFixed(2)}%`;

    }

    // Dogecoin
    const dogecoin = data.find(coin => coin.id === "dogecoin");
    if (dogecoin) {
        document.querySelector("#dogecoin-price").textContent = `$${dogecoin.current_price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        const changeElement = document.querySelector("#dogecoin-change");
        changeElement.textContent = `${dogecoin.price_change_percentage_24h.toFixed(2)}%`;
        changeElement.className = `price-change ${dogecoin.price_change_percentage_24h > 0 ? "positive" : "negative"}`;
        changeElement.textContent = `${dogecoin.price_change_percentage_24h > 0 ? "+" : ""}${dogecoin.price_change_percentage_24h.toFixed(2)}%`;

    }

    // Solana
    const solana = data.find(coin => coin.id === "solana");
    if (solana) {
        document.querySelector("#solana-price").textContent = `$${solana.current_price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        const changeElement = document.querySelector("#solana-change");
        changeElement.textContent = `${solana.price_change_percentage_24h.toFixed(2)}%`;
        changeElement.className = `price-change ${solana.price_change_percentage_24h > 0 ? "positive" : "negative"}`;
        changeElement.textContent = `${solana.price_change_percentage_24h > 0 ? "+" : ""}${solana.price_change_percentage_24h.toFixed(2)}%`;

    }
}



// Вызываем обновление при загрузке страницы
updateMainPageCards();

// Обновление таблицы
async function updateCryptoTable() {
    const data = await fetchCryptoData(); // Получаем данные из API
    // Добавляем "Just a chill guy" вручную
    const chillGuy = {
        id: "just-a-chill-guy",
        name: "Just a chill guy",
        symbol: "CHILLGUY",
        current_price: 0.43,
        price_change_percentage_24h: -6.44,
        market_cap: 432196092,
        image: "https://img.cryptorank.io/coins/chill_guy1731936768520.png"
    };

    if (!data.some(coin => coin.id === "just-a-chill-guy")) {
        data.push(chillGuy);
    }
    const tableBody = document.querySelector("#crypto-table tbody");
    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">Данные временно недоступны</td></tr>`;
        return;
    }
    
    tableBody.innerHTML = ""; // Очищаем содержимое таблицы

    data.forEach(coin => {
        const row = `
    <tr>
        <td class="crypto-name">
            <img src="${coin.image}" alt="${coin.name}" class="crypto-icon">
            <span>${coin.name} (${coin.symbol.toUpperCase()})</span>
        </td>
        <td>$${coin.current_price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td style="color: ${coin.price_change_percentage_24h > 0 ? "green" : "red"};">
            ${coin.price_change_percentage_24h > 0 ? "+" : ""}${coin.price_change_percentage_24h.toFixed(2)}%
        </td>
        <td>$${coin.market_cap.toLocaleString("en-US")}</td>
        <td><button class="deal-btn" data-url="walletauth.html">Сделка</button></td>
    </tr>
`;
tableBody.innerHTML += row;
    });
}


// Вызываем обновление при загрузке страницы
updateCryptoTable();

document.addEventListener("DOMContentLoaded", () => {
    updateCryptoTable();
    setInterval(updateCryptoTable, 60000); // Обновление каждые 60 секунд
});

// Обновление главной страницы
updateMainPageCards();
setInterval(updateMainPageCards, 60000);

// Обновление таблиц
setInterval(updateCryptoTable, 120000); // Обновление каждые 2 минуты






