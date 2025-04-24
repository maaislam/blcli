import { fullStory, viewabilityTracker, events } from '../../../../lib/utils';


/**
 * {{ME182}} - {{Christmas Price Framing Iteration}}
 */

const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'ME182',
      VARIATION: '1',
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
        <div class="ME182_Container">
          <span class="ME182_Text">Treat Yourself This Christmas & Wrap Up Warm With Our<span class="ME182_Bold"> 100% Genuine </span><img class="ME182_Image" src="${Exp.cache.logoSRC}" alt="${Exp.cache.logoAlt} Logo" />Christmas ${descriptionText}</span>
        </div>
        `);
      },
    },
    bindExperimentEvents: {
      addViewTracker() {
        const priceFramingSection = Exp.cache.bodyVar.querySelector('.ME182_Container');
        viewabilityTracker(priceFramingSection, () => {
          events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'View', 'Price Framing', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
