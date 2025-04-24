import { fullStory, events } from '../../../../lib/utils';

/**
 * {{MP080}} - {{Longer Guarantee on Category Page}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP080',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    /**
     * @desc Experiment only on All Furniture category
     */
    const iconWrappers = document.querySelectorAll('.col-xs-12.col-sm-3');
    // Loops through each badge
    [].forEach.call(iconWrappers, (element) => {
      if (element.querySelector('.usp-text')) {
        const badgeText = element.querySelector('.usp-text').innerHTML;
        // Replaces the text of the '2-year-guarantee' badge on the page
        if (badgeText.indexOf('uarantee') > -1) {
          element.querySelector('.usp-text').innerHTML = '<div class="MP080-badgeTitle"><strong>Mamas and Papas is peace of mind</strong></div><div class="MP080-badgeText">Secure our <strong>2 year manufacturing guarantee</strong> only when you buy direct.</div><div><a id="MP080-guarantee-link" href="https://www.mamasandpapas.com/en-gb/2-year-manufacturing-guarantee">Find out more</a><div>';// eslint-disable-line no-param-reassign

          // Event Listener on link
          const guaranteeLink = element.querySelector('#MP080-guarantee-link');
          guaranteeLink.addEventListener('click', () => {
            events.send('MP080', 'User Clicked on Badge link', '2-Year-Manufacturing-Guarantee Page');
          });
        }
      }
    });
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
