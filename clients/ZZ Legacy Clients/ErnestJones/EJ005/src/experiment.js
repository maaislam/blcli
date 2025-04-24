import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'EJ005',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);
    components.createUSP();
    components.addAsCarousel();
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
    /**
     * @desc create the usps
     */
    createUSP: function createUSP() {
      const header = document.querySelector('.main-site-header');
      const USPWrapper = document.createElement('div');
      USPWrapper.classList.add('EJ005-usp_wrapper');
      USPWrapper.innerHTML = '<div class="EJ005-uspContainer"></div>';
      header.insertAdjacentElement('afterend', USPWrapper);

      const usps = ['Free Delivery On All Products Over £100', 'Free 30 Day Returns', 'Interest Free Credit Available On Items Over £300'];
      [].forEach.call(usps, (element) => {
        const USP = document.createElement('div');
        USP.classList.add('EJ005-usp');
        USP.innerHTML = `<p>${element}</p>`;
        document.querySelector('.EJ005-uspContainer').appendChild(USP);
      });
    },
    /**
     * @desc add slick to carousel
     */
    addAsCarousel: function addAsCarousel() {
      const flickityScript = document.createElement('script');
      flickityScript.type = 'text/javascript';
      flickityScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/flickity/2.1.1/flickity.pkgd.min.js';
      flickityScript.async = true;
      document.getElementsByTagName('head')[0].appendChild(flickityScript);

      /* eslint-disable */
      poller([
        () => {
          return window.Flickity;
        }
			], () => {
				// eslint-disable-next-line no-undef
        const flkty = new Flickity(document.querySelector('.EJ005-uspContainer'), { // eslint-disable-line no-unused-vars
          wrapAround: true,
          dots: false,
          autoPlay: 5000,
          draggable: false,
          pageDots: false,
          prevNextButtons: false,
          cellSelector: '.EJ005-usp',
          cellAlign: 'left',
        });
      });
      /* eslint-enable */
    },
  },
};

export default Experiment;
