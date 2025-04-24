import { fullStory, events } from '../../../../lib/utils';

/**
 * {{IT067}} - {{Shop The Look over Reviews}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'IT067',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    const reviewsElement = document.querySelector('.product-view .product-collateral #block-reviews');
    const shopLookElement = document.querySelector('.product-view .product-collateral > .block-related.block-product-grid');
    services.swapEls(reviewsElement, shopLookElement);
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
    /**
     * @desc firstEl will be moved directly after secondEl
     * @param {element} firstEl
     * @param {element} secondEl
     */
    swapEls(firstEl, secondEl) {
      if (firstEl && secondEl) {
        secondEl.insertAdjacentElement('afterend', firstEl);
      }
    },
  },

  components: {},
};

export default Experiment;
