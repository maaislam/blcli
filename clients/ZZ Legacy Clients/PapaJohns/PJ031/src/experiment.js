import { fullStory, events } from '../../../../lib/utils';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ031',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    components.addTotal();
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
     * @desc Add the total price in the header
     */
    addTotal: function addTotal() {
      const totalPrice = document.createElement('div');
      totalPrice.classList.add('PJ031-total_bar');
      totalPrice.innerHTML = '<span></span>';

      let header;
      let totalPriceAmount;

      if (window.innerWidth >= 767) {
        totalPriceAmount = document.querySelector('.totalAmount:last-child').textContent.replace('Total', '').trim();
        header = document.querySelector('.wideCont.mainMenuCont.mainMenuCheckout');
      } else {
        totalPriceAmount = document.querySelector('.m-order-summary .total:last-child td:last-child').textContent.replace('Total ', '');
        header = document.querySelector('.omnibarMenu.obMenuInside ul');
      }

      header.appendChild(totalPrice);
      totalPrice.querySelector('span').textContent = `Order Total: ${totalPriceAmount}`;
    },
  },
};

export default Experiment;
