import { fullStory, events } from '../../../../lib/utils';

/**
 * {{MP126}} - {{Own Brand Pushchairs}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP126',
    VARIATION: '{{VARIATION}}',
    MP_PUSHCHAIRS: ['Ocarro', 'Urbo²', 'Flip XT²', 'Sola²'],
  },

  init() {
    // Setup
    const { settings, services, bindExperimentEvents } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    const allProducts = document.querySelectorAll('.productCard.transition-transform.p-2');
    [].forEach.call(allProducts, (product) => {
      const titleContainer = product.querySelector('.productCard_title.pb-1');
      const title = titleContainer.textContent.trim();
      /*eslint-disable */
      settings.MP_PUSHCHAIRS.forEach(function(pushchair) {
        // Checks if the pushchair is a M&Ps
        if (title.indexOf(`${pushchair}`) > -1) {
          const mediaContainer = product.querySelector('.productCard_mediaContainer > a');
          const image = mediaContainer.querySelector('picture img');
          const url = mediaContainer.href;
          const mpLogo = `<div class='MP126-logoWrapper'>
            <a href='${url}'><div class='MP126-logo'></div></a>
          </div>`;
          mediaContainer.insertAdjacentHTML('afterend', mpLogo);

          const logo = product.querySelector('.MP126-logo');
          bindExperimentEvents.logoRedirect(logo);
          bindExperimentEvents.clickedOnProduct(titleContainer);
          bindExperimentEvents.clickedOnProduct(image);
        }
      });
      /* eslint-enable */
    });
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
  bindExperimentEvents: {
    /**
     * @desc GA Event for logo redirect
     */
    logoRedirect(logo) {
      const { settings } = Experiment;
      logo.addEventListener('click', () => {
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Mamas and Papas own label`, { sendOnce: true }); // eslint-disable-line quotes
      });
    },
    /**
     * @desc GA Event for product image / title
     */
    clickedOnProduct(element) {
      const { settings } = Experiment;
      element.addEventListener('click', () => {
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Mamas and Papas own pushchair`, { sendOnce: true }); // eslint-disable-line quotes
      });
    },
  },
};

export default Experiment;
