import { fullStory, events } from '../../../../lib/utils';
import aboveFold from './components/aboveFold';
import learnMore from './components/learnMore';
import sections from './components/sections';
import customReviews from './components/customReviews';
import settings from './settings';
import { pollerLite } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: settings,

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    aboveFold();
    learnMore();
    sections();

    pollerLite([
      '.tns-outer button',
      `.${settings.ID}-howItWorks .${settings.ID}-button`,
      `.${settings.ID}-icons a`,
      `.${settings.ID}-success .${settings.ID}-button`,
    ], () => {
      components.sendEvents();

      // ---------------------------------------------------
      // Variation-specific amends for EH004
      // ---------------------------------------------------
      if(settings.VARIATION == 1) {
        // -- V1 --
        // Hide the trusptilot widget
        // --------
        const tpWidget = document.querySelector('.trustpilot-widget');
        if(tpWidget) {
          tpWidget.classList.add(`${settings.ID}-force-hide`);
        }
      } else if(settings.VARIATION == 2) {
        // -- V2 --
        // Show reviews slider
        // --------
        customReviews();
      } else if(settings.VARIATION == 3) {
        // -- V1 --
        // Effective Control retain widget as-is
        // --------
        document.body.classList.add(`${settings.ID}-retained-tp-widget-as-is`);
      } 
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    sendEvents: () => {
      const { settings } = Experiment;
      const login = document.querySelector('.user-login');
      const letsGoCTA = document.querySelector('.registrationForm__submit___311-o');
      const steps = document.querySelector('.tns-outer button');
      const findOutMore = document.querySelector(`.${settings.ID}-howItWorks .${settings.ID}-button`);
      const getInTouch = document.querySelector(`.${settings.ID}-icons a`);
      const findoutMoresmall = document.querySelector(`.${settings.ID}-icons .${settings.ID}-find_more`);
      const successStories = document.querySelector(`.${settings.ID}-success .${settings.ID}-button`);
      const promoCode = document.querySelector(`#tns1-item3 .${settings.ID}-promo-link`);

      steps.addEventListener('click', () => {
        events.send(settings.ID, 'clicked', 'Across the 4 steps');
      });

      findOutMore.addEventListener('click', () => {
        events.send(settings.ID, 'clicked', 'Find out more (large CTA)');
      });

      getInTouch.addEventListener('click', () => {
        events.send(settings.ID, 'clicked', 'Get in touch');
      });

      findoutMoresmall.addEventListener('click', () => {
        events.send(settings.ID, 'clicked', 'Find out more (small clickable text)');
      });

      successStories.addEventListener('click', () => {
        events.send(settings.ID, 'clicked', 'View success stories');
      });

      login.addEventListener('click', () => {
        events.send(settings.ID, 'clicked', 'Log in');
      });
      letsGoCTA.addEventListener('click', () => {
        events.send(settings.ID, 'clicked', 'Let\'s go');
      });

      promoCode.addEventListener('click', () => {
        events.send(settings.ID, 'clicked', 'promo-code-link');
      });
    },
  },
};

export default Experiment;
