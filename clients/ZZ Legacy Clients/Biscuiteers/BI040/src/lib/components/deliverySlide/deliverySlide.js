/* Create the slide out delivery tab */

import settings from '../../settings';
import { addEventListener, addObserver, addPoller } from '../../winstack';
import { shouldShowCountdown } from '../../deliveryLogic';
import { countdown } from '../../../../../../../lib/uc-lib';

const { ID } = settings;

export default class DeliverySlide {
  constructor(callbacks = {}) {
    this.callbacks = callbacks;

    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.id = `${ID}-deliveryTab`;
    element.classList.add(`${ID}_deliveryTab`);
    element.classList.add(`${ID}_SlideTab`);

    element.innerHTML = `
    <div class="${ID}-slideTitle">
      <span class="${ID}-slideClose"></span>
      <h3>Delivery Info</h3>
    </div>
    <div class="${ID}-tabContent">
      <div class="${ID}-delivery_content">
        <p>the perfect gift, everytime:</p>

        <ul>
          <li>Packed securely in a beautiful tin or box</li>
          <li>At least 1 month's shelf life (usually more)</li>
          <li>Add a gift message at checkout</li>
        </ul>

        <p>delivery prices</p>

        <ul>
          <li>Royal Mail next day tracked delivery - £3.99</li>
          <li>Premium courier - £6.95</li>
          <li>Premium courier Saturday/Sunday - £9.95</li>
          <li>Same day delivery (London only) - £15-£25.00</li>
          <li><a href="https://www.biscuiteers.com/delivery" 
            target="_blank">international prices dependent on location</a></li>
        </ul>
      </div>

      <div class="${ID}-deliveryCalendarWrap"></div>
      <div class="${ID}-occasion_content"></div>

      <div class="${ID}-tabContent_bottom">
        <div class="${ID}-personalised_message"><label></label><input placeholder="type your message (26 characters)" class="input" type="text"/></div>

        <div class="${ID}-buyButtonWrap">
          <div class="${ID}-countdownWrap">
            <span class="${ID}-countdownWrap__title">next day delivery? order in</span>
            <span class="${ID}-countdownTimer"></span>
          </div>
          <div class="${ID}-buyButton ${ID}-button ${ID}-deliveryBuybutton">buy now</div>
        </div>
      </div>
    </div>
    `;

    this.component = element;
  }

  onActivatedDeliveryTab() {
    // @todo
    // if personalise delivery is clicked check the personalised message

    if(typeof this.callbacks.didOpenDeliverySlide == 'function') {
      this.callbacks.didOpenDeliverySlide();
    }
    
    const deliveryPersonalMessage = document.querySelector(`.${ID}-personalised_message`);
    const personalisedLabel = document.querySelector('[ng-switch-when="field|area"]');
    const personalisedMessageBox = document.querySelector('[ng-switch-when="field|area"] input');
    const buyNowButton = document.querySelector(`.${ID}_deliveryTab .${ID}-tabContent .${ID}-buyButton`);
    const tabContent = document.querySelector(`.${ID}-tabContent`);

    const productPageAdd = document.querySelector('local-add-to-basket .button');

    // If message box exists then it is required
    if (personalisedMessageBox && personalisedLabel) {
      if (personalisedMessageBox.value === '') {

        if(deliveryPersonalMessage) {
          deliveryPersonalMessage.classList.add(`${ID}-showMessage`);
          tabContent.classList.add(`${ID}-hasPersonalised`);
        }

        buyNowButton.classList.add(`${ID}-disabled`);

        document.querySelector(`.${ID}-personalised_message label`).textContent = personalisedLabel.querySelector('label').textContent;

        // add the value to actual input from delivery input
        const deliveryInput = deliveryPersonalMessage.querySelector('input');
        addEventListener(deliveryInput, 'keyup', () => {
          personalisedMessageBox.value = deliveryPersonalMessage.querySelector('input').value;
          personalisedMessageBox.dispatchEvent(new Event('change'));
          buyNowButton.classList.remove(`${ID}-disabled`);
          if (deliveryPersonalMessage.querySelector('input').value === '') {
            buyNowButton.classList.add(`${ID}-disabled`);
          } else {
            buyNowButton.classList.remove(`${ID}-disabled`);
          }
        }, false);
      }
    } else {
      deliveryPersonalMessage.classList.remove(`${ID}-showMessage`);
      tabContent.classList.remove(`${ID}-hasPersonalised`);
    }

    addEventListener(buyNowButton, 'click', () => {
      // if personalised box is showing
      if (deliveryPersonalMessage.classList.contains(`${ID}-showMessage`)) {
        if (deliveryPersonalMessage.querySelector('input').value === '') {
          deliveryPersonalMessage.classList.add(`${ID}-input_error`);
        } else if (!buyNowButton.classList.contains(`${ID}-disabled`)) { // validation passed on input box
          deliveryPersonalMessage.classList.remove(`${ID}-input_error`);

          if(!productPageAdd.classList.contains('is-disabled')) {
            productPageAdd.click();
          }
        }
      } else {
        if(!productPageAdd.classList.contains('is-disabled')) {
          productPageAdd.click();
        }
      }
    });
  }

