import shared from "./shared";

export const colourPrice = 99.95;
export const flakePrices = [];
export const accPrices = [];

const { ID } = shared;


 // price total
 export const updatePrice = () => {
    let totalPriceEl;
    if(shared.VARIATION === '1') {
      totalPriceEl = document.querySelector(`.product-price span`);
    } else {
      totalPriceEl = document.querySelector(`.${ID}-total span`);
    }

    const flakePrice = flakePrices.reduce(function(a, b){
      return a + b;
    }, 0);


    const accessoriesPrice = accPrices.reduce(function(a, b){
      return a + b;
    }, 0);
  
    const total = parseFloat(colourPrice + flakePrice + accessoriesPrice);
    totalPriceEl.innerHTML = `£${total}`;

  }

export const scrollToElement = (element) => {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.getBoundingClientRect().top + window.scrollY - 80,
    });
  }