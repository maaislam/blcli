/**
 * PC-215 - Sticky PLP Filters
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
// import debounce from 'lodash/debounce';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

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
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  
  if (window.innerWidth >= 993) {
  // --- DESKTOP
    let elementTarget = document.querySelector(`.template-category-nav`);
    if (elementTarget.getBoundingClientRect().top <= 0) {
      document.querySelector('#filterProducts').classList.add('sticky');
      fireEvent(`Visible - Filter is sticky - Desktop`);
    }


    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    }
    
    let observer = new IntersectionObserver((entries) => {
      const filters = document.querySelector('#filterProducts');

      entries[0].isIntersecting ? filters.classList.remove('sticky') : filters.classList.add('sticky');

      if (filters.classList.contains('sticky')) {
        fireEvent(`Visible - Filter is sticky - Desktop`);
      }
    }, options)


    observer.observe(document.querySelector('.template-category-nav'));

    

  } else {
  // --- MOBILE
    // pollerLite([`.template-category .template-category-banner`], () => {

      let elementTarget = document.querySelector(`.template-category-nav`);
      if (elementTarget.getBoundingClientRect().top <= -150) {
        document.querySelector('.template-category-nav').classList.add('sticky');
      }

      
      window.addEventListener("scroll", function() {
          if (elementTarget.getBoundingClientRect().top > -150) {
            document.querySelector('.template-category-nav').classList.remove('sticky');
          }
          if (elementTarget.getBoundingClientRect().top <= -150) {
            document.querySelector('.template-category-nav').classList.add('sticky');
            fireEvent(`Visible - Filter is sticky - Mobile`);
          }

      });
    // });
    
  }
  
  
};
