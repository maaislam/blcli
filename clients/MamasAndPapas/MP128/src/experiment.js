import { setup } from './services';
import basketCarousel from './components/carousel';
import PublishSubscribe from './components/PublishSubscribe';
import miniBasketDelivery from './components/miniBasket';
import { pollerLite } from '../../../../lib/uc-lib';

const activate = () => {
  pollerLite([
    // '#miniCartSlider',
    '#cartItems',
    () => !!window.MP128recommendations,
  ], () => {
    setup();
    /* eslint-disable */
    // Refresh cart on add to bag
    PublishSubscribe.subscribe('did-add-to-bag', () => {
      ACC.minicart.getMiniCart();
      location.reload();
    });

      // get product data from Qubit
      const getProductDataFromQubit = () => {
        /* eslint-enable */
      const d = window.MP128recommendations;
      const productData = [];

      if (d && d.length) {
        d.forEach((prod) => {
          const item = prod.details;
          if (item.stock > 0) {
            productData.push({
              url: item.url,
              before_sale_price: `£${item.unit_sale_price.toFixed(2)}`,
              price: `£${item.unit_price.toFixed(2)}`,
              sku: item.sku_code,
              name: item.name,
              image: item.image_url.replace(/http:https:\/\//i, '//')
                .replace(/https:\/\/media/i, '//')
                .replace(/http:\/\/media/i, '//'),
            });
          }
        });
      }
      return productData;
    };

    const data = getProductDataFromQubit();
    basketCarousel(data);

    // move delivery info
    /* const deliveryBox = document.querySelector('.con-shopping .deliveryinfo');
    const deliveryInfo = document.querySelector('.deliveryinfopanel');
    document.querySelector('#orderTotals').insertAdjacentElement('beforebegin', deliveryBox);
    deliveryBox.insertAdjacentElement('afterend', deliveryInfo); */
  });

  pollerLite([
    '#miniCartSlider',
  ], () => {
    setup();
    miniBasketDelivery();
  });
};

export default activate;
