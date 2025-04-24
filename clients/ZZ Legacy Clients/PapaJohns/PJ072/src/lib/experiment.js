/**
 * PJ072 - Forced postcode iteration | Desktop
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, bindClickEventOnCtaHeader } from './services';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  localStorage.setItem(`${shared.ID}-orderMethod`, "");
  // Write experiment code here
  const postcodeInputEl = document.querySelector('input#ctl00_cphBody_txtPostcode');
  let deactivateBtns = "";
  if (postcodeInputEl && postcodeInputEl.value === "") {
    deactivateBtns = "inactive";
  }
  const mainContent = document.querySelector('#ctl00__objHeader_upOneClickPopup');
  if (mainContent) {
    const newLightBox = `<div class="${shared.ID}-lightboxWrapper">
      <div class="${shared.ID}-lightboxContainer">
        <div class="${shared.ID}-banner__wrapper">
          <div class="${shared.ID}-banner"></div>
          <div class="triangle-wrapper"><div></div></div>
        </div>
        <div class="${shared.ID}-input__message">Enter your postcode to start ordering</div>
        <div class="${shared.ID}-input__wrapper"><div class="${shared.ID}-errorMsg hide">The postcode you entered is invalid</div></div>
        <div class="${shared.ID}-buttons__wrapper ${deactivateBtns}">
          <div class="${shared.ID}-orderOptions__wrapper ${shared.ID}-deliverCTA">
            <a class="${shared.ID}-orderOptions__option greenButton" id="${shared.ID}-order__delivery" value="${shared.ID}-delivery" href="javascript:__doPostBack('ctl00$cphBody$lbGetStarted','')">
              <span class="leftB"></span>  
              <span class="centerB">Deliver</span>
              <span class="rightB"></span>
            </a>
          </div>
          <div class="${shared.ID}-orderOptions__wrapper ${shared.ID}-collectCTA">
            <a class="${shared.ID}-orderOptions__option greenButton" id="${shared.ID}-order__collect" value="${shared.ID}-collection" href="javascript:__doPostBack('ctl00$cphBody$lbGetStarted','')">
              <span class="leftB"></span>  
              <span class="centerB">I'll collect</span>
              <span class="rightB"></span>
            </a>
          </div>
        </div>
        <div class="${shared.ID}-info__wrapper"><a href="javascript:__doPostBack('ctl00$_objHeader$lbSelectStoreMenuItem','')">No postcode? Click here.</a></div>
      </div>
    </div>`;

    mainContent.insertAdjacentHTML('afterend', newLightBox);

    const newLightBoxContainer = document.querySelector(`.${shared.ID}-lightboxWrapper .${shared.ID}-lightboxContainer`);
    // --- Move input field in new Lightbox
    newLightBoxContainer.querySelector(`.${shared.ID}-input__wrapper`).insertAdjacentElement('afterbegin', postcodeInputEl);

    /**
     * @desc Checks if there is a postcode value and shows CTA buttons
     */
    postcodeInputEl.addEventListener('input', () => {
      if (postcodeInputEl && postcodeInputEl.value !== "") {
         document.querySelector(`.${shared.ID}-buttons__wrapper`).classList.remove('inactive');
         const postcodeErrorMsg = document.querySelector(`.${shared.ID}-errorMsg`);
          if (postcodeErrorMsg && !postcodeErrorMsg.classList.contains('hide')) {
            postcodeErrorMsg.classList.add('hide');
          }
      } else {
        document.querySelector(`.${shared.ID}-buttons__wrapper`).classList.add('inactive');
      }
    });

    let orderMethod = "";
    function bindClickEventOnCta(cta) {
      cta.addEventListener('click', () => {
        orderMethod = cta.getAttribute('value');
        if (orderMethod && orderMethod !== "") {
          localStorage.setItem(`${shared.ID}-orderMethod`, orderMethod);

          // --- SHOW LOADER HERE
          pollerLite(['#fancyStoreConfirm'], () => {
            // ADD LOADER HERE
            if (!document.querySelector(`div.${shared.ID}-loader__wrapper`)) {
              document.querySelector('#fancyStoreConfirm').insertAdjacentHTML('afterbegin', `<div class="${shared.ID}-loader__wrapper"><div class="${shared.ID}-loader"></div></div>`);
            }

            // document.querySelector('.${shared.ID}-lightboxContainer').style.display = 'none !important';
            document.querySelector(`.${shared.ID}-lightboxContainer`).setAttribute('style', 'display: none !important;');
          });
        }
      });
    }

    /**
     * @desc If the user clicks on "No postcode? Click here" link
     * hide lightbox
     */
    pollerLite([`.${shared.ID}-info__wrapper`], () => {
      const noPostcodeLink = document.querySelector(`.${shared.ID}-info__wrapper a`);

      noPostcodeLink.addEventListener('click', (e) => {
        document.querySelector(`.${shared.ID}-lightboxWrapper`).setAttribute('style', 'display: none !important;');
      });
      
    });
    /**
     * @desc Call CTA event function once new CTA buttons have been added
     */
    pollerLite([`#${shared.ID}-order__delivery`, `#${shared.ID}-order__collect`], () => {
      const deliveryCTA = document.querySelector(`#${shared.ID}-order__delivery`);
      const collectCTA = document.querySelector(`#${shared.ID}-order__collect`);

      bindClickEventOnCta(deliveryCTA);
      bindClickEventOnCta(collectCTA);
    });
  }

  pollerLite(['.fancybox-wrap.fancybox-desktop.fancybox-type-inline.fancybox-opened', '.storeDetails p > strong'], () => {
    let orderMethod = '';
    if (localStorage.getItem(`${shared.ID}-orderMethod`) !== "") {
      // --------- STEP 2
      // Hide First Step 
      document.querySelector(`.${shared.ID}-lightboxWrapper`).setAttribute('style', 'display: none;');
      // Get Order Method
      // let orderMethod = '';
      let hideMinimumForDelivery = '';
      let hidePreOrder = '';
      let orderAction = '';
      switch(localStorage.getItem(`${shared.ID}-orderMethod`)) {
        case `${shared.ID}-delivery`:
          orderMethod = 'Delivering';
          orderAction = '';
          // const minDeliveryContainer = document.querySelector('.fancyStoreConfirmCont .buttons').nextElementSibling;
          // minDeliveryContainer.classList.add('${shared.ID}-minDelivery');
          // // minDeliveryContainer.insertAdjacentHTML('afterend', `<div class="${shared.ID}-hours__tooltip"><div class="${shared.ID}-tooltiptext">Hours etc</div></div>`)
          // document.querySelector('div.fancybox-inner h1').insertAdjacentHTML('afterend', `<div class="${shared.ID}-hours__tooltip"><div class="${shared.ID}-tooltiptext"><p>Opening Hours:</p></div></div>`);
          document.querySelector('.fancyStoreConfirmCont .storeDetails').insertAdjacentHTML('beforeend', `<div class="${shared.ID}-minimum-delivery__msg">* Minimum spend for delivery is £12.99</div>`);
          break;
        case `${shared.ID}-collection`:
          orderMethod = 'Collecting';
          hideMinimumForDelivery = 'hide';
          // document.querySelector('.fancyStoreConfirmCont .buttons').nextElementSibling.setAttribute('style', 'display: none !important;');
          // document.querySelector('div.fancybox-inner h1').insertAdjacentHTML('afterend', `<div class="${shared.ID}-hours__tooltip"><div class="${shared.ID}-tooltiptext"><p>Opening Hours:</p></div></div>`);
          orderAction = '';
          break;
      }

      // Get Opening Hours --- OLD
      const openingHoursEl = document.querySelector('.fancyStoreConfirmCont .storeDetails .openingHours');
      const tooltipEl = document.querySelector(`.${shared.ID}-hours__tooltip`);
      // const insideTooltipBox = tooltipEl.querySelector('.${shared.ID}-tooltiptext p');
      // insideTooltipBox.insertAdjacentElement('afterend', openingHoursEl);

      document.querySelector('.fancybox-wrap.fancybox-desktop.fancybox-type-inline.fancybox-opened').style.width = '370px !important';
      
      const orderMethodContainer = `<div class="${shared.ID}-orderMethod__wrapper"><div class="${shared.ID}-orderMethod">${orderMethod} from</div></div>`;
      document.querySelector('.fancybox-wrap.fancybox-desktop.fancybox-type-inline.fancybox-opened .storeDetails').insertAdjacentHTML('afterbegin', orderMethodContainer);
      // --- Add new CTA button
      let ctaButton = 'Pre-order';
      if (document.querySelector('#fancyStoreConfirm h2.title').innerText.trim().toUpperCase().indexOf("CURRENTLY CLOSED BUT YOU CAN ORDER FOR LATER") === -1) {
        // hidePreOrder = 'hide';
        ctaButton = 'Start Ordering';
      } else {
        // Add after Address
        document.querySelector('.fancyStoreConfirmCont').insertAdjacentHTML('beforeend', `<div class="${shared.ID}-storeClosed__message">Currently closed PRE-ORDER for later</div>`)
      }
      const newCtaBtn = `<div class="${shared.ID}-buttons__wrapper ">
        <div class="triangle-wrapper"><div></div></div>
        <div class="${shared.ID}-orderOptions__wrapper ${shared.ID}-orderNowCTA">
          <div class="${shared.ID}-orderOptions__option greenButton" id="${shared.ID}-order__now" value="${shared.ID}-orderNow">
            <span class="leftB"></span>  
            <span class="centerB">${ctaButton}</span>
            <span class="rightB"></span>
          </div>
        </div>
      </div>`;

      document.querySelector('.fancybox-wrap.fancybox-desktop.fancybox-type-inline.fancybox-opened .fancybox-inner').insertAdjacentHTML('beforeend', newCtaBtn);
      // ----- HIDE LOADER HERE
      setTimeout(function(){
        const loaderContainer = document.querySelectorAll(`div.${shared.ID}-loader__wrapper`);
        if (loaderContainer.length > 0) {
          [].forEach.call(loaderContainer, (loader) => {
            loader.classList.add('hide');
          });
        }
      }, 1500);

      /**
       * @desc Order Action
       * - Adds Click event listener to lightbox CTA button
       * or if user clicks outside lightbox
       * - Detects click outside lightbox, sends post request for relevant order method
       * and refreshes page
       */
      document.querySelector(`#${shared.ID}-order__now`).addEventListener('click', (e) => {
        if (orderMethod === 'Delivering') {
          window.__doPostBack('ctl00__objHeader_lbOrderForDelivery'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
        } else if (orderMethod === 'Collecting') {
          window.__doPostBack('ctl00__objHeader_lbOrderForCollection'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
        }
      });
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

    }
  });

  // ------------------- * NEW LIGHTBOX CHANGES * --------------------
  // -- Open Hours Container
  pollerLite(['.storeDetails h2.toggleDate'], () => {
    observer.connect(document.querySelector('.storeDetails h2.toggleDate'), () => {
      // console.log('[212] TOGGLE DATE HAS CHANGED');
      if (document.querySelector('.storeDetails h2.toggleDate').classList.contains('active')) {
        document.querySelector('.fancyStoreConfirm').classList.add('openHours__open');
      } else {
        document.querySelector('.fancyStoreConfirm').classList.remove('openHours__open');
      }
    }, {
      throttle: 200,
      config: {
        attributes: true,
        childList: false,
        // subtree: true,
      },
    });
  });
  // -- Special Opening Times
  pollerLite(['.specialOpeningTimes'], () => {
    const specialTimesContainer = document.querySelector('.specialOpeningTimes');
    // -- Move this outside the lightbox
    document.querySelector('.fancybox-overlay.fancybox-overlay-fixed').insertAdjacentElement('afterbegin', specialTimesContainer);
  });
  /**
   * @desc Detects resize and reloads page when user re-sizes window
   */
  window.addEventListener('resize', () => {   
    window.location.reload();
  });
  // -------------------------------------------
  // PRM Manager Listen for State Changes
  // -------------------------------------------
  window.prm.add_endRequest(function (sender, error) {
    try {
      // console.log(sender);
      if (sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$lbGetStarted") {
        pollerLite(['#ctl00_cphBody_pnlPostCodeError'], () => {
          const postcodeErrorMsg = document.querySelector(`.${shared.ID}-errorMsg`);
          if (postcodeErrorMsg) {
            postcodeErrorMsg.classList.remove('hide');
          }
        })
      } else if (sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbLoginRegisterItem"
      // || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbSelectStoreMenuItem"
      || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbFavoritesItem"
      || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbBasketItem") {
        document.querySelector(`.${shared.ID}-lightboxWrapper`).classList.add('hide');
      } else if (sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbCloseOnmibar2"
      || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbCloseOnmibar1"
      || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbCloseOnmibar3"
      || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbCloseOnmibar4") {
        document.querySelector(`.${shared.ID}-lightboxWrapper`).classList.remove('hide');
        document.querySelector(`.${shared.ID}-lightboxWrapper`).setAttribute('style', '');
      } else if (sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbSelectStoreMenuItem" 
        || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbEnterPostcode") {
        // || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbNoPostcode"
        pollerLite(['#ctl00__objHeader_lbEnterPostcode', '#ctl00__objHeader_lbNoPostcode'], () => {
 
          const postcodeSearchBtn = document.querySelector('a#ctl00__objHeader_lbEnterPostcode');
          const noPostcodeSearchBtn = document.querySelector('a#ctl00__objHeader_lbNoPostcode');
          if (postcodeSearchBtn && !document.querySelector(`.${shared.ID}-postcodeCtaHeader__container`)) {
            const headerPostcodeButtonsContainer = `<div class="${shared.ID}-orderOptionsHeader__wrapper">
              <div class="${shared.ID}-postcodeCtaHeader__container">
                <div class="${shared.ID}-orderOptions__wrapper ${shared.ID}-deliverCTA">
                  <a class="${shared.ID}-orderOptions__option" id="${shared.ID}-orderPostcode__delivery" value="${shared.ID}-delivery" onclick="dataLayer.push({'event': 'GAevent', 'eventCategory': 'StoreBar', 'eventAction': 'Postcode', 'eventLabel': ''});" id="ctl00__objHeader_lbEnterPostcode" href="javascript:__doPostBack('ctl00$_objHeader$lbEnterPostcode','')">
                    <span class="${shared.ID}-cta__img ${shared.ID}-img__delivery"></span>    
                    <span class="${shared.ID}-tooltiptext">Deliver to me</span>
                  </a>
                </div>
                <div class="${shared.ID}-orderOptions__wrapper ${shared.ID}-collectCTA">
                  <a class="${shared.ID}-orderOptions__option" id="${shared.ID}-orderPostcode__collect" value="${shared.ID}-collection" onclick="dataLayer.push({'event': 'GAevent', 'eventCategory': 'StoreBar', 'eventAction': 'Postcode', 'eventLabel': ''});" id="ctl00__objHeader_lbEnterPostcode" href="javascript:__doPostBack('ctl00$_objHeader$lbEnterPostcode','')">
                    <span class="${shared.ID}-cta__img ${shared.ID}-img__collect"></span>
                    <span class="${shared.ID}-tooltiptext">I'll collect</span> 
                  </a>
                </div>
              </div>
            </div>`;
            postcodeSearchBtn.insertAdjacentHTML('afterend', headerPostcodeButtonsContainer);
            bindClickEventOnCtaHeader(document.querySelector(`#${shared.ID}-orderPostcode__delivery`));
            bindClickEventOnCtaHeader(document.querySelector(`#${shared.ID}-orderPostcode__collect`));
          }
          if (noPostcodeSearchBtn && !document.querySelector(`.${shared.ID}-noPostcodeCtaHeader__container`)) {
            // bindClickEventOnCta(noPostcodeSearchBtn);
            const headerPostcodeButtonsContainer = `<div class="${shared.ID}-orderOptionsHeader__wrapper">
              <div class="${shared.ID}-noPostcodeCtaHeader__container">
                <div class="${shared.ID}-orderOptions__wrapper ${shared.ID}-deliverCTA">
                  <a class="${shared.ID}-orderOptions__option" id="${shared.ID}-orderNoPostcode__delivery" value="${shared.ID}-delivery" onclick="dataLayer.push({'event': 'GAevent', 'eventCategory': 'StoreBar', 'eventAction': 'Town', 'eventLabel': ''});" id="ctl00__objHeader_lbNoPostcode" href="javascript:__doPostBack('ctl00$_objHeader$lbNoPostcode','')">
                    <span class="${shared.ID}-cta__img ${shared.ID}-img__delivery"></span>    
                    <span class="${shared.ID}-tooltiptext">Deliver to me</span>
                  </a>
                </div>
                <div class="${shared.ID}-orderOptions__wrapper ${shared.ID}-collectCTA">
                  <a class="${shared.ID}-orderOptions__option" id="${shared.ID}-orderNoPostcode__collect" value="${shared.ID}-collection" onclick="dataLayer.push({'event': 'GAevent', 'eventCategory': 'StoreBar', 'eventAction': 'Town', 'eventLabel': ''});" id="ctl00__objHeader_lbNoPostcode" href="javascript:__doPostBack('ctl00$_objHeader$lbNoPostcode','')">
                    <span class="${shared.ID}-cta__img ${shared.ID}-img__collect"></span>
                    <span class="${shared.ID}-tooltiptext">I'll collect</span> 
                  </a>
                </div>
              </div>
            </div>`;
            noPostcodeSearchBtn.insertAdjacentHTML('afterend', headerPostcodeButtonsContainer);
            // bindClickEventOnCta(document.querySelector('#${shared.ID}-orderNoPostcode__delivery'));
            // bindClickEventOnCta(document.querySelector('#${shared.ID}-orderNoPostcode__collect'));
          }
        });
      } else if (sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbNoPostcode") {
        localStorage.setItem(`${shared.ID}-orderMethod`, "");
        pollerLite(['#ctl00__objHeader_lbEnterPostcode', '#ctl00__objHeader_lbNoPostcode'], () => {
 
          const postcodeSearchBtn = document.querySelector('a#ctl00__objHeader_lbEnterPostcode');
          const noPostcodeSearchBtn = document.querySelector('a#ctl00__objHeader_lbNoPostcode');
          if (postcodeSearchBtn && !document.querySelector(`.${shared.ID}-postcodeCtaHeader__container`)) {
            const headerPostcodeButtonsContainer = `<div class="${shared.ID}-orderOptionsHeader__wrapper">
              <div class="${shared.ID}-postcodeCtaHeader__container">
                <div class="${shared.ID}-orderOptions__wrapper ${shared.ID}-deliverCTA">
                  <a class="${shared.ID}-orderOptions__option" id="${shared.ID}-orderPostcode__delivery" value="${shared.ID}-delivery" onclick="dataLayer.push({'event': 'GAevent', 'eventCategory': 'StoreBar', 'eventAction': 'Postcode', 'eventLabel': ''});" id="ctl00__objHeader_lbEnterPostcode" href="javascript:__doPostBack('ctl00$_objHeader$lbEnterPostcode','')">
                    <span class="${shared.ID}-cta__img ${shared.ID}-img__delivery"></span>    
                    <span class="${shared.ID}-tooltiptext">Deliver to me</span>
                  </a>
                </div>
                <div class="${shared.ID}-orderOptions__wrapper ${shared.ID}-collectCTA">
                  <a class="${shared.ID}-orderOptions__option" id="${shared.ID}-orderPostcode__collect" value="${shared.ID}-collection" onclick="dataLayer.push({'event': 'GAevent', 'eventCategory': 'StoreBar', 'eventAction': 'Postcode', 'eventLabel': ''});" id="ctl00__objHeader_lbEnterPostcode" href="javascript:__doPostBack('ctl00$_objHeader$lbEnterPostcode','')">
                    <span class="${shared.ID}-cta__img ${shared.ID}-img__collect"></span>
                    <span class="${shared.ID}-tooltiptext">I'll collect</span> 
                  </a>
                </div>
              </div>
            </div>`;
            postcodeSearchBtn.insertAdjacentHTML('afterend', headerPostcodeButtonsContainer);
            bindClickEventOnCtaHeader(document.querySelector(`#${shared.ID}-orderPostcode__delivery`));
            bindClickEventOnCtaHeader(document.querySelector(`#${shared.ID}-orderPostcode__collect`));
          }
          if (noPostcodeSearchBtn && !document.querySelector(`.${shared.ID}-noPostcodeCtaHeader__container`)) {
            // bindClickEventOnCta(noPostcodeSearchBtn);
            const headerPostcodeButtonsContainer = `<div class="${shared.ID}-orderOptionsHeader__wrapper">
              <div class="${shared.ID}-noPostcodeCtaHeader__container">
                <div class="${shared.ID}-orderOptions__wrapper ${shared.ID}-deliverCTA">
                  <a class="${shared.ID}-orderOptions__option" id="${shared.ID}-orderNoPostcode__delivery" value="${shared.ID}-delivery" onclick="dataLayer.push({'event': 'GAevent', 'eventCategory': 'StoreBar', 'eventAction': 'Town', 'eventLabel': ''});" id="ctl00__objHeader_lbNoPostcode" href="javascript:__doPostBack('ctl00$_objHeader$lbNoPostcode','')">
                    <span class="${shared.ID}-cta__img ${shared.ID}-img__delivery"></span>    
                    <span class="${shared.ID}-tooltiptext">Deliver to me</span>
                  </a>
                </div>
                <div class="${shared.ID}-orderOptions__wrapper ${shared.ID}-collectCTA">
                  <a class="${shared.ID}-orderOptions__option" id="${shared.ID}-orderNoPostcode__collect" value="${shared.ID}-collection" onclick="dataLayer.push({'event': 'GAevent', 'eventCategory': 'StoreBar', 'eventAction': 'Town', 'eventLabel': ''});" id="ctl00__objHeader_lbNoPostcode" href="javascript:__doPostBack('ctl00$_objHeader$lbNoPostcode','')">
                    <span class="${shared.ID}-cta__img ${shared.ID}-img__collect"></span>
                    <span class="${shared.ID}-tooltiptext">I'll collect</span> 
                  </a>
                </div>
              </div>
            </div>`;
            noPostcodeSearchBtn.insertAdjacentHTML('afterend', headerPostcodeButtonsContainer);
            // bindClickEventOnCta(document.querySelector('#${shared.ID}-orderNoPostcode__delivery'));
            // bindClickEventOnCta(document.querySelector('#${shared.ID}-orderNoPostcode__collect'));
          }
        });
        
        // --- No postcode lightbox
        pollerLite([`.${shared.ID}-orderOptions__option span.centerB`], () => {
          const noPostcodeBtns = `<div class="${shared.ID}-noPostcodeButtons__wrapper">
            <div class="${shared.ID}-orderOptions__wrapper ${shared.ID}-deliverCTA">
              <a class="${shared.ID}-orderOptions__option greenButton" id="${shared.ID}-noPostcodeOrder__delivery" value="${shared.ID}-delivery" href="javascript:__doPostBack('ctl00$_objHeader$lbOrderForDelivery','')">
                <span class="leftB"></span>  
                <span class="centerB">Deliver</span>
                <span class="rightB"></span>
              </a>
            </div>
            <div class="${shared.ID}-orderOptions__wrapper ${shared.ID}-collectCTA">
              <a class="${shared.ID}-orderOptions__option greenButton" id="${shared.ID}-noPostcodeOrder__collect" value="${shared.ID}-collection" href="javascript:__doPostBack('ctl00$_objHeader$lbOrderForCollection','')">
                <span class="leftB"></span>  
                <span class="centerB">I'll collect</span>
                <span class="rightB"></span>
              </a>
            </div>
          </div>`;

          document.querySelector(`#fancyStoreConfirm`).insertAdjacentHTML('beforeend', noPostcodeBtns);

          // ----- HIDE LOADER HERE
          setTimeout(function(){
            const loaderContainer = document.querySelectorAll(`div.${shared.ID}-loader__wrapper`);
            if (loaderContainer.length > 0) {
              [].forEach.call(loaderContainer, (loader) => {
                loader.classList.add('hide');
              });
            }
          }, 1500);

          document.querySelector(`.fancybox-overlay-fixed`).classList.add('noPostcodeLightbox');
          document.querySelector('.fancybox-overlay.fancybox-overlay-fixed.noPostcodeLightbox').addEventListener('click', (e) => {   
            if (!document.querySelector('.fancybox-wrap.fancybox-desktop.fancybox-type-inline').contains(e.target)){
              // Clicked outside the box
              window.location.reload();
            }
          });
        });
        
      }
    } catch (e) {} 
  });
};

export default activate;
