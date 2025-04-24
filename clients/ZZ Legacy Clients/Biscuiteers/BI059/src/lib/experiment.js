import { setup } from './services';
import { addPoller, addEventListener, addObserver } from './winstack';
import { events, addJsToPage, addCssToPage } from '../../../../../lib/utils';
import { checkInView, checkItemsInViewOnScroll } from './scrolling';
import settings from './shared';
/**
 * Entry point for experiment
 */
export default () => {
  setup();

  events.send(`${settings.ID}-${settings.VARIATION}`, 'Initialised');

  // -------------------------------------
  // Render
  // -------------------------------------
  const target = document.querySelector('image-component > a');

  if(settings.VARIATION != 'control') {
    const scriptsIdPrefix = `${settings.ID}-${settings.VARIATION}`;
    if(settings.VARIATION == 'ribbon') {
      // Ribbon Widget
      target.insertAdjacentHTML('beforeend', `<div id="badge-ribbon" class="${settings.ID}-DOD"></div>`);
      addJsToPage('https://widget.reviews.co.uk/badge-ribbon/dist.js', `${scriptsIdPrefix}-js`, () => {
        reviewsBadgeRibbon("badge-ribbon", {
          store: "biscuiteers",
          size: "medium",
        });

        document.querySelector('#badge-ribbon').classList.add('xactive');
      }, `${settings.ID}-DOD`);
    } else if(settings.VARIATION == 'badge') {
      // Badge Widget
      target.insertAdjacentHTML('beforeend', `<div class="badge-230-wrap ${settings.ID}-DOD"><div id="badge-230" style="max-width:230px;"></div></div>`);
      addJsToPage('https://widget.reviews.co.uk/badge-modern/dist.js', `${scriptsIdPrefix}-js`, () => {

        reviewsBadgeModern('badge-230', {
          store: 'biscuiteers',
          primaryClr: '#E679A5',
          starsClr: '#666666',
        });

        document.querySelector('#badge-230').classList.add('xactive');
      }, `${settings.ID}-DOD`);
    } else if(settings.VARIATION == 1) {
      // -----------
      // This is the production variation for BI059
      // -----------
      target.insertAdjacentHTML('beforeend', 
        `<div id="carousel-widget"
          class="${settings.ID}-DOD"
          ></div>`
      );

      addJsToPage('https://widget.reviews.co.uk/rich-snippet-reviews-widgets/dist.js', `${scriptsIdPrefix}-js`, () => {
        richSnippetReviewsWidgets('carousel-widget', {
          store:"biscuiteers",primaryClr:"#e679a5",neutralClr:"#2c2c2c",reviewTextClr:"#2c2c2c",widgetName:"carousel",layout:"fullWidth",numReviews:40,font:"'Georgia', sans-serif",css:".productReviewComment img { display: none !important; } .reviewSource{display: none;} .CarouselWidget .reviewsContainer {font-family: Georgia, sans-serif;} .CarouselWidget {font-family: Georgia, sans-serif; padding-bottom: 0; } .RatingVerdict { text-transform: lowercase; } .cw__header, .ReviewsLogo { pointer-events: none !important; }",contentMode: "company;product",sku: "all-product-reviews;",hideDates:!0
        });

        const carouselWidget = document.querySelector('#carousel-widget');
        if(carouselWidget) {
          if(checkInView(carouselWidget)) {
            events.send(`${settings.ID}-${settings.VARIATION}`, 'In View', '', {
              sendOnce: true
            });
          } else {
            checkItemsInViewOnScroll([carouselWidget]).then(() => {
              events.send(`${settings.ID}-${settings.VARIATION}`, 'In View', '', {
                sendOnce: true
              });
            });
          }

          addEventListener(window, 'blur', () => {
            if(document.activeElement === carouselWidget.querySelector('iframe')) {
              events.send(`${settings.ID}-${settings.VARIATION}`, 'Did Interact', '', {
                sendOnce: true
              });
            }
          });
        }
      });
    }
  } else {
    // control
    if(target) {
      if(checkInView(target)) {
        events.send(`${settings.ID}-${settings.VARIATION}`, 'In View', '', {
          sendOnce: true
        });
      } else {
        checkItemsInViewOnScroll([target]).then(() => {
          events.send(`${settings.ID}-${settings.VARIATION}`, 'In View', '', {
            sendOnce: true
          });
        });
      }
    }
  }
};
