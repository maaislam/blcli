import { fullStory, events } from '../../../../lib/utils';


/**
 * {{GD027}} - {{Lens Type - Redesign + Social proof}}
 */

const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'GD027',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const basicPackage = docVar.getElementById('cancel-lens-package-upgrade-btn');

      return {
        docVar,
        bodyVar,
        basicPackage,
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
        // Render brackets - before pseudo elemnent currently being used
        Exp.render.wasPriceBracket();
        Exp.render.packageText();
        // Track elements
        Exp.bindExperimentEvents.trackBasic();
        Exp.bindExperimentEvents.addPackageTracking();
      },
    },
    render: {
      // Change package text, if the element is exists, change it's text
      packageText() {
        const nodeElements = [Exp.cache.bodyVar.querySelector('#silver-lens-package .highlight-text'), Exp.cache.bodyVar.querySelector('#gold-lens-package .highlight-text'), Exp.cache.bodyVar.querySelector('#platinum-lens-package .highlight-text')];
        const nodeText = ['most popular', 'optician\'s choice', 'extra thin lenses'];
        for (let i = 0; i < 3; i += 1) {
          if (nodeElements[i]) {
            nodeElements[i].childNodes[0].nodeValue = nodeText[i];
          }
        }
      },
      wasPriceBracket() {
        // Was prices may not always exist, not being polled for
        const wasPrices = Exp.cache.bodyVar.querySelectorAll('.price-was');
        for (let i = 0, n = wasPrices.length; i < n; i += 1) {
          wasPrices[i].insertAdjacentHTML('afterbegin', `
            <span class="GD027_Bracket">(</span>
          `);
        }
      },
    },
    bindExperimentEvents: {
      trackBasic() {
        Exp.cache.basicPackage.addEventListener('click', () => {
          // Send event
          events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'Clicked', 'Basic Lens Package', { sendOnce: true });
        });
      },
      packageTracking(e) {
        const packageTitle = e.target.parentNode.querySelector('.option-value').textContent.trim();
        events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'Clicked', `${packageTitle} Package`, { sendOnce: true });
      },
      addPackageTracking() {
        const packageOptions = Exp.cache.bodyVar.querySelectorAll('.lens-choice > .btn-select');
        for (let i = 0, n = packageOptions.length; i < n; i += 1) {
          packageOptions[i].addEventListener('click', this.packageTracking);
        }
      },

    },
  };

  Exp.init();
};

export default Run;
