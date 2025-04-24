import settings from '../../lib/settings';
import { Animation, events } from '../../../../../../lib/utils';
import { observer } from '../../../../../../lib/uc-lib';

const { ID } = settings;

export default class StickyBasket {
  constructor() {
    this.cache = {
      component: null,
      data: null,
    };
    this.create();
    this.bindEvents();
    this.watchForDOMChanges();
    this.render();

    return {
      open: this.open,
      close: this.close,
      toggle: this.toggle,
    };
  }

  create() {
    // Create template
    const orderTotal = document.querySelector('.total-value.value').innerText.trim();
    const component = document.createElement('div');
    component.classList.add(`${ID}_StickyBasket`);
    component.innerHTML = `
      <div class="${ID}_StickyBasket__trigger">
        <div class="${ID}_StickyBasket__trigger__float">close</div>
        <span><em>Order Summary:</em> <p id="${ID}_StickyBasket__trigger__total">${orderTotal}</p></span>
      </div>
      <div class="${ID}_StickyBasket__order"></div>
    `;

    // Append order summary
    const order = component.querySelector(`.${ID}_StickyBasket__order`);
    const orderEls = document.querySelectorAll('.summary .section-header, .checkout-mini-cart, .checkout-order-totals');
    Array.from(orderEls).forEach(node => order.appendChild(node));

    // Store in cache
    this.cache.component = component;
    this.cache.order = order;
    this.cache.trigger = component.querySelector(`.${ID}_StickyBasket__trigger`);
  }

  bindEvents() {
    const { trigger } = this.cache;
    trigger.addEventListener('click', () => {
      this.toggle.call(this);
    });
  }

  /**
   * Watch for changes on #secondary and update sticky basket
   * content if it has changed
   */
  watchForDOMChanges() {
    const { component } = this.cache;
    observer.connect(document.querySelector('#secondary'), (el) => {
      const originalItems = el.querySelector('.checkout-mini-cart');
      const stickyItems = component.querySelector('.checkout-mini-cart');
      if (originalItems !== stickyItems) {
        // Update items in product box
        stickyItems.replaceWith(originalItems);
      }

      const originalTotals = el.querySelector('.checkout-order-totals');
      const stickyTotals = component.querySelector('.checkout-order-totals');
      if (originalTotals !== stickyTotals) {
        // Update total in trigger bar
        const newTotal = originalTotals.querySelector('.total-value.value').innerText.trim();
        component.querySelector(`#${ID}_StickyBasket__trigger__total`).innerHTML = newTotal;

        // Update totals in product box
        stickyTotals.replaceWith(originalTotals);
      }
    }, {
      config: {
        subtree: false,
        childList: true,
        attributes: false,
      },
    });
  }

  render() {
    const { component } = this.cache;
    document.body.append(component);
  }

  open() {
    const { component, order } = this.cache;

    if (!this.cache.animating) {
      new Animation({ // eslint-disable-line
        elem: order,
        style: 'top',
        unit: '%',
        from: 100,
        to: 0,
        time: 300,
        buffer: 20,
        beforeAnim: () => {
          this.cache.animating = true;
          component.classList.add(`${ID}_StickyBasket--open`);
        },
        afterAnim: () => {
          this.cache.animating = false;
          document.documentElement.classList.add(`${ID}_blockScroll`);
          document.body.classList.add(`${ID}_blockScroll`);
          events.send(ID, 'Opened', 'Order summary');
        },
      });
    }
  }

  close() {
    const { component, order } = this.cache;

    if (!this.cache.animating) {
      new Animation({ // eslint-disable-line
        elem: order,
        style: 'top',
        unit: '%',
        from: 0,
        to: 100,
        time: 300,
        buffer: 20,
        beforeAnim: () => {
          this.cache.animating = true;
        },
        afterAnim: () => {
          component.classList.remove(`${ID}_StickyBasket--open`);
          this.cache.animating = false;
          document.documentElement.classList.remove(`${ID}_blockScroll`);
          document.body.classList.remove(`${ID}_blockScroll`);
        },
      });
    }
  }

  toggle() {
    const { cache, open, close } = this;
    const { component } = cache;
    if (component.classList.contains(`${ID}_StickyBasket--open`)) {
      close.call(this);
    } else {
      open.call(this);
    }
  }
}
