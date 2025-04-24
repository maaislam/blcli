import { pollerLite } from '../../../../lib/uc-lib';
import { fullStory, events } from '../../../../lib/utils';

/**
 * RC040 - Move Trustpilot
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'RC040',
    VARIATION: '1',
  },

  init() {
    Experiment.setup();
    const device = window.innerWidth < 768 ? 'mobile' : 'desktop';
    const trustpilotLargeWidth = window.innerWidth < 520 ? 'small' : 'large';

    // Move Trustpilot logos
    const { trustpilotLarge, trustpilotSmall, searchRow } = Experiment.cacheDOM;
    const moveTrustpilot = {
      desktop: {
        control() {
          searchRow.parentElement.insertBefore(trustpilotLarge, searchRow.nextSibling);
          const cssLarge = 'position: relative;clear: both;padding: 30px 0;background: white;margin-bottom: 10px;top: -5px;';
          trustpilotLarge.setAttribute('style', cssLarge);
        },
        variation() {
          const bottomSection = document.querySelector('.RC022_bottomSectionRight');
          bottomSection.innerHTML = '<span class="RC022_fixedOnTop"></span>';
          bottomSection.appendChild(trustpilotLarge);
          trustpilotLarge.style.marginTop = '90px';
        },
      },
      mobile: {
        control() {
          searchRow.parentElement.insertBefore(trustpilotLarge, searchRow.nextSibling);
          searchRow.parentElement.insertBefore(trustpilotSmall, searchRow.nextSibling);
          const cssLarge = 'position: relative;background: white;margin-bottom: 20px;height: 160px;overflow: hidden;padding: 0 10px;';
          const cssSmall = 'position: relative;background: white;padding: 10px 0;';
          const cssIframeLarge = (() => {
            let css;
            if (trustpilotLargeWidth === 'small') {
              css = 'position: relative;height: 300px;width: 100%;border-style: none;display: block;overflow: hidden;top: -130px;';
            } else {
              css = 'position: relative;width: 100%;border-style: none;display: block;overflow: hidden;height: 131px;margin: 10px 0;';
            }
            return css;
          })();
          trustpilotLarge.setAttribute('style', cssLarge);
          trustpilotLarge.querySelector('iframe').setAttribute('style', cssIframeLarge);
          trustpilotSmall.setAttribute('style', cssSmall);
        },
        variation() {
          searchRow.parentElement.insertBefore(trustpilotLarge, searchRow.nextSibling);
          searchRow.parentElement.insertBefore(trustpilotSmall, searchRow.nextSibling);
          const cssLarge = 'position: relative;background: white;margin-bottom: 20px;height: 160px;overflow: hidden;padding: 0 10px;';
          const cssSmall = 'position: relative;background: white;padding: 10px 0;';
          const cssIframeLarge = (() => {
            let css;
            if (trustpilotLargeWidth === 'small') {
              css = 'position: relative;height: 300px;width: 100%;border-style: none;display: block;overflow: hidden;top: -130px;';
            } else {
              css = 'position: relative;width: 100%;border-style: none;display: block;overflow: hidden;height: 131px;margin: 10px 0;';
            }
            return css;
          })();
          trustpilotLarge.setAttribute('style', cssLarge);
          trustpilotLarge.querySelector('iframe').setAttribute('style', cssIframeLarge);
          trustpilotSmall.setAttribute('style', cssSmall);
        },
      },
    };

    if (document.querySelector('.RC022_bottomSectionRight')) {
      moveTrustpilot[device].variation();
    } else {
      moveTrustpilot[device].control();
    }

    /**
     * If RC022 / RC026 loads in and the Trustpilot reviews haven't already
     * been moved to accomodate for this, move them again to the correct places
     */
    pollerLite(['.RC022_bottomSectionRight'], moveTrustpilot[device].variation);
  },

  setup() {
    const { settings, services } = Experiment;
    document.body.classList.add(settings.ID);
    services.tracking();
    Experiment.cacheDOM();
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

  /**
   * @desc Overwrites self with an objecs containing all elements needed in this experiment
   * @returns {Object}
   */
  cacheDOM() {
    // Cache selectors
    const elements = {};
    elements.trustpilotLarge = document.querySelector('.home-buttons .trustpilot-widget');
    elements.trustpilotSmall = document.querySelector('.header .trustpilot-widget');
    elements.searchRow = document.querySelector('.home-course-search');

    // Overwrite Experiment.cacheDOM property
    Experiment.cacheDOM = elements;

    return elements;
  },
};

export default Experiment;
