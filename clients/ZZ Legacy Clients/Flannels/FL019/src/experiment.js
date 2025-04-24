import { fullStory, events } from '../../../../lib/utils';


/**
 * {{FL019}} - {{Delivery Information at Basket}}
 */

const Run = () => {
  // Flannels ga configuration
  events.analyticsReference = '_gaUAT';
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL019',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const continueSecurleyTop = bodyVar.querySelector('#divContinueSecurelyTop');
      const orderTotalText = bodyVar.querySelector('#TotalValue');
      const orderSubtotal = bodyVar.querySelector('#SubtotalRow');
      // Add £6.99 to total delivery price
      let orderTotalValue = bodyVar.querySelector('#TotalRow').dataset.price;
      orderTotalValue = parseFloat(orderTotalValue);
      orderTotalValue += 6.99;

      return {
        bodyVar,
        continueSecurleyTop,
        orderTotalText,
        orderSubtotal,
        orderTotalValue,
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
      const hide = document.getElementById(`${settings.ID}_flickerPrevention`);
      hide.parentElement.removeChild(hide);
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
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
        // Assign updated price to total price
        // Currency formatter from stackoverflow
        Exp.cache.orderTotalText.textContent = `£${Exp.cache.orderTotalValue.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`;
        // Insert basket total above top continue securely button
        Exp.cache.continueSecurleyTop.insertAdjacentHTML('beforebegin', `
          <p class="FL019_Order_Total">Total: <span class="FL019_Order_Total_Price">${Exp.cache.orderTotalText.textContent.trim()}</span></p>
        `);
        // Insert standard delivery text
        Exp.cache.orderSubtotal.insertAdjacentHTML('afterend', `
        <div class="FL019_Standard_Delivery_Wrap">
          <p class="FL019_Standard_Delivery_Text">Standard Delivery</p>
          <p class="FL019_Standard_Delivery_Price">£6.99</p>
        </div>
        `);
      },
    },
  };

  Exp.init();
};

export default Run;
