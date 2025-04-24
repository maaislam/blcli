import settings from '../../settings';
import {
  Animation,
  wrap,
  events,
} from '../../../../../../../lib/utils';

// Copyright (c) 2014, Gajus Kuizinas (http://gajus.com/)
// All rights reserved.
// Modified fork: https://github.com/LewisN/swing
import * as swing from '../../../../../../../node_modules/swing/dist/index';
import { observer } from '../../../../../../../lib/uc-lib';

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

    // Wrap rating and features in container
    const rating = product.querySelector('.product__rating');
    const features = product.querySelector('.product__feature');
    const ratingWrap = document.createElement('div');
    ratingWrap.classList.add(`${name}_rating`);
    wrap([rating, features], ratingWrap);

    // Add discover more CTA
    const link = product.querySelector('.product-link');
    link.insertAdjacentHTML('beforeend', `<div class="${name}_ctaWrap"><a class="button button--secondary ${name}_pdpCta" href="${link.href}">Discover More</div></div>`);

    // Remove whole card link
    link.removeAttribute('href');

    // Wrap rating block and cta block
    const actionWrap = document.createElement('div');
    actionWrap.classList.add(`${name}_actions`);
    wrap([ratingWrap, product.querySelector(`.${name}_ctaWrap`)], actionWrap);

    // Wrap product info in a container which allows us to alter the width of the bounding box
    // i.e. change how far you need to drag a product for it to register as an add to bag
    const infoWrap = document.createElement('div');
    infoWrap.classList.add(`${name}_infoWrap`);
    wrap(productInfo, infoWrap);

    // Create new swing stack for each product using Swing plugin
    this.stack = swing.Stack({
      allowedDirections: [swing.Direction.RIGHT],
      // dragDirection: 'right',
      threshold: 40,
      boundingBox: infoWrap,
    });

    this.card = this.stack.createCard(productInfo);
  }

  bindEvents() {
    const {
      name,
      product,
      card,
      stack,
      addToHometrial,
    } = this;
    const that = this;
    const productImg = product.querySelector('.product-image');
    const productAdded = product.querySelector(`.${name}_added`);
    let activeStateEvent;

    const activeStateHandler = (event) => {
      if (event) {
        const didMoveRight = event.throwDirection && event.throwDirection.toString() === 'Symbol(RIGHT)';
        if (didMoveRight) {
          product.classList.add(`${name}--active`);
          if (activeStateEvent) {
            card.off(activeStateEvent);
            activeStateEvent = null;
          }
        }
      }
    };

    card.on('dragstart', (e) => {
      activeStateEvent = card.on('dragmove', activeStateHandler);
    });

    card.on('dragend', () => {
      product.classList.remove(`${name}--active`);
      if (activeStateEvent) {
        card.off(activeStateEvent);
        activeStateEvent = null;
      }
    });

    // Add product to home trial when card is thrown to the right
    stack.on('throwoutright', () => {
      // Show placeholder
      const placeholder = product.querySelector(`.${name}_placeholder`);

      addToHometrial.call(that)
        .then((shouldRemoveSwipe) => {
          // Fade 'Adding to hometrial' message
          // eslint-disable-next-line no-new
          new Animation({
            elem: placeholder,
            style: 'opacity',
            unit: '',
            from: 1,
            to: 0,
            time: 400,
          });

          product.classList.add(`${name}--added`);

          // Replace image with 'Added to hometrial' message
          productImg.style.display = 'none';
          productAdded.style.display = 'block';
          productAdded.style.opacity = '1';

          // Throw card back into stack so user can see product again
          card.throwIn(0, 0);

          if (shouldRemoveSwipe) {
            // Removes swipe functionality
            // card.destroy();
          }

          // Hide 'Adding to hometrial message'
          placeholder.style.display = 'none';

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
          // Throw card back in stack if error
          card.throwIn(0, 0);

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
      // Watch for the alert to show so we know if the product was successfully added or not
      // Sometimes the frames will be out of stock, in which case there is an alert-error class
      observer.connect(document.body, () => {
        const alert = document.querySelector('body > .alert.alert-from-top');
        if (alert) {
          document.body.classList.remove(`${ID}--block`);
          observer.disconnect(document.body);

          // Remove swipe functionality if product successfully added to hometrial
          const message = alert.innerText.trim().toLowerCase();
          const shouldRemoveSwipe = message !== 'your home trial is full.';
          const isError = alert.classList.contains('alert-error');
          if (!isError) {
            resolve(shouldRemoveSwipe);
          } else {
            reject(message);
          }
        } else {
          // Potentially account for alert not showing
          reject();
        }
      }, {
        config: {
          childList: true,
          subtree: false,
          attributes: false,
        },
      });

      // Freeze the page to prevent further interactions from clashing with this
      document.body.classList.add(`${ID}--block`);

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
