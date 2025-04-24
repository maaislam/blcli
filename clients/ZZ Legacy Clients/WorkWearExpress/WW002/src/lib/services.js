import {
  fullStory
} from '../../../../../lib/utils';
import settings from './settings';
import {
  pollerLite
} from '../../../../../lib/uc-lib';

const {
  ID,
  VARIATION
} = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function ieArrayPolyfill() {
  // Production steps of ECMA-262, Edition 6, 22.1.2.1
  if (!Array.from) {
    Array.from = (function () {
      var toStr = Object.prototype.toString;
      var isCallable = function (fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };
      var toInteger = function (value) {
        var number = Number(value);
        if (isNaN(number)) {
          return 0;
        }
        if (number === 0 || !isFinite(number)) {
          return number;
        }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var toLength = function (value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      };

      // The length property of the from method is 1.
      return function from(arrayLike /*, mapFn, thisArg */ ) {
        // 1. Let C be the this value.
        var C = this;

        // 2. Let items be ToObject(arrayLike).
        var items = Object(arrayLike);

        // 3. ReturnIfAbrupt(items).
        if (arrayLike == null) {
          throw new TypeError('Array.from requires an array-like object - not null or undefined');
        }

        // 4. If mapfn is undefined, then let mapping be false.
        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;
        if (typeof mapFn !== 'undefined') {
          // 5. else
          // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          }

          // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
          if (arguments.length > 2) {
            T = arguments[2];
          }
        }

        // 10. Let lenValue be Get(items, "length").
        // 11. Let len be ToLength(lenValue).
        var len = toLength(items.length);

        // 13. If IsConstructor(C) is true, then
        // 13. a. Let A be the result of calling the [[Construct]] internal method 
        // of C with an argument list containing the single item len.
        // 14. a. Else, Let A be ArrayCreate(len).
        var A = isCallable(C) ? Object(new C(len)) : new Array(len);

        // 16. Let k be 0.
        var k = 0;
        // 17. Repeat, while k < len… (also steps a - h)
        var kValue;
        while (k < len) {
          kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
          k += 1;
        }
        // 18. Let putStatus be Put(A, "length", len, true).
        A.length = len;
        // 20. Return A.
        return A;
      };
    }());
  }
}

function addListeners(el, data) {
  const fields = el.querySelectorAll('table tr td:nth-child(3) input');
  const triggers = el.querySelectorAll('table tr td:nth-child(4) button');
  Array.from(fields).forEach((field) => {
    if (!field.getAttribute('data-listener')) {
      field.addEventListener('blur', () => {
        if (window.dataLayer[0].page.template === 'standard') {
          setTimeout(() => {
            let content;
            if (document.querySelector('#bundle-content .bundle_product h2 span')) {
              content = document.querySelector('#bundle-content .bundle_product h2 span').textContent;
            }
            const reg = /(\d+) \/ (\d+)\)/g;
            const match = reg.exec(content);
            const diff = parseInt(match[2]) - parseInt(match[1]);
            if (document.querySelector(`.${ID}_selectSize__title strong`)) {
              document.querySelector(`.${ID}_selectSize__title strong`).textContent = `${diff < 0 ? '0' : diff} products`;
            }
          }, 35);
        }
      });
      field.setAttribute('data-listener', 'true');
    }
  });
  Array.from(triggers).forEach((trigger) => {
    if (!trigger.getAttribute('data-listener')) {
      trigger.addEventListener('click', () => {
        refreshListeners();
      });
      trigger.setAttribute('data-listener', 'true');
    }
  });
}

function refreshListeners() {
  addListeners();
}

function updateBundle() {
  const triggers = document.querySelectorAll('.bundle_table .qty_grid');
  Array.from(triggers).forEach((trigger) => {
    trigger.addEventListener('keyup', () => {
      setTimeout(() => {
        const content = document.querySelector('#bundle-content .bundle_product h2 span').textContent;
        const reg = /(\d+) \/ (\d+)\)/g;
        const match = reg.exec(content);
        const diff = parseInt(match[2]) - parseInt(match[1]);
        document.querySelector(`.${ID}_selectSize__title strong`).textContent = `${diff < 0 ? '0' : diff} products`;
      }, 35);
    })
  });
}

function fakeButton() {
  const fakeButton = document.createElement('div');
  fakeButton.classList.add(`${ID}_fakeButtonWrap`);
  fakeButton.innerHTML = `
    <div class="${ID}_fakeButton">
      ADD TO BASKET<br><span>(customise at checkout)</span>
    </div>
  `;
  if (document.querySelector('#addtobasketbutton')) {
    const button = document.querySelector('#addtobasketbutton');
    button.style.display = 'none';
    button.insertAdjacentElement('beforebegin', fakeButton);
  }
}

