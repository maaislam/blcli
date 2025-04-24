/**
 * WB014 - Add a custom loading screen to page 3 of PLPs when no filters are selected
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { getCookie, pollerLite, setCookie } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  // Run when no filters are selected.
  const areFiltersSelected = () => document.querySelector('.selected-facet');

  // Check if we're on page 3 of PLPs
  const isThirdPage = () => window.location.search.indexOf('p=3') !== -1;

  // Detect whether this test has run for this user during their current session.
  const testHasRun = () => {
    return getCookie(`${shared.ID}_has-run`);
  };

  // Add a custom loading screen
  const showCustomLoadingScreen = () => {
    const isMobile = document.body.clientWidth < 768;
    const firstMessage = 'We’ve got a lot of great products…';
    const secondMessage = isMobile ? '...try using the filters at the top to narrow down your search' : '...try using the filters to the left to narrow down your search';

    // Hide default spinner.
    const defaultSpinner = document.getElementById('loading-overlay');
    if (defaultSpinner) defaultSpinner.remove();

    // Inject the spinner.
    document.querySelector('body').insertAdjacentHTML('afterbegin', `
      <div id="${shared.ID}_loading-overlay">
        <div class="spinner ${isMobile ? 'on-phone' : ''}">
          <p class="${shared.ID}_message">${firstMessage}</p>
          <div class="spinner-icon"></div>
        </div>
      </div>
    `);
    const message = document.querySelector(`.${shared.ID}_message`);

    // Remove loader, unless products have not loaded in, then try again shortly.
    const removeLoader = (waitTime) => {
      setTimeout(() => {
        const products = document.querySelectorAll('.product-summary');
        if (products && products.length > 0) document.getElementById(`${shared.ID}_loading-overlay`).classList.add(`${shared.ID}_hidden`);
        else removeLoader(500);
      }, waitTime);
    };

    setTimeout(() => {
      // Fade out message.
      message.classList.add(`${shared.ID}_hideMessage`);

      setTimeout(() => {
        // Replace text with new message and fade back in.
        message.textContent = secondMessage;
        message.classList.remove(`${shared.ID}_hideMessage`);

        // Remove loader in 2.5s
        removeLoader(2500);
      }, 400); // Time plays well with CSS transition time.
    }, 2500);

    // Set cookie so this only runs once during this session.
    setCookie(`${shared.ID}_has-run`, true, 1);
  };

  const init = () => {
    pollerLite([
      'body',
      '#filterpanel',
      '.product-list-container',
      () => isThirdPage(),
    ], () => {
      if (!areFiltersSelected() && !testHasRun()) {
        showCustomLoadingScreen();
      }
    });

    setup();
  };

  init();
};
