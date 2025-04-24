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
    ID: 'PJ021',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    components.addNewElements();
    setInterval(() => {
      const errorMessage = document.getElementById('ctl00_cphBody_pnlPostCodeErrorMobile');
      if (errorMessage) {
        if (errorMessage.classList.contains('PJ021-errorShown')) {
          return;
        }
        components.addNewElements();
        errorMessage.classList.add('PJ021-errorShown');

        const mobileWrapper = document.querySelector('#ctl00_cphBody_pnlMain');
        mobileWrapper.insertBefore(errorMessage, document.getElementById('ctl00_cphBody_pnlGetStartedMobile').previousElementSibling);
      }
    }, 250);
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

  components: {
    /**
     * @desc create the test code that moves elements
     */
    addNewElements: function addNewElements() {
      const pageContent = document.getElementById('ctl00_cphBody_pnlMain');
      const miniBannerhtml = '<a href="https://www.papajohns.co.uk/store-locator.aspx?promo=NPJLGE3TOP"></a>';
      const offerBanner = document.querySelector('.homeCarousel.mobile768');
      const postCodeFinder = document.getElementById('ctl00_cphBody_pnlGetStartedMobile');
      const postcodeBox = document.getElementById('ctl00_cphBody_txtPostcodeMobile');
      const collectCTA = document.getElementById('ctl00_cphBody_lbCollectionMobile');
      const deliverCTA = document.getElementById('ctl00_cphBody_lbDeliveryMobile');

      const newBanner = document.createElement('div');
      newBanner.classList.add('PJ021-miniBanner');
      newBanner.innerHTML = miniBannerhtml;
      pageContent.insertBefore(newBanner, pageContent.firstChild);

      // Move postcode finder up
      postCodeFinder.parentNode.insertBefore(offerBanner, postCodeFinder.nextSibling);

      // events
      postcodeBox.addEventListener('keydown', () => {
        events.send('PJ021', 'Postcode enter', 'PJ021 Postcode typed', { sendOnce: true });
      });
      collectCTA.addEventListener('click', () => {
        events.send('PJ021', 'Collect click', 'PJ021 collection clicked', { sendOnce: true });
      });
      deliverCTA.addEventListener('click', () => {
        events.send('PJ021', 'Delivery click', 'PJ021 deliver to me clicked', { sendOnce: true });
      });
    },
  },
};

export default Experiment;
