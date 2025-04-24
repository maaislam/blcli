import { cacheDom } from '../../../../lib/cache-dom';
import { fullStory } from '../../../../lib/utils';
import nav from './lib/navigation';

/**
 * {{HD005}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'HD005',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings } = Experiment;
    const { services } = Experiment;
    // const { components } = Experiment;
    services.tracking();
    cacheDom.get('body').classList.add(settings.ID);

    const navRef = document.querySelector('.header-wrap #header-nav');
    if (navRef) {
      navRef.innerHTML = nav.navigation;
    }

    // Tracking
    const tracking = () => {
      let navLinks = document.querySelectorAll('.header-wrap #header-nav .hd05-nav ul#hd05-top-level > li > a');
      navLinks = [...navLinks];

      //const gaq = window._gaq || []; // eslint-disable-line

      const trackingCallback = () => {
        _gaq.push(['_trackEvent', 'HD005', 'Click', 'User clicked top level nav element', null, true]);
      };

      navLinks.forEach((element) => {
        element.addEventListener('click', trackingCallback);
      });
    };
    tracking();
  },
 
  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },

  components: {},
};

export default Experiment;
