import PublishSubscribe from './PublishSubscribe';
import ajaxAddToBag from './ajax-add-to-bag';
import { events } from '../../../../../lib/utils';
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
    const subtotal = window.universal_variable.basket.total
    - window.universal_variable.basket.shipping_cost;
    const outstandingAmount = (50 - subtotal) + 0.05;

    const headingText = `You're <span>£${outstandingAmount.toFixed(2)}</span> away from FREE standard delivery`;
    const productItemsHtmlArray = [];

    Object.keys(this.productData).forEach((i) => {
      const data = this.productData[i];
      productItemsHtmlArray.push(`
          <div class="MP128-pitem">
            <div class="MP128-pitem__imgwrap">
              <a class="MP128-pitem__imglink" href="${data.url}">
                <img src="${data.image}" />
              </a>
            </div>
            <p class="MP128-pitem__name">
              <a class="MP128-pitem__name-link" href="${data.url}">
                ${data.name}
              </a>
            </p>
            <p class="MP128-pitem__price">
              ${data.price}
            </p>
            <p class="MP128-pitem__addto">
              <a class="MP128-pitem__addto-btn btn btn-primary" data-sku="${data.sku}">
                Add to Bag
              </a>
            </p>
          </div>
      `);
    });

    const carouselHtml = `
      <div class="MP128-carousel">
        <h3 class="text-center">${headingText}</h3>
        <div class="MP128-products"></div>
      </div>
    `;
    document.querySelector('#cartItems').insertAdjacentHTML('afterend', carouselHtml);

    // only show 6
    for (let index = 0; index < productItemsHtmlArray.length; index += 1) {
      const element = productItemsHtmlArray[index];
      const carouselProduct = document.createElement('div');
      carouselProduct.classList.add('MP128-product');
      carouselProduct.innerHTML = element;
      document.querySelector('.MP128-products').appendChild(carouselProduct);
      if (index === 6) {
        break;
      }
    }

    // Build slick carousel
    /* eslint-disable */
    window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
      window.jQuery('.MP128-products').slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        arrows: true,
        prevArrow: '<div class="MP128_prev"></div>',
        nextArrow: '<div class="MP128_next"></div>',
        dots: false,
        variableWidth: false,
        draggable: true,
      });
    });

    this.attachEvents();
  };
  
  attachEvents() {
    const carousel = document.querySelector('.MP128-carousel');
    carousel.addEventListener('click', (e) => {
      const target = e.target;
      if (target) {
        if (target.classList.contains('mp96-lightbox__viewall-btn')) {
          PublishSubscribe.publish('click-view-all');
        }

        if (target.classList.contains('MP128-pitem__name-link')) {
          // Publish event
          PublishSubscribe.publish('clicked-more-info');
        }

        // Add to bag
        if (target.classList.contains('MP128-pitem__addto-btn')) {
          e.preventDefault();
          e.stopPropagation();
          // Publish event
          PublishSubscribe.publish('clicked-add-to-bag');
          // Add to bag
          const sku = target.getAttribute('data-sku');
          if (sku) {
            ajaxAddToBag(sku);
            events.send('MP128', 'Clicked', 'Add to Cart in Basket');
          }
        }
      }
    });
    /* eslint-enable */
  }
}


const basketCarousel = (productData) => {
  const component = new Component(productData);
  component.render();
};

export default basketCarousel;
