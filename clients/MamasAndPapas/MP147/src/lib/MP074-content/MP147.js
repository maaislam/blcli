import { options, deliveryContent } from './lib/MP147-options';
// import { deliveryText } from './lib/MP074-deliveryContent';
import { poller } from '../../../../../../lib/uc-lib';
import { events } from '../../../../../../lib/utils';

const MP147 = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP074',
    VARIATION: '1',
  },

  init: function init() {
    // Setup
    const { settings, components } = MP147;
    // services.tracking();
    document.body.classList.add(settings.ID);

    const productDescription = document.getElementById('PDP-Details');
    const newDeliveryBox = document.createElement('div');
    newDeliveryBox.classList.add('MP074-deliveryWrapper');
    newDeliveryBox.innerHTML =     `
    <div class="MP147-deliveryTitle MP074-deliveryTitle">Delivery Options <div class="MP074-showDelivery">More info</div></div>
    <div class="MP147-delivery-inner MP074-delivery-inner"></div>`;

    productDescription.insertAdjacentElement('afterEnd', newDeliveryBox);
    const deliveryOptions = options;
    for (let i = 0; i < Object.keys(deliveryOptions).length; i += 1) {
      const data = Object.entries(deliveryOptions)[i];
      const deliveryElements = data[1];
      let extraLine = '';
      if (deliveryElements.extraLine && deliveryElements.extraLine !== '') {
        extraLine = deliveryElements.extraLine;
      }
      const deliveryObject = `
       <div class="MP147-option MP074-option ${deliveryElements.className}">
        <div class="MP147-delivery-icon MP074-delivery-icon"></div>
        <div class="MP147-delivery-price MP074-delivery-price">${deliveryElements.price}</div>
        <div class="MP147-delivery-title MP074-delivery-title">${deliveryElements.deliveryName}</div>
        <div class="MP147-delivery-subtext MP074-delivery-subtext">${deliveryElements.smallText}</div>
        <div class="MP147-delivery-subtext MP074-delivery-subtext">${extraLine}</div>
      </div>`;
      newDeliveryBox.querySelector('.MP147-delivery-inner').insertAdjacentHTML('beforeEnd', deliveryObject);
    }

    // on more info click open the slide out delivery
    const moreInfo = document.querySelector('.MP074-showDelivery');
    const deliveryTrigger = document.getElementById('PDP-Information');
    moreInfo.addEventListener('click', () => {
      deliveryTrigger.querySelector('.productDetail_panel').click();
      components.deliveryCopy();
      events.send('MP147', `Variation 1`, `User Clicked - More Info`, { sendOnce: true });
    });

    // change delivery slide out text
    poller([
      '#PDP-information',
    ], components.deliveryCopy);
  },

  components: {
    /**
     * @desc toggle more/less click
     */
    showMore: function showMore() {
      const toggle = document.querySelector('.MP074-delivery-toggle');
      const moreOptions = document.querySelector('.MP074-delivery-inner.bottom');
      if (toggle.textContent === 'Show more delivery options') {
        toggle.textContent = 'Show less delivery options';
        moreOptions.classList.add('MP074-moreOptions_active');
      } else {
        toggle.textContent = 'Show more delivery options';
        moreOptions.classList.remove('MP074-moreOptions_active');
      }
    },
    /**
     * @desc replace delivery slide out copy
     */
    deliveryCopy: function deliveryCopy() {
      /* MP147 Changes */
      const deliverySlideOutTitle = document.querySelector('#PDP-information h2.productDetail_panelHeading');
      deliverySlideOutTitle.innerHTML = `All delivery options for this product`;
      /*****************/
      const deliverySlideOut = document.querySelector('#PDP-information .deliveryinfopanel');
      deliverySlideOut.innerHTML = `<ul class='MP147-deliveryContent'>${deliveryContent}</ul>`;
    },
  },
};

export default MP147;
