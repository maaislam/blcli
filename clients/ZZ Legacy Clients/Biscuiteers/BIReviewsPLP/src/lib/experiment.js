import { setup } from './services';
import { addPoller, addEventListener, addObserver } from './winstack';
import { events, addJsToPage, addCssToPage } from '../../../../../lib/utils';
import settings from './shared';
/**
 * Entry point for experiment
 */
export default () => {

  // -------------------------------------
  // Render
  // -------------------------------------
  const scriptsIdPrefix = `${settings.ID}-${settings.VARIATION}`;

  setTimeout(() => {
    setup();

    events.send(`${settings.ID}-${settings.VARIATION}`, 'Initialised');

    addCssToPage('https://widget.reviews.co.uk/rating-snippet/dist.css', `${scriptsIdPrefix}-css`);

    addJsToPage('https://widget.reviews.co.uk/product/dist.js', `${scriptsIdPrefix}-js`, () => {

      addJsToPage('https://widget.reviews.co.uk/rating-snippet/dist.js', `${scriptsIdPrefix}-js2`, () => {

        [].forEach.call(document.querySelectorAll('.grid product'), (p) => {
          const descContainer = p.querySelector('.m-t-12px');
          if(descContainer) {
            descContainer.insertAdjacentHTML('afterend', `<div class="ruk_rating_snippet ${settings.ID}-DOD" data-sku="MI.HAPPYBIRTHDAY"></div>`);
          }
        });

        ratingSnippet("ruk_rating_snippet", {
          store: "biscuiteers",
          color: "#f47e27",
          linebreak: true,
          text: "Reviews"
        });

      });
    });
  }, 2000);
};
