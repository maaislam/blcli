/**
 * NE-348 PLP Pagination vs. Lazy Load
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { checkScrollUntilElIntoView } from './helpers';

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
    /**
     * @desc Check if Pagination CTA is visible in viewport
     */
    const pagination = document.querySelector(`.is-pagination.is-size-5.has-text-weight-light.is-flex.is-justify-content-center.has-margin-top-small`);
    checkScrollUntilElIntoView(pagination);

    pagination.addEventListener('click', (e) => {
      fireEvent(`Click - Pagination`);
    });

    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  var script = document.createElement('script');
  script.src = 'https://unpkg.com/infinite-scroll@4.0.1/dist/infinite-scroll.pkgd.min.js';
  document.head.appendChild(script);

  let jQuery = null;
  jQuery = window.jQuery || window.$;

  if (VARIATION == '1') {
    
    script.onload = function () {
        //do stuff with the script
        jQuery('.collection-section > .container').infiniteScroll({
          // options
          path: '.is-pagination a[title="Next"]',
          append: '.collection-section .columns',
          history: false,
        });

        fireEvent(`Conditions Met - Trigger Lazy Load`);
    };
    
  } else if (VARIATION == '2') {
    const showMore = `<div class="${ID}-showMore__wrapper">
      <div class="${ID}-showMore__cta">Show More</div>
    </div>`;
    // document.querySelector('section.section.has-text-centered').insertAdjacentHTML('beforebegin', showMore);
    document.querySelector('.nosto_element#categorypage-nosto-2').insertAdjacentHTML('afterend', showMore);
    
    document.querySelector('.columns.is-multiline.is-mobile.has-padding-top-tiny').classList.add('shown');

    script.onload = function () {
      //do stuff with the script
      jQuery('.collection-section > .container').infiniteScroll({
        // options
        path: '.is-pagination a[title="Next"]',
        append: '.collection-section .columns',
        history: false,
      });

    };

    document.querySelector(`.${ID}-showMore__cta`).addEventListener('click', (e) => {
      fireEvent(`Clicked - 'Show more' button`);
      
      let allLists = document.querySelectorAll('.columns.is-multiline.is-mobile.has-padding-top-tiny');
      for (let i = 0; i < allLists.length - 1; i += 1) {
        let list = allLists[i];
        let nextList = allLists[i+1];
        if (!nextList.classList.contains('shown')) {
          nextList.classList.add('shown');
          break;
        }
      }

      let allShownLists = document.querySelectorAll('.columns.is-multiline.is-mobile.has-padding-top-tiny.shown');
      if (allLists.length > 1 && allLists.length == allShownLists.length) {
        document.querySelector(`.${ID}-showMore__cta`).setAttribute('style', 'display: none;');
      } else {
        document.querySelector(`.${ID}-showMore__cta`).removeAttribute('style');
      }
      
    });

    /**
     * @desc Check if "SHOW MORE" CTA is visible in viewport
     */
    checkScrollUntilElIntoView(document.querySelector(`.${ID}-showMore__cta`));

    
    
  }

};