function unlockcartButton() {
  const dataValidation = {
    sizeSelected: false,
    costSelected: false,
    styleSelected: false,
  }
  const layoutType = window.dataLayer[0].page.template;
  switch (layoutType) {
    case 'standard':
      pollerLite([
        'body',
        '#step1',
      ], () => {
        const links = document.querySelectorAll('#step1 a');
        Array.from(links).forEach((linkItem) => {
          linkItem.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
              jQuery('html, body').animate({
                scrollTop: jQuery('#step2').offset().top
              }, 1000);
            }
          });
        });
      });
      if(document.querySelector('#step2')){
        const bundles = document.querySelectorAll('#step2 .bundle');
        Array.from(bundles).forEach((bundle) => {
          bundle.addEventListener('click', () => {
            const jq = window["j".trim() + "Query"];
            jq(document).ajaxSuccess(() => {
              fakeButton();
              const standardEl = document.querySelector('.bundle_product_right');
              const standardTriggers = standardEl.querySelectorAll('table tbody .qty_grid');
              if (window.innerWidth <= 768) {
                addListeners(standardEl, dataValidation);
                // activate the customisation-selected switch
                standardEl.querySelector('.item_customisation #customisation_location').addEventListener('change', () => {
                  const location = standardEl.querySelector('.item_customisation #customisation_location');
                  const locationVal = location.options[location.selectedIndex].value;
                  if(locationVal === 'none' || locationVal === null || locationVal === undefined || locationVal === ''){
                    dataValidation.styleSelected = true;
                    dataValidation.costSelected = true;
                    document.querySelector('#addtobasketbutton').removeAttribute('disabled');
                  } else{
                    dataValidation.costSelected = true;
                  }
                });
                // activate the logo-style-selected switch
                const logoStyles = document.querySelectorAll('#application_style .application');
                Array.from(logoStyles).forEach((logoStyle) => {
                  logoStyle.querySelector('input').addEventListener('click', () => {
                    dataValidation.styleSelected = true;
                  });
                });
              } else {
                // activate the size-selected switch
                Array.from(standardTriggers).forEach((trigger) => {
                  trigger.addEventListener('keydown', () => {
                    if (standardEl.classList.contains('isRequired')) {
                      standardEl.classList.remove('isRequired');
                    }
                    dataValidation.sizeSelected = true;
                  });
                });
                // activate the customisation-selected switch
                standardEl.querySelector('.item_customisation #customisation_location').addEventListener('change', () => {
                  const location = standardEl.querySelector('.item_customisation #customisation_location');
                  const locationVal = location.options[location.selectedIndex].value;
                  if(locationVal === 'none' || locationVal === null || locationVal === undefined || locationVal === ''){
                    dataValidation.styleSelected = true;
                    dataValidation.costSelected = true;
                    document.querySelector('#addtobasketbutton').removeAttribute('disabled');
                  } else{
                    dataValidation.costSelected = true;
                  }
                });
                // activate the logo-style-selected switch
                const logoStyles = document.querySelectorAll('#application_style .application');
                Array.from(logoStyles).forEach((logoStyle) => {
                  logoStyle.querySelector('input').addEventListener('click', () => {
                    dataValidation.styleSelected = true;
                  });
                });
              }
              // starts all the validation
              document.querySelector(`.${ID}_fakeButton`).addEventListener('click', (e) => {
                Object.keys(dataValidation).forEach(function (key) {
                  switch (key) {
                    case 'sizeSelected':
                      if (dataValidation[key] === false) {
                        const selectSizeBlock = document.createElement('div');
                        selectSizeBlock.classList.add(`${ID}_selectSizeWrap`);
                        selectSizeBlock.innerHTML = `
                      <div class="${ID}_selectSize">
                        <p class="${ID}_selectSize__title">
                          Please select your size below.<br>You have <strong></strong> to choose for this bundle.
                        </p>
                        <span class="${ID}_selectSize__info">Can't find your size? Call us on 0808 231 2506 for additional sizes.</span>
                        <a class="${ID}_selectSize__link" href="https://www.workwearexpress.com/files/size-guides/461.pdf" target="_blank">View size guide</a>
                      </div>
                    `;
                        if (!document.querySelector(`.${ID}_selectSizeWrap`)) {
                          if (window.innerWidth <= 768) {
                            document.querySelector('.bundle_product_right .mobile_grid').insertAdjacentElement('beforebegin', selectSizeBlock);
                            const content = document.querySelector('#bundle-content .bundle_product h2 span').textContent;
                            const reg = /(\d+) \/ (\d+)\)/g;
                            const match = reg.exec(content);
                            if(match){
                              if(document.querySelector(`.${ID}_selectSize__title strong`)){
                                document.querySelector(`.${ID}_selectSize__title strong`).textContent = `${match[2]} products`;
                              }
                            }
                          } else {
                            document.querySelector('#bundle-content .bundle_product').insertAdjacentElement('beforebegin', selectSizeBlock);
                            if(document.querySelector(`.${ID}_selectSize__title strong`)){
                              
                            }
                            const content = document.querySelector('#bundle-content .bundle_product h2 span').textContent;
                            const reg = /(\d+) \/ (\d+)\)/g;
                            const match = reg.exec(content);
                            if(match){
                              if(document.querySelector(`.${ID}_selectSize__title strong`)){
                                document.querySelector(`.${ID}_selectSize__title strong`).textContent = `${match[2]} products`;
                              }
                            }
                            const triggers = document.querySelectorAll('.bundle_table .qty_grid');
                            Array.from(triggers).forEach((trigger) => {
                              trigger.addEventListener('blur', () => {
                                setTimeout(() => {
                                  const content = document.querySelector('#bundle-content .bundle_product h2 span').textContent;
                                  const reg = /(\d+) \/ (\d+)\)/g;
                                  const match = reg.exec(content);
                                  const diff = parseInt(match[2]) - parseInt(match[1]);
                                  document.querySelector(`.${ID}_selectSize__title strong`).textContent = `${diff < 0 ? '0' : diff} products`;
                                }, 35);
                              });
                            });
                            jQuery('html, body').animate({
                              scrollTop: jQuery('#site_torso').offset().top
                            }, 1000);
                          }
                        } else {
                          if(window.innerWidth <= 768){
                            jQuery('html, body').animate({
                              scrollTop: jQuery('.bundle_product_left').offset().top
                            }, 1000);
                          } else{
                            jQuery('html, body').animate({
                              scrollTop: jQuery('#site_torso').offset().top
                            }, 1000);
                          }
                        }
                      } else {
                        const isOK = document.querySelector('#checklist tbody tr').classList;
                        if(!isOK.contains('notok')){
                          if(document.querySelector(`.${ID}_selectSizeWrap`)){
                            document.querySelector(`.${ID}_selectSizeWrap`).remove();
                          }
                          e.target.setAttribute('data-size', true);
                        }
                      }
                      break;
                    case 'costSelected':
                      if (dataValidation[key] === false) {
                        const optionText = document.createElement('div');
                        optionText.classList.add(`${ID}_option-text`);
                        optionText.textContent = 'Please choose an option below to continue';
                        if (!document.querySelector(`.${ID}_option-text`)) {
                          document.querySelector('.bundle_product_inner .item_customisation').classList.add('bordered');
                          document.querySelector('.bundle_product_inner .item_customisation .customisation_select').insertAdjacentElement('beforebegin', optionText);
                        }
                      } else {
                        if (document.querySelector(`.${ID}_option-text`)) {
                          document.querySelector(`.${ID}_option-text`).remove();
                          document.querySelector('.bundle_product_inner .item_customisation').classList.remove('bordered');
                        }
                        e.target.setAttribute('data-cost', true);
                      }
                      break;
                    case 'styleSelected':
                      if (dataValidation[key] === false) {
                        const logoBlock = document.createElement('div');
                        logoBlock.classList.add(`${ID}_logoblockWrap`);
                        logoBlock.innerHTML = `
                          <div class="${ID}_message">
                            <div class="${ID}_message__title">Please apply your <strong>FREE LOGO</strong> to continue</div>
                            <div class="${ID}_message__content">
                              Don't have your logo to hand? Select "Please contact me for my logo", and send it later!
                            </div>
                          </div>
                        `;
                        if(!document.querySelector(`.${ID}_selectSizeWrap`)){
                          jQuery('html, body').animate({
                            scrollTop: jQuery('.customisation_header').offset().top
                          }, 1000);
                        }
                        if (!document.querySelector(`.${ID}_logoblockWrap`) && document.querySelector('.customisation_header h2')) {
                          document.querySelector('.customisation_header h2').insertAdjacentElement('afterend', logoBlock);
                        }
                        if (window.innerWidth <= 768) {
                          const applications = document.querySelectorAll('#application_style .application');
                          Array.from(applications).forEach((application) => {
                            application.addEventListener('click', () => {
                              const applicationType = application.querySelector('input').value;
                              switch(applicationType){
                                case 'embroidered_logo':
                                document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'em-logo');
                                break;
                                case 'embroidered_text':
                                document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'em-text');
                                break;
                                case 'printed_logo':
                                document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'pr-logo');
                                break;
                                case 'printed_text':
                                document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'pr-text');
                                break;
                                default:
                                break;
                              }
                            });
                          });
                        } else {
                          const applications = document.querySelectorAll('#application_style .application');
                          Array.from(applications).forEach((application) => {
                            application.querySelector('input').addEventListener('click', (e) => {
                              const applicationType = e.target.value;
                              switch(applicationType){
                                case 'embroidered_logo':
                                document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'em-logo');
                                break;
                                case 'embroidered_text':
                                document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'em-text');
                                break;
                                case 'printed_logo':
                                document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'pr-logo');
                                break;
                                case 'printed_text':
                                document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'pr-text');
                                break;
                                default:
                                break;
                              }
                            });
                          });
                        }
                      } else {
                        const activeAppl = document.querySelector(`.${ID}_fakeButton`).getAttribute('data-app');
                        const logo = document.querySelector('.logo_upload');
                        const customText = document.querySelector('#text_entry');
                        let logoSelected;
                        switch(activeAppl){
                          case 'em-logo':
                          logoSelected = document.querySelector('#logo_uploadz').value;
                          if(logoSelected === '' && !document.querySelector('.logo_contact input').checked){
                            if(!logo.getAttribute('error')){
                              const message = document.createElement('strong');
                              message.setAttribute('style', 'color:red; display:block;');
                              message.innerHTML = 'Please select a logo. Don\'t have your logo to hand? Select <em>"Please contact me for my logo"</em>, and send it later!';
                              logo.setAttribute('style', 'border: 2px solid red; padding: 10px; box-sizing: border-box;');
                              logo.querySelector('#logo_uploadz').insertAdjacentElement('beforebegin', message);
                              logo.setAttribute('error', true);
                              if(!document.querySelector(`.${ID}_selectSizeWrap`)){
                                jQuery('html, body').animate({
                                  scrollTop: jQuery('#logo_upload').offset().top
                                }, 1000);
                              }
                            }
                          } else {
                            if(document.querySelector(`.${ID}_logoblockWrap`)){
                              document.querySelector(`.${ID}_logoblockWrap`).remove();
                            }
                            logo.setAttribute('style', '');
                            if(logo.querySelector('strong')){
                              logo.querySelector('strong').remove();
                            }
                            e.target.setAttribute('data-logo', true);
                          }
                          break;
                          case 'em-text':
                            const textVal = customText.querySelector('label #text').value;
                            if(textVal === ''){
                              if(!customText.getAttribute('error')){
                                const message = document.createElement('strong');
                                message.setAttribute('style', 'color:red; margin:0px 10px;');
                                message.innerHTML = 'Please enter your text below and choose which font and colour you prefer.';
                                customText.setAttribute('style', 'border: 2px solid red; padding: 10px; box-sizing: border-box;');
                                customText.querySelector('h2').insertAdjacentElement('afterend', message);
                                customText.setAttribute('error', true);
                                if(!document.querySelector(`.${ID}_selectSizeWrap`)){
                                  jQuery('html, body').animate({
                                    scrollTop: jQuery('#text_entry').offset().top
                                  }, 1000);
                                }
                              }
                            } else {
                              if(document.querySelector(`.${ID}_logoblockWrap`)){
                                document.querySelector(`.${ID}_logoblockWrap`).remove();
                              }
                              customText.setAttribute('style', '');
                              if(customText.querySelector('strong')){
                                customText.querySelector('strong').remove();
                              }
                              e.target.setAttribute('data-logo', true);
                            }
                          break;
                          case 'pr-logo':
                          logoSelected = document.querySelector('#logo_uploadz').value;
                          if(logoSelected === '' && !document.querySelector('.logo_contact input').checked){
                            if(!logo.getAttribute('error')){
                              const message = document.createElement('strong');
                              message.setAttribute('style', 'color:red; display:block;');
                              message.innerHTML = 'Please select a logo. Don\'t have your logo to hand? Select <em>"Please contact me for my logo"</em>, and send it later!';
                              logo.setAttribute('style', 'border: 2px solid red; padding: 10px; box-sizing: border-box;');
                              logo.querySelector('#logo_uploadz').insertAdjacentElement('beforebegin', message);
                              logo.setAttribute('error', true);
                              if(!document.querySelector(`.${ID}_selectSizeWrap`)){
                                jQuery('html, body').animate({
                                  scrollTop: jQuery('#logo_upload').offset().top
                                }, 1000);
                              }
                            }
                          } else {
                            if(document.querySelector(`.${ID}_logoblockWrap`)){
                              document.querySelector(`.${ID}_logoblockWrap`).remove();
                            }
                            logo.setAttribute('style', '');
                            if(logo.querySelector('strong')){
                              logo.querySelector('strong').remove();
                            }
                            e.target.setAttribute('data-logo', true);
                          }
                          break;
                          case 'pr-text':
                          const prtextVal = customText.querySelector('label #text').value;
                          if(prtextVal === ''){
                            if(!customText.getAttribute('error')){
                              const message = document.createElement('strong');
                              message.setAttribute('style', 'color:red; margin:0px 10px;');
                              message.innerHTML = 'Please enter your text below and choose which font and colour you prefer.';
                              customText.setAttribute('style', 'border: 2px solid red; padding: 10px; box-sizing: border-box;');
                              customText.querySelector('h2').insertAdjacentElement('afterend', message);
                              customText.setAttribute('error', true);
                              if(!document.querySelector(`.${ID}_selectSizeWrap`)){
                                jQuery('html, body').animate({
                                  scrollTop: jQuery('#text_entry').offset().top
                                }, 1000);
                              }
                            }
                          } else {
                            if(document.querySelector(`.${ID}_logoblockWrap`)){
                              document.querySelector(`.${ID}_logoblockWrap`).remove();
                            }
                            customText.setAttribute('style', '');
                            if(customText.querySelector('strong')){
                              customText.querySelector('strong').remove();
                            }
                            e.target.setAttribute('data-logo', true);
                          }
                          break;
                          default:
                          e.target.setAttribute('data-logo', true);
                          break;
                        }
                      }
                      break;
                    default:
                      break;
                  }
                });
                if (e.target.getAttribute('data-size') && e.target.getAttribute('data-cost') && e.target.getAttribute('data-logo')) {
                  const button = document.querySelector('#addtobasketbutton');
                  button.click();
                }
              });
            });
          });
        });
      }
      break;
    case 'prodpage':
      fakeButton();
      const el = document.querySelector('#product_add_form #product_grid');
      document.querySelector(`.${ID}_fakeButton`).addEventListener('click', (e) => {
        let message;
        if (el) {
          message = document.createElement('div');
          message.classList.add(`${ID}_message`);
          if (window.innerWidth <= 768) {
            message.innerHTML = `
              <p class="${ID}_message__content">
                <strong>Please select your size below.</strong>Can't find your size? Call us on 0808 231 2506 for additional sizes.
              </p>
            `;
          } else {
            message.innerHTML = `
              <p class="${ID}_message__content">
                Please select your size above.<br>Can't find your size? Call us on 0808 231 2506 for additional sizes.
              </p>
            `;
          }
          if (!e.target.classList.contains('isValid')) {
            if (window.innerWidth <= 768) {
              if (!document.querySelector(`#product_add_form .${ID}_message`)) {
                document.querySelector('#product_select').insertAdjacentElement('beforebegin', message);
              }
              if (!document.querySelector('#product_select').classList.contains('isRequired')) {
                document.querySelector('#product_select').classList.add('isRequired');
              }
            } else {
              if (!el.querySelector(`.${ID}_message`)) {
                el.querySelector('h2').insertAdjacentElement('afterend', message);
              }
              if (!el.classList.contains('isRequired')) {
                el.classList.add('isRequired');
              }
            }
          } else {
            document.querySelector(`.${ID}_fakeButton`).classList.remove('isValid');
            if (el.querySelector(`.${ID}_message`)) {
              el.querySelector(`.${ID}_message`).remove();
            }
            const button = document.querySelector('#addtobasketbutton');
            button.click();
          }
        }
      });
      const prodTriggers = el.querySelectorAll('table tbody .qty_grid');
      if (window.innerWidth <= 768) {
        document.querySelector('#product_select #qty_select').addEventListener('keydown', () => {
          if (document.querySelector('#product_select').classList.contains('isRequired')) {
            document.querySelector('#product_select').classList.remove('isRequired');
          }
          document.querySelector(`.${ID}_fakeButton`).classList.add('isValid');
        });
      } else {
        Array.from(prodTriggers).forEach((trigger) => {
          trigger.addEventListener('keydown', () => {
            if (el.classList.contains('isRequired')) {
              el.classList.remove('isRequired');
            }
            document.querySelector(`.${ID}_fakeButton`).classList.add('isValid');
          });
        });
      }
      break;
    case 'bundle':
      fakeButton();
      const bundleEl = document.querySelector('.bundle_product_right');
      const bundleTriggers = bundleEl.querySelectorAll('table tbody .qty_grid');
      if (window.innerWidth <= 768) {
        addListeners(bundleEl, dataValidation);
        // activate the customisation-selected switch
        bundleEl.querySelector('.item_customisation #customisation_location').addEventListener('change', () => {
          const location = bundleEl.querySelector('.item_customisation #customisation_location');
          const locationVal = location.options[location.selectedIndex].value;
          if(locationVal === 'none' || locationVal === null || locationVal === undefined || locationVal === ''){
            dataValidation.styleSelected = true;
            dataValidation.costSelected = true;
            document.querySelector('#addtobasketbutton').removeAttribute('disabled');
          } else{
            dataValidation.costSelected = true;
          }
        });
        // activate the logo-style-selected switch
        const logoStyles = document.querySelectorAll('#application_style .application');
        Array.from(logoStyles).forEach((logoStyle) => {
          logoStyle.querySelector('input').addEventListener('click', () => {
            dataValidation.styleSelected = true;
          });
        });
      } else {
        // activate the size-selected switch
        Array.from(bundleTriggers).forEach((trigger) => {
          trigger.addEventListener('blur', () => {
            const isOK = document.querySelector('#checklist tbody tr').classList;
            if(!isOK.contains('notok')){
              if (bundleEl.classList.contains('isRequired')) {
                bundleEl.classList.remove('isRequired');
              }
              dataValidation.sizeSelected = true;
            }
          });
        });
        // activate the customisation-selected switch
        bundleEl.querySelector('.item_customisation #customisation_location').addEventListener('change', () => {
          const location = bundleEl.querySelector('.item_customisation #customisation_location');
          const locationVal = location.options[location.selectedIndex].value;
          if(locationVal === 'none' || locationVal === null || locationVal === undefined || locationVal === ''){
            dataValidation.styleSelected = true;
            dataValidation.costSelected = true;
            document.querySelector('#addtobasketbutton').removeAttribute('disabled');
          } else{
            dataValidation.costSelected = true;
          }
        });
        // activate the logo-style-selected switch
        const logoStyles = document.querySelectorAll('#application_style .application');
        Array.from(logoStyles).forEach((logoStyle) => {
          logoStyle.querySelector('input').addEventListener('click', () => {
            dataValidation.styleSelected = true;
          });
        });
      }
      // starts all the validation
      document.querySelector(`.${ID}_fakeButton`).addEventListener('click', (e) => {
        Object.keys(dataValidation).forEach(function (key) {
          //console.log(key); // The key
          //console.log(dataValidation[key]); // The value
          switch (key) {
            case 'sizeSelected':
              if (dataValidation[key] === false) {
                const selectSizeBlock = document.createElement('div');
                selectSizeBlock.classList.add(`${ID}_selectSizeWrap`);
                selectSizeBlock.innerHTML = `
                  <div class="${ID}_selectSize">
                    <p class="${ID}_selectSize__title">
                      Please select your size below.<br>You have <strong></strong> to choose for this bundle.
                    </p>
                    <span class="${ID}_selectSize__info">Can't find your size? Call us on 0808 231 2506 for additional sizes.</span>
                    <a class="${ID}_selectSize__link" href="https://www.workwearexpress.com/files/size-guides/461.pdf" target="_blank">View size guide</a>
                  </div>
                `;
                if (!document.querySelector(`.${ID}_selectSizeWrap`)) {
                  if (window.innerWidth <= 768) {
                    document.querySelector('.bundle_product_right .mobile_grid').insertAdjacentElement('beforebegin', selectSizeBlock);
                    const content = document.querySelector('#bundle-content .bundle_product h2 span').textContent;
                    const reg = /(\d+) \/ (\d+)\)/g;
                    const match = reg.exec(content);
                    if(match){
                      if(document.querySelector(`.${ID}_selectSize__title strong`)){
                        document.querySelector(`.${ID}_selectSize__title strong`).textContent = `${match[2]} products`;
                      }
                    }
                  } else {
                    document.querySelector('#bundle-content .bundle_product').insertAdjacentElement('beforebegin', selectSizeBlock);
                    const content = document.querySelector('#bundle-content .bundle_product h2 span').textContent;
                    const reg = /(\d+) \/ (\d+)\)/g;
                    const match = reg.exec(content);
                    if(match){
                      if(document.querySelector(`.${ID}_selectSize__title strong`)){
                        document.querySelector(`.${ID}_selectSize__title strong`).textContent = `${match[2]} products`;
                      }
                    }
                    const triggers = document.querySelectorAll('.bundle_table .qty_grid');
                    Array.from(triggers).forEach((trigger) => {
                      trigger.addEventListener('blur', () => {
                        setTimeout(() => {
                          const content = document.querySelector('#bundle-content .bundle_product h2 span').textContent;
                          const reg = /(\d+) \/ (\d+)\)/g;
                          const match = reg.exec(content);
                          const diff = parseInt(match[2]) - parseInt(match[1]);
                          document.querySelector(`.${ID}_selectSize__title strong`).textContent = `${diff < 0 ? '0' : diff} products`;
                        }, 35);
                      });
                    });
                    jQuery('html, body').animate({
                      scrollTop: jQuery('#site_torso').offset().top
                    }, 1000);
                  }
                } else {
                  if(window.innerWidth <= 768){
                    const isOK = document.querySelector('#checklist tbody tr').classList;
                    if(!isOK.contains('notok')){
                      data.sizeSelected = true;
                    } else {
                      jQuery('html, body').animate({
                        scrollTop: jQuery('.bundle_product_left').offset().top
                      }, 1000);
                    }
                  } else{
                    jQuery('html, body').animate({
                      scrollTop: jQuery('#site_torso').offset().top
                    }, 1000);
                  }
                }
              } else {
                const isOK = document.querySelector('#checklist tbody tr').classList;
                if(!isOK.contains('notok')){
                  if(document.querySelector(`.${ID}_selectSizeWrap`)){
                    document.querySelector(`.${ID}_selectSizeWrap`).remove();
                  }
                  e.target.setAttribute('data-size', true);
                }
              }
              break;
            case 'costSelected':
              if (dataValidation[key] === false) {
                const optionText = document.createElement('div');
                optionText.classList.add(`${ID}_option-text`);
                optionText.textContent = 'Please choose an option below to continue';
                if (!document.querySelector(`.${ID}_option-text`)) {
                  document.querySelector('.bundle_product_inner .item_customisation').setAttribute('style', 'border: 2px solid red;');
                  document.querySelector('.bundle_product_inner .item_customisation .customisation_select').insertAdjacentElement('beforebegin', optionText);
                }
              } else {
                if (document.querySelector(`.${ID}_option-text`)) {
                  document.querySelector(`.${ID}_option-text`).remove();
                  document.querySelector('.bundle_product_inner .item_customisation').setAttribute('style', '');
                }
                e.target.setAttribute('data-cost', true);
              }
              break;
            case 'styleSelected':
              if (dataValidation[key] === false) {
                const logoBlock = document.createElement('div');
                logoBlock.classList.add(`${ID}_logoblockWrap`);
                logoBlock.innerHTML = `
                  <div class="${ID}_message">
                    <div class="${ID}_message__title">Please apply your <strong>FREE LOGO</strong> to continue</div>
                    <div class="${ID}_message__content">
                      Don't have your logo to hand? Select "Please contact me for my logo", and send it later!
                    </div>
                  </div>
                `;
                if(!document.querySelector(`.${ID}_selectSizeWrap`)){
                  jQuery('html, body').animate({
                    scrollTop: jQuery('.customisation_header').offset().top
                  }, 1000);
                }
                if (!document.querySelector(`.${ID}_logoblockWrap`) && document.querySelector('.customisation_header h2')) {
                  document.querySelector('.customisation_header h2').insertAdjacentElement('afterend', logoBlock);
                }
                if (window.innerWidth <= 768) {
                  const applications = document.querySelectorAll('#application_style .application');
                  Array.from(applications).forEach((application) => {
                    application.addEventListener('click', () => {
                      const applicationType = application.querySelector('input').value;
                      switch(applicationType){
                        case 'embroidered_logo':
                        document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'em-logo');
                        break;
                        case 'embroidered_text':
                        document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'em-text');
                        break;
                        case 'printed_logo':
                        document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'pr-logo');
                        break;
                        case 'printed_text':
                        document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'pr-text');
                        break;
                        default:
                        break;
                      }
                    });
                  });
                } else {
                  const applications = document.querySelectorAll('#application_style .application');
                  Array.from(applications).forEach((application) => {
                    application.querySelector('input').addEventListener('click', (e) => {
                      const applicationType = e.target.value;
                      switch(applicationType){
                        case 'embroidered_logo':
                        document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'em-logo');
                        break;
                        case 'embroidered_text':
                        document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'em-text');
                        break;
                        case 'printed_logo':
                        document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'pr-logo');
                        break;
                        case 'printed_text':
                        document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'pr-text');
                        break;
                        default:
                        break;
                      }
                    });
                  });
                }
              } else {
                const activeAppl = document.querySelector(`.${ID}_fakeButton`).getAttribute('data-app');
                const logo = document.querySelector('.logo_upload');
                const customText = document.querySelector('#text_entry');
                let logoSelected;
                switch(activeAppl){
                  case 'em-logo':
                  logoSelected = document.querySelector('#logo_uploadz').value;
                  if(logoSelected === '' && !document.querySelector('.logo_contact input').checked){
                    if(!logo.getAttribute('error')){
                      const message = document.createElement('strong');
                      message.setAttribute('style', 'color:red; display:block;');
                      message.innerHTML = 'Please select a logo. Don\'t have your logo to hand? Select <em>"Please contact me for my logo"</em>, and send it later!';
                      logo.setAttribute('style', 'border: 2px solid red; padding: 10px; box-sizing: border-box;');
                      logo.querySelector('#logo_uploadz').insertAdjacentElement('beforebegin', message);
                      logo.setAttribute('error', true);
                      if(!document.querySelector(`.${ID}_selectSizeWrap`)){
                        jQuery('html, body').animate({
                          scrollTop: jQuery('#logo_upload').offset().top
                        }, 1000);
                      }
                    }
                  } else {
                    if(document.querySelector(`.${ID}_logoblockWrap`)){
                      document.querySelector(`.${ID}_logoblockWrap`).remove();
                    }
                    logo.setAttribute('style', '');
                    if(logo.querySelector('strong')){
                      logo.querySelector('strong').remove();
                    }
                    e.target.setAttribute('data-logo', true);
                  }
                  break;
                  case 'em-text':
                    const textVal = customText.querySelector('label #text').value;
                    if(textVal === ''){
                      if(!customText.getAttribute('error')){
                        const message = document.createElement('strong');
                        message.setAttribute('style', 'color:red; margin:0px 10px;');
                        message.innerHTML = 'Please enter your text below and choose which font and colour you prefer.';
                        customText.setAttribute('style', 'border: 2px solid red; padding: 10px; box-sizing: border-box;');
                        customText.querySelector('h2').insertAdjacentElement('afterend', message);
                        customText.setAttribute('error', true);
                        if(!document.querySelector(`.${ID}_selectSizeWrap`)){
                          jQuery('html, body').animate({
                            scrollTop: jQuery('#text_entry').offset().top
                          }, 1000);
                        }
                      }
                    } else {
                      if(document.querySelector(`.${ID}_logoblockWrap`)){
                        document.querySelector(`.${ID}_logoblockWrap`).remove();
                      }
                      customText.setAttribute('style', '');
                      if(customText.querySelector('strong')){
                        customText.querySelector('strong').remove();
                      }
                      e.target.setAttribute('data-logo', true);
                    }
                  break;
                  case 'pr-logo':
                  logoSelected = document.querySelector('#logo_uploadz').value;
                  if(logoSelected === '' && !document.querySelector('.logo_contact input').checked){
                    if(!logo.getAttribute('error')){
                      const message = document.createElement('strong');
                      message.setAttribute('style', 'color:red; display:block;');
                      message.innerHTML = 'Please select a logo. Don\'t have your logo to hand? Select <em>"Please contact me for my logo"</em>, and send it later!';
                      logo.setAttribute('style', 'border: 2px solid red; padding: 10px; box-sizing: border-box;');
                      logo.querySelector('#logo_uploadz').insertAdjacentElement('beforebegin', message);
                      logo.setAttribute('error', true);
                      if(!document.querySelector(`.${ID}_selectSizeWrap`)){
                        jQuery('html, body').animate({
                          scrollTop: jQuery('#logo_upload').offset().top
                        }, 1000);
                      }
                    }
                  } else {
                    if(document.querySelector(`.${ID}_logoblockWrap`)){
                      document.querySelector(`.${ID}_logoblockWrap`).remove();
                    }
                    logo.setAttribute('style', '');
                    if(logo.querySelector('strong')){
                      logo.querySelector('strong').remove();
                    }
                    e.target.setAttribute('data-logo', true);
                  }
                  break;
                  case 'pr-text':
                  const prtextVal = customText.querySelector('label #text').value;
                  if(prtextVal === ''){
                    if(!customText.getAttribute('error')){
                      const message = document.createElement('strong');
                      message.setAttribute('style', 'color:red; margin:0px 10px;');
                      message.innerHTML = 'Please enter your text below and choose which font and colour you prefer.';
                      customText.setAttribute('style', 'border: 2px solid red; padding: 10px; box-sizing: border-box;');
                      customText.querySelector('h2').insertAdjacentElement('afterend', message);
                      customText.setAttribute('error', true);
                      if(!document.querySelector(`.${ID}_selectSizeWrap`)){
                        jQuery('html, body').animate({
                          scrollTop: jQuery('#text_entry').offset().top
                        }, 1000);
                      }
                    }
                  } else {
                    if(document.querySelector(`.${ID}_logoblockWrap`)){
                      document.querySelector(`.${ID}_logoblockWrap`).remove();
                    }
                    customText.setAttribute('style', '');
                    if(customText.querySelector('strong')){
                      customText.querySelector('strong').remove();
                    }
                    e.target.setAttribute('data-logo', true);
                  }
                  break;
                  default:
                  e.target.setAttribute('data-logo', true);
                  break;
                }
              }
              break;
            default:
              break;
          }
        });
        if (e.target.getAttribute('data-size') && e.target.getAttribute('data-cost') && e.target.getAttribute('data-logo')) {
          const button = document.querySelector('#addtobasketbutton');
          button.click();
        }
      });
      break;
    case 'category_bundle':
      fakeButton();
      const catBundleEl = document.querySelector('.bundle_product_right');
      const catBundleTriggers = catBundleEl.querySelectorAll('table tbody .qty_grid');
      if (window.innerWidth <= 768) {
        addListeners(catBundleEl, dataValidation);
        // activate the customisation-selected switch
        catBundleEl.querySelector('.item_customisation #customisation_location').addEventListener('change', () => {
          const location = catBundleEl.querySelector('.item_customisation #customisation_location');
          const locationVal = location.options[location.selectedIndex].value;
          if(locationVal === 'none' || locationVal === null || locationVal === undefined || locationVal === ''){
            dataValidation.styleSelected = true;
            dataValidation.costSelected = true;
            document.querySelector('#addtobasketbutton').removeAttribute('disabled');
          } else{
            dataValidation.costSelected = true;
          }
        });
        // activate the logo-style-selected switch
        const logoStyles = document.querySelectorAll('#application_style .application');
        Array.from(logoStyles).forEach((logoStyle) => {
          logoStyle.querySelector('input').addEventListener('click', () => {
            dataValidation.styleSelected = true;
          });
        });
      } else {
        // activate the size-selected switch
        Array.from(catBundleTriggers).forEach((trigger) => {
          trigger.addEventListener('keydown', () => {
            if (catBundleEl.classList.contains('isRequired')) {
              catBundleEl.classList.remove('isRequired');
            }
            dataValidation.sizeSelected = true;
          });
        });
        // activate the customisation-selected switch
        catBundleEl.querySelector('.item_customisation #customisation_location').addEventListener('change', () => {
          const location = catBundleEl.querySelector('.item_customisation #customisation_location');
          const locationVal = location.options[location.selectedIndex].value;
          if(locationVal === 'none' || locationVal === null || locationVal === undefined || locationVal === ''){
            dataValidation.styleSelected = true;
            dataValidation.costSelected = true;
            document.querySelector('#addtobasketbutton').removeAttribute('disabled');
          } else{
            dataValidation.costSelected = true;
          }
        });
        // activate the logo-style-selected switch
        const logoStyles = document.querySelectorAll('#application_style .application');
        Array.from(logoStyles).forEach((logoStyle) => {
          logoStyle.querySelector('input').addEventListener('click', () => {
            dataValidation.styleSelected = true;
          });
        });
      }
      // starts all the validation
      document.querySelector(`.${ID}_fakeButton`).addEventListener('click', (e) => {
        Object.keys(dataValidation).forEach(function (key) {
          //console.log(key); // The key
          //console.log(dataValidation[key]); // The value
          switch (key) {
            case 'sizeSelected':
              if (dataValidation[key] === false) {
                const selectSizeBlock = document.createElement('div');
                selectSizeBlock.classList.add(`${ID}_selectSizeWrap`);
                selectSizeBlock.innerHTML = `
                  <div class="${ID}_selectSize">
                    <p class="${ID}_selectSize__title">
                      Please select your size below.<!--<br>You have <strong></strong> to choose for this bundle.-->
                    </p>
                    <span class="${ID}_selectSize__info">Can't find your size? Call us on 0808 231 2506 for additional sizes.</span>
                    <a class="${ID}_selectSize__link" href="https://www.workwearexpress.com/files/size-guides/461.pdf" target="_blank">View size guide</a>
                  </div>
                `;
                if (!document.querySelector(`.${ID}_selectSizeWrap`)) {
                  if (window.innerWidth <= 768) {
                    document.querySelector('.bundle_product_right .mobile_grid').insertAdjacentElement('beforebegin', selectSizeBlock);
                    const content = document.querySelector('#bundle-content .bundle_product h2 span').textContent;
                    const reg = /(\d+) \/ (\d+)\)/g;
                    const match = reg.exec(content);
                    if(match){
                      if(document.querySelector(`.${ID}_selectSize__title strong`)){
                        document.querySelector(`.${ID}_selectSize__title strong`).textContent = `${match[2]} products`;
                      }
                    }
                  } else {
                    document.querySelector('#bundle-content .bundle_product').insertAdjacentElement('beforebegin', selectSizeBlock);
                    const content = document.querySelector('#bundle-content .bundle_product h2 span').textContent;
                    const reg = /(\d+) \/ (\d+)\)/g;
                    const match = reg.exec(content);
                    if(match){
                      if(document.querySelector(`.${ID}_selectSize__title strong`)){
                        document.querySelector(`.${ID}_selectSize__title strong`).textContent = `${match[2]} products`;
                      }
                    }
                    const triggers = document.querySelectorAll('.bundle_table .qty_grid');
                    Array.from(triggers).forEach((trigger) => {
                      trigger.addEventListener('blur', () => {
                        setTimeout(() => {
                          const content = document.querySelector('#bundle-content .bundle_product h2 span').textContent;
                          const reg = /(\d+) \/ (\d+)\)/g;
                          const match = reg.exec(content);
                          const diff = parseInt(match[2]) - parseInt(match[1]);
                          document.querySelector(`.${ID}_selectSize__title strong`).textContent = `${diff < 0 ? '0' : diff} products`;
                        }, 35);
                      });
                    });
                    jQuery('html, body').animate({
                      scrollTop: jQuery('#site_torso').offset().top
                    }, 1000);
                  }
                } else {
                  if(window.innerWidth <= 768){
                    jQuery('html, body').animate({
                      scrollTop: jQuery('.bundle_product_left').offset().top
                    }, 1000);
                  } else{
                    jQuery('html, body').animate({
                      scrollTop: jQuery('#site_torso').offset().top
                    }, 1000);
                  }
                }
              } else {
                const isOK = document.querySelector('#checklist tbody tr').classList;
                if(!isOK.contains('notok')){
                  if(document.querySelector(`.${ID}_selectSizeWrap`)){
                    document.querySelector(`.${ID}_selectSizeWrap`).remove();
                  }
                  e.target.setAttribute('data-size', true);
                }
              }
              break;
            case 'costSelected':
              if (dataValidation[key] === false) {
                const optionText = document.createElement('div');
                optionText.classList.add(`${ID}_option-text`);
                optionText.textContent = 'Please choose an option below to continue';
                if (!document.querySelector(`.${ID}_option-text`)) {
                  document.querySelector('.bundle_product_inner .item_customisation').classList.add('bordered');
                  document.querySelector('.bundle_product_inner .item_customisation .customisation_select').insertAdjacentElement('beforebegin', optionText);
                }
              } else {
                if (document.querySelector(`.${ID}_option-text`)) {
                  document.querySelector(`.${ID}_option-text`).remove();
                  document.querySelector('.bundle_product_inner .item_customisation').classList.remove('bordered');
                }
                e.target.setAttribute('data-cost', true);
              }
              break;
            case 'styleSelected':
              if (dataValidation[key] === false) {
                const logoBlock = document.createElement('div');
                logoBlock.classList.add(`${ID}_logoblockWrap`);
                logoBlock.innerHTML = `
                  <div class="${ID}_message">
                    <div class="${ID}_message__title">Please apply your <strong>FREE LOGO</strong> to continue</div>
                    <div class="${ID}_message__content">
                      Don't have your logo to hand? Select "Please contact me for my logo", and send it later!
                    </div>
                  </div>
                `;
                if(!document.querySelector(`.${ID}_selectSizeWrap`)){
                  jQuery('html, body').animate({
                    scrollTop: jQuery('.customisation_header').offset().top
                  }, 1000);
                }
                if (!document.querySelector(`.${ID}_logoblockWrap`) && document.querySelector('.customisation_header h2')) {
                  document.querySelector('.customisation_header h2').insertAdjacentElement('afterend', logoBlock);
                }
                if (window.innerWidth <= 768) {
                  const applications = document.querySelectorAll('#application_style .application');
                  Array.from(applications).forEach((application) => {
                    application.addEventListener('click', () => {
                      const applicationType = application.querySelector('input').value;
                      switch(applicationType){
                        case 'embroidered_logo':
                        document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'em-logo');
                        break;
                        case 'embroidered_text':
                        document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'em-text');
                        break;
                        case 'printed_logo':
                        document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'pr-logo');
                        break;
                        case 'printed_text':
                        document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'pr-text');
                        break;
                        default:
                        break;
                      }
                    });
                  });
                } else {
                  const applications = document.querySelectorAll('#application_style .application');
                  Array.from(applications).forEach((application) => {
                    application.querySelector('input').addEventListener('click', (e) => {
                      const applicationType = e.target.value;
                      switch(applicationType){
                        case 'embroidered_logo':
                        document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'em-logo');
                        break;
                        case 'embroidered_text':
                        document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'em-text');
                        break;
                        case 'printed_logo':
                        document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'pr-logo');
                        break;
                        case 'printed_text':
                        document.querySelector(`.${ID}_fakeButton`).setAttribute('data-app', 'pr-text');
                        break;
                        default:
                        break;
                      }
                    });
                  });
                }
              } else {
                const activeAppl = document.querySelector(`.${ID}_fakeButton`).getAttribute('data-app');
                const logo = document.querySelector('.logo_upload');
                const customText = document.querySelector('#text_entry');
                let logoSelected;
                switch(activeAppl){
                  case 'em-logo':
                  logoSelected = document.querySelector('#logo_uploadz').value;
                  if(logoSelected === '' && !document.querySelector('.logo_contact input').checked){
                    if(!logo.getAttribute('error')){
                      const message = document.createElement('strong');
                      message.setAttribute('style', 'color:red; display:block;');
                      message.innerHTML = 'Please select a logo. Don\'t have your logo to hand? Select <em>"Please contact me for my logo"</em>, and send it later!';
                      logo.setAttribute('style', 'border: 2px solid red; padding: 10px; box-sizing: border-box;');
                      logo.querySelector('#logo_uploadz').insertAdjacentElement('beforebegin', message);
                      logo.setAttribute('error', true);
                      if(!document.querySelector(`.${ID}_selectSizeWrap`)){
                        jQuery('html, body').animate({
                          scrollTop: jQuery('#logo_upload').offset().top
                        }, 1000);
                      }
                    }
                  } else {
                    if(document.querySelector(`.${ID}_logoblockWrap`)){
                      document.querySelector(`.${ID}_logoblockWrap`).remove();
                    }
                    logo.setAttribute('style', '');
                    if(logo.querySelector('strong')){
                      logo.querySelector('strong').remove();
                    }
                    e.target.setAttribute('data-logo', true);
                  }
                  break;
                  case 'em-text':
                    const textVal = customText.querySelector('label #text').value;
                    if(textVal === ''){
                      if(!customText.getAttribute('error')){
                        const message = document.createElement('strong');
                        message.setAttribute('style', 'color:red; margin:0px 10px;');
                        message.innerHTML = 'Please enter your text below and choose which font and colour you prefer.';
                        customText.setAttribute('style', 'border: 2px solid red; padding: 10px; box-sizing: border-box;');
                        customText.querySelector('h2').insertAdjacentElement('afterend', message);
                        customText.setAttribute('error', true);
                        if(!document.querySelector(`.${ID}_selectSizeWrap`)){
                          jQuery('html, body').animate({
                            scrollTop: jQuery('#text_entry').offset().top
                          }, 1000);
                        }
                      }
                    } else {
                      if(document.querySelector(`.${ID}_logoblockWrap`)){
                        document.querySelector(`.${ID}_logoblockWrap`).remove();
                      }
                      customText.setAttribute('style', '');
                      if(customText.querySelector('strong')){
                        customText.querySelector('strong').remove();
                      }
                      e.target.setAttribute('data-logo', true);
                    }
                  break;
                  case 'pr-logo':
                  logoSelected = document.querySelector('#logo_uploadz').value;
                  if(logoSelected === '' && !document.querySelector('.logo_contact input').checked){
                    if(!logo.getAttribute('error')){
                      const message = document.createElement('strong');
                      message.setAttribute('style', 'color:red; display:block;');
                      message.innerHTML = 'Please select a logo. Don\'t have your logo to hand? Select <em>"Please contact me for my logo"</em>, and send it later!';
                      logo.setAttribute('style', 'border: 2px solid red; padding: 10px; box-sizing: border-box;');
                      logo.querySelector('#logo_uploadz').insertAdjacentElement('beforebegin', message);
                      logo.setAttribute('error', true);
                      if(!document.querySelector(`.${ID}_selectSizeWrap`)){
                        jQuery('html, body').animate({
                          scrollTop: jQuery('#logo_upload').offset().top
                        }, 1000);
                      }
                    }
                  } else {
                    if(document.querySelector(`.${ID}_logoblockWrap`)){
                      document.querySelector(`.${ID}_logoblockWrap`).remove();
                    }
                    logo.setAttribute('style', '');
                    if(logo.querySelector('strong')){
                      logo.querySelector('strong').remove();
                    }
                    e.target.setAttribute('data-logo', true);
                  }
                  break;
                  case 'pr-text':
                  const prtextVal = customText.querySelector('label #text').value;
                  if(prtextVal === ''){
                    if(!customText.getAttribute('error')){
                      const message = document.createElement('strong');
                      message.setAttribute('style', 'color:red; margin:0px 10px;');
                      message.innerHTML = 'Please enter your text below and choose which font and colour you prefer.';
                      customText.setAttribute('style', 'border: 2px solid red; padding: 10px; box-sizing: border-box;');
                      customText.querySelector('h2').insertAdjacentElement('afterend', message);
                      customText.setAttribute('error', true);
                      if(!document.querySelector(`.${ID}_selectSizeWrap`)){
                        jQuery('html, body').animate({
                          scrollTop: jQuery('#text_entry').offset().top
                        }, 1000);
                      }
                    }
                  } else {
                    if(document.querySelector(`.${ID}_logoblockWrap`)){
                      document.querySelector(`.${ID}_logoblockWrap`).remove();
                    }
                    customText.setAttribute('style', '');
                    if(customText.querySelector('strong')){
                      customText.querySelector('strong').remove();
                    }
                    e.target.setAttribute('data-logo', true);
                  }
                  break;
                  default:
                  e.target.setAttribute('data-logo', true);
                  break;
                }
              }
              break;
            default:
              break;
          }
        });
        if (e.target.getAttribute('data-size') && e.target.getAttribute('data-cost') && e.target.getAttribute('data-logo')) {
          const button = document.querySelector('#addtobasketbutton');
          button.click();
        }
      });
      break;
    default:
      break;
  }
}

export {
  setup,
  ieArrayPolyfill,
  updateBundle,
  unlockcartButton,
}; // eslint-disable-line
