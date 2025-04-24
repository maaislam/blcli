import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';
import MP063 from './lib/MP063-variation1';
import MP132variation2 from './lib/MP132-variation2';

/**
 * {{MP132}} - {{Convert Branded Shoppers}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP132',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, bindExperimentEvents } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    if (settings.VARIATION === '1') {
      MP063.activate();
      pollerLite(['.MP063_prev.slick-arrow', '.MP063_next.slick-arrow'], () => {
        const leftArrow = document.querySelector('.MP063_prev.slick-arrow');
        const rightArrow = document.querySelector('.MP063_next.slick-arrow');
        bindExperimentEvents.clickArrowsOnCarousel(leftArrow, 'Previous');
        bindExperimentEvents.clickArrowsOnCarousel(rightArrow, 'Next');
      });
    } else if (settings.VARIATION === '2') {
      MP132variation2.init();
    }
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

  components: {},

  bindExperimentEvents: {
    /**
     * @desc GA Event - Click on Carousel Arrows
     */
    clickArrowsOnCarousel(arrow, direction) {
      const { settings } = Experiment;
      arrow.addEventListener('click', () => {
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Arrow through to more options : ${direction}`, { sendOnce: true });
      });
    },
  },
};

export default Experiment;
