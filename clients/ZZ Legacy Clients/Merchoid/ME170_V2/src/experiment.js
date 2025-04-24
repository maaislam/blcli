import { fullStory, viewabilityTracker, events } from '../../../../lib/utils';


/**
 * {{ME170}} - {{Christmas Price Framing V2}}
 */

const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'ME170',
      VARIATION: '2',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const priceArea = bodyVar.querySelector('.price.large');
      const logoSRC = bodyVar.querySelector('.merchoid_genuine_brand_logo').getAttribute('src');
      // No alt text on image creating own, replacing any quotes with nothing
      const logoAlt = bodyVar.querySelector('[name="_merchoid_pa_brand_name"]').getAttribute('value').replace(/'|"/g, '');
      return {
        docVar,
        bodyVar,
        priceArea,
        logoSRC,
        logoAlt,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
      // Default running event
      events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        Exp.render.productText();
        Exp.bindExperimentEvents.addViewTracker();
      },
    },
    render: {
      productText() {
        let descriptionText = Exp.cache.bodyVar.querySelector('.flag-flag');
        if (descriptionText.classList.contains('flag-flaguk')) {
          descriptionText = 'Jumper';
        } else {
          descriptionText = 'Sweater';
        }
        Exp.cache.priceArea.insertAdjacentHTML('afterbegin', `
        <div class="ME170_Container">
          <span class="ME170_Text">Treat Yourself This Christmas & Wrap Up Warm With Our <span class="ME170_Bold"> 100% Knitted </span><img class="ME170_Image" src="${Exp.cache.logoSRC}" alt="${Exp.cache.logoAlt} Logo" />Christmas ${descriptionText}</span>
        </div>
        `);
      },
    },
    bindExperimentEvents: {
      addViewTracker() {
        const priceFramingSection = Exp.cache.bodyVar.querySelector('.ME170_Container');
        viewabilityTracker(priceFramingSection, () => {
          events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'View', 'Price Framing', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
