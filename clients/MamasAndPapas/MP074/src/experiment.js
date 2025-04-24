import { fullStory, events } from '../../../../lib/utils';
import { optionsFirst, optionsSecond } from './lib/MP074-options';
import { deliveryText } from './lib/MP074-deliveryContent';
import { poller } from '../../../../lib/uc-lib';

const Experiment = {
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
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);

    // events.send('MP074', 'Delivery options shown', 'MP074 Delivery options shown', { sendOnce: true });

    const productDescription = document.getElementById('PDP-Details');
    const newDeliveryBox = document.createElement('div');
    newDeliveryBox.classList.add('MP074-deliveryWrapper');
    newDeliveryBox.innerHTML = `
    <div class="MP074-deliveryTitle">Delivery Options <div class="MP074-showDelivery">More info</div></div>
    <div class="MP074-delivery-inner"></div>
    <div class="MP074-delivery-inner bottom"></div>
    <div class="MP074-delivery-toggle">Show more delivery options</div>`;

    productDescription.insertAdjacentElement('afterEnd', newDeliveryBox);
    const deliveryOptions = optionsFirst;
    for (let i = 0; i < Object.keys(deliveryOptions).length; i += 1) {
      const data = Object.entries(deliveryOptions)[i];
      const deliveryElements = data[1];
      const deliveryObject = `
       <div class="MP074-option ${deliveryElements.className}">
        <div class="MP074-delivery-icon"></div>
        <div class="MP074-delivery-price">${deliveryElements.price}</div>
        <div class="MP074-delivery-title">${deliveryElements.deliveryName}</div>
        <div class="MP074-delivery-subtext">${deliveryElements.smallText}</div>
      </div>`;
      newDeliveryBox.querySelector('.MP074-delivery-inner').insertAdjacentHTML('beforeEnd', deliveryObject);
    }
    const bottomOptions = optionsSecond;
    for (let j = 0; j < Object.keys(bottomOptions).length; j += 1) {
      const data = Object.entries(bottomOptions)[j];
      const deliveryBottomElements = data[1];
      const deliveryBottomObject = `
       <div class="MP074-option ${deliveryBottomElements.className}">
        <div class="MP074-delivery-icon"></div>
        <div class="MP074-delivery-price">${deliveryBottomElements.price}</div>
        <div class="MP074-delivery-title">${deliveryBottomElements.deliveryName}</div>
        <div class="MP074-delivery-subtext">${deliveryBottomElements.smallText}</div>
      </div>`;
      newDeliveryBox.querySelector('.MP074-delivery-inner.bottom').insertAdjacentHTML('beforeEnd', deliveryBottomObject);
    }

    const toggleClick = document.querySelector('.MP074-delivery-toggle');
    toggleClick.addEventListener('click', () => {
      components.showMore();
      // events.send('MP074', 'Show more click', 'MP074 Show more delivery options clicked', { sendOnce: true });
    });

    // on more info click open the slide out delivery
    const moreInfo = document.querySelector('.MP074-showDelivery');
    const deliveryTrigger = document.getElementById('PDP-Information');
    moreInfo.addEventListener('click', () => {
      deliveryTrigger.querySelector('.productDetail_panel').click();
      // events.send('MP074', 'More Info clicked', 'MP074 More info clicked', { sendOnce: true });
    });

    // add to bag and find in store event
    const addToBag = document.querySelector('.addToCartButton');
    const findInStore = document.querySelector('.pickupInStoreButton');
    addToBag.addEventListener('click', () => {
      // events.send('MP074', 'Add to bag click', 'MP074 Add to bag click', { sendOnce: true });
    });
    if (findInStore) {
      findInStore.addEventListener('click', () => {
        // events.send('MP074', 'Find in store click', 'MP074 Find in store click', { sendOnce: true });
      });
    }
    // change delivery slide out text
    poller([
      '#PDP-information',
    ], components.deliveryCopy);
  },
  /* put outside functions in here */
  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
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
      const deliverySlideOut = document.querySelector('#PDP-information .deliveryinfopanel');
      deliverySlideOut.innerHTML = deliveryText;
    },
  },
};

export default Experiment;
