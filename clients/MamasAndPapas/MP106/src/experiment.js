import { fullStory, events } from '../../../../lib/utils';

const Experiment = {
  /**
  * @desc Variation settings. Useful for when multiple variations are developed
  * in a single project so you can just toggle the variation number in production
  */
  settings: {
    ID: 'MP106',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    components.fixedBasketBar();
    components.openBasket();
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
    /**
    * @desc create the fixed bottom bar
    */
    fixedBasketBar: function fixedBasketBar() {
      const totalPrice = document.querySelector('.basket_checkout .price').textContent;
      const fixedBar = document.createElement('div');
      fixedBar.classList.add('MP106-fixed_bar');
      fixedBar.innerHTML = `<div class="MP106-basket_total">Total: <span>${totalPrice}</span></div><div class="MP106-showBasket">Show Basket Details</div>`;
      document.body.appendChild(fixedBar);
    },
    /**
    * @desc show sidebasket on click
    */
    openBasket: function openBasket() {
      const triggerBasket = document.querySelector('.MP106-showBasket');
      const sideBasket = document.querySelector('.slidePanel.slidePanel-rightSide');
      triggerBasket.addEventListener('click', () => {
        sideBasket.classList.add('active');
        events.send('MP106 Persistent Basket', 'View basket click', 'Expanded basket', { sendOnce: true });
      });
    },
  },
};

export default Experiment;
