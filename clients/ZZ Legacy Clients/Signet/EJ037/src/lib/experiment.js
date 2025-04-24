/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';

export default () => {
  setup();

  const IFCtext = document.querySelector('#js-product-ifc .product-ifc__copy');
  const newText = IFCtext.innerHTML.replace('available ', '');
  IFCtext.innerHTML = newText;
};
