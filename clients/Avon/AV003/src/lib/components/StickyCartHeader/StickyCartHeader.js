import settings from '../../settings';
import {
  throttle,
  observer
} from '../../../../../../../lib/uc-lib';
import {
  rearrangeSummary,
  watchCartSummary,
} from '../../services';
const {
  ID
} = settings;

export default class StickyCartHeader {
  constructor(options) {
    const opts = options || {};
    this.cartItems = opts.cartItems;
    this.subTotal = opts.subTotal;
    this.name = `${ID}_StickyCartHeader`;
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const {
      name
    } = this;

    const component = document.createElement('div');
    component.classList.add(name);
    component.innerHTML = `
    <div class="${ID}_StickyCartHeader--wrap">
      <div class="${name}_summary">
        <h2>Your bag summary:</h2>
        <span>
          ${window.innerWidth <= 768 ? 'Total items: ' : 'Total Number of Items: '}
          <span class="${name}_itemCount" ng-bind="CartData.NumberOfItemsInCart">
            <strong class="${ID}_items">${this.cartItems}</strong>
          </span>
        </span>
        <span>
          Sub Total: 
          <span id="${name}_subtotal" ng-bind="(CartData.SubTotal | currency)">
            <strong class="${ID}_subTotal">${this.subTotal}</strong>
          </span>
        </span>
      </div>

      <div class="${name}_ctas">
        <a class="Button ${ID}_updateCart" data-bind=".Button.Alt" ng-click="UpdateCart(0)">Update bag</a>
        <a class="Button Alt  ${ID}_checkOut" data-bind=".Button" ng-click="CheckOut('/checkout/')">Go to checkout</a>
      </div>
    </div>
    `;

    this.component = component;
  }

  bindEvents() {
    const {
      name,
      component
    } = this;
    let waypoint;
    let headerStuck;

    // Stick header on scroll
    /**
     * Get distance of user scroll
     * @returns {number}
     */
    const getScrollDistance = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    /**
     * Get total height of marketing text bar if it exists
     * @returns {number}
     */
    const getTopPadding = () => {
      const marketingText = document.querySelector('#MarketingTextBar');
      return marketingText ? `${marketingText.offsetHeight}px` : null;
    };

    /**
     * Define waypoint for when header should stuck
     * @returns {number}
     */
    const getWaypoint = () => {
      let value;

      const header = document.querySelector('#HeaderPlaceholder');
      value = header.offsetHeight;

      const marketingText = document.querySelector('#MarketingTextBar');
      if (marketingText) {
        value -= marketingText.offsetHeight;
      }

      return value;
    };
    waypoint = getWaypoint();

    const headerControls = {
      stick: () => {
        headerStuck = true;
        component.classList.add(`${name}--fixed`);
        document.body.style.paddingTop = `${component.offsetHeight}px`;

        // Place header below marketing text bar if it exists
        const topPadding = getTopPadding();
        if (topPadding) component.style.top = topPadding;
      },
      unstick: () => {
        headerStuck = false;
        component.classList.remove(`${name}--fixed`);
        component.style.top = '';
        document.body.style.paddingTop = '';
      },
    };

    /**
     * Fixes header to top of document if scrolled beyond waypoint
     */
    const stickHeaderOnScroll = throttle(() => {
      if (getScrollDistance() >= waypoint) {
        if (!headerStuck) {
          headerControls.stick();
        }
      } else if (headerStuck) {
        headerControls.unstick();
      }
    }, 100);
    window.addEventListener('scroll', stickHeaderOnScroll);

    const updateStickyBar = () => {
      let targetNode;
      let updatedItemsCount;
      let updatedSubTotal;
      if (window.innerWidth <= 768) {
        targetNode = document.querySelector('.CartHeader .products-count');
      } else {
        targetNode = document.querySelector('.CartHeader-left .products-count');
      }
      observer.connect(targetNode, function () {
        if (window.innerWidth <= 768) {
          updatedItemsCount = document.querySelector('.CartHeader .products-count').textContent.trim().replace(/(|)/g, '');
          updatedSubTotal = document.querySelector('.Cart-Summary .Cart-SubTotal').textContent.trim();
        } else {
          updatedItemsCount = document.querySelector('.CartHeader .CartHeader-left .products-count').textContent.trim().replace(/(|)/g, '');
          updatedSubTotal = document.querySelector('.Cart-SubTotal-Wrapper .Cart-SubTotal').textContent.trim();
        }
        document.querySelector(`.${ID}_items`).textContent = updatedItemsCount;
        document.querySelector(`.${ID}_subTotal`).textContent = updatedSubTotal;
        //rearrangeSummary();
        observer.disconnect(targetNode);
      }, {
        // Options
        config: {
          attributes: true,
          childList: true,
          subtree: true
        },
      });
    }

    const bindCartClicks = () => {
      const targets = [`.${ID}_updateCart`, `.${ID}_checkOut`];
      [].forEach.call(targets, function (target) {
        component.querySelector(target).addEventListener('click', function (e) {
          const curtarget = e.target;
          const curdataBind = curtarget.getAttribute('data-bind');
          if (window.innerWidth <= 768) {
            document.querySelector(`.Cart-ButtonsBottom ${curdataBind}`).click();
          } else {
            document.querySelector(`.CartHeader-right ${curdataBind}`).click();
          }
          if (e.target.classList.contains(`${ID}_updateCart`)) {
            updateStickyBar();
          }
        });
      });
    }
    bindCartClicks();

    const triggerUpdate = () => {
      let targets;
      if (window.innerWidth <= 768) {
        targets = ['.Cart-ButtonsBottom .Button.Alt'];
      } else {
        targets = ['.CartHeader-right .Button.Alt', '.Cart-ButtonsBottom .Button.Alt'];
      }
      const removeButtons = document.querySelectorAll('.Cart-ProductRemove');
      [].forEach.call(targets, function (target) {
        document.querySelector(target).addEventListener('click', function () {
          updateStickyBar();
          //rearrangeSummary();
        });
      });
      [].forEach.call(removeButtons, function (removeButton) {
        removeButton.addEventListener('click', function () {
          updateStickyBar();
          //rearrangeSummary();
        })
      });
    }
    triggerUpdate();
  }

  render() {
    const {
      component
    } = this;

    const header = document.querySelector('#HeaderPlaceholder');
    if (window.innerWidth <= 768) {
      document.body.insertAdjacentElement('afterbegin', component);
    } else {
      header.insertAdjacentElement('afterend', component);
    }
  }
}
