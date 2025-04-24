/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
() => {
    const getPageType = () => {
        let pageType;
    
        if(document.querySelector('#estore_category_heading') && document.querySelector('.product_listing_container')){
          pageType = 'PLP';
        }
        
        if(document.querySelector('#estore_productpage_template_container')){
          pageType = 'PDP';
        }
    
        if(window.location.href.indexOf('/OrderItemDisplay') > -1){
          pageType = 'basket';
        }
    
        if(window.location.href.indexOf('CheckoutOrderConfirmation') > -1){
          pageType = 'checkout';
        }
    
        return pageType;
    }

    if(getPageType() === 'PDP' || getPageType() === 'PLP' || getPageType() === 'basket' || getPageType() === 'checkout') {
        return true;
    }
}
], activate);
