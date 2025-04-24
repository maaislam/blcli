import { events } from '../../../../lib/utils';

/**
 * {{FL028_Control}} - {{FL028_Control}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'FL028',
    VARIATION: 'Control',
  },

  init() {
    // Setup
    events.analyticsReference = '_gaUAT';
    const { settings } = Experiment;
    events.send(settings.ID, 'View', `${settings.ID} activated - ${settings.VARIATION}`);
    // Track add to wishlist
    const addToWishListButton = document.getElementById('dnn_ctr176031_ViewTemplate_ctl00_ctl13_aWishListToLogin');
    addToWishListButton.addEventListener('click', () => {
      events.send(`${settings.ID} - ${settings.VARIATION}`, 'Clicked', 'Add to wishlist control', { sendOnce: true });
    });
  },
};

export default Experiment;
