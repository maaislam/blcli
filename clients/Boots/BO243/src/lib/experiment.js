/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { createBanner, showBanner, hideBanner, } from './components/stockBanner';
import { setup, fireEvent } from '../../../../../core-files/services';
import Swiper from "swiper/swiper-bundle";
import shared from '../../../../../core-files/shared';
import getData from './components/productData';


export default (data) => {
  const { ID, VARIATION } = shared;

  setup();
  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  if(VARIATION !== 'Control') {
    createBanner();
    showBanner();
    hideBanner();

    const upsellProductsObj = getData(data);

    const addProducts = () => {
        Object.keys(upsellProductsObj).forEach((i) => {
            const data = upsellProductsObj[i];

            const product = document.createElement('div');
            product.classList.add(`${ID}-product`);
            product.classList.add("swiper-slide");
            product.innerHTML = `
            <a href="${data.link}">
            <div class="${ID}-image" style="background-image:url(${data.image})"></div></a>
            <p>${data.name}</p>
            <div class="${ID}-prices">
                <span class="${ID}-price">£${data.price}</span>
            </div>
            <a class="${ID}-modal_button" href="${data.link}">SHOP NOW</a>`;

            document.querySelector(`.${ID}-stockcarousel .swiper-wrapper`).appendChild(product);
        });
    };
   
    const slickProducts = () => {

        // slick products
        const slickBoxes = () => {
            new Swiper(`.${ID}-stockcarousel`, {
                slidesPerView: 2,
                loop: true,
              //slidesPerGroup: 1,
              spaceBetween: 10,
              //centerInsufficientSlides: true,
             
              navigation: {
                nextEl: `.${ID}-carouselWrapper .swiper-button-next`,
                prevEl: `.${ID}-carouselWrapper .swiper-button-prev`,
              },
              breakpoints: {
                320: {
                  slidesPerView: 1.5,
                  //slidesPerGroup: 1,
                  spaceBetween: 8,
                },
                540: {
                  slidesPerView: 2.5,
                  //slidesPerGroup: 2,
                  spaceBetween: 10,
                },
                760: {
                  slidesPerView: 2.5,
                  //slidesPerGroup: 3,
                  spaceBetween: 10,
                },
                1020: {
                  slidesPerView: 3,
                  //slidesPerGroup: 4,
                  spaceBetween: 10,
                },
                1200: {
                  slidesPerView: 4,
                  //slidesPerGroup: 4,
                  spaceBetween: 10,
                },
                },
              });
        }
        slickBoxes();
    }

    const productTracking = () => {
        const allProducts = document.querySelectorAll(`.${ID}-product`);
        for (let index = 0; index < allProducts.length; index += 1) {
            const element = allProducts[index];
            element.querySelector('a').addEventListener('click', () => {
                fireEvent('Clicked OOS product image ', + index);
            });

            element.querySelector(`.${ID}-modal_button`).addEventListener('click', () => {
                fireEvent('Clicked OOS product shop now ', + index);
            });
        }
    }

    addProducts();   
    slickProducts();
    productTracking();
  }

};
