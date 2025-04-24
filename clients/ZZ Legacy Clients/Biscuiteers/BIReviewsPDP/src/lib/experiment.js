import { setup } from './services';
import { addPoller, addEventListener, addObserver } from './winstack';
import { events, addJsToPage, addCssToPage } from '../../../../../lib/utils';
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
  const scriptsIdPrefix = `${settings.ID}-${settings.VARIATION}`;

  addJsToPage('https://widget.reviews.co.uk/carousel-photo/dist.js', `${scriptsIdPrefix}-js`, () => {
    const reviews = document.querySelector('#reviews');

    if(reviews) {
      reviews.insertAdjacentHTML('beforebegin', `
        <div class="${settings.ID}-reviews-container ${settings.ID}-DOD">
          <div id="carousel-photos-widget" style="width:100%;max-width:1000px;margin:0 auto;"></div>
        </div>
      `);

      carouselPhotoWidget('carousel-photos-widget', {
        store: 'biscuiteers',
        primaryClr: '#F47E27',
        neutralClr: '#f4f4f4',
        reviewTextClr: '#494949',
        layout:'fullWidth',
        numReviews: 21
      });
    }
  });
};
