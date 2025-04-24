import shared from "../../../../../../core-files/shared";
// import scrollToElement from "./smoothScroll";
import {fireBootsEvent} from "../../../../../../core-files/services";
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';

const { ID, VARIATION} = shared;


export const createBanner = () => {
    const outOfStockBanner = document.createElement('div');
    outOfStockBanner.classList.add(`${ID}-stockModal`);
    outOfStockBanner.classList.add(`${ID}-hidden`);
    outOfStockBanner.innerHTML = `
    
    <div class="${ID}-container">
        <div class="${ID}-banner_heading">
            <h3>Sorry, this product is out of stock</h3>
            <div class="${ID}-modal_close"></div>
            </div>
        <div class="${ID}-banner_text">
            <p>Browse these products instead</p>
            </div>
    <div class="${ID}-carouselWrapper">
        <div class="${ID}-stockcarousel swiper">
          <div class="swiper-wrapper"></div>
        </div>
    </div>
    </div>`;

    document.body.appendChild(outOfStockBanner);
  }

  export const showBanner = () => {
    if(document.querySelector(`.${ID}-stockModal .swiper-wrapper .${ID}-product`)){
      document.querySelector(`.${ID}-stockModal`).classList.remove(`${ID}-hidden`);   
      document.querySelector(`.${ID}-stockModal`).classList.add(`${ID}-active`);
    }
  }

  export const hideBanner = () => {
    document.querySelector(`.${ID}-modal_close`).addEventListener('click', () => {
      // fireEvent('Clicked close Button');
      fireBootsEvent('Clicked Close Button', true, eventTypes.experience_action, {
        action: actionTypes.close,
        action_detail: 'Modal Close Button',
      });
        document.querySelector(`.${ID}-stockModal`).classList.remove(`${ID}-active`);
        const viewSimilarProducts = document.createElement('div');
        viewSimilarProducts.classList.add(`${ID}-viewSimilar`);
        viewSimilarProducts.classList.add(`${ID}-active`);

        viewSimilarProducts.innerHTML = `
        <div class="${ID}-viewSimilarBttn" id="${ID}-view-similar-bttn">View Similar Products</div>
       `;
       if(!document.querySelector(`.${ID}-viewSimilarBttn`)){
        document.querySelector("#sold_out_text > h5").appendChild(viewSimilarProducts);
        document.querySelector(`.${ID}-viewSimilarBttn`).addEventListener('click', () => {
          document.querySelector(`.${ID}-stockModal`).classList.add(`${ID}-active`);
        });
       }
    });

    
  }


 




