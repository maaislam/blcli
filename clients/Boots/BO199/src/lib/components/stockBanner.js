import shared from "../../../../../../core-files/shared";


const { ID, VARIATION} = shared;


export const createBanner = () => {
    const outOfStockBanner = document.createElement('div');
    outOfStockBanner.classList.add(`${ID}-stockModal`);
    outOfStockBanner.classList.add(`${ID}-hidden`);
    outOfStockBanner.innerHTML = `
    <div class="${ID}-modal_close"></div>
    <div class="${ID}-container">
        <div class="${ID}-banner_text">
            <h3>Sorry, this product is out of stock</h3>
            <p>But don't worry; you can still browse our similiar products.</p>
        </div>
    <div class="${ID}-carouselWrapper">
        <div class="${ID}-carousel"></div>
    </div>
    </div>`;

    document.body.appendChild(outOfStockBanner);
  }

  export const showBanner = () => {
    document.querySelector(`.${ID}-stockModal`).classList.add(`${ID}-active`);   
  }

  export const hideBanner = () => {
    document.querySelector(`.${ID}-modal_close`).addEventListener('click', () => {
        document.querySelector(`.${ID}-stockModal`).classList.remove(`${ID}-active`);
    });
  }



