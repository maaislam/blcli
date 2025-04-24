/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { addPoller, addEventListener, addObserver } from './winstack';
import { setup, fireEvent } from '../../../../../core-files/services';
import { elementIsInView } from '../../../../../lib/utils';
import debounce from 'lodash/debounce';
import shared from '../../../../../core-files/shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  const ctaBtn = document.querySelector('local-add-to-basket action.button');
  if(ctaBtn) {
    addEventListener(ctaBtn, 'click', () => {
      fireEvent('Click - Add To Bag');
    });
  }
  const occasion = document.querySelector('product-when-your-occasion');
  if(occasion) {
    addEventListener(occasion, 'click', () => {
      fireEvent('Click - Occasion Element');
    });
  }
  const reminder = document.querySelector('ng-include[src*="product-reminder"]');
  if(reminder) {
    addEventListener(reminder, 'click', () => {
      fireEvent('Click - Reminder Element');
    });
  }
  
  addPoller(['[click-event*=delivery-details]'], () => {
    const deliveryInfoLink = document.querySelector('[click-event*=delivery-details]');
    if(deliveryInfoLink) {
      addEventListener(deliveryInfoLink, 'click', () => {
        fireEvent('Click - Check Delivery Info');
      });
    }
  });

  addPoller(['recently-viewed .carousel__frame'], () => {
    [].forEach.call(document.querySelectorAll('recently-viewed .carousel__frame'), item => {
      addEventListener(item, 'click', () => {
        fireEvent('Click - Recently viewed Item');
      });
    });
  });

  addPoller(['related-products .carousel__frame'], () => {
    [].forEach.call(document.querySelectorAll('related-products .carousel__frame'), item => {
      addEventListener(item, 'click', () => {
        fireEvent('Click - Related Products Item');
      });
    });
  });

  addPoller(['[zippy-toggle*=product-description]'], () => {
    [].forEach.call(document.querySelectorAll('[zippy-toggle*=product-description]'), item => {
      addEventListener(item, 'click', () => {
        fireEvent('Click - Description Accordion - ' + item.innerText.trim());
      });
    });
  })

  addPoller(['newsletter-form'], () => {
    const footer = document.querySelector('newsletter-form');
    if(footer) {
      let eventSent = false;
      addEventListener(window, 'scroll', debounce(() => {
        if(!eventSent && elementIsInView(footer, false)) {
          fireEvent('In View - Footer');

          eventSent = true;
        }
      }, 100));
    }
  });

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  if(ctaBtn) {
    // -----
    // Hide all informational CTA elements
    // -----
    document.documentElement.classList.add(`${ID}-condensed-pdp`);
    
    // -----
    // Move 'about delivery' to above cta
    // Variation 2 only
    // -----
    if(shared.VARIATION == 2) {
      const aboutDelivery = document.querySelector('local-product-view about-delivery');
      if(aboutDelivery) {
        ctaBtn.insertAdjacentElement('beforebegin', aboutDelivery);

        addPoller(['about-delivery .countdown-time'], () => {
          aboutDelivery.classList.add('xhascountdown');
        }, {
          timeout: 10000
        });
      }
    }

    // -----
    // Add more info link to show hidden elements
    // -----
    ctaBtn.insertAdjacentHTML('beforebegin', `
      <div class="${ID}-moreinfo">
        <a class="col-11 link">more information</a>
      </div>
    `);

    // -----
    // Create 'more info' elms to show cta elements
    // -----
    const link = document.querySelector(`.${ID}-moreinfo a`);
    if(link) {
      link.addEventListener('click', () => {
        fireEvent('Click - More Info');

        link.parentElement.remove();

        document.documentElement.classList.remove(`${ID}-condensed-pdp`);

        setTimeout(() => {
          const ctaBtn = document.querySelector('local-add-to-basket action.button');
          if(ctaBtn) {
            window.scrollTo({
              top: ctaBtn.getBoundingClientRect().top + window.scrollY - 80,
              left: 0,
              behavior: 'smooth'
            });
          }
        }, 150);
      });
    }
  }
};
