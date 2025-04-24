import shared from "./shared";

export const colourPrice = 99.95;
export const flakePrices = [];
export const kitPrices = [];

const { ID } = shared;


 // price total
 export const updatePrice = () => {
    let totalPriceEl;
    totalPriceEl = document.querySelector(`.product-price span`);
    

    const flakePrice = flakePrices.reduce(function(a, b){
      return a + b;
    }, 0);


    const kitPrice = kitPrices.reduce(function(a, b){
      return a + b;
    }, 0);
  
    const total = parseFloat(colourPrice + flakePrice + kitPrice);
    totalPriceEl.innerHTML = `£${total}`;

  }

export const scrollToElement = (element) => {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.getBoundingClientRect().top + window.scrollY - 80,
    });
  }