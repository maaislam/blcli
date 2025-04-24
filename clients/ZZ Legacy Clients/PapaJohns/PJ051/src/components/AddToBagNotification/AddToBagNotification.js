import settings from '../../lib/settings';
import { initPostback } from '../../lib/services';

const { ID } = settings;
const NAME = 'AddToBagNotification';

export default class AddToBagNotification {
  constructor(options) {
    this.options = options || {};
    this.productindex = [].indexOf.call(options.product.parentNode.children, options.product);
    this.getProductName();
    AddToBagNotification.getItemCount(this.productName, (itemCount) => {
      this.itemCount = itemCount;
      this.create();
      setTimeout(() => {
        this.render();
      }, 900);
      setTimeout(() => {
        this.destroy();
      }, 5000);
    });
  }

  /**
   * Gets the product using the product index which was stored
   * on initialisation. This is necessary due to the product elements
   * being removed then re-added after a postback
   */
  getProduct() {
    const products = document.querySelectorAll('#ctl00_cphBody_updProducts .menuList');
    return products[this.productindex];
  }

  /**
   * @returns {string}
   */
  getProductName() {
    const { product } = this.options;
    this.productName = product.querySelector('h3').innerText.replace(/\s\|\s[\d]+\spts/g, '');
  }

  /** Create component */
  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_${NAME}`);
    element.innerHTML = `
      <p>
        <span class="${`${ID}_${NAME}__num-wrap`}">
          <span class="${`${ID}_${NAME}__num`}">${this.itemCount}</span>
        </span> in your basket
      </p>
    `;
    this.component = element;
  }

  /** Render component */
  render() {
    const product = this.getProduct();

    if (product) {
      product.insertAdjacentElement('afterbegin', this.component);

      // Update CTA Text to 'Redeem Again'
      const cta = product.querySelector('.greenButton .centerB');
      if (cta && cta.innerText.toLowerCase() === 'redeem') cta.innerText = 'Redeem Again';
    }
  }

  /** Remove component */
  destroy() {
    const { component } = this;
    component.parentElement.removeChild(component);
  }

  /**
   * Counts number of times a product is in the basket
   * @param {string} productName
   * @param {function} callback
   * @returns {number} Number of product in basket
   */
  static getItemCount(productName, callback) {
    /**
     * Opens minibasket in the background
     * @param {function} callback Runs when basket is open
     */
    function silentOpenMiniBasket(callback) {
      const basketID = 'ctl00$_objHeader$lbBasketItem';
      const miniBasketControls = {
        toggleState: () => {
          initPostback(basketID);
        },
        forceHide: () => {
          const omnibar = document.querySelector('#ctl00__objHeader_upOmnibar');
          omnibar.insertAdjacentHTML('afterbegin', '<style type="text/css">.omnibar .obbasket { display: none !important; }</style>');
        },
      };

      // Watch for the minibasket open request to be completed
      const pageLoadedHandler = (sender) => {
        const { asyncTarget } = sender._postBackSettings;
        if (asyncTarget === basketID) {
          // Hide elements
          miniBasketControls.forceHide();

          // Run callback
          callback(miniBasketControls.toggleState);

          // Remove event handler
          window.prm.remove_pageLoaded(pageLoadedHandler);
        }
      };
      window.prm.add_pageLoaded(pageLoadedHandler);

      // Open minibasket if it isn't already opened
      const basketItems = window.IsMobile() ? document.querySelectorAll('.intBasket > table > tbody > tr') : document.querySelectorAll('.itemsCont .itemCont');
      if (!basketItems) {
        miniBasketControls.toggleState();
      } else {
        callback();
      }
    }

    function getData() {
      const getBasketItemData = {
        desktop: () => {
          const basketItems = document.querySelectorAll('.itemsCont .itemCont');
          const basketItemData = (() => {
            const obj = {};
            Array.from(basketItems).forEach((item) => {
              let name = item.querySelector('.item').innerText.trim().replace(/\n/, '');
              const isReward = /for [\d]+ points/.test(name);
              if (isReward) {
                name = item.querySelector('.subItem').innerText.trim().replace(/-[\s\n]+/g, '');
                if (obj[name]) {
                  obj[name] += 1;
                } else {
                  obj[name] = 1;
                }
              }
            });
            return obj;
          })();
          return basketItemData;
        },
        mobile: () => {
          let basketItems = document.querySelectorAll('.intBasket > table > tbody > tr');
          if (basketItems) basketItems = Array.from(basketItems).filter(node => !node.id);
          const basketItemData = (() => {
            const obj = {};
            Array.from(basketItems).forEach((item) => {
              let name = item.querySelector('.pizza-title-b').innerText.trim().replace(/\n/, '');
              const isReward = /for [\d]+ points/.test(name);
              if (isReward) {
                name = item.querySelector('.subItem').innerText.trim().replace(/-[\s\n]+/g, '');
                if (obj[name]) {
                  obj[name] += 1;
                } else {
                  obj[name] = 1;
                }
              }
            });
            return obj;
          })();
          return basketItemData;
        },
      };

      const basketItemData = window.IsMobile() ? getBasketItemData.mobile() : getBasketItemData.desktop();
      return basketItemData[productName] || 1;
    }

    silentOpenMiniBasket((closeMiniBasket) => {
      const data = getData(); // Scrape data whilst basket is open
      if (closeMiniBasket && typeof closeMiniBasket === 'function') closeMiniBasket(); // Close basket
      callback(data);
    });
  }
}
