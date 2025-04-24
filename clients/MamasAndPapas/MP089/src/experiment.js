import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{MP089}} - {{Search Button}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP089',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    poller(['button.btn-link.btn-icon.pull-right > i.ico.ico-search'], () => {
      const searchButton = `<div class="MP089-search"><span id="MP089-search__btn">Search</span></div>`; // eslint-disable-line quotes
      document.querySelector('button.btn-link.btn-icon.pull-right > i.ico.ico-search').insertAdjacentHTML('afterend', searchButton);
      document.querySelector('#MP089-search__btn').addEventListener('click', () => {
        events.send('MP089', 'User clicked', 'Click on Search button', { sendOnce: true });
      });
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

  components: {},
};

export default Experiment;