  tryToOpen() {
    const deliverySlideTab = this.component;

    if(document.querySelector(`.${ID}_custom_error`)) {
      // Personalised options are available...
      if (!document.querySelector(`.${ID}-active_box`)) {
        document.querySelector(`.${ID}_custom_error`).style.display = 'block';
        document.documentElement.style = 'overflow-y: scroll';

        window.scrollTo(0, 250);

      } else if (document.querySelector('.input-wrap-1 select').value === '?' || document.querySelector('.input-wrap-1 select').value === '') {
        document.querySelector('.input-wrap-1 select').classList.add(`${ID}-error`);
        window.scrollTo(0, 250);
      } else {
        document.querySelector('.input-wrap-1 select').classList.remove(`${ID}-error`);
        document.querySelector(`.${ID}_custom_error`).style.display = 'none';
        deliverySlideTab.classList.add(`${ID}-tab_active`);

        this.onActivatedDeliveryTab();
      }
    } else {
      document.body.classList.add(`${ID}-no_scroll`);
      deliverySlideTab.classList.add(`${ID}-tab_active`);

      this.onActivatedDeliveryTab();
    }
  }

  bindEvents() {
    const deliverySlideTab = this.component;
    const tabClose = this.component.querySelector(`.${ID}-slideClose`);

    if(deliverySlideTab && tabClose) {
      addEventListener(tabClose, 'click', () => {
        deliverySlideTab.classList.remove(`${ID}-tab_active`);
        document.body.classList.remove(`${ID}-no_scroll`);
        document.documentElement.style = 'overflow-y: auto';

        if(typeof this.callbacks.didCloseDeliverySlide == 'function') {
          this.callbacks.didCloseDeliverySlide();
        }
      });
    }
  }

  render() {
    const { component } = this;
    document.body.appendChild(component);

    this.initTimer();

    const deliveryBuy = document.querySelector(`.${ID}-deliveryBuybutton`);
    if(deliveryBuy) {
      addEventListener(deliveryBuy, 'click', (e) => {
        e.currentTarget.insertAdjacentHTML('beforeend', `<span class="${ID}-pulseBtn"></span>`);
      });
    }
  }

  initTimer() {
    const countdownWrapper = document.querySelector(`.${ID}-countdownWrap`);
    if(countdownWrapper) {
      if(shouldShowCountdown()) {
        countdownWrapper.classList.add(`${ID}-countdownWrap--active`);  

        window.dataLayer.push({
          event: `${ID}`,
          eventCategory: `did-show-countdown`,
        });

        countdown({
          element: `.${ID}-countdownTimer`,
          cutoff: settings.cutoffDate,
          zeroPrefixHours: false,
          zeroPrefixMinutes: true,
          labels: {
            d: '',
            h: '',
            m: '',
            s: ''
          },
        });
      }
    }
  }
}
