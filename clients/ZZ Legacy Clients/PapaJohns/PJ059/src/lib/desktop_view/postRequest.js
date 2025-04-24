import { events } from '../../../../../../lib/utils';
import settings from '../settings';

const desktopResetPwd = {
  init(formData, registeredEmail, basketValue) {
    if (formData.data !== '') {
      const viewStateValue = formData.data['view-state'];
      const viewStateGeneratorValue = formData.data['view-state-generator'];
      const eventValidationValue = formData.data['event-validation'];
      
      const reqData = {
        'ctl00$ScriptManager1': 'ctl00$_objHeader$upLogin|ctl00$_objHeader$lbForgottenPassword',
        'ctl00_ScriptManager1_HiddenField': '',
        'ctl00$_objHeader$_txtEmail': `${registeredEmail}`,
        'ctl00$_objHeader$hdnBasketValue': `${basketValue}`,
        'ctl00$_objHeader$_objOneClickPopup$hdnPaymentMethod': '',
        'ctl00$_objHeader$_objOneClickPopup$hdnSelectedCard': '',
        'ctl00$_objHeader$_objOneClickPopup$hdnVcoCardOnFileId': '',
        'ctl00$_objHeader$_objOneClickPopup$hdnBraintreeOrderId': '',
        'ctl00$_objHeader$_objOneClickPopup$hdnBraintreeNonce': '',
        'ctl00$_objHeader$_objOneClickPopup$hdnBraintreeDeviceData': '',
        '__EVENTTARGET': 'ctl00$_objHeader$lbForgottenPassword',
        '__EVENTARGUMENT': '',
        '__VIEWSTATE': `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`,
        '__VIEWSTATEGENERATOR': `${viewStateGeneratorValue}`,
        '__EVENTVALIDATION': `lFblnC+HwSyRIiBaZWkFHKXWnuYZjx07041bMN5kyTvyc5QV3E31F0dS4EMpZmbhyzq7pfwZXdDB14xbUr2njdnR8CUbrjR4TzEjtK2itTgyQnfi32NPC2Ju2XFs2yV3WKdhtgzcCo1HKGmCeslXWzwWjrr/W+yyBIqP5+i+jGhBIFD8loZ5jCpXxw7giLI01Tw+Z5qAlr3ZkdbdpaiEhtYzukcqdlsZ70/gYGMFMH7RMkA4FiTGs9C5ryxwEzZ+4dqEI9/3spUjW0XzIUOGeMKLx7tqzKlXP49ScB9eIkAkpvzFdumde+KrufmnIb8s8gJZrbvKqNcj4Cd/MBwN2gClG/SwkZux3207Hw0ypVfWq8NovDiCR7zISw9EHn10oOJDGinkrCVDkKfGOjADapY2ppaIUYR0tXbw/vHJ5bs7/EjV7KpAGwU28ZbTyknQKTw7XWg6des4U4U0U+xMhGOO1gvuLeaWqwuv/YwYr1P+3GgqPmrihEdtuCNcH7vVyA4f74h3T9UeJA8/v+fJGT3kiCg=`,
        '__ASYNCPOST': true,
      }

      jQuery.ajax({
        type: 'post',
        url: 'https://www.papajohns.co.uk/',
        data: reqData,
        success: function(data) {
          // Run the code here that needs
          //    to access the data returned
          if (data.indexOf('If you have registered with us a password reset email will be sent to you.') > -1) {
            // Successful POST request, show success message
            document.querySelector('.PJ059-message__success').classList.remove('hidden');
            // setTimeout(function(){ 
            //   // GA Event - Sign In
            //   events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Reset Password Button and redirected to Basket Confirmation page`, { sendOnce: true });
            //   sessionStorage.setItem('PJ059-data', `${registeredEmail}`);
            //   // Redirect to Basket Confirmation page triggering the lightbox
            //   window.location.href = 'https://www.papajohns.co.uk' + window.location.pathname.replace('checkout.aspx', 'basket-confirmation.aspx') + `?pj059`;
            // }, 30000);
          } else {
            // If POST request fails, then show error message
            document.querySelector('.PJ059-message__error').classList.remove('hidden');
          }
          return data;
        },
      });
    }
  }
};

export default desktopResetPwd;