/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import Lightbox from './components/lightbox';
import { observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();

  const { ID } = settings;


  if (settings.VARIATION === '1') {
    const productChanges = () => {
      const allProducts = document.querySelectorAll('.product-tile-list__item.js-product-list-item');
      // move was price to before current price
      for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];

        // make the whole thing clickable
        const productLink = element.querySelector('a');
        element.addEventListener('click', () => {
          productLink.click();
        });

        // move was price to before current price
        const wasPrice = element.querySelector('.product-tile__savings');
        if (wasPrice) {
          const currentPrice = element.querySelector('.product-tile__pricing-container .product-tile__price');
          currentPrice.insertAdjacentElement('beforebegin', wasPrice);
        }
      }
    };
    productChanges();


    /* If any changes are made, remove everything and re-add it */
    observer.connect([document.querySelector('.product-tile-list.js-infinite-scroll')], () => {
      productChanges();
    }, {
      throttle: 1000,
      config: {
        attributes: true,
        childList: true,
        subtree: false,
      },
    });
  }

  // Quick view lightbox for V2
  if (settings.VARIATION === '2') {
    // add quick view to all products
    const addEnlargeToImage = () => {
      const allProducts = document.querySelectorAll('.product-tile-list__item.js-product-list-item');
      for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];
        const quickView = document.createElement('div');
        quickView.classList.add(`${ID}-quickView_button`);
        quickView.innerHTML = '<p>Enlarge Image</p>';
        element.querySelector('.product-tile__image-container').appendChild(quickView);
      }
    };

    addEnlargeToImage();

    const addLightboxToPage = () => {
      const lightbox = new Lightbox(settings.ID, {
        content: `<div class="${ID}-quick_view">
          <div class="${ID}-lightbox_content"> 
            <div class="${ID}-largeImage"></div>
            <a href="${ID}-productLink">View Product Details</a>
          </div>
        </div>`,
      });
    };
    addLightboxToPage();


    // on click of the enlarge button, show that image in the lightbox
    const enlargeButtonShow = () => {
      const allProducts = document.querySelectorAll('.product-tile-list__item.js-product-list-item');
      for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];
        const productImage = element.querySelector('.productLink .product-tile__image');
        const enlargeButton = element.querySelector(`.${settings.ID}-quickView_button`);
        const lightboxOverLay = document.querySelector(`.${ID}_Lightbox__overlay`);
        const lightbox = document.querySelector(`.${ID}_Lightbox`);
        if (enlargeButton) {
          enlargeButton.addEventListener('click', (e) => {
            e.preventDefault();

            events.send('HS016', 'click', 'Clicked Enlarge Image', {
              nonInteraction: true,
            });
            
            let productSrc;

            // get the image attribute
            if (productImage.getAttribute('data-srcset')) {
              productSrc = productImage.getAttribute('data-srcset');
            } else {
              productSrc = productImage.getAttribute('srcset');
            }

            const productLink = element.querySelector('a').getAttribute('href');

            // show the lightbox
            const productMatch = productSrc.match(/.+(cloudfront).+(\/)[\d]+(-)(606)/);
            if (productMatch && productMatch[0].trim()) {
              lightboxOverLay.style.display = 'block';
              lightbox.style.display = 'block';
              document.body.classList.add(`${ID}_Lightbox__noScroll`);
              lightbox.querySelector(`.${settings.ID}-largeImage`).style = `background-image: url(${productMatch[0].trim()})`;
              lightbox.querySelector('a').setAttribute('href', productLink);
            }
          });
        }
      }
    };
    enlargeButtonShow();

    const removeLightbox = () => {
      const lightboxOverLay = document.querySelector(`.${ID}_Lightbox__overlay`);
      const lightbox = document.querySelector(`.${ID}_Lightbox`);
      lightboxOverLay.remove();
      lightbox.remove();
    };

    const removeAllProducts = () => {
      const allProducts = document.querySelectorAll('.product-tile-list__item.js-product-list-item');
      for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];
        const enlargeElement = element.querySelector(`.${ID}-quickView_button`);
        if (enlargeElement) {
          enlargeElement.remove();
        }
      }
    };

    /* If any changes are made, remove everything and re-add it */
    observer.connect([document.querySelector('.product-tile-list.js-infinite-scroll')], () => {
      removeAllProducts();
      removeLightbox();
      addLightboxToPage();
      addEnlargeToImage();
      enlargeButtonShow();
    }, {
      throttle: 1000,
      config: {
        attributes: true,
        childList: true,
        subtree: false,
      },
    });
  }
};

export default activate;
