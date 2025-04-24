import settings from '../../settings';
import { addPoller, addEventListener } from '../../winstack';
import { shouldShowCountdown } from '../../deliveryLogic';
import { countdown } from '../../../../../../../lib/uc-lib';

const { ID } = settings;

export default class AboutDelivery {
  constructor(onBlockClick) {

    this.onBlockClick = onBlockClick;

    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    // First remove
    const aboutDelivery = document.querySelector(`.${ID}_aboutDelivery`);
    if(aboutDelivery && aboutDelivery.parentNode) {
      aboutDelivery.parentNode.removeChild(aboutDelivery);
    }
    
    // Now create
    const element = document.createElement('div');
    element.classList.add(`${ID}_aboutDelivery`);

    element.innerHTML = `
      <div class="${ID}_aboutDelivery__after">
        <p class="${ID}_aboutDelivery__countdown center">
          <span class="${ID}_aboutDelivery__countdown-timer"></span>
          left for next day delivery
          <img src="https://cdn-sitegainer.com/9embi7xz7i28d9h.png" width="36" height="18">
        </p>
        <p class="col-11 center underline m-t-3 m-b-2">check delivery info again</p>
      </div>

      <div class="${ID}_aboutDelivery__before">
        <h2 class="col-11 fs-7 fw-bold center m-b-5">about our delivery</h2>
        <ul class="${ID}_aboutDelivery__methods">
          <li class="${ID}_aboutDelivery__method ${ID}_aboutDelivery__method--van">
            <div>
            there's still time! 
            <span class="fw-bold col-11">next day delivery</span>
            is available
            </div>
          </li>
          <li class="${ID}_aboutDelivery__method ${ID}_aboutDelivery__method--globe">
            <div>
            send
            <span class="fw-bold col-11">anywhere</span>
            in the world
            </div>
          </li>
          <li class="${ID}_aboutDelivery__method ${ID}_aboutDelivery__method--calendar">
            <div>
            planning ahead?
            <span class="fw-bold col-11">buy now send later</span>
            </div>
          </li>
        </ul>
        <p class="right">
          <a class="${ID}_aboutDelivery__trigger-more col-11">learn more about delivery &gt;</a>
        </p>
      </div>
    `;

    this.component = element;
  }

  bindEvents() {

    if(typeof this.onBlockClick == 'function') {
      addEventListener(this.component, 'click', () => {
        this.onBlockClick();
      });
    }
  }

  render() {
    const reminderBox = document.querySelector('local-product-view ng-include[src*="reminder"]');
    if(reminderBox) {
      reminderBox.insertAdjacentElement('beforebegin', this.component);
    }

    // Is countdown available
    if(!shouldShowCountdown()) {
      const deliveryMethodVan = document.querySelector(`.${ID}_aboutDelivery__method--van div`);
      if(deliveryMethodVan) {
        deliveryMethodVan.innerHTML = 'perfectly-timed gifts with <span class="fw-bold col-11">delivery 7 days a week</span>';
      }
    }
  }
}
