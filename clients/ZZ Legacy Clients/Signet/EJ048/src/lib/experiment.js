/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import ProductUSPs from './components/usps';
import countdown from './components/countdown';

export default () => {
  setup();
  const { ID } = shared;

  let usps = new ProductUSPs();

  countdown();

 // on change of the size dropdown, change the delivery date
 const sizeSelect = document.querySelector('#js-sku-change');
 if(document.querySelector('.EJ048-deliveryDate')){
 if(sizeSelect) {
   sizeSelect.addEventListener('change', () => {
     const deliveryDate = document.querySelector(`.${ID}-deliveryDate`);
    
     setTimeout(() => {
       const newDate = document.getElementById('js-update-delivery').innerText.trim();
       deliveryDate.textContent = newDate;
     }, 1500);
   });
 }
}
};