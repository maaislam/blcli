import shared from "./shared";

export const colourPrice = 99.95;
export const flakePrices = [];
export const accPrices = [];

const { ID } = shared;


 // price total
 export const updatePrice = () => {

  // updates the flakes price
   let flakePrice = 0;

    const totalPriceEl = document.querySelector(`.${ID}-summary .${ID}-total span`);

    const kitproduct = document.querySelectorAll(`.${ID}-accordionStep.${ID}-flakes .${ID}-product`);
    for (let index = 0; index < kitproduct.length; index += 1) {
      const element = kitproduct[index];

      if(element.classList.contains(`${ID}-selected`)) {
        const qty = element.querySelector('.count').value;
        const price = parseFloat(element.querySelector(`.${ID}-price`).textContent.replace('£', ''));
        flakePrice += price * qty;
      }
      
    }


    // get total + qty of colour chosen
    const colourQTY = document.querySelector(`.${ID}-colour.${ID}-product.${ID}-selected .${ID}-qty .count`);
    const qtyAmount = colourQTY.value;
  
    const total = parseFloat((colourPrice * qtyAmount) + flakePrice);
    totalPriceEl.innerHTML = `£${total.toFixed(2)}`;

  }

export const scrollToElement = (element) => {
  window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.getBoundingClientRect().top + window.scrollY - 20,
  });
}
