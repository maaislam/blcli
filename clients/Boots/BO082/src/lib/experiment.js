/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import {
  events
} from '../../../../../lib/utils';
import BelowFoldMarkup from './belowFold';
import {
  addDepartments,
  addServices
} from './data';
import HeroBanners from './heroBanners';
import {
  fireEvent,
  setup
} from './services';
import shared from './shared';

export default () => {
  const {
    ID,
    VARIATION
  } = shared;

  setup();
  
  const heroCarouselEvents = () => {
    const heroCarousel = document.querySelector('.oct-carousel-hero__inner .oct-carousel-hero-swiper-slide');
    for (let index = 0; index < heroCarousel.length; index += 1) {
      const element = heroCarousel[index];
      element.addEventListener('click', () => {
        fireEvent('Clicked Hero Carousel');
      });
    } 
  }

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  if (VARIATION === 'control') {
    fireEvent('Test Fired');
   
    heroCarouselEvents();
  } else {
    fireEvent('Test Fired');
   
    /*  ----------------
      Experiment code 
      ------------------ */

    // move hero banner
    const createNewContent = () => {
      const newMarkup = document.createElement('div');
      newMarkup.classList.add(`${ID}-newWrapper`);
      newMarkup.innerHTML = `<div class="${ID}-heroCarousel"></div>
      <div class="${ID}-belowFold"></div>`;

      document.querySelector('.oct-grid.oct-aem-grid').insertAdjacentElement('afterbegin', newMarkup);

      let heroCarousel;
      if(document.querySelector('.oct-carousel-hero')) {
        heroCarousel = document.querySelector('.oct-carousel-hero').parentNode;
      } else {
        heroCarousel = document.querySelector('#cu_2021_pay_day').parentNode;
      }
      
      if(heroCarousel) {
        document.querySelector(`.${ID}-heroCarousel`).appendChild(heroCarousel);
      }

      if (VARIATION === '3') {
        const usps = document.querySelector('.oct-propositionbanner').parentNode;
        document.querySelector(`.${ID}-belowFold`).insertAdjacentElement('afterbegin', usps);
      }
    }

    createNewContent();
    new BelowFoldMarkup();
    addDepartments();
    addServices();
    if(document.querySelector('.oct-carousel-hero__inner .oct-carousel-hero-swiper-slide')) {
      heroCarouselEvents();
    }

    if (VARIATION === '3') {
      new HeroBanners();
    }


    const allEvents = () => {

      // department banners
      const departmentBanners = document.querySelectorAll(`.${ID}-section.${ID}-banners .${ID}-category`);
      if (departmentBanners) {
        for (let index = 0; index < departmentBanners.length; index++) {
          const element = departmentBanners[index];

          element.querySelector(`.${ID}__button`).addEventListener('click', () => {
            const elName = element.querySelector('h3').textContent.trim();
            fireEvent(`Clicked Department Banner: ${elName}`);
          });
        }
      }

      // services links
      const departmentLinks = document.querySelectorAll(`.${ID}-section.${ID}-departments .${ID}-departmentBlock`);
      if (departmentLinks) {
        for (let index = 0; index < departmentLinks.length; index++) {
          const department = departmentLinks[index];

          department.querySelector(`a`).addEventListener('click', () => {
            const departmentName = department.querySelector('span').textContent.trim();
            fireEvent(`Clicked Department Link: ${departmentName}`);
          });
        }
      }

      const servicesLinks = document.querySelectorAll(`.${ID}-section.${ID}-services .${ID}-serviceBlock`);
      if (servicesLinks) {
        for (let index = 0; index < servicesLinks.length; index++) {
          const serviceLink = servicesLinks[index];

          serviceLink.querySelector(`a`).addEventListener('click', () => {
            const serviceName = serviceLink.textContent.trim();
            fireEvent(`Clicked Service Link: ${serviceName}`);
          });
        }
      }

      if (VARIATION === '3') {
        const mainBanners = document.querySelectorAll(`.${ID}_bannerOuter`);
        if (mainBanners) {
          for (let index = 0; index < mainBanners.length; index++) {
            const categoryBanner = mainBanners[index];

            categoryBanner.querySelector(`.${ID}__button`).addEventListener('click', () => {
              const categoryBanner = categoryBanner.textContent.trim();
              fireEvent(`Clicked Main Banner Category: ${categoryBanner}`);
             
            });

            const innerLinks = document.querySelectorAll(`.${ID}_linkItem`);
            if (innerLinks) {
              for (let index = 0; index < innerLinks.length; index += 1) {
                const element = innerLinks[index];
                element.addEventListener('click', (e) => {
                  const linkName = e.currentTarget.textContent.trim();
                  fireEvent(`Clicked Main Banner Department Link ${linkName}`);
                });
              }

            }
          }
        }
      }
    }

    allEvents();

  }
};
