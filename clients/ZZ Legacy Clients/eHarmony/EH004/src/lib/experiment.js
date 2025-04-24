/**
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from './../../../../../lib/cache-dom';
import { events } from './../../../../../lib/utils';
import customReviews from './customReviews';

const MOBILE_BREAKPOINT = 640;

/**
 * Helper arbitrary device check
 */
const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

/**
 * Reviews
 */
const addHardcodedReviews = () => {
  customReviews();
};

/**
 * Track Events
 */
const eventsTracking = () => {
  const { settings } = Experiment;
  const login = document.querySelector('.user-login');
  const letsGoCTA = document.querySelector('.registrationForm__submit___311-o');

  login.addEventListener('click', () => {
    events.send(settings.ID, 'clicked', 'Log in');
  });

  letsGoCTA.addEventListener('click', () => {
    events.send(settings.ID, 'clicked', 'Let\'s go');
  });
};

/**
 * Entry point for experiment
 */
const activate = () => {
  setup();

  // Experiment code
  if(settings.VARIATION == 2) {
    if(isMobile()) {
      // Tiny Slider
      const tinySlider = document.createElement('script');
      tinySlider.type = 'text/javascript';
      tinySlider.src = 'https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.8.2/min/tiny-slider.js';
      tinySlider.async = true;
      document.getElementsByTagName('head')[0].appendChild(tinySlider);

      // We have to hardcoe reviews as they can't be seen in iframe
      const widget = document.querySelector('.trustpilot-widget');
      if(widget) {
        addHardcodedReviews(widget); 
      }

      // Class use in styles
      document.body.classList.add(`${settings.ID}--mobile`);
    } else {
      // Move the Trustpilot Widget
      const widget = document.querySelector('.trustpilot-widget');
      const videoWrap = document.querySelector('.video.full');
      if(videoWrap && widget) {
        videoWrap.insertAdjacentHTML('beforebegin', `<div class="${settings.ID}-video-wrapper"></div>`);
        const videoWrapper = document.querySelector(`.${settings.ID}-video-wrapper`);
        if(videoWrapper) {
          videoWrapper.insertAdjacentElement('afterbegin', videoWrap);

          videoWrapper.insertAdjacentElement('afterbegin', widget);
        }
      }

      // Class use in styles
      document.body.classList.add(`${settings.ID}--desktop`);
    }
  }

  eventsTracking();
};

export default activate;
