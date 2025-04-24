/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { config, matchWelcome, matchNHS } from './config';
import { pollerLite, events } from '../../../../../lib/utils';

export default () => {
  setup();

  let input = null;
  let submit = null;
  let form = null;


  
  const loginStatus = () => window.dataLayer[0].customer.isLoggedIn;

  const findTerm = (string, term) => {
    
    if (string.includes(term.toLowerCase())){
    
      return true;
    } else {
      return false;
    }
  };

  const findReg = (reg, term) => {
    if (term.match(reg)) {

    }
  }



  const matchedTerm = (term) => {
    if (!term) return;
    let str = '';
    let lowTerm = term.toLowerCase();
    
    if (lowTerm.indexOf('welcome10') > -1) {
    
      if (!loginStatus()) { 
        str = 'welcome';
      } else {
        if (lowTerm == 'welcome10') {
          str = null;
        }
      }
      return str;
    } else if (lowTerm.indexOf('untap') > -1) {
      str = 'untap';
      return str;
    } else if (lowTerm.indexOf('punk') > -1) {
      str = 'punk';
      return str;
    } else if (lowTerm.indexOf('nhs') > -1 || lowTerm.indexOf('drivethru') > -1 || lowTerm.indexOf('collect') > -1) {
      if (matchNHS(term)) {
        str = 'nhs';
        return str;
      }
    } else if (lowTerm.indexOf('wel') > -1 && lowTerm.indexOf('welcome10') === -1) {
      if (matchWelcome(term)) {
        str = 'welTypo';
        return str;
      }
    } else if (lowTerm.match(/\s/g)) {
      str = 'space';
      return str;
    } else if (lowTerm.length === 12 && !loginStatus()) {
      str = 'x';
      return str;
    } else {
      str = 'typoTwo';
      return str;
    }
    
  }


  const checkInput = (input) => {
    let thisVal = input.value;

    return matchedTerm(thisVal);
  }

  const basketRun = (e) => {
    let term = checkInput(input);
      
      e.preventDefault(); 
      e.stopPropagation(); 
      
      let el = document.querySelector('.BD003-error');
      if (el) {
        el.parentNode.removeChild(el);
      }

      if (term) {
        const string = config[term];
      
        if (string) {

          if (document.querySelector('.BD003-error')) {
            let el = document.querySelector('.BD003-error');
            if (el) {
              el.parentNode.removeChild(el);
            }
          }

          form[0].insertAdjacentHTML('afterend', `
            <div class="BD003-error">
              <div class="BD003-error--wrap">
                <p>${string}</p>
              </div>
            </div>
          `);

          events.send(ID, `${ID} Added`, `${ID} Discount error shown`);

          setTimeout(() => {
            let el = document.querySelector('.BD003-error');
            if (el) {
              el.parentNode.removeChild(el);
            }
          }, 8000);
        }
      } else {
        form.submit();
      }
  }
  // Poll for basket
  pollerLite(['input#coupon_code', 'form#discount-coupon-form button.action.apply'], () => {
    input = document.querySelector('input#coupon_code');
    submit = jQuery('form#discount-coupon-form button.action.apply');
    form = jQuery('form#discount-coupon-form');

    
    submit.off('click');
    submit.on('click', function(e) { 
      basketRun(e);
    });

    // input.addEventListener('keydown', (e) => {
    //   console.log('press!');
    //   if(e.keyCode === 13){
    //     basketRun(e);
    //   }
    // })
    
  });

  const checkoutRun = (e) => {
    e.preventDefault(); 
      e.stopPropagation(); 
      let term = checkInput(input);
      
      let el = document.querySelector('.BD003-error');
      if (el) {
        el.parentNode.removeChild(el);
      }

      if (term) {
        const string = config[term];
        
        if (string) {

          if (document.querySelector('.BD003-error')) {
            let el = document.querySelector('.BD003-error');
            if (el) {
              el.parentNode.removeChild(el);
            }
          }

          form.insertAdjacentHTML('afterend', `
            <div class="BD003-error">
              <div class="BD003-error--wrap">
                <p>${string}</p>
              </div>
            </div>
          `);

          events.send(ID, `${ID} Added`, `${ID} Discount error shown`);
          
          setTimeout(() => {
            let el = document.querySelector('.BD003-error');
            if (el) {
              // el.parentNode.removeChild(el);
            }
          }, 8000);
        }
      } else {
        form.submit();
      }
  }
  // Checkout
  pollerLite(['input#discount-code', 'form#discount-form button.action-apply'], () => {
    input = document.querySelector('input#discount-code');
    submit = jQuery('form#discount-form button.action-apply');
    form = document.querySelector('form#discount-form');

    submit.off('click');
    submit.on('click', function(e) { 
      checkoutRun(e);
    });

    // input.addEventListener('keydown', (e) => {
    //   if(e.keyCode === 13){
    //     checkoutRun(e);
    //   }
    // })
  });

  

  // var btn = jQuery('[data-action="applypromocode"]')
  
  // setTimeout(function() {
  //   // Call this function to actually make it do the submit
  //   // Timeout just for testing purposes
    
  // }, 8000);

  // submit.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   checkInput();
  // });
};
