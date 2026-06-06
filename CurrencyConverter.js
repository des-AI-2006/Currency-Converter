console.log("Hello Baccho....\n\n");

const BASE_URL ="https://latest.currency-api.pages.dev/v1/currencies/usd.json";
const btn = document.querySelector("form button") ;
const msg = document.querySelector(".msg"); 
const swapIcon = document.querySelector(".dropdown .fa-arrow-right-arrow-left");

let fromCurrValue = "USD";
let toCurrValue = "INR";

const fromContainer = document.querySelector("#from-select-container");
const toContainer = document.querySelector("#to-select-container");

const populateOptions = (container, defaultValue) => {
    const list = container.querySelector(".options-list");
    list.innerHTML = "";
    for (let currCode in countryList) {
        let item = document.createElement("div");
        item.className = "option-item";
        if (currCode === defaultValue) {
            item.classList.add("selected");
        }
        item.setAttribute("data-value", currCode);

        let countryCode = countryList[currCode];
        item.innerHTML = `
            <img src="https://flagsapi.com/${countryCode}/flat/64.png">
            <span>${currCode}</span>
        `;

        item.addEventListener("click", () => {
            selectOption(container, currCode);
        });

        list.appendChild(item);
    }
};

const selectOption = (container, currCode) => {
    container.querySelectorAll(".option-item").forEach(item => {
        if (item.getAttribute("data-value") === currCode) {
            item.classList.add("selected");
        } else {
            item.classList.remove("selected");
        }
    });

    const text = container.querySelector(".select-text");
    const img = container.querySelector(".select-trigger img");
    text.innerText = currCode;
    img.src = `https://flagsapi.com/${countryList[currCode]}/flat/64.png`;

    if (container === fromContainer) {
        fromCurrValue = currCode;
    } else {
        toCurrValue = currCode;
    }

    container.classList.remove("active");
    hidePopularConversions();
};

const setupSearch = (container) => {
    const searchInput = container.querySelector(".search-input");
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const items = container.querySelectorAll(".option-item");
        items.forEach(item => {
            const value = item.getAttribute("data-value").toLowerCase();
            if (value.includes(query)) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });
    });
};

// Toggle open/close dropdowns
fromContainer.querySelector(".select-trigger").addEventListener("click", (e) => {
    e.stopPropagation();
    toContainer.classList.remove("active");
    fromContainer.classList.toggle("active");
    if (fromContainer.classList.contains("active")) {
        fromContainer.querySelector(".search-input").value = "";
        fromContainer.querySelectorAll(".option-item").forEach(item => item.style.display = "flex");
        setTimeout(() => fromContainer.querySelector(".search-input").focus(), 50);
    }
});

toContainer.querySelector(".select-trigger").addEventListener("click", (e) => {
    e.stopPropagation();
    fromContainer.classList.remove("active");
    toContainer.classList.toggle("active");
    if (toContainer.classList.contains("active")) {
        toContainer.querySelector(".search-input").value = "";
        toContainer.querySelectorAll(".option-item").forEach(item => item.style.display = "flex");
        setTimeout(() => toContainer.querySelector(".search-input").focus(), 50);
    }
});

// Prevent closure when clicking inside option containers
fromContainer.querySelector(".options-dropdown").addEventListener("click", (e) => e.stopPropagation());
toContainer.querySelector(".options-dropdown").addEventListener("click", (e) => e.stopPropagation());

// Close open dropdowns when clicking outside
document.addEventListener("click", () => {
    fromContainer.classList.remove("active");
    toContainer.classList.remove("active");
});

const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if(amtVal === "" || amtVal<1){
        amtVal=1;
        amount.value ="1";
    }

    const from = fromCurrValue.toLowerCase();
    const to = toCurrValue.toLowerCase();

    const URL  =`https://latest.currency-api.pages.dev/v1/currencies/${from}.json`;

    btn.disabled = true;
    btn.innerText = "Getting Exchange Rate...";
    btn.style.opacity = "0.7";

    try {
        let response = await fetch(URL);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        let data = await response.json();
        let rate = data[from][to];
        let finalAmount = amtVal * rate;

        msg.innerText = `${amtVal} ${from.toUpperCase()} = ${finalAmount.toFixed(4)} ${to.toUpperCase()}`;
        updatePopularConversions(rate);
    } catch (error) {
        console.error(error);
        msg.innerText = "Failed to fetch exchange rate. Please try again.";
    } finally {
        btn.disabled = false;
        btn.innerText = "Get Exchange Rate";
        btn.style.opacity = "1";
    }
};

const updatePopularConversions = (rate) => {
    const popularSec = document.querySelector("#popular-conversions");
    const grid = popularSec.querySelector(".conversions-grid");
    grid.innerHTML = "";

    const amounts = [5, 10, 50, 100, 500];
    const from = fromCurrValue.toUpperCase();
    const to = toCurrValue.toUpperCase();

    amounts.forEach(amt => {
        let converted = (amt * rate).toFixed(2);
        let item = document.createElement("div");
        item.className = "conversion-item";
        item.innerHTML = `
            <span class="from-val">${amt} ${from}</span>
            <span class="eq-val">=</span>
            <span class="to-val">${converted} ${to}</span>
        `;
        grid.appendChild(item);
    });

    popularSec.style.display = "flex";
};

const hidePopularConversions = () => {
    document.querySelector("#popular-conversions").style.display = "none";
};

// Initialize
populateOptions(fromContainer, "USD");
populateOptions(toContainer, "INR");
setupSearch(fromContainer);
setupSearch(toContainer);

swapIcon.addEventListener("click", () => {
    let temp = fromCurrValue;
    fromCurrValue = toCurrValue;
    toCurrValue = temp;

    selectOption(fromContainer, fromCurrValue);
    selectOption(toContainer, toCurrValue);
});

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});