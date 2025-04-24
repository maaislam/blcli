import shared from "../../../../../core-files/shared"

export default () => {
  const { ID, VARIATION } = shared;

  const createMarkup = () => {
    const recMarkup = document.createElement('div');
    recMarkup.classList.add(`${ID}-recommendations`);
    recMarkup.innerHTML = 
    `<div class="${ID}-container">
      <h4>Customers also viewed</h4>
      <div class="${ID}-products"></div>
    </div>`;

    if(VARIATION === '1') {
      document.querySelector(`.${ID}-tabSection`).insertAdjacentElement('afterend', recMarkup);
    }
    if(VARIATION === '2') {
      document.querySelector(`.${ID}-fullWidthBanner`).insertAdjacentElement('afterend', recMarkup);
    }
    
    const products = document.querySelector('.rrPlacements[id*="rec1"]');
    recMarkup.querySelector(`.${ID}-products`).appendChild(products);
    
  }

  createMarkup();
  
}