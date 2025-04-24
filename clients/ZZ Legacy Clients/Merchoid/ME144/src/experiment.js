import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'ME144',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);

    const isMobile = window.innerWidth < 767;

    const uspWrapper = document.createElement('div');
    uspWrapper.classList.add('ME144-usp_wrapper');
    uspWrapper.innerHTML = '<div class="ME144-usp_inner"></div>';
    if (isMobile) {
      if (settings.VARIATION === '1') {
        document.body.insertBefore(uspWrapper, document.body.firstChild);
      } else if (settings.VARIATION === '2') {
        const brandsBar = document.querySelector('#brands-widget');
        brandsBar.insertBefore(uspWrapper, brandsBar.firstChild);
      }
      components.USPcontent();

      /* eslint-disable */
      poller([
        () => { 
          return window.Flickity; 
        }
			], () => {
				components.USPslider();
      });
      /* eslint-enable */
    } else {
      const brandsBar = document.querySelector('#brands-widget');
      if (settings.VARIATION === '1') {
        brandsBar.insertBefore(uspWrapper, brandsBar.querySelector('.row').nextSibling);
      } else if (settings.VARIATION === '2') {
        brandsBar.insertBefore(uspWrapper, brandsBar.firstChild);
      }
      components.USPcontent();
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    USPcontent: function USPcontent() {
      const usps = ['High quality, 100% official merchandise', 'Retro styles in brand new, box fresh condition', 'Free delivery worldwide (Yep!)'];
      [].forEach.call(usps, (element) => {
        const USP = document.createElement('div');
        USP.classList.add('ME144-usp');
        USP.innerHTML = `<span></span><p>${element}</p>`;
        document.querySelector('.ME144-usp_inner').appendChild(USP);
      });
    },
    USPslider: function USPslider() {
      // eslint-disable-next-line no-undef
      const flkty = new Flickity(document.querySelector('.ME144-usp_inner'), { // eslint-disable-line no-unused-vars
        wrapAround: true,
        dots: false,
        autoPlay: 5000,
        pageDots: false,
        prevNextButtons: false,
        contain: true,
        cellSelector: '.ME144-usp',
        cellAlign: 'left',
      });
    },
  },
};

export default Experiment;
