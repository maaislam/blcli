import { fullStory, events } from '../../../../lib/utils';

/**
 * {{ITStudentDiscountBanner}} - {{Student Discount Banner}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ITStudentDiscountBanner',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    // Add banners
    components.banner();
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
    banner() {
      const html = `
        <div class="it-student-banner">
          <ul class="it-no-format">
            <li><a href="https://www.inthestyle.com/shipping-and-returns"><span class="it-icon"></span><strong>Free</strong> and <strong>easy returns</strong></a></li>
            <li><a href="https://www.inthestyle.com/shipping-and-returns"><span class="it-icon"></span><strong>Next day</strong> delivery</a></li>
            <li><a href="https://www.inthestyle.com/students"><span class="it-icon"></span><strong>10%</strong> Student discount</a></li>
          </ul>
        </div>
      `;
      const ref = document.querySelector('.off-canvas-wrap .inner-wrap .wrapper-banner-container');
      if (ref) {
        ref.insertAdjacentHTML('afterend', html);
      }
    },
  },
};

export default Experiment;
