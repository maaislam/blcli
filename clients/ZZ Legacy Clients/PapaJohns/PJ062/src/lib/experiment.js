/**
 * PJ062 - Delivery/collection selecting (PJ027 Iteration)
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import settings from './settings';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { toggleLightboxContent, orderCtaClick } from './bindExperimentEvents';
import createCtaButtons from './createCtaButtons';
import createLightboxContent from './createLightboxContent';

const { ID, VARIATION } = settings;

const activate = () => {
  setup();

  const postcodeWrapper = document.querySelector('table.nStoreTable');
  if (postcodeWrapper) {
    postcodeWrapper.classList.add('PJ062-postcode__wrapper');

    const postcodeInput = postcodeWrapper.querySelectorAll('tbody tr td')[0];

    if (postcodeInput) {
      postcodeInput.classList.add('PJ062-postcode__container');
      postcodeInput.querySelector('input').setAttribute('placeholder', '');
      if (VARIATION === '2') {
        postcodeInput.querySelector('input').classList.add('PJ062-input__v2');

        // Wrap Input field in div
        if (!document.querySelector('div.PJ062-input__wrapper')) {
          const inputFieldV2 = document.querySelector('.PJ062-input__v2');
          function wrap(el, wrapper) {
            el.parentNode.insertBefore(wrapper, el);
            wrapper.appendChild(el);
          }
          wrap(inputFieldV2, document.createElement('div'));
          inputFieldV2.parentNode.classList.add('PJ062-input__wrapper');
        }
      }
    }

    const postcodeCtaContainer = postcodeWrapper.querySelectorAll('tbody tr td')[1];
    if (postcodeCtaContainer) {
      postcodeCtaContainer.classList.add('PJ062-postcodeCta__container');
      if (VARIATION === '2') {
        postcodeCtaContainer.classList.add('PJ062-postcodeCta__v2');
      }
    }

    if (!document.querySelector('.PJ062-postcode__label')) {
      postcodeInput.insertAdjacentHTML('afterbegin', `<span class='PJ062-postcode__label'>Your Postcode</span>`);
    }
  }
  // Hide Control CTA Button
  document.querySelector('a#ctl00_cphBody_lbGetStarted').classList.add('hide');

  // Prevent Enter Action for Postcode Input Field
  const postcodeInput = document.querySelector('.PJ062-postcode__container');
  const postcodeInputField = postcodeInput.querySelector('input.txtField');
  postcodeInputField.addEventListener('keydown', (e) => {
    const key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      // code for enter
      e.preventDefault();
    }
  });

  /**
   * @desc Create New CTA Buttons based on the running Variation
   */
  createCtaButtons(postcodeWrapper);

  /**
   * @desc Click Event for Order options
   */
  let orderMethod = "";
  function bindClickEventOnCta(cta) {
    cta.addEventListener('click', () => {
      orderMethod = cta.getAttribute('value');
      if (orderMethod && orderMethod !== "") {
        localStorage.setItem('PJ062-orderMethod', orderMethod);

        // Add active to CTA
        cta.parentNode.classList.add('active');
        //////////////////////////////////////////////////////////////
        /**
         * @desc New lightbox content is beeing built on this step
         */
        function rebuildLightbox() {
          const lightboxMainContainer = document.querySelector('#fancyStoreConfirm');
          // Hide Main Content
          lightboxMainContainer.querySelector('.storeDetails').classList.add('hide');
          // Hide Store Map 
          lightboxMainContainer.querySelector('.location').classList.add('hide');

          // Get Order Method
          let orderMethod = '';
          let hideMinimumForDelivery = '';
          let hidePreOrder = '';
          switch(localStorage.getItem('PJ062-orderMethod')) {
            case 'PJ062-delivery':
              orderMethod = 'Delivering';
              break;
            case 'PJ062-collection':
              orderMethod = 'Collecting';
              hideMinimumForDelivery = 'hide';
              break;
          }
          let ctaButton = 'Pre-order';
          if (document.querySelector('#fancyStoreConfirm h2.title').innerText.toUpperCase() !== "CURRENTLY CLOSED BUT YOU CAN ORDER FOR LATER") {
            hidePreOrder = 'hide';
            ctaButton = 'Order Now';
          }
          // Replace lightbox title
          document.querySelector('#fancyStoreConfirm h2.title').innerText = 'Store Info';


          // Get New Lightbox Content
          const newLightboxContent = createLightboxContent(orderMethod, hideMinimumForDelivery, hidePreOrder, ctaButton);


          lightboxMainContainer.querySelector('.fancyStoreConfirmCont').insertAdjacentHTML('afterend', newLightboxContent);
          
          pollerLite(['.fancyStoreConfirmCont', 'li.PJ062-lightbox__item'], () => {
            toggleLightboxContent();
          });

          /**
           * @desc New CTA Order Button 
           * Gets order method from previous step and sends the relevant
           * request on click of variation CTA
           */
          orderCtaClick(orderMethod);

          /**
           * @desc Order Action
           * - Adds Click event listener to lightbox CTA button
           * or if user clicks outside lightbox
           * - Detects click outside lightbox, sends post request for relevant order method
           * and refreshes page
           */
          document.querySelector('.fancybox-overlay.fancybox-overlay-fixed').addEventListener('click', (e) => {   
            if (!document.querySelector('.fancybox-wrap.fancybox-desktop.fancybox-type-inline').contains(e.target)){
              // Clicked outside the box
              if (orderMethod === 'Delivering') {
                window.__doPostBack('ctl00__objHeader_lbOrderForDelivery'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
              } else if (orderMethod === 'Collecting') {
                window.__doPostBack('ctl00__objHeader_lbOrderForCollection'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
              }
              // location.reload();
            }
          });
          /**
           * @desc Detects resize and reloads page when user re-sizes window
           */
          window.addEventListener('resize', () => {   
            location.reload();
          });
          
          // Remove Active Method from LocalStorage
          localStorage.removeItem('PJ062-orderMethod');
        }
        //////////////////////////////////////////////////////////////

        // --- Checks if Postcode value is not empty
        if (document.querySelector('.PJ062-postcode__container input') && document.querySelector('.PJ062-postcode__container input').value !== "") {
          pollerLite(['#fancyStoreConfirm'], () => {
            pollerLite(['.fancybox-wrap.fancybox-desktop.fancybox-type-inline.fancybox-opened'], () => {
              document.querySelector('.fancybox-wrap.fancybox-desktop.fancybox-type-inline.fancybox-opened').style.width = '630px !important';
            });
            
            // --- Rebuilds lightbox
            if (!document.querySelector('.PJ062-lightbox__wrapper')) {
              rebuildLightbox();
            }
          });
        } else if (document.querySelector('#ctl00__objHeader_pnlPostCodeSearch input') && document.querySelector('#ctl00__objHeader_pnlTownSearch input')) {
          if (document.querySelector('#ctl00__objHeader_pnlPostCodeSearch input').value !== "" || document.querySelector('#ctl00__objHeader_pnlTownSearch input').value !== "") {
            pollerLite(['#fancyStoreConfirm'], () => {
              pollerLite(['.fancybox-wrap.fancybox-desktop.fancybox-type-inline.fancybox-opened'], () => {
                document.querySelector('.fancybox-wrap.fancybox-desktop.fancybox-type-inline.fancybox-opened').style.width = '630px !important';
              });
              
              // --- Rebuilds lightbox
              if (!document.querySelector('.PJ062-lightbox__wrapper')) {
                rebuildLightbox();
              }
            });
          }
        }
      }
        
    });
  }

  /**
   * @desc Call CTA event function once new CTA buttons have been added
   */
  pollerLite(['#PJ062-order__delivery', '#PJ062-order__collect'], () => {
    const deliveryCTA = document.querySelector('#PJ062-order__delivery');
    const collectCTA = document.querySelector('#PJ062-order__collect');

    bindClickEventOnCta(deliveryCTA);
    bindClickEventOnCta(collectCTA);
  });
  


  // -------------------------------------------
  // PRM Manager Listen for State Changes
  // -------------------------------------------
  window.prm.add_endRequest(function (sender, error) {
    try {
      // console.log(sender);
      if (sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$lbGetStarted" || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbCloseOnmibar1") {
        activate();
        if (document.querySelector('.PJ062-postcode__container input').value !== "") {
          if (!document.querySelector('.PJ062-lightbox__wrapper') && localStorage.getItem('PJ062-orderMethod') !== null) {
            rebuildLightbox();
          }
        }
      } else if (sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbSelectStoreMenuItem" || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbEnterPostcode") {
        pollerLite(['#ctl00__objHeader_lbEnterPostcode', '#ctl00__objHeader_lbNoPostcode'], () => {
          const postcodeSearchBtn = document.querySelector('a#ctl00__objHeader_lbEnterPostcode');
          const noPostcodeSearchBtn = document.querySelector('a#ctl00__objHeader_lbNoPostcode');
          if (postcodeSearchBtn && !document.querySelector('.PJ062-postcodeCtaHeader__container')) {
            const headerPostcodeButtonsContainer = `<div class="PJ062-orderOptionsHeader__wrapper">
              <div class="PJ062-postcodeCtaHeader__container">
                <div class="PJ062-orderOptions__wrapper PJ062-deliverCTA">
                  <a class="PJ062-orderOptions__option" id="PJ062-orderPostcode__delivery" value="PJ062-delivery" onclick="dataLayer.push({'event': 'GAevent', 'eventCategory': 'StoreBar', 'eventAction': 'Postcode', 'eventLabel': ''});" id="ctl00__objHeader_lbEnterPostcode" href="javascript:__doPostBack('ctl00$_objHeader$lbEnterPostcode','')">
                    <span class="PJ062-cta__img PJ062-img__delivery"></span>    
                    <span class="PJ062-tooltiptext">Deliver to me</span>
                  </a>
                </div>
                <div class="PJ062-orderOptions__wrapper PJ062-collectCTA">
                  <a class="PJ062-orderOptions__option" id="PJ062-orderPostcode__collect" value="PJ062-collection" onclick="dataLayer.push({'event': 'GAevent', 'eventCategory': 'StoreBar', 'eventAction': 'Postcode', 'eventLabel': ''});" id="ctl00__objHeader_lbEnterPostcode" href="javascript:__doPostBack('ctl00$_objHeader$lbEnterPostcode','')">
                    <span class="PJ062-cta__img PJ062-img__collect"></span>
                    <span class="PJ062-tooltiptext">I'll collect</span> 
                  </a>
                </div>
              </div>
            </div>`;
            postcodeSearchBtn.insertAdjacentHTML('afterend', headerPostcodeButtonsContainer);
            bindClickEventOnCta(document.querySelector('#PJ062-orderPostcode__delivery'));
            bindClickEventOnCta(document.querySelector('#PJ062-orderPostcode__collect'));
          }
          if (noPostcodeSearchBtn && !document.querySelector('.PJ062-noPostcodeCtaHeader__container')) {
            // bindClickEventOnCta(noPostcodeSearchBtn);
            const headerPostcodeButtonsContainer = `<div class="PJ062-orderOptionsHeader__wrapper">
              <div class="PJ062-noPostcodeCtaHeader__container">
                <div class="PJ062-orderOptions__wrapper PJ062-deliverCTA">
                  <a class="PJ062-orderOptions__option" id="PJ062-orderNoPostcode__delivery" value="PJ062-delivery" onclick="dataLayer.push({'event': 'GAevent', 'eventCategory': 'StoreBar', 'eventAction': 'Town', 'eventLabel': ''});" id="ctl00__objHeader_lbNoPostcode" href="javascript:__doPostBack('ctl00$_objHeader$lbNoPostcode','')">
                    <span class="PJ062-cta__img PJ062-img__delivery"></span>    
                    <span class="PJ062-tooltiptext">Deliver to me</span>
                  </a>
                </div>
                <div class="PJ062-orderOptions__wrapper PJ062-collectCTA">
                  <a class="PJ062-orderOptions__option" id="PJ062-orderNoPostcode__collect" value="PJ062-collection" onclick="dataLayer.push({'event': 'GAevent', 'eventCategory': 'StoreBar', 'eventAction': 'Town', 'eventLabel': ''});" id="ctl00__objHeader_lbNoPostcode" href="javascript:__doPostBack('ctl00$_objHeader$lbNoPostcode','')">
                    <span class="PJ062-cta__img PJ062-img__collect"></span>
                    <span class="PJ062-tooltiptext">I'll collect</span> 
                  </a>
                </div>
              </div>
            </div>`;
            noPostcodeSearchBtn.insertAdjacentHTML('afterend', headerPostcodeButtonsContainer);
            // bindClickEventOnCta(document.querySelector('#PJ062-orderNoPostcode__delivery'));
            // bindClickEventOnCta(document.querySelector('#PJ062-orderNoPostcode__collect'));
          }
        });
      } else if (sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbNoPostcode") {
        pollerLite(['.storeDetails'], () => {
          const lightboxMainContainer = document.querySelector('#fancyStoreConfirm');
          // Unhide Lightbox Main Content
          lightboxMainContainer.querySelector('.storeDetails').classList.remove('hide');
          // Fallback step - Lightbox Content
          lightboxMainContainer.querySelector('.storeDetails').setAttribute('style', 'padding: 5%; width:95% !important;');
          lightboxMainContainer.querySelector('.location').setAttribute('style', 'margin-left: 20px; margin-top: 20px;');
          lightboxMainContainer.querySelector('.buttons').setAttribute('style', 'text-align: center;');
          lightboxMainContainer.querySelector('p > strong').setAttribute('style', 'position: relative; left: 30%;');

          document.querySelector('.fancybox-overlay.fancybox-overlay-fixed').addEventListener('click', (e) => {   
            if (!document.querySelector('.fancybox-wrap.fancybox-desktop.fancybox-type-inline').contains(e.target)){
              // Clicked outside the box
              location.reload();
            }
          });
        });
      }
    } catch (e) {} 
  });
};

export default activate;
