import settings from '../../settings';
import {
  Animation,
  wrap,
  events,
} from '../../../../../../../lib/utils';
import { observer } from '../../../../../../../lib/uc-lib';
import Slip from '../../vendors/Slip';

const { ID } = settings;

export default class SwipeCard {
  /**
   * @param {HTMLElement} product Product to turn into a card
   */
  constructor(product) {
    this.name = `${ID}_SwipeCard`;
    this.product = product;
    this.create();
    this.bindEvents();
    SwipeCard.initBasketStateAll();
  }

  create() {
    const { name, product } = this;
    product.classList.add(name);
    const productInfo = product.querySelector('.product-info');

    // Placeholder block under the product info card
    productInfo.insertAdjacentHTML('beforebegin', `<div class="${name}_placeholder"><span>Adding to home trial</span></div>`);

    // Added block to replace product image
    productInfo.querySelector('.product-image').insertAdjacentHTML('afterend', `<div class="${name}_added"><span>Added to home trial</span></div>`);

    // Add hometrial icon
    productInfo.insertAdjacentHTML('afterbegin', `<div class="${ID}_hometrialIcon"></div>`);

    // Add discover more CTA
    const link = product.querySelector('.product-link');
    link.insertAdjacentHTML('beforeend', `<div class="${name}_ctaWrap"><a class="button button--secondary ${name}_pdpCta" href="${link.href}">Discover More</div></div>`);

    // Remove whole card link
    link.removeAttribute('href');

    // Wrap rating and features in container
    let ratingWrap;
    const ratingWrapEls = [];
    const rating = product.querySelector('.product__rating');
    const features = product.querySelector('.product__feature');
    if (rating) ratingWrapEls.push(rating);
    if (features) ratingWrapEls.push(features);
    if (ratingWrapEls.length) {
      ratingWrap = document.createElement('div');
      ratingWrap.classList.add(`${name}_rating`);
      wrap(ratingWrapEls, ratingWrap);
    }

    // Wrap rating block and cta block
    let actionWrap;
    const actionsWrapEls = [];
    const ctaWrap = product.querySelector(`.${name}_ctaWrap`);
    if (ratingWrap) actionsWrapEls.push(ratingWrap);
    if (ctaWrap) actionsWrapEls.push(ctaWrap);
    if (actionsWrapEls.length) {
      actionWrap = document.createElement('div');
      actionWrap.classList.add(`${name}_actions`);
      wrap(actionsWrapEls, actionWrap);
    }

    // Wrap product info in a container which allows us to alter the width of the bounding box
    // i.e. change how far you need to drag a product for it to register as an add to bag
    const infoWrap = document.createElement('div');
    infoWrap.classList.add(`${name}_infoWrap`);
    wrap(productInfo, infoWrap);

    // Create new swipe list
    this.list = infoWrap;
    // eslint-disable-next-line no-new
    new Slip(infoWrap, {
      minimumSwipeVelocity: 0.9,
      minimumSwipeTime: 110,
    });
  }

  bindEvents() {
    const {
      name,
      product,
      list,
      addToHometrial,
    } = this;
    const that = this;
    const productImg = product.querySelector('.product-image');
    const productAdded = product.querySelector(`.${name}_added`);

    // Disable reordering
    list.addEventListener('slip:beforereorder', (e) => {
      e.preventDefault();
    }, false);

    list.addEventListener('slip:beforeswipe', (e) => {
      if (e.detail.directionX !== 'right') {
        e.preventDefault();
      } else {
        product.classList.add(`${name}--active`);
      }
    });

    list.addEventListener('slip:animateswipe', (e) => {
      // Prevent swiping left
      if (e.detail.x < 0) {
        e.preventDefault();
      }
    });

    // Add product to hometrial on swipe
    list.addEventListener('slip:swipe', (e) => {
      addToHometrial.call(that)
        .then(() => {
          product.classList.remove(`${name}--active`);
          product.classList.add(`${name}--added`);

          // Replace image with 'Added to hometrial' message
          productImg.style.display = 'none';
          productAdded.style.display = 'block';
          productAdded.style.opacity = '1';

          // Show image again after 2s
          setTimeout(() => {
            // eslint-disable-next-line no-new
            new Animation({
              elem: productAdded,
              style: 'opacity',
              unit: '',
              from: 1,
              to: 0,
              time: 300,
              afterAnim: () => {
                product.querySelector('.product-image').style.display = 'block';
                product.querySelector(`.${name}_added`).style.display = 'none';
              },
            });
          }, 2000);
          events.send(ID, 'Success', 'Add to hometrial');
        })
        .catch(() => {
          events.send(ID, 'Error', 'Add to hometrial');
        });
    });
  }

  /**
   * Handles adding product to hometrial by waiting for an alert to
   * show on the page and processing the response
   * @returns {Promise.<boolean>} On resolve returns boolean to dictate whether
   *  swipe functionality should be removed or not
   */
  addToHometrial() {
    const { product } = this;
    const sku = product.getAttribute('data-sku');

    return new Promise((resolve, reject) => {
      // Freeze the page to prevent further interactions from clashing with this
      document.body.classList.add(`${ID}--block`);

      // Remove any existing alerts to avoid issues with detecting when a new one is added
      const existingAlert = document.querySelector('.alert.alert-from-top');
      if (existingAlert) {
        existingAlert.parentElement.removeChild(existingAlert);
      }

      // Watch for the alert to show so we know if the product was successfully added or not
      // Sometimes the frames will be out of stock, in which case there is an alert-error class
      observer.connect(document.body, (el, mutation) => {
        // Check to see if nodes were added and if the alert element was one of them
        const { addedNodes } = mutation;
        const alert = [].filter.call(addedNodes, node => node.classList.contains('alert-from-top'))[0];
        if (alert) {
          document.body.classList.remove(`${ID}--block`);
          observer.disconnect(document.body);

          const message = alert.innerText.trim().toLowerCase();
          const isError = alert.classList.contains('alert-error');
          if (!isError) {
            resolve();
          } else {
            reject(message);
          }
        }
      }, {
        config: {
          childList: true,
          subtree: false,
          attributes: false,
        },
        throttle: 0,
      });

      // Add to hometrial
      window.gd.hometrial.add(sku);
    });
  }

  /**
   * Update the 'added' state of each product on the page
   * By cross-referencing SKUs in the hometrial basket with the product SKUs on
   * the page we can ensure that the added state being shown on the page is correct
   *
   * This is useful for when the page loads and we want to apply the active state to
   * products already in the basket, and for keeping it up to date when products are removed
   * from a different browser tab
   */
  static initBasketStateAll() {
    // Get most recent hometrial basket products
    // 'force' is needed to bypass cache
    window.gd.hometrial.list({ force: true })
      .then((response) => {
        const hometrialItems = response.items;
        const basketSkus = hometrialItems.map(item => item.sku);
        const products = document.querySelectorAll('.product');

        for (let i = 0; i < products.length; i += 1) {
          const product = products[i];
          const sku = product.getAttribute('data-sku');
          const productInBasket = basketSkus.indexOf(sku) > -1;
          const productStateAdded = product.classList.contains(`${ID}_SwipeCard--added`);

          if (productInBasket && !productStateAdded) {
            product.classList.add(`${ID}_SwipeCard--added`);
          } else if (!productInBasket && productStateAdded) {
            product.classList.remove(`${ID}_SwipeCard--added`);
          }
        }
      });
  }
}
