import {poller} from '../../../../../lib/uc-lib';
import {fullStory, events, getCookie, setCookie, deleteCookie, viewabilityTracker} from '../../../../../lib/utils';
import ajaxAddToBag from './ajax-add-to-bag';
import PublishSubscribe from './PublishSubscribe';
import { getCatDefinitionFromUrl, getCatUrlFromCatDefinition } from './category-definitions';

/**
 * Component for lightbox carousel
 */
class Component {
  /**
   * @constructor
   */
  constructor(productData) {
    this.productData = productData;
  }

  /**
   * Render the product HTML
   */
  render() {
    const catDefinition = getCatDefinitionFromUrl();
    const catUrl = getCatUrlFromCatDefinition(catDefinition);

    const headingText = `Have you viewed our ${catDefinition} accessories?`;
    let viewAllHtml = '';
    if(catUrl && catDefinition) {
      viewAllHtml = `<a class="mp96-lightbox__viewall-btn btn btn-default" href="${catUrl}">View all ${catDefinition} accessories</a>`;
    }

    const productItemsHtmlArray = [];
    this.productData.forEach((item, idx) => {
      let name = item.name;
      if(window.innerWidth < 600) {
        if(name.length > 35) {
          name = name.substr(0, 35) + '...';
        }
      }

      productItemsHtmlArray.push(`
          <div class="mp96-pitem">
            <div class="mp96-pitem__imgwrap">
              <a class="mp96-pitem__imglink" href="${item.url}">
                <img src="${item.image}" />
              </a>
            </div>
            <p class="mp96-pitem__name">
              <a class="mp96-pitem__name-link" href="${item.url}">
                ${name}
              </a>
            </p>
            <p class="mp96-pitem__price">
              ${item.price}
            </p>
            <p class="mp96-pitem__addto">
              <a class="mp96-pitem__addto-btn btn btn-primary" data-sku="${item.sku}">
                Add to Bag
              </a>
            </p>
          </div>
      `);
    });

    const productsHtml = `
      <div class="mp96-lightbox__products">${productItemsHtmlArray.join('')}</div>
    `;

    const lightboxHtml = `
      <div class="mp96-lightbox">
        <i class="ico ico-cross mp96-lightbox__close"></i>

        <h2 class="text-center">
          <i class="ico ico-tickCircle"></i>
          Item added to basket
        </h2>

        <h3 class="text-center">${headingText}</h3>

        ${productsHtml}

        <div class="mp96-lightbox__viewall text-center">
          ${viewAllHtml}
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', lightboxHtml);
    
    // Build slick carousel within lightbox`
    window.jQuery('.mp96-lightbox__products').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      arrows: true,
      prevArrow: '<div class="MP096_prev"></div>',
      nextArrow: '<div class="MP096_next"></div>',
      dots: false,
      variableWidth: false,
      draggable: false,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 550,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    });

    // on-build events...
    this.attachEvents();
  }

  /**
   * Helper attach events to built lightbox elms
   */
  attachEvents() {
    const close = document.querySelector('.slidePanel_close');
    const lightboxClose = document.querySelector('.mp96-lightbox__close');
    const lightbox = document.querySelector('.mp96-lightbox');

    close.addEventListener('click', () => {
      lightbox.remove();
    });

    lightboxClose.addEventListener('click', () => {
      lightbox.remove();
    });

    lightbox.addEventListener('click', (e) => {
      const target = e.target;
      if (target) {
        // More info
        if (target.classList.contains('mp96-pitem__imglink')) {
          // Publish event
          PublishSubscribe.publish('clicked-more-info');
        }

        if (target.classList.contains('mp96-lightbox__viewall-btn')) {
          PublishSubscribe.publish('click-view-all');
        }

        if (target.classList.contains('mp96-pitem__name-link')) {
          // Publish event
          PublishSubscribe.publish('clicked-more-info');
        }

        // Add to bag
        if (target.classList.contains('mp96-pitem__addto-btn')) {
          e.preventDefault();
          e.stopPropagation();

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
  }
}

/**
 * Borrows from MP059 
 * See mini-basket-carousel
 *
 * Use of cookies as other running experiments may refresh page
 */
const lightboxCarousel = (productData) => {
  const $ = window.jQuery;

  if (getCookie('MP096_addToBag')) {
    setTimeout(() => {
      const component = new Component(productData);
      component.render();

      events.send('MP096', 'View', 'Lightbox carousel is in view', {sendOnce: true});
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

          const component = new Component(productData);
          component.render();

          // Send 'View' event if MP096 is not active. If it is active we can expect a page refresh
          if (!document.body.classList.contains('MP096')) {

            events.send('MP096', 'View', 'Lightbox carousel is in view', {sendOnce: true});
          }
        });
      }, 500);
    };

    $(document).on('ajaxSuccess', callback);

  });
};

export default lightboxCarousel;
