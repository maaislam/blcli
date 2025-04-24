/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import breadCrumb from './breadcrumb';
import Swiper from "swiper/bundle";
import { insertBeforeElement, pollerLite } from '../../../../../lib/utils';

export default (data) => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
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
    pollerLite(['.fi-slot'], () => {
      fireEvent('FoundIt Shown', true);
    });
  } else {

    let entry;

    
    entry = document.querySelector('#estore_lister_template_container');
    
    

    const root = document.createElement("div");
    root.id = `${ID}-root`;
    root.innerHTML = `
      <h4>Jump to:</h4>
      <div class="${ID}-carousel-container">
        <div class="swiper" id="${ID}-swiper">
          <div class="swiper-wrapper"></div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    `;

    if(VARIATION === '1' || VARIATION === '3') {
      insertBeforeElement(entry, root);
    }
    if(VARIATION === '2') {
      entry.appendChild(root);
    }

    const slidesContainer = root.querySelector(`.swiper-wrapper`);

    data.forEach((breadcrumbData) => {
      if (breadcrumbData) {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        slide.appendChild(
          breadCrumb(
            breadcrumbData.link_name,
            breadcrumbData.link_url
          )
        );
        slidesContainer.append(slide);
      }
    });

    

    new Swiper(`#${ID}-swiper`, {
      slidesPerView: 2,
      loop: false,
      //slidesPerGroup: 1,
      spaceBetween: 10,
      //centerInsufficientSlides: true,
    
      navigation: {
        nextEl: `#${ID}-swiper .swiper-button-next`,
        prevEl: `#${ID}-swiper .swiper-button-prev`,
      },
      breakpoints: {
        320: {
          slidesPerView: "auto",
          //slidesPerGroup: 1,
          spaceBetween: 8,
        },
        540: {
          slidesPerView: "auto",
          //slidesPerGroup: 2,
          spaceBetween: 10,
        },
        760: {
          slidesPerView: "auto",
          //slidesPerGroup: 3,
          spaceBetween: 10,
        },
        1020: {
          slidesPerView: "auto",
          //slidesPerGroup: 4,
          spaceBetween: 15,
        },
      },
    });


    const slides = document.querySelectorAll(`.${ID}-carousel-container .swiper-slide`);
    for (let index = 0; index < slides.length; index += 1) {
      const element = slides[index];
      element.addEventListener('click', (e) => {
        const linkName = e.currentTarget.querySelector('a').textContent;
        fireEvent('Clicked breadcrumb ' +linkName);
      });
    }

    window.onscroll = function(){
      if( document.querySelector(`.${ID}-carousel-container`).getBoundingClientRect().top <= 0){
        fireEvent('Breadcrumbs in view', true);
      }   
    }


    // Fixed on scroll
    if(VARIATION === '3') {
      const breadCrumbsBar = document.querySelector(`#${ID}-root`);
      const topEl = document.querySelector('#estore_lister_template_container')
      window.addEventListener('scroll', function() {
        topEl.getBoundingClientRect().top < 0 ? 
        breadCrumbsBar.classList.add('fixed') : 
        breadCrumbsBar.classList.remove('fixed');
      });
    }


    pollerLite(['.fi-slot'], () => {
      if(document.querySelector(`#${ID}-root`)) {
        document.querySelector(`#${ID}-root`).style.display = 'none';
      }
      fireEvent('FoundIt Shown', true);
    });
  }
};
