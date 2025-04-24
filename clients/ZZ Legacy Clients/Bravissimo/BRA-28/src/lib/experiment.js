/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { getCookie, events, pollerLite } from '../../../../../lib/utils';
import { addPoller, addObserver } from './winstack';
import settings from './shared';
// import { h, render, Component } from 'preact';
import { init } from './index';


// events.send(ID, `${ID}` `${ID}`);


export default () => {
  setup();

  const { ID, VARIATION } = settings;

  if (getCookie('BRA-28NoShow')) {
    return false;
  };

  const ref = document.querySelector('main.c-page');
  let addedRef;

  // Add a new container within ref
  ref.insertAdjacentHTML('afterbegin', `<div class="BRA-28-ref"></div>`);
  addPoller(['.BRA-28-ref'], () => {
    addedRef = document.querySelector('.BRA-28-ref');
    
    init(addedRef);
    // General observer for body class
    addObserver(document.body, () => {

      document.addEventListener('DOMContentLoaded', () => {
        if (!document.body.classList.contains('BRA-28')) {
          document.body.classList.add('BRA-28')
        }


    
        // Check for Nav
        const bod = document.body;
        if (bod.getAttribute('data-menu-visible')) {
          addedRef.classList.add('hide');
          document.body.classList.add('BRA-28')
        } else {
          addedRef.classList.remove('hide');
          document.body.classList.add('BRA-28')
        }
      });

    }, {
      config: {
        attributes: true,
        childList: true,
        subtree: true,
      }
    })
  });
  

  const addCTA = () => {
    // Add Click components to open the quiz
    const { universal_variable } = window;
    const { dataLayer } = window;
    const { productListing } = dataLayer[0];
    let { product } = dataLayer[0];
    
    let position = null;
    
    if (!universal_variable || !dataLayer) {
    }
    if (universal_variable.page && dataLayer[0]) {
      // Is it PLP?
      if (universal_variable.page.category === 'productListing') {
        const { categories } = productListing;
        
        // Is it Lingerie?
        if (categories.length) {
          if (categories.indexOf('Lingerie') > -1) {
            position = 'PLP';
          }
        }
      } 
      if (window.location.href.indexOf('https://www.bravissimo.com/collections/new-in-lingerie/') > -1) {
        position = 'PLP';
      }
      if (window.location.href.indexOf('https://www.bravissimo.com/collections/all-lingerie') > -1) {
        position = 'PLP';
      }

      // Is it PDP?
      if (document.querySelector('span.c-icon--size-guide-lingerie')) {
        
      }
      if (universal_variable.page.category === 'product') {
        position = 'PDP';
      }

    }

    
    const clickEl = `<div class="BV-openQuiz BV-click-${position}">
      <button>Unsure of your size? Use our bra fit finder!</button>
    </div>`;
    let clickRef = null;


    pollerLite(['.c-results-list .c-results-list__item'], () => {
      clickRef = document.querySelectorAll('.c-results-list .c-results-list__item');
      clickRef = clickRef[3];
      if (!document.querySelector('.BV-openQuiz')) {
        clickRef.insertAdjacentHTML('afterend', clickEl);
        events.send(ID, 'BRA-28 Added', 'BRA-28 Open Quiz Button Added on PLP');
      }
    });
    
    pollerLite(['.c-product-details__style-colours'], () => {
      clickRef = document.querySelector('.c-product-details__style-colours');
      if (!document.querySelector('.BV-openQuiz')) {
        clickRef.insertAdjacentHTML('afterend', clickEl);
        events.send(ID, 'BRA-28 Added', 'BRA-28 Open Quiz Button Added on PDP');
      }
    });

    if(window.location.href.indexOf('bra-fitting-guide') > -1) {
      clickRef = document.querySelector('.c-container[data-ref="Container: Bra Fitting Guide"] .c-container__actions');
      if (!document.querySelector('.BV-openQuiz')) {
        clickRef.insertAdjacentHTML('beforebegin', clickEl);
        events.send(ID, 'BRA-28 Added', 'BRA-28 Open Quiz Button Added on Bra Fitting Page');
      }
    }

  }
  
  addCTA();


  // Fetch Click element and add events
  pollerLite(['.BV-openQuiz', '.BRA-28-quiz'], () => {
    const theEl = document.querySelector('.BV-openQuiz');
    const theQuiz = document.querySelector('.BRA-28-quiz');
    theEl.addEventListener('click', (e) => {
      e.preventDefault();
      if (theQuiz.classList.contains('BV-Hide')) {
        theQuiz.classList.remove('BV-Hide');  
      }
      document.body.classList.add('BV-noscroll')
      theQuiz.classList.add('BV-Active');
      events.send(ID, 'BRA-28 Click', 'BRA-28 Open Quiz');

      // Trigger HotJar
      if (window.hj) {
        window.hj('trigger', 'clicked_bv_el');
      }
    });
  })



  addObserver(document.body, () => {
    // addCTA();

    setTimeout(function() {
      if(!document.body.classList.contains(ID)) {
        document.body.classList.add(ID);
      }

    }, 300);

    document.addEventListener('DOMContentLoaded', () => {
      addCTA();
    });

    setTimeout(() => {
      addCTA(); // Had to include this as going back a page didn't cause the above to fire. 
    }, 1000);
      
    // Fetch Click element and add events
    pollerLite(['.BV-openQuiz', '.BRA-28-quiz'], () => {
      const theEl = document.querySelector('.BV-openQuiz');
      const theQuiz = document.querySelector('.BRA-28-quiz');
      theEl.addEventListener('click', (e) => {
        e.preventDefault();
        if (theQuiz.classList.contains('BV-Hide')) {
          theQuiz.classList.remove('BV-Hide');  
        }
        theQuiz.classList.add('BV-Active');
        events.send(ID, 'BRA-28 Click', 'BRA-28 Open Quiz');
      });
    });

  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: true,
    }
  })

};
