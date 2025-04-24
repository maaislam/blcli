/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import giftJourneyModal from './giftJourneyModal';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  fireEvent('Conditions Met');

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  // create gift journey section on homepage

  window.waitForElem =
    window.waitForElem ||
    ((waitFor, callback, minElements = 1, variable = false) => {
      function checkElements() {
        if (variable) {
          return waitFor;
        } else {
          return window.document.querySelectorAll(waitFor);
        }
      }

      var thisElem = checkElements(),
        timeOut;
      if ((!variable && thisElem.length >= minElements) || (variable && typeof thisElem !== 'undefined')) {
        return callback(thisElem);
      } else {
        var interval = setInterval(function () {
          thisElem = checkElements();
          if ((!variable && thisElem.length >= minElements) || (variable && typeof thisElem !== 'undefined')) {
            clearInterval(interval);
            clearTimeout(timeOut);
            return callback(thisElem);
          }
        }, 20);
        timeOut = setTimeout(function () {
          // Fallback
          clearInterval(interval);
          return callback(false);
        }, 10000);
      }
    });

  const giftJourneyMainSection = () => {
    document.querySelector('body').classList.add(`${ID}-body`);

    waitForElem('.cms-component.page-component-category-routing', (element) => {
      if (element) {
        var editorialBanner = document.querySelectorAll('.cms-component.page-component-category-routing')[1];

        editorialBanner &&
          editorialBanner.insertAdjacentHTML(
            'afterend',
            `
         <div  class="cms-component wrap page-component-hero-banner giftJourney-banner" style='padding-top:30px;'>
          <div  class="wrap-x wrap-l pos-relative giftJourneyWrap wrap">
              <div  class="wrap-m giftJourney-wrap wrap-s  p-b-4-s" style="background-color: rgb(253, 243, 248);">
                <div class="flex flex-middle flex-justify-center-m ng-star-inserted">
                    <div  class="w-4 w-12-m w-12-s p-t-4-m p-b-4-m p-t-4-s p-b-4-s flex flex-column flex-middle flex-justify-center giftJourney-content">
                      <div class="w-8 w-9-s w-10-m center col-1">
                    <h3 class="h2 m-b-7 ng-star-inserted onlyDesktop"><img class="${ID}-titleimage" src="https://blcro.fra1.digitaloceanspaces.com/BIC-307/title.png" alt="Be a gift giving genius" /></h3>
                      <p class='p2'>
                      Looking to gift biscuit magic but not sure where to start?
                      </p>
                      
                      <a class="button m-t-2-s m-t-3 gift-quiz-start" href="javascript:void(0)">Find A Gift</a>
                      </div>
                    </div>
                    <div  class="ratio-9-5 ratio-1-1-m ratio-1-1-s w-8 w-12-m w-12-s giftJourney-photo">
                      <h3 class="h2 m-b-7 ng-star-inserted OnlyMobile"><img class="${ID}-titleimage" src="https://blcro.fra1.digitaloceanspaces.com/BIC-307/title.png" alt="Be a gift giving genius" /></h3>
                      <div class="imageWrapper"></div>
                    </div>
                </div>
              </div>
          </div>
        </div>
                `
          );
      }
    });
  };

  const urlChange = (history) => {
    if (window.hasURLChangeListener) {
      return;
    }
    var pushState = history.pushState;
    history.pushState = function (state) {
      setTimeout(function () {
        if (window.location.pathname == '/') {
          giftJourneyMainSection();
          giftJourneyModal(ID, fireEvent);

          window.addEventListener('resize', () => {
            var exists = document.querySelector('[class="cms-component wrap page-component-hero-banner giftJourney-banner"]');
            if (!exists) {
              giftJourneyMainSection();

              giftJourneyModal(ID, fireEvent);
            }
          });
        }
      }, 0);
      return pushState.apply(history, arguments);
    };
    window.hasURLChangeListener = true;
  };

  const run = () => {
    waitForElem('.cms-component.page-component-category-routing', (element) => {
      if (element && !document.body.classList.contains(`BIC-307-body`) && location.pathname === '/') {
        giftJourneyMainSection();
        giftJourneyModal(ID, fireEvent);

        const targetnode = document.querySelector('.page-view-boundary');
        const callback = new MutationObserver(function () {
          var exists = document.querySelector('[class="cms-component wrap page-component-hero-banner giftJourney-banner"]');

          if (!exists) {
            giftJourneyMainSection();

            giftJourneyModal(ID, fireEvent);
          }
        });

        callback.observe(targetnode, { childList: true });
        urlChange(window.history);
      }
    });
  };

  run();
};
