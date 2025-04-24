import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  pollerLite([
    '.applied-coupon',
  ], () => {
    
    const voucherCodes = document.querySelectorAll('.applied-coupon');

    for (let index = 0; index < voucherCodes.length; index++) {
      const element = voucherCodes[index];
  
      if (element.querySelector('.not-applied')){
        element.querySelector('.applied-coupon-msg').style.display = "none";
        //element.querySelector('.applied-coupon-code').style.color = "#bc0031";
        element.querySelector('.not-applied').innerHTML = "Your shopping bag doesn't meet the conditions for this voucher code or you have multiple codes added.";
      }
      
    }

  });


  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  

};
