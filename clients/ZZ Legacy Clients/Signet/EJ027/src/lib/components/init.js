import settings from '../settings';
import Lightbox from './lightbox';
import offersUSPS from './offersUSPS';
import LightboxSlick from './LightboxSlick';
import upsellProducts from './upsellProducts';
import { events } from '../../../../../../lib/utils';
import { pollerLite } from '../../../../../../lib/uc-lib';

export default () => {
  const { ID } = settings;
  const productTitle = window.digitalData.product[0].productInfo.productName;

  // add the fake button to the page
  const addFakeButton = () => {
    const fakeAddButton = document.createElement('div');
    fakeAddButton.classList.add(`${ID}-buyButton`);
    fakeAddButton.innerHTML = `Buy
    <div class="${ID}-loader-container ${ID}-ball-pulse-double">
      <div class="${ID}-loader">
        <div class="${ID}-ball-1"></div>
        <div class="${ID}-ball-2"></div>
      </div>
  </div>`;
    document.querySelector('#basketForm .buying-buttons').appendChild(fakeAddButton);
  };

  addFakeButton();

  // create the lightbox to trigger on add
  const createLightbox = () => {
    // add all the product info
    const productPrice = window.digitalData.product[0].price.currentPrice;
    const productImage = document.querySelector('.product-image__link');

    const productAmount = document.querySelector('.quality__input').value;
    const sizeChosen = document.querySelector('#js-options-select');

    const productLightbox = new Lightbox(ID, {
      content: `
      <div class="${ID}-lightbox__topContent">
        <div class="${ID}-addedToBag">
          <span>Item successfully added to bag</span>
        </div>
        <div class="${ID}-product_info_wrapper">
          <div class="${ID}-productImage" style="background-image: url(${productImage.href})"></div>
          <div class="${ID}-productInfo">
            <span>${productTitle}</span>
            <p>£${productPrice}</p>
            ${sizeChosen ? `<p>${sizeChosen.options[sizeChosen.selectedIndex].textContent.replace(/(:).(In).(stock)/, '')}</p>` : ''}
            <p>Quantity: ${productAmount}</p>
          </div>
          <div class="${ID}-lightboxCTAs">
            <div class="${ID}-basketButton"><a href="/webstore/showbasket.sdo">Go to basket</a></div>
            <div class="${ID}-continue">Continue Shopping</div>
          </div>
        </div>
      </div>
      <div class="${ID}-bottomContent">
        <h4>Our gurantees</h4>
        <div class="${ID}-bottom_inner"></div>
        <a class="${ID}-view_all" href="#">View all <span></span></a>
      </div>`,
    });
  };

  const triggerLightbox = () => {
    createLightbox();

    events.send('EJ027 V1', 'lightbox shown', { sendOnce: true });

    // lightbox content based on product
    const imageBanner = document.querySelector('.product-image__corner-flag');
    const lightboxTitle = document.querySelector(`.${ID}-bottomContent h4`);

    const offer = document.querySelector('.offer');
    const brand = window.digitalData.product[0].productInfo.brand;
    const viewAllButton = document.querySelector(`.${ID}-view_all`);


    // if the product is save 20% on wedding rings
    if ((offer && offer.textContent.indexOf('full price wedding rings') > -1) || (imageBanner && imageBanner.textContent.indexOf('Buy 2 Save20%') > -1)) {
      lightboxTitle.textContent = 'Buy 2 save 20%';

      // change the text of the view all button
      viewAllButton.style.display = 'block';
      viewAllButton.setAttribute('href', 'https://www.ernestjones.co.uk/webstore/l/ladies-jewellery/select%7Cnational+wedding+event/');
      viewAllButton.querySelector('span').textContent = 'Wedding Rings';
      upsellProducts();

      viewAllButton.addEventListener('click', () => {
        events.send('EJ027 V1', 'clicked view all wedding rings', { sendOnce: true });
      });

    // if the brand is chamilia
    } else if (brand === 'Chamilia') {
      lightboxTitle.textContent = 'Buy One Get One Half Price';

      // change the text of the view all button
      viewAllButton.style.display = 'block';
      viewAllButton.setAttribute('href', 'https://www.ernestjones.co.uk/webstore/l/jewellery-by-chamilia/');
      viewAllButton.querySelector('span').textContent = 'Chamilia Jewellery';

      viewAllButton.addEventListener('click', () => {
        events.send('EJ027 V1', 'clicked view all Chamilia rings', { sendOnce: true });
      });

      upsellProducts();

    // other products
    } else {
      lightboxTitle.textContent = 'Our Guarantees';
      offersUSPS();
    }

    // put content in slick slider
    LightboxSlick();
  };

  const updateCartValue = (addedQty)  => {
    // check the quantity
    [].forEach.call(document.querySelectorAll('header .basket-icon__counter'), (elm) => {
      const curTotal = elm.textContent;
      if (curTotal && (parseInt(curTotal, 10) + parseInt(addedQty, 10)) <= 9 ) {
        elm.textContent = parseInt(curTotal, 10) + parseInt(addedQty, 10);
      } else {
        elm.textContent = '9+';
      }
    });
  };

  // add to basket request, stop redirect
  const addToCartRequest = () => {
    const encoded = jQuery('#basketForm').serialize();
    jQuery.ajax({
      type: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      url: '/webstore/handleBasketActions.sdo',
      data: encoded + '&addToBasket=Buy',
      success: function (data) {
        // update the basket icon value
        const quantity = document.querySelector('.quality .quality__input').value;
        updateCartValue(quantity);

        document.querySelector(`.${ID}-loader-container`).classList.remove(`${ID}-loader_show`);
        // trigger the lightbox
        triggerLightbox();
      },
    });
  };

  const newAddTobag = document.querySelector(`.${ID}-buyButton`);
  newAddTobag.addEventListener('click', () => {

    const selectBox = document.querySelector('#js-options-select');
    // if there is a size dropdown, check value entered
    if (selectBox) {
      const selectVal = document.querySelector('.childSku .childSku__select').selectedIndex;
      if (selectVal === 0) {
        selectBox.classList.add(`${ID}-select_error`);
      } else {
        document.querySelector(`.${ID}-loader-container`).classList.add(`${ID}-loader_show`);
        addToCartRequest();
      }
    } else {
      document.querySelector(`.${ID}-loader-container`).classList.add(`${ID}-loader_show`);
      addToCartRequest();
    }
  });
};
