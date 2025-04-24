import { fullStory, events } from '../../../../lib/utils';
import RC029 from './lib/vwoRC029';

/**
 * {{RC029}} - {{Basket reassurance}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'RC029',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    RC029();
    if (window.location.pathname.indexOf('/Where-we-train/EventsSearch.aspx') > -1) {
      if (!document.querySelector('#ctl02_ViewBasket_OverlayEmpty')) {
        const resultsList = document.querySelectorAll('#training-workplace>.table-responsive .course-result-cart.form-autoSubmit .course-result-cart-wrapper > input');
        [].forEach.call(resultsList, (bookBtn) => {
          bookBtn.addEventListener('click', () => {
            setTimeout(() => {
              window.location.href = 'https://www.redcrossfirstaidtraining.co.uk/Basket.aspx';
            }, 500);
          });
        });
      }
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
};

export default Experiment;
