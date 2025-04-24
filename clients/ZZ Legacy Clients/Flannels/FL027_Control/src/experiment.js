import { events } from '../../../../lib/utils';


/**
 * {{FL027_Control}} - {{Mini Cart to Cart Improvement}}
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
      VARIATION: 'Control',
    },

    init: () => {
      const docVar = document;
      const bodyVar = docVar.body;
      const addToBagButton = docVar.querySelectorAll('.addToBasketContainer .ImgButWrap a.addToBag');
      const cartIcon = docVar.getElementById('aBagLink');
      // Setup
      // Default running event
      events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - ${Exp.settings.VARIATION}`);
      // Add event listeners for tracking
      // Add to bag button
      for (let i = 0; addToBagButton.length > i; i += 1) {
        addToBagButton[i].addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Add to Bag - Control', { sendOnce: true });
        });
      }
      // Cart icon in header
      cartIcon.addEventListener('click', () => {
        events.send(`${Exp.settings.ID}`, 'Clicked', 'Bag icon in header', { sendOnce: true });
      });
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
      VARIATION: 'Control',
    },
    init: () => {
      const docVar = document;
      const cartIcon = docVar.getElementById('aBagLink');
      // Setup
      events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - ${Exp.settings.VARIATION}`);
      // Cart icon in header
      cartIcon.addEventListener('click', () => {
        events.send(`${Exp.settings.ID}`, 'Clicked', 'Bag icon in header', { sendOnce: true });
      });
    },
  };

  Exp.init();
};
export { miniCart, cartPage };
