import { fullStory, events } from '../../../../lib/utils';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'NH029',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    const URL = window.location.pathname;
    const lastPage = document.referrer;
    if (URL === '/britain' && !sessionStorage.getItem('NH029-landing') && lastPage.indexOf('nationalholidays') === -1) {
      sessionStorage.setItem('NH029-landing', 1);
      window.location.href = 'http://www.nationalholidays.com/';
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.setTrackerName('tracker2');
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {},
};

export default Experiment;
