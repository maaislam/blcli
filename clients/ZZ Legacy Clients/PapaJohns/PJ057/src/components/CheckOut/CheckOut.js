import settings from '../../lib/settings';
import OrderSummary from './blocks/OrderSummary';
import CheckOutBlock from './blocks/CheckOutBlock';
import Payment from './blocks/Payment';
import Subscribe from './blocks/Subscribe';
import {
  generateSteps
} from '../../lib/services';

const {
  ID
} = settings;

export default class CheckOut {
  constructor(options) {
    const opts = options || {};
    this.logged = opts.logged;
    this.variation = opts.variation;
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_checkOutWrap`);
    element.innerHTML = `
      <div class="${ID}_checkOut">
        <div class="${ID}_checkOut__headerWrap">
          <div class="${ID}_checkOut__header">
            <ul class="${ID}_checkOut__list">
              ${generateSteps(this.logged)}
            </ul>
          </div>
        </div>
        <!--end header-->
        <div class="${ID}_checkOut__bodyWrap">
          <div class="${ID}_checkOut__body">
          ${this.logged ? `
            <div class="${ID}_checkOut__bodyPanel">
              <input type="radio" id="panel-1" name="panelTrigger" checked>
              <div class="${ID}_checkOut__bodyPanelWrap">
                ${OrderSummary({ isLoggedIn: this.logged, variation: this.variation })}
                ${CheckOutBlock({ blockType: 'delivery-time' })}
                ${Subscribe(this.variation)}
                <div class="actionButtonWrap">
                  <label for="panel-2" class="actionButton continueToAddressBut">PROCEED TO PAYMENT</label>
                </div>
              </div>
            </div>
            <div class="${ID}_checkOut__bodyPanel">
              <input type="radio" id="panel-2" name="panelTrigger">
              <div class="${ID}_checkOut__bodyPanelWrap">
                ${CheckOutBlock({ blockType: 'charity' })}
                ${CheckOutBlock({ blockType: 'payment', isLoggedIn: this.logged })}
              </div>
            </div>
            <div class="${ID}_checkOut__bodyPanel">
              <input type="radio" id="panel-3" name="panelTrigger">
              <div class="${ID}_checkOut__bodyPanelWrap">
                ${Payment()}
                ${CheckOutBlock({ blockType: 'save-payment', isLoggedIn: this.logged })}
              </div>
            </div>
          ` : `
            <div class="${ID}_checkOut__bodyPanel">
              <input type="radio" id="panel-1" name="panelTrigger" checked>
              <div class="${ID}_checkOut__bodyPanelWrap">
                ${OrderSummary({ isLoggedIn: this.logged, variation: this.variation })}
                ${CheckOutBlock({ blockType: 'delivery-time' })}
                ${Subscribe(this.variation)}
                <div class="actionButtonWrap">
                  <label for="panel-2" class="actionButton continueToAddressBut stepTrigger" data-forwardTo="secondStep">PROCEED TO PAYMENT</label>
                </div>
              </div>  
            </div>
            <div class="${ID}_checkOut__bodyPanel">
              <input type="radio" id="panel-2" name="panelTrigger">
              <div class="${ID}_checkOut__bodyPanelWrap">
                ${CheckOutBlock({ blockType: 'contact-details' })}
                ${CheckOutBlock({ blockType: 'delivery-details' })}
              </div>  
            </div>
            <div class="${ID}_checkOut__bodyPanel">
              <input type="radio" id="panel-3" name="panelTrigger">
              <div class="${ID}_checkOut__bodyPanelWrap">
                ${CheckOutBlock({ blockType: 'charity' })}
                ${CheckOutBlock({ blockType: 'payment', isLoggedIn: this.logged })}
              </div>  
            </div>
            <div class="${ID}_checkOut__bodyPanel">
              <input type="radio" id="panel-4" name="panelTrigger">
              <div class="${ID}_checkOut__bodyPanelWrap">
                ${Payment()}
                ${CheckOutBlock({ blockType: 'save-payment', isLoggedIn: this.logged })}
              </div>
            </div>
          `}
          </div>
        </div>
        <!--end body-->
      </div>
    `;
    this.component = element;
  }

  bindEvents() {}

  render() {
    document.querySelector('.mainMobileInside').insertAdjacentElement('beforebegin', this.component);
  }
}
