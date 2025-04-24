/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import category from './category';
import Swiper from "swiper/swiper-bundle";


export default (data) => {
  const { ID, VARIATION } = shared;
  if(data) {

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
    window.usabilla_live('trigger', `CustomerSurveyTrigger`);
  }
  
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  } else {

      const addSlides = () => {
      const rootElement = document.createElement("div");
      rootElement.classList.add(`${ID}-root`);
      rootElement.innerHTML = /* HTML */ `
        <div class="${ID}-header">
          <h4>Categories Inspired By Your Browsing</h4>
        </div>
        <div class="${ID}-swiper-container">
          <div class="${ID}-swiper swiper-container" >
            <div class="swiper-wrapper"></div>
          </div>
        </div>
        <div aria-label="next slide" role="button" tabindex="-1" class="swiper-button-next ${ID}-swiperNext"></div>
        <div aria-label="previous slide" role="button" tabindex="-1" class="swiper-button-prev ${ID}-swiperPrev"></div>
      `;

        let entryElement = document.querySelector('#inspire-by-test');
        // if(document.querySelector('.cu-ticker.aem-ticker')){
        //   entryElement = document.querySelectorAll('.oct-grid__row.oct-grid__row--full-width')[3];
        // } else {
          //entryElement = document.querySelector('.oct-experience-fragment').parentNode.parentNode;
        //}
        // insertAfterElement(entryElement, rootElement);

        entryElement.appendChild(rootElement);
        

        const slidesContainer = rootElement.querySelector(`.swiper-wrapper`);

        // if(data.length <= 6 && window.innerWidth >= 1280) {
        //   slidesContainer.style = 'justify-content: center;'
        // }

        
          data.forEach((product) => {
            if (product) {
              if(product.subheader_name.indexOf('CHANEL') > -1 || product.subheader_name.indexOf('DIOR') > -1) {
                return;
              } else {
                const slide = document.createElement("div");
                slide.classList.add("swiper-slide");
                slide.appendChild(category(product.subheader_name, product.subheader_image, product.subheader_url));
                slidesContainer.append(slide);
              }
            }
          });

          //const swiper = 
          new Swiper(`.${ID}-root .${ID}-swiper`, {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 10,
            centerInsufficientSlides: true,
            navigation: {
              nextEl: `.${ID}-root .swiper-button-next`,
              prevEl: `.${ID}-root .swiper-button-prev`,
            },
            //cssMode: true,
            // freeMode: {
            //   enabled: true,
            //   sticky: true,
            // },
            breakpoints: {
              320: {
                slidesPerView: 2.5,
                slidesPerGroup: 1,
                spaceBetween: 20,
              },
              400: {
                slidesPerView: 2.5,
                slidesPerGroup: 1,
                spaceBetween: 20,
              },
              760: {
                slidesPerView: 5,
                slidesPerGroup: 1,
                spaceBetween: 10,
              },
              1020: {
                slidesPerView: 5,
                slidesPerGroup: 1,
                spaceBetween: 20,
              },
            },
          });
        
        //swiper.update();
      }
    
      const datalength = data.filter(element => !element.subheader_name.match(/.*(DIOR|CHANEL).*/)).length;
        
      if(datalength >= 4) {
        addSlides();
      

        const tracking = () => {
          pollerLite([`.${ID}-root .swiper-slide a`], () => {
            const slides = document.querySelectorAll(`.${ID}-root .swiper-slide a`);

            for (let index = 0; index < slides.length; index += 1) {
              const element = slides[index];
              element.addEventListener('click', (e) => {
                const catName = e.currentTarget.querySelector('p').textContent;
                fireEvent('Clicked category ' +catName);
              });
            }
          });
        }
        tracking();
      }
  }
  }
};
