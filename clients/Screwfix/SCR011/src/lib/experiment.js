/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { clickHandler, filterFn } from './clickHandler';
import { mutationObserver } from './helper/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  console.log('RRRRunning....');
  setup();

  // console.log(`%c${ID}-${VARIATION}`, `font-size: 30px; color: green;`);
  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  const body = document.body;
  body.addEventListener('click', function ({ target }) {
    // Trackings and mobile functionality
    clickHandler(target);
    //console.log(target, target)
    //console.log(target.closest(`.${shared.ID}__Custom_close`), "jjjj")
  });

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  } else {
    const init = () => {
      if (window.innerWidth >= 640) {
        pollerLite([`.sticky-left #facet_brand > ul`], () => {
          // console.log(`init`);
          const brandFilter = document.querySelector(`.sticky-left #facet_brand > ul`);
          // !brandFilter.closest(`.${ID}-display-flex`) && brandFilter.classList.add(`.${ID}-display-flex`);
          const brands = brandFilter?.childNodes;
          const addClass = (filter, className) => {
            if (!filter.closest(`[class^="${ID}-stickyLeft-"]`)) {
              filter.closest(`.hidden`)?.classList.remove(`hidden`);
              filter?.classList.add(`${ID}-stickyLeft-${className}`);
            }
          };
          brands.length > 0 &&
            brands.forEach((brand) => {
              if (brand.textContent?.toLowerCase().includes(`makita`)) addClass(brand, `makita`);
              else if (brand.textContent?.toLowerCase().includes(`dewalt`)) addClass(brand, `dewalt`);
              else if (brand.textContent?.toLowerCase().includes(`bosch`)) addClass(brand, `bosch`);
            });
        });
      } else {
        document.querySelectorAll('.n.ln__cats.ln__cats--fh li').forEach((item) => {
          item?.classList.add(`${shared.ID}__custom_close`);
        });
      }
    };
    init();
    const mutationCallback = (mutationList, observer) => {
      mutationList.forEach((mutation) => {
        const { type, addedNodes } = mutation;
        if (type == 'childList' && addedNodes.length > 0) {
          if (
            Array.from(addedNodes).findIndex((node) => {
              if (node instanceof Element) {
                //console.log(node);
                return node.matches(`.sticky-left #facet_brand`);
              }
            }) > -1
          ) {
            //console.log(mutation);
            init();
          }
        }
      });
      observer.disconnect();
      init();
      mutationObserver(body, mutationCallback);
    };
    mutationObserver(body, mutationCallback);
  }
  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
};
