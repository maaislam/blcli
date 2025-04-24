/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';

const activate = (function () {
  setup();

  var shippingMethod = document.querySelector('#shipping-method');
  shippingMethod.selectedIndex = 1;

  var form = document.querySelector('#order-review-form');
  document.querySelector('.box.box-order-shipping-method').appendChild(form);
});

export default activate;
