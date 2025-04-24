
import {fireBootsEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import getData from "./productData";
// import getProducts from "./productOfferData";
import { showBanner } from "./stockBanner";
import Swiper from "swiper/swiper-bundle";
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';

/**
 * Add Upsell Products to box
 */

export default async () => {
  const { ID } = shared;
  var prodAvailable = false;
  const upsellProductsObj = await getData();
  
  const addProducts = async () => {
      Object.keys(upsellProductsObj).forEach((i) => {
      const data = upsellProductsObj[i];
      const rating = Math.round(data.rating);
      const product = document.createElement('div');
      product.classList.add(`${ID}-product`);
      product.classList.add("swiper-slide");
      product.innerHTML = `
            <div class="${ID}-product-detail-wrapper">
              <a href="${data.link}" class="${ID}-image-anchor">
              <div class="${ID}-image" style="background-image:url(${data.image})"></div></a>
              <div class="${ID}-product-content-wrapper">
                <p>${data.name}</p>
                <div class="${ID}-prices">
                <div class="${ID}-RatingContainer"><span style="color:#FFCC00;" class="rating${rating}" title="${rating} (out of 5) Star Rating" alt="${rating} (out of 5) Star Rating"></span><a class="${ID}-product_review_count" aria-label="${data.name}" title="reviews" href="${data.link}">${data.numreviews}</a></div>
    
                    <span class="${ID}-price">£${data.price}</span>
                </div>
                <div class="${ID}-offer" id="offerAvailable" data-show-if="${data.isOffer}">
                  <a class="${ID}-offerBttn" href="${data.link}"><img class="${ID}-offerBtnImg" src="https://boots.scene7.com/is/image/Boots/BO346%2Dtag?scl=1&fmt=png-alpha">Offers</a>
                  <div class="${ID}-offerAvailable"><span>${data.offerQty}</span>available</div>
                </div>
              </div>
            </div>
            <a class="${ID}-modal_button" href="${data.link}">View Product</a>`;

      document.querySelector(`.${ID}-stockcarousel .swiper-wrapper`).appendChild(product);
    });
    prodAvailable = true;
  };

  const slickProducts = () => {

    var swiperBox = new Swiper('.swiper-container', {
      direction: 'vertical', // Set the carousel direction to vertical
      slidesPerView: 'auto',  // Show as many slides as fit vertically
      spaceBetween: 10,       // Set the space between slides
      loop: true,             // Enable infinite loop
      mousewheel: true,       // Enable mouse wheel scroll
    });

  }

  const productTracking = () => {
    const allProducts = document.querySelectorAll(`.${ID}-product`);
    for (let index = 0; index < allProducts.length; index += 1) {
      const element = allProducts[index];
      element.querySelector(`a.${ID}-image-anchor`).addEventListener('click', () => {
        // fireEvent('Clicked OOS product image ' + index);
        fireBootsEvent('Clicked OOS product image'+ index, true, eventTypes.experience_action, {
          action: actionTypes.click_cta,
          action_detail: 'Click Image',
        });
      });

      element.querySelector(`.${ID}-modal_button`).addEventListener('click', () => {
        // fireEvent('Clicked OOS Product View Button ' + index);
        fireBootsEvent('Clicked OOS Product View Button'+ index, true, eventTypes.experience_action, {
          action: actionTypes.click_cta,
          action_detail: 'View Product',
        });
      });
      element.querySelector(`a.${ID}-offerBttn`).addEventListener('click', () => {
        // fireEvent('Clicked OOS product Offer ' + index);
        fireBootsEvent('Clicked OOS Product Offer'+ index, true, eventTypes.experience_action, {
          action: actionTypes.click_cta,
          action_detail: 'Product Offer',
        });
      });
    }
  }

  await addProducts();
  slickProducts();
  productTracking();
  // console.log(prodAvailable);
  if(prodAvailable == true){
    showBanner();
  }
  
}