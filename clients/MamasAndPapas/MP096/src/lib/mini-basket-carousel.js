import {poller} from '../../../../../lib/uc-lib';
import {fullStory, events, getCookie, setCookie, deleteCookie, viewabilityTracker} from '../../../../../lib/utils';
import ajaxAddToBag from './ajax-add-to-bag';
import PublishSubscribe from './PublishSubscribe';
import { getCatDefinitionFromUrl } from './category-definitions';

/**
 * Adapted from the lovely work undertaken by Lewis Needham 
 * in MP059
 *
 * Mini Basket Carousel
 */

/**
 * Component helper
 */
const component = {
  /**
   * @returns {HTMLElement} Component
   */
  create: function(products) {
    const container = document.createElement('div');
    container.classList.add('MP096_minibasketCarousel', 'row');

    const heading = document.createElement('div');
    heading.classList.add('MP096_title');

    const catDefinition = getCatDefinitionFromUrl();
    const headingText = `Have you viewed our ${catDefinition} accessories?`;
    heading.innerText = headingText;

    const ul = document.createElement('ul');
    ul.classList.add('MP096_products');

    const buildProductHtml = function(product) {
      const li = document.createElement('li');
      li.classList.add('MP096_product');

      const a = document.createElement('a');
      a.href = 'javascript:void(0)';
      
      const imgWrap = document.createElement('div');
      imgWrap.classList.add('MP096_imgWrap');

      const img = document.createElement('img');
      img.src = product.image;

      const details = document.createElement('div');
      details.classList.add('MP096_details');

      const name = document.createElement('div');
      name.classList.add('MP096_product__name');
      name.innerHTML = product.name;

      const price = document.createElement('div');
      price.classList.add('MP096_product__price');
      price.innerHTML = product.price;

      const addToCartButton = document.createElement('a');
      addToCartButton.classList.add('btn', 'btn-default', 'w-100', 'MP096_details__btn', 'MP096_details__btn--addToCart');
      addToCartButton.innerText = 'Move to bag';
      addToCartButton.setAttribute('data-sku', product.sku);
      addToCartButton.href = 'javascript:void(0)';
      
      const infoButton = document.createElement('a');
      infoButton.classList.add('btn', 'btn-default', 'w-100', 'MP096_details__btn', 'MP096_details__btn--info');
      infoButton.innerText = 'More Info';
      infoButton.href = product.url;
      
      details.appendChild(name);
      details.appendChild(price);
      details.appendChild(addToCartButton);
      details.appendChild(infoButton);
      imgWrap.appendChild(img);
      a.appendChild(imgWrap);
      a.appendChild(details);
      li.appendChild(a);

      return li;
    };

    for (let i = 0; i < products.length; i++) {
      const product = buildProductHtml(products[i]);
      ul.appendChild(product);
    }

    container.appendChild(heading);
    container.appendChild(ul);

    return container;
  },

  /**
   * @param {HTMLElement} component - Instance of the component
   * @param {jQuery} $
   */
  attachEvents: function(component, $) {

    component.addEventListener('click', (e) => {
      const target = e.target;
      if (target) {
        // More info
        if (target.classList.contains('MP096_details__btn--info')) {
          // Publish event
          PublishSubscribe.publish('clicked-more-info');
        }

        // Add to bag
        if (target.classList.contains('MP096_details__btn--addToCart')) {
          e.preventDefault();

          // Publish event
          PublishSubscribe.publish('clicked-add-to-bag');

          // Add to bag
          const sku = target.getAttribute('data-sku');
          if (sku) {
            ajaxAddToBag(sku);
          }
        }
      }
    });

    /**
     * NOTE: Sliding disabled due to minibasket functionality
     * Minibasket automatically closes on swipe resulting in closing
     * as you swipe through the carousel
     */
    // Slider GA Events
    // const $productRecs = $(component).find('.MP096_products');
    // let isSliding = false;
    // $productRecs.on('beforeChange', () => {
    // 		isSliding = true;
    // });
    // $productRecs.on('afterChange', () => {
    // 		isSliding = false;
    // });
    // $productRecs.find('li a').click(() => {
    // 		if (isSliding) return;
    // 		// User clicked and didn't swipe, page change expected
    // 		events.send('MP096', 'Click', 'Clicked footmuff product', {sendOnce: true});
    // 		qubit && qubit.sendEvent ? qubit.sendEvent('MP096:click:footmuff carousel product') : null;
    // });
  },
  
  /**
   * @param {HTMLElement} component - Instance of the component
   * @param {HTMLElement} productElement - Element in the minibasket this should be rendered after
   * @param {jQuery} $
   */
  render: function(component, productElement, $) {
    productElement.appendChild(component);
    
    // Build slick
    $(component).find('.MP096_products').slick({
      slidesToShow: 1,
      slidesPerRow: 1,
      infinite: true,
      arrows: true,
      prevArrow: '<div class="MP096_prev"></div>',
      nextArrow: '<div class="MP096_next"></div>',
      dots: true,
      draggable: false,
    });
  },

  /**
   * @param {Array} - JSON of all products
   */
  init: function(products, productElement) {
    const $ = window.jQuery;
    const component = this.create(products);
    if (!document.querySelector('.MP096_minibasketCarousel')) {
      this.render(component, productElement, $);
    }
    this.attachEvents(component, $);
  }
};


/** 
 * @description Rendering the minibasket carousel component
 */
const minibasketCarousel = (productData) => {
  const $ = window.jQuery;

  /* 
   * Cookie 'MP096_addToBag' exists when a product has been added to bag. If this
   * exists when the page has just loaded we can assume MP096 is also running and
   * has refreshed the page on add to bag. As the pushchair has just been added
   * to bag we should render this component
   */
  const devMode = false;

  if (devMode) {
    const lastProductElement = document.querySelectorAll('#basket_products .basket_product')[0];
    component.init(productData, lastProductElement);
  } else {
    if (getCookie('MP096_addToBag')) {
      setTimeout(() => {
        const lastProductElement = document.querySelectorAll('#basket_products .basket_product')[0];
        const lastProductElementName = lastProductElement.querySelector('.basket_productTitle a').innerText;
        const thisProductName = document.querySelector('.productDetail_title').innerText;

        // If most recently added minibasket product is this product, render component on this element
        if (lastProductElementName === thisProductName) {
          component.init(productData, lastProductElement);
          events.send('MP096', 'View', 'Minibasket carousel is in view', {sendOnce: true});
        }
      }, 500);
    }
  
    /* 
    * Sets cookie on add to bag in case MP096 is also running alongside this which
    * causes a page refresh on add to bag. This is then checked on page load to determine
    * if a product has just been added to bag or not
    */
    document.querySelector('.addToCartButton').addEventListener('click', () => {
      const callback = () => {
        $(document).off('ajaxSuccess', callback);

        setTimeout(() => {
          poller(['#basket_products .basket_product .basket_productTitle'], () => {
            setCookie('MP096_addToBag', true, null, null, 15000);
            const lastProductElement = document.querySelectorAll('#basket_products .basket_product')[0];
            const lastProductElementName = lastProductElement.querySelector('.basket_productTitle a').innerText;
            component.init(productData, lastProductElement);

            // Send 'View' event if MP096 is not active. If it is active we can expect a page refresh
            if (!document.body.classList.contains('MP096')) {
              events.send('MP096', 'View', 'Minibasket carousel is in view', {sendOnce: true});
            }
          });
        }, 500);
      };

      $(document).on('ajaxSuccess', callback);
    });
  }
};

export default minibasketCarousel;

