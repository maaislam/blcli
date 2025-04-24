import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => !!window.dataLayer,
  () => {
      const currentBasketValueInput = document.querySelector('#hdnBasketValue');
      if(!currentBasketValueInput) {
        return false;
      }

      // We have some issues with 
      const currentBasketValue = currentBasketValueInput.value;
      if(currentBasketValue && currentBasketValue != '0.00' && parseFloat(currentBasketValue) > 0 ) {
        return true;
      }
  },
], activate, {
    multiplier: 1
});
