import { headerRebuild, deliveryMethods, paymentOptions, confirmationPage } from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const pollForTests = () => {
  // Header poller
  const pathName = window.location.pathname;
  // Header renders throughout the guest checkout
  pollerLite([
    '#BodyWrap > header', // Header - insert markup
  ], headerRebuild);
  // Delivery options poller
  if (pathName.indexOf('/checkout/deliverychoices') > -1) {
    pollerLite([
      'body.FL032', // When header renders, class is added, then load this content
      '.CheckoutLeft > .OrderSumm', // Order summary where content is moved to
      '.innerDelWrap > .CurrentAddressText', // Current address
      '.innerDelWrap > .DifferentAddressLinkWrapper', // Edit address link container
      '#DifferentAddressLink', // Edit address link text
      '#CurrentAddress', // Insert mobile Header
      '#dnn_ctr102498_Delivery_btnContinue', // Continue button Desktop
      '#dnn_ctr102498_Delivery_DeliveryGroupSelection_btnContinue', // Continue button mobile
      '.DeliveryOptionsItem_STD .DeliveryOptionName', // Standard delivery text
      '#HomeDeliveryWrapper', // used for initial render
      '.deliveryGroupTypeLi', // For toggling test display
      '.AddressContainBut > input',
      // Get delivery prices
      '#DeliveryOptionsList > li', // Ancestor element for price
      '#DeliveryOptionsList > li .DeliveryOptionRadio', // Contains price
      '#DeliveryOptionsList > li .RadioBut', // Render location for price - Desktop/Tablet
      '#DeliveryOptionsList > li .DeliveryNaming', // Render Location - Mobile
    ], deliveryMethods);
    // Payment options page, using regex match to target multiple stages of payment
  }
  // If test activation is allowed then render delivery specific content
  if (sessionStorage.getItem('FL032_Activate')) {
    if (pathName.match(/(\/checkout\/usegiftcard|carddetails|usevoucher|payment)/g) && sessionStorage.getItem('FL032_Data')) {
      pollerLite([
        'body.FL032', // When header renders, class is added, then load this content
        '.CheckoutLeft > .OrderSumm', // Order summary where content is moved to
        '#ShippingLabel', // Change address link for mobile rendered here, and mobile delivery choice
      ], paymentOptions);
      // Poller for confirmation page
    } else if (pathName.indexOf('/checkout/confirmandpay') > -1) {
      pollerLite([
        'body.FL032', // When header renders, class is added, then load this content
        '.DelPayGroup .col-sm-6:nth-child(2) .InnerConfirm.FirstConfirm', // Billing address
        '.DelPayGroup .col-sm-6:nth-child(1) .InnerConfirm.FirstConfirm', // Delivery Address
        '.DelPayGroup .col-sm-6:nth-child(1) .InnerConfirm:last-child', // Delivery Option
        '.CheckoutLeft > .OrderSumm', // Order summary where content is moved to
        // Check for isMobile in datalayer
        () => {
          let checkMobile = false;
          const mobileCheck = window.dataLayer[1];
          if (mobileCheck) {
            checkMobile = true;
          }
          return checkMobile;
        },
      ], confirmationPage);
    }
  }
};
// Check visitor state, if anonymous then poll for elements
pollerLite([
  '.currency-gbp', // Make sure currency ig GBP
  // Poll for dataLayer
  () => {
    let checkDataLayer = false;
    // Next line exceeds length
    // eslint-disable-next-line
    const datalayerCheck = window.dataLayer && window.dataLayer[1] && window.dataLayer[1].visitorLoginState && window.dataLayer[1].visitorLoginState.toUpperCase();

    if (datalayerCheck === 'ANONYMOUS') {
      checkDataLayer = true;
    }
    return checkDataLayer;
  },
], pollForTests);

