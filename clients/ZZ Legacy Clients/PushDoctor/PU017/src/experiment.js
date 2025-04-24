import { fullStory } from '../../../../lib/utils';
import uspDetails from './lib/PU017-content';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PU017',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    const uspWrapper = document.createElement('div');
    uspWrapper.classList.add('PU017_usp-wrapper');

    // Checks mid page content
    const midPageContainer = document.querySelector('.custom-background-module');
    if (midPageContainer) {
      midPageContainer.classList.add('PU017_mid-content');
      const uspMidWrapper = document.createElement('div');
      uspMidWrapper.classList.add('PU017_usp-wrapper__middle');
      midPageContainer.insertAdjacentElement('afterend', uspMidWrapper);
    }
    console.log(midPageContainer);
    
    const pageTitleContainer = document.querySelector('.c-page-title');
    pageTitleContainer.insertAdjacentElement('afterend', uspWrapper);

    uspDetails();

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
