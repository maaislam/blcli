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

  if(settings.VARIATION != 'control') {
    const scriptsIdPrefix = `${settings.ID}-${settings.VARIATION}`;

    if(settings.VARIATION == 1) {

      const init = () => {
        const target = document.querySelector('image-component > a');
        addJsToPage('https://widget.reviews.co.uk/rich-snippet-reviews-widgets/dist.js', `${scriptsIdPrefix}-js`, () => {
          target.insertAdjacentHTML('afterend', 
            `<div id="carousel-widget"
              class="${settings.ID}-DOD"
              ></div>`
          );

          // Widget allows you to inject CSS into the iframe, as such..
          richSnippetReviewsWidgets('carousel-widget', {
            store:"biscuiteers",
            primaryClr:"#e679a5",
            neutralClr:"#2c2c2c",
            reviewTextClr:"#2c2c2c",
            widgetName:"carousel",
            layout:"fullWidth",
            numReviews:40,
            font:"'Georgia', sans-serif",
            css:`
              .productReviewComment img { display: none !important; } 
              .reviewSource{display: none;} 
              .CarouselWidget .reviewsContainer {font-family: Georgia, sans-serif;} 
              .CarouselWidget {font-family: Georgia, sans-serif; padding-bottom: 0; } 
              .RatingVerdict { text-transform: lowercase; } 
              .cw__header, .ReviewsLogo { pointer-events: none !important; }
              @media(max-width: 519px) {
                .CarouselWidget {
                  padding-top: 30px;
                }
                .reviewsLogoWrap {
                  position: absolute;
                  top: 0;
                  left: 50%;
                  transform: translateX(-50%)
                }
              }
            `.split('\n').map(line => line.trim()).join(''),
            contentMode: "company;product",
            sku: "all-product-reviews;",
            hideDates:!0
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
        }, `${settings.ID}-DOD`);
      };

      // Init
      init();

      // Orientation change re-run
      addEventListener(window, 'orientationchange', () => {
        setTimeout(() => {
          [].forEach.call(document.querySelectorAll(`.${settings.ID}-DOD`), (elm) => {
            elm.parentNode.removeChild(elm);
          });

          init();
        }, 1500);
      });
    }
  } else {
    // control
    const target = document.querySelector('image-component > a');
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
