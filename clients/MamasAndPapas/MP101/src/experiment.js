import { fullStory, events } from '../../../../lib/utils';
import { poller, observer } from '../../../../lib/uc-lib';

/**
 * {{MP101}} - {{100% - Delivery Options}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP101',
    VARIATION: '1',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    const deliveryOptions = document.querySelectorAll('.delivery_method_item');
    let deliveryPrice;
    const subTotal = parseFloat(document.querySelector('.checkout_orderTotal > .clearLeft > span.font-weight-bold').textContent.replace('£', ''));
    const savings = parseFloat(document.querySelector('.checkout_orderTotal > .checkout_savings > span.font-weight-bold').textContent.replace('£', ''));
    let delCost;
    let newTotal;

    /**
     * @desc On first visit on Step 2, Delivery label does not exist
     * Adds Delivery label and cost when delivery option is selected
     */
    if (!document.querySelectorAll('.checkout_orderTotal > .clearLeft')[2]) {
      // Creates Delivery label
      const savingsContainer = document.querySelector('.checkout_savings');
      const deliveryCost = `<div class='clearLeft checkout_deliveryCost'>
      <span>Delivery:</span>
      <span class='font-weight-bold pull-right' id='deliveryCost'></span>
      </div>`;
      savingsContainer.insertAdjacentHTML('afterend', deliveryCost);
      /*eslint-disable */
      for (let i = 0; i < deliveryOptions.length; i++) { 
        deliveryOptions[i].addEventListener('change', function() {
          if (!this.querySelector('script')) {
            deliveryPrice = this.querySelector('.priceValue > strong').textContent.replace('£', '');
            document.querySelector('#deliveryCost').innerHTML = `£${deliveryPrice}`;
            document.querySelector('.checkout_deliveryCost').classList.add('active');
            delCost = parseFloat(deliveryPrice);
            newTotal = (subTotal + delCost - savings).toFixed(2);
            document.querySelector('div.checkout_divide > span.font-weight-bold').innerHTML = `£${newTotal}`;
          // For Collection Point Option
          } else {
            document.querySelector('.checkout_deliveryCost').classList.remove('active');
            // When Collection Point Store is selected on the map, adds Delivery Cost
            poller(['.map.active', '#map'], () => {
              observer.connect(document.querySelector('[name=collectionPoint-val]'), function () {
                deliveryPrice = document.querySelector('[name=collectionPoint-val]').value.split(';').filter(prop => prop.indexOf('deliveryCost_value') > -1)[0].match(/[\d.]+/g)[0];
                document.querySelector('#deliveryCost').innerHTML = `£${deliveryPrice}`;
                document.querySelector('.checkout_deliveryCost').classList.add('active');
                delCost = parseFloat(deliveryPrice);
                newTotal = (subTotal + delCost - savings).toFixed(2);
                document.querySelector('div.checkout_divide > span.font-weight-bold').innerHTML = `£${newTotal}`;
              }, {
                config: {
                  attributes: true,
                  childList: false,
                },
              });
            });
          }
        });
      }
      /* eslint-enable */
    /**
     * @desc On step back (from Step 3), amends existing Delivery Cost on option change
     */
    } else {
      /*eslint-disable */
      for (let i = 0; i < deliveryOptions.length; i++) { 
        deliveryOptions[i].addEventListener('change', function() {
          if (!this.querySelector('script')) {
            deliveryPrice = this.querySelector('.priceValue > strong').textContent.replace('£', '');
            document.querySelectorAll('.checkout_orderTotal > .clearLeft > span.font-weight-bold')[2].innerHTML = `£${deliveryPrice}`;
            delCost = parseFloat(deliveryPrice);
            newTotal = (subTotal + delCost - savings).toFixed(2);
            document.querySelector('div.checkout_divide > span.font-weight-bold').innerHTML = `£${newTotal}`;
          // For Collection Point Option
          } else {
            poller(['.map.active', '#map'], () => {
              observer.connect(document.querySelector('[name=collectionPoint-val]'), function () {
                deliveryPrice = document.querySelector('[name=collectionPoint-val]').value.split(';').filter(prop => prop.indexOf('deliveryCost_value') > -1)[0].match(/[\d.]+/g)[0];
                document.querySelectorAll('.checkout_orderTotal > .clearLeft > span.font-weight-bold')[2].innerHTML = `£${deliveryPrice}`;
                delCost = parseFloat(deliveryPrice);
                newTotal = (subTotal + delCost - savings).toFixed(2);
                document.querySelector('div.checkout_divide > span.font-weight-bold').innerHTML = `£${newTotal}`;
              }, {
                config: {
                  attributes: true,
                  childList: false,
                },
              });
            });
          }
        });
      }
      /* eslint-enable */
    }
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
  },
};

export default Experiment;
