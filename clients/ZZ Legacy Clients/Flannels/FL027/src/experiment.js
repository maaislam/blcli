import { fullStory, events } from '../../../../lib/utils';


/**
 * {{FL027}} - {{Mini Cart to Cart Improvement}}
 */

const miniCart = () => {
  // Flannels ga configuration
  events.analyticsReference = '_gaUAT';
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL027',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      // Added to bag message
      const addedToBagMessage = docVar.getElementById('divAddRemoveToBag');
      // Add to bag button
      const addToBagButton = docVar.querySelector('.AddToBagBar .addToBag');
      // Cart icon
      const cartIcon = docVar.getElementById('aBagLink');
      return {
        docVar,
        bodyVar,
        addedToBagMessage,
        addToBagButton,
        cartIcon,
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
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Render message
        Exp.render.minicartMessage();
        // Track elements
        Exp.bindExperimentEvents.elementTracking();
      },
    },
    render: {
      minicartMessage() {
        Exp.cache.addedToBagMessage.insertAdjacentHTML('afterend', `
        <span class="FL027_Text FL027_MC">Your items aren’t reserved<br />Checkout before they sell out</span>
        `);
      },
    },
    bindExperimentEvents: {
      // Tracks clicks on add to bag button and cart icon in header
      elementTracking() {
        Exp.cache.addToBagButton.addEventListener('click', () => {
          // Check for validation
          setTimeout(() => {
            if (!Exp.cache.bodyVar.querySelector('.popover.SelectSizePopover.bottom.in')) {
              // Validation passed, send event
              events.send(`${Exp.settings.ID}`, 'Clicked', 'Add to Bag', { sendOnce: true });
            }
          }, 50);
        });
        Exp.cache.cartIcon.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Bag icon in header', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

const cartPage = () => {
  // Flannels ga configuration
  events.analyticsReference = '_gaUAT';
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL027',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      // Basket container
      const basketContainer = docVar.getElementById('BasketDiv');
      // Cart icon
      const cartIcon = docVar.getElementById('aBagLink');

      return {
        docVar,
        bodyVar,
        basketContainer,
        cartIcon,
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
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Render message above 'My bag'
        Exp.render.cartMessage();
        // Add event tracking
        Exp.bindExperimentEvents.elementTracking();
      },
    },
    render: {
      cartMessage() {
        Exp.cache.basketContainer.insertAdjacentHTML('beforebegin', `
        <span class="FL027_Text FL027_Cart">Your items aren’t reserved, checkout before they sell out!</span>
        `);
      },
    },
    bindExperimentEvents: {
      // Cart icon in header
      elementTracking() {
        Exp.cache.cartIcon.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Bag icon in header', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};
export { miniCart, cartPage };
