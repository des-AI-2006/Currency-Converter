console.log("Hello Baccho....\n\n");

const BASE_URL ="https://latest.currency-api.pages.dev/v1/currencies/usd.json";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button") ;
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg"); 
const swapIcon = document.querySelector(".dropdown .fa-arrow-right-arrow-left");

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name ==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        if(select.name ==="to" && currCode ==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if(amtVal === "" || amtVal<1){
        amtVal=1;
        amount.value ="1";
    }

    const from = fromCurr.value.toLowerCase();
    const to = toCurr.value.toLowerCase();

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
    } catch (error) {
        console.error(error);
        msg.innerText = "Failed to fetch exchange rate. Please try again.";
    } finally {
        btn.disabled = false;
        btn.innerText = "Get Exchange Rate";
        btn.style.opacity = "1";
    }
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];

    let newSrc =   `https://flagsapi.com/${countryCode}/flat/64.png`; 

    let img= element.parentElement.querySelector("img");
    img.src=newSrc;
};

swapIcon.addEventListener("click", () => {
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;
    updateFlag(fromCurr);
    updateFlag(toCurr);
    updateExchangeRate();
});

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});