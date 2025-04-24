import { fullStory, events } from '../../../../lib/utils';

/**
 * {{ME175}} - {{Batman Jacket}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME175',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);
    components.addStamp();
    // V2
    if (settings.VARIATION === '2') {
      components.addContent();
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

  components: {
    addStamp() {
      const ref = document.querySelector('.product-page .product-image');
      if (ref) {
        ref.insertAdjacentHTML('beforebegin', '<span class="ME175-stamp"></span>');
      }
    },
    addContent() {
      const ref = document.querySelector('.product-image-assoc-brand');
      if (ref) {
        ref.insertAdjacentHTML('afterbegin', `
          <div class="ME175-brand-content">
            <p><strong>Preorder</strong> now to <strong>secure</strong> a jacket numbered between <span><strong>1-500</strong></span></p>
          </div>
        `);
      }
    },
  },
};

export default Experiment;
