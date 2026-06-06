console.log("Hello Baccho....\n\n");

const BASE_URL ="https://latest.currency-api.pages.dev/v1/currencies/usd.json";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button") ;
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg"); 

for(let select of dropdowns){
    for(currCode in countryList){
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

    const URL  =`https://latest.currency-api.pages.dev/v1/currencies/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[from][to];
    let finalAmount = (amount.value) * rate;

    msg.innerText = `${amtVal} ${from.toUpperCase()} = ${finalAmount} ${to.toUpperCase()}`;
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];

    let newSrc =   `https://flagsapi.com/${countryCode}/flat/64.png`; 

    let img= element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});

// Above code shows 1 USD = 90.27590866 INR on reload



// Below code shows 1 USD = 90 INR on reload 

// When clicking on Get Exchange Raye button then it shows:   1 USD = 90.27590866 INR
/*
console.log("Hello Baccho....\n\n");

// Dont use it, instead of it use above link:
// https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json

// Imp link: 
// https://latest.currency-api.pages.dev/v1/currencies/eur.json

const BASE_URL ="https://latest.currency-api.pages.dev/v1/currencies/usd.json";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button") ;
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg"); 

for(let select of dropdowns){
    for(currCode in countryList){
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

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc =   `https://flagsapi.com/${countryCode}/flat/64.png`;
    console.log(currCode);// remove it later on 
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click",async (evt) => {
    evt.preventDefault(); // due to this, page will not be refresh
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    // console.log(amtVal);
    if(amtVal === "" || amtVal<1){
        amtVal=1;
        amount.value ="1";
    }
    console.log(fromCurr.value,toCurr.value);
    const from = fromCurr.value.toLowerCase();
    const to = toCurr.value.toLowerCase();
    // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`; // will not work 
    const URL  =`https://latest.currency-api.pages.dev/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    
    // console.log(data);
    // console.log(data.usd);
    // // console.log(data.usd.inr);
    // console.log(fromCurr.value.toLowerCase());
    // console.log(toCurr.value.toLowerCase());
    // console.log(data[from][to]);
    // console.log(data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]);//data[usd][inr]
    // // console.log((toCurr.value.toLowerCase()).data);
    // console.log(response);
    let rate = data[from][to];
    console.log(amount.value);
    let finalAmount = (amount.value) * rate;
    console.log(finalAmount);
    console.log(`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`);
    // msg.innerText=`${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    msg.innerText = `${amtVal} ${from.toUpperCase()} = ${finalAmount} ${to.toUpperCase()}`;
});
*/