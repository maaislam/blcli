import { fullStory, events } from '../../../../lib/utils';

/**
 * {{ITXXXAdditionalUnidaysLink}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ITXXXAdditionalUnidaysLink',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    const appendLink = () => {
      const html = `
        <div class="itxxx-unidays-link">
          <a href="https://www.inthestyle.com/students" target="_blank">Get your student discount here</a>
        </div>
      `;
      const ref = document.querySelector('.cart #discount-coupon-form');
      if (ref) {
        ref.insertAdjacentHTML('afterend', html);
        events.send('ITXXXAdditionalUnidaysLink', 'Active', 'Element has been added', { sendOnce: true });
      }
    };
    appendLink();
    const inView = (elem) => {
      const bounding = elem.getBoundingClientRect();
      return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };
    const control = () => {
      const elToClick = document.querySelector('.itxxx-unidays-link > a');
      elToClick.addEventListener('click', () => {
        events.send('ITXXXAdditionalUnidaysLink', 'Click', 'User clicked on the student discount link', { sendOnce: true });
      });
    };
    control();
    const el = document.querySelector('.itxxx-unidays-link');
    let isInView = false;
    if (el && isInView === false) {
      window.addEventListener('scroll', (event) => {
        if (inView(el)) {
          events.send('ITXXXAdditionalUnidaysLink', 'In View', 'User has scrolled element into view', { sendOnce: true });
          isInView = true;
        }
      });
    }
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
