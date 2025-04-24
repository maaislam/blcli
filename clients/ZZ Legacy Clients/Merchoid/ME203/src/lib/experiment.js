/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { confirmMessage } from './components/confirmationMessage';
import productListing from './components/productListing';
import deliveryInfo from './components/deliveryInfo';
import { pollerLite } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();

  if (document.querySelector('.woocommerce-message.message-success')) {
    confirmMessage();
  }
  productListing();
  deliveryInfo();

  // cart update fix

  document.querySelector('.entry-content > .woocommerce').addEventListener('click', (e) => {
    if (e.target.classList.contains('update_cart')) {
      pollerLite(['.woocommerce form.processing'], () => {
        pollerLite([() => {
          return !document.querySelector('.woocommerce form.processing');
        }], () => {
          if (!document.querySelector('.ME203-stock_message')) {
            if (!document.querySelector('.woocommerce-message.message-success')) {
              confirmMessage();
            }
            productListing();
            deliveryInfo();
          }
        });
      });
    }
  });
};

export default activate;
