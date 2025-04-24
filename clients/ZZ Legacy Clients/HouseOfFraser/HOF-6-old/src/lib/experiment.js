/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import data from './data';
import { checkIntersection } from '../../../../../evelyn/scrolling';

// Force set analytics reference
events.analyticsReference = '_gaUAT';

// Vars
const SLIDETO_ENABLED = true;

/**
 * Helper pop sublinks
 */
const populateSublinks = (href, alt) => {
  const brandLogos = document.querySelector('.HOFhomeBrandLogos');

  let subsection = brandLogos.querySelector(`.${shared.ID}-subsection`);
  if(!subsection) {
    brandLogos.insertAdjacentHTML('beforeend', `<div class="${shared.ID}-subsection"></div>`);

    subsection = brandLogos.querySelector(`.${shared.ID}-subsection`);
  }

  const links = data[href];
  if(links) {
    subsection.innerHTML = '';

    subsection.insertAdjacentHTML('beforeend', `
      <div class="${shared.ID}-subsection__links">
        ${
          (Object.keys(links).map(link => {
            return `<a class="${shared.ID}-subsection__link" href="${link}">${links[link]}</a>`;
          })).join('')
        }
      </div>
    `);

    subsection.insertAdjacentHTML('beforeend', `
      <p class="${shared.ID}-subsection__all">
        <a href="${href}">Shop all ${alt}</a>
      </p>
    `);
  }
};

export default () => {
  setup();

  const brandLogos = document.querySelector('.HOFhomeBrandLogos');
  if(brandLogos) {
    checkIntersection(brandLogos).then(() => {
      fireEvent('View Brand Logos');
    });
  
    // -------------------------
    // Update links
    // -------------------------
    const links = brandLogos.querySelectorAll('a[href*=brand]:not(.brandLogoTitle)');
    [].forEach.call(links, link => {
      link.addEventListener('click', e => {
        fireEvent('Clicked Brand Logo - ' + e.currentTarget.getAttribute('href'));

        if(shared.VARIATION == 'control') {
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        const curTargetIndex = e.currentTarget.parentNode.getAttribute('data-swiper-slide-index');
        const nextSlideIsDuplicate = !!(e.currentTarget.parentNode.nextElementSibling?.className || '').match(/duplicate/);
    
        // -------------------------
        // Stop autoplay & slideto
        // -------------------------
        const swiperElm = brandLogos.querySelector('.swiper-container');
        if(swiperElm && typeof swiperElm?.swiper?.autoplay?.stop == 'function') {
          swiperElm.swiper.autoplay.stop();

          if(SLIDETO_ENABLED) {
            if(curTargetIndex == 0) {
              // Works around weird behaviour with slide to where it doesn't duplicate slides left
              swiperElm.swiper.slideToLoop(curTargetIndex, 0, 0);
            } else {
              swiperElm.swiper.slideTo(curTargetIndex, 0, 0);
            }
          }
        }
        
        // -------------------------
        // Active state
        // -------------------------
        [].forEach.call(links, l => l.classList.remove(`${shared.ID}-active`));
        e.currentTarget.classList.add(`${shared.ID}-active`);

        [].forEach.call(document.querySelectorAll('[data-swiper-slide-index="' + curTargetIndex + '"]'), d => {
          d.querySelector('a').classList.add(`${shared.ID}-active`);
        });


        // -------------------------
        // Show sublinks
        // -------------------------
        const href = e.currentTarget.getAttribute('href');
        const alt = e.currentTarget.querySelector('img[alt]')?.alt;

        populateSublinks(href, alt);
        
        // -------------------------
        // Sublink event tracking
        // -------------------------
        [].forEach.call(document.querySelectorAll(`.${shared.ID}-subsection__link`), link => {
          link.addEventListener('click', evt => {
            fireEvent('Clicked Sublink - ' + evt.currentTarget.innerText.trim());
          });
        });

        [].forEach.call(document.querySelectorAll(`.${shared.ID}-subsection__all a`), link => {
          link.addEventListener('click', evt => {
            fireEvent('Clicked All Link');
          });
        });

      });
    });
  }
};
