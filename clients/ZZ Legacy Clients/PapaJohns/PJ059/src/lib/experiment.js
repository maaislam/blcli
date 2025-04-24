/**
 * PJ059 - Return User POC - Contact details - Password reset & Sign in
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import settings from './settings';
import formData from './formData';
import desktopResetPwd from './desktop_view/postRequest';
import mobileResetPwd from './mobile_view/postRequest';
import activateSignIn from './basketSignIn';
import addAndAmendElements from './addAndAmendElements';
import login from './loginButton';

const activate = () => {
  setup();
  // Get Device Type
  let device = '';
  if (window.innerWidth <= 500) {
    device = 'mobile';
  } else {
    device = 'desktop';
  }

  if (window.location.pathname.indexOf('/checkout.aspx') > -1 || window.location.pathname.indexOf('/checkout-mobile.aspx') > -1) {
    // Experiment code
    /**
     * @desc Makes a GET request to a category URL and retrieves the venue details
     * @param {String} url URL to retrieve the venue information from
     * @param {Function} callback Function to run when the request was successful
     */
    /*eslint-disable */
    const getFormDetails = (url, callback) => {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const temp = document.createElement('html');
          temp.innerHTML = request.responseText;
          const viewState = temp.querySelector('#__VIEWSTATE').value;
          const viewStateGenerator = temp.querySelector('#__VIEWSTATEGENERATOR').value;
          const eventValidation = temp.querySelector('#__EVENTVALIDATION').value;

          const formDetails = {
            'view-state': viewState,
            'view-state-generator': viewStateGenerator,
            'event-validation': eventValidation,
          };
          callback(formDetails);
        }
      };
      request.send();
    };


    // Call 
    getFormDetails(`https://www.papajohns.co.uk/`, (formDetails) => {
      formData.data = formDetails;
    });
    /**
     * @desc Desktop View
     */
    if (device === 'desktop') {
      const continueBtn = document.querySelector('#ctl00_cphBody_lbPaymentDetails');
      if (continueBtn) {
        //////////
        continueBtn.addEventListener('click', () => {
          pollerLite(['#ctl00_cphBody_divErrorStage1.errorMessage'], () => {
            // GA Event - Registered User
            events.send(settings.ID, `Variation ${settings.VARIATION}`, `Error message triggered by user inputting a registered email and clicking continue`, { sendOnce: true });
            const errorMessage = document.querySelector('#ctl00_cphBody_divErrorStage1.errorMessage').innerText;
    
            if (errorMessage === "This email address is already registered with Papa John's, please login") {
              const emailInput = document.querySelector('.orderInfo.contactDetailsCont.extraFieldsCont .addressAddCont .addressAddBox #ctl00_cphBody_txtGuestEmail');
              if (emailInput) {
                const registeredEmail = addAndAmendElements(emailInput, device);

                // Get Basket Value
                const basketTotalContainer = document.querySelector('.orderInfo.productSummary .totalAmount');
                let basketValue = '';
                if (basketTotalContainer) {
                  basketValue = basketTotalContainer.innerText.trim().replace('Total £', '');
                }
                // Reset Password Event Listener
                // POST Request
                const resetPwdBtn = document.querySelector('.PJ059-buttons__wrapper #PJ059-resetPassword');
                if (resetPwdBtn) {
                  resetPwdBtn.addEventListener('click', () => {
                    if (device === 'desktop') {
                      // GA Event - Resert Password
                      events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Reset Password Button`, { sendOnce: true });
                      desktopResetPwd.init(formData, registeredEmail, basketValue);
                    } 
                  });
                }

                // Sign In Event Listener
                // Desktop
                login.init(registeredEmail, device);
              }
            } else {
              setTimeout(function(){ 
                const otherErrorMessage = document.querySelector('#ctl00_cphBody_divErrorStage1');
                otherErrorMessage.parentNode.removeChild(otherErrorMessage);
              }, 4000);
            }
          });
        });
        /////////

        // -------------------------------------------
        // PRM Manager Listen for State Changes
        // -------------------------------------------
        window.prm.add_endRequest(function (sender, error) {
          try {
            // console.log(sender);
            if ((sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$lbPaymentDetails" || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$rdGuestAsap" || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$rdGuestAnotherTime" || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$drpGuestHour" || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$drpGuestMin" || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$drpGuestAddresses" || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$drpAddresses") && !document.querySelector('.PJ059-buttons__wrapper #PJ059-resetPassword')) {
              activate();
            }
          } catch (e) {} 
        });
      }
    /**
     * @desc Mobile View
     */
    } else if (device === 'mobile') {
      // Get Basket Value
      const basketTotalContainer = document.querySelectorAll('#ctl00_cphBody_divStep1 tr.total td')[1];
      let basketValue = '';
      if (basketTotalContainer) {
        basketValue = basketTotalContainer.innerText.trim().replace('Total £', '');
        sessionStorage.setItem('PJ059-value_mobile', `${basketValue}`);
      }
      
      pollerLite(['#ctl00_cphBody_divGuestFormAndAddresses'], () => {
        const continueBtn = document.querySelector('#ctl00_cphBody_lbContinueToPayment');
        if (continueBtn) {
          continueBtn.addEventListener('click', () => {
            pollerLite(['#ctl00_cphBody_divErrorStep2.errorMessage p'], () => {
              // GA Event - Registered User
              events.send(settings.ID, `Variation ${settings.VARIATION}`, `Error message triggered by user inputting a registered email and clicking continue`, { sendOnce: true });
              const errorMessage = document.querySelector('#ctl00_cphBody_divErrorStep2.errorMessage p').innerText;
      
              if (errorMessage === "This email address is already registered with Papa John's, please login") {
                const emailInput = document.querySelector('#ctl00_cphBody_divGuestFormAndAddresses #ctl00_cphBody_txtGuestEmail');
                if (emailInput) {
                  const registeredEmail = addAndAmendElements(emailInput, device);
  
                  // Reset Password Event Listener
                  // POST Request
                  const resetPwdBtn = document.querySelector('.PJ059-buttons__wrapper #PJ059-resetPassword');
                  if (resetPwdBtn) {
                    resetPwdBtn.addEventListener('click', () => {
                      // GA Event - Reset Password
                      events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Reset Password Button`, { sendOnce: true });
                      mobileResetPwd.init(formData, registeredEmail, basketValue);
                    });
                  }
  
                  // Sign In Event Listener
                  // Mobile
                  login.init(registeredEmail, device);
                }
              }
            });

            /**
             * @desc If user clicks Continue again when the error message is already visible
             */
            if (document.querySelector('#ctl00_cphBody_divErrorStep2.errorMessage p')) {
              // GA Event - Registered User
              events.send(settings.ID, `Variation ${settings.VARIATION}`, `Error message triggered by user inputting a registered email and clicking continue`, { sendOnce: true });
              const errorMessage = document.querySelector('#ctl00_cphBody_divErrorStep2.errorMessage p').innerText;
      
              if (errorMessage === "This email address is already registered with Papa John's, please login") {
                const emailInput = document.querySelector('#ctl00_cphBody_divGuestFormAndAddresses #ctl00_cphBody_txtGuestEmail');
                if (emailInput) {
                  setTimeout(function(){
                    const newEmailInput = document.querySelector('#ctl00_cphBody_divGuestFormAndAddresses #ctl00_cphBody_txtGuestEmail');
                    const registeredEmail = addAndAmendElements(newEmailInput, device);

                    // Reset Password Event Listener
                    // POST Request
                    const resetPwdBtn = document.querySelector('.PJ059-buttons__wrapper #PJ059-resetPassword');
                    if (resetPwdBtn) {
                      resetPwdBtn.addEventListener('click', () => {
                        // GA Event - Reset Password
                        events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Reset Password Button`, { sendOnce: true });
                        mobileResetPwd.init(formData, registeredEmail, basketValue);
                      });
                    }
    
                    // Sign In Event Listener
                    // Mobile
                    login.init(registeredEmail, device);
                  }, 1000);
                ////////////////////////////
                }
              }
            }
          });
        }
      });

      ////////////
      // -------------------------------------------
      // PRM Manager Listen for State Changes
      // -------------------------------------------
      window.prm.add_endRequest(function (sender, error) {
        try {
          // console.log(sender);
          if ((sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$lbPaymentDetails" || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$rdGuestAsap" || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$rdGuestAnotherTime" || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$drpGuestHour" || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$drpGuestMin" || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$drpGuestAddresses" || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$drpAddresses"  || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$lbContinueToPayment") && !document.querySelector('.PJ059-buttons__wrapper #PJ059-resetPassword')) {
            activate();
          }
        } catch (e) {} 
      });
    }
  } else if (window.location.pathname.indexOf('/basket-confirmation.aspx') > -1 && window.location.href.indexOf('pj059') > -1) {
    // Open Lightbox by default
    if (device === 'desktop') {
      activateSignIn.init('ctl00_cphBody_lbProceed', '.fancySignIn input#ctl00_cphBody_txtEmailPopup');
    } else if (device === 'mobile') {
      activateSignIn.init('ctl00_cphBody_lbProceedMobile', '#fancyProfileSignIn input#ctl00__objHeader_txtEmail1Mobile');
    }  
  }
};

export default activate;
