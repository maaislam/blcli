/**
 * PJ065 - Forced postcode entry
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import settings from './settings';

const { ID, VARIATION } = settings;

const activate = () => {
  setup();
  // New Lightbox
  const postcodeInputEl = document.querySelector('input#ctl00_cphBody_txtPostcode');
  let deactivateBtns = "";
  if (postcodeInputEl && postcodeInputEl.value === "") {
    deactivateBtns = "inactive";
  }
  const mainContent = document.querySelector('#ctl00__objHeader_upOneClickPopup');
  if (mainContent) {
    const newLightBox = `<div class="PJ065-lightboxWrapper">
      <div class="PJ065-lightboxContainer">
        <div class="PJ065-banner__wrapper">
          <div class="PJ065-banner"></div>
          <div class="triangle-wrapper"><div></div></div>
        </div>
        <div class="PJ065-input__wrapper"><div class="PJ065-errorMsg hide">The postcode you entered is invalid</div></div>
        <div class="PJ065-info__wrapper"><a href="javascript:__doPostBack('ctl00$_objHeader$lbSelectStoreMenuItem','')">No postcode? Click here.</a></div>
        <div class="PJ065-buttons__wrapper ${deactivateBtns}">
          <div class="PJ065-orderOptions__wrapper PJ065-deliverCTA">
            <a class="PJ065-orderOptions__option greenButton" id="PJ065-order__delivery" value="PJ065-delivery" href="javascript:__doPostBack('ctl00$cphBody$lbGetStarted','')">
              <span class="leftB"></span>  
              <span class="centerB">Deliver</span>
              <span class="rightB"></span>
            </a>
          </div>
          <div class="PJ065-orderOptions__wrapper PJ065-collectCTA">
            <a class="PJ065-orderOptions__option greenButton" id="PJ065-order__collect" value="PJ065-collection" href="javascript:__doPostBack('ctl00$cphBody$lbGetStarted','')">
              <span class="leftB"></span>  
              <span class="centerB">I'll collect</span>
              <span class="rightB"></span>
            </a>
          </div>
        </div>
      </div>
    </div>`;

    mainContent.insertAdjacentHTML('afterend', newLightBox);

    const newLightBoxContainer = document.querySelector('.PJ065-lightboxWrapper .PJ065-lightboxContainer');
    // --- Move input field in new Lightbox
    newLightBoxContainer.querySelector('.PJ065-input__wrapper').insertAdjacentElement('afterbegin', postcodeInputEl);

    /**
     * @desc Checks if there is a postcode value and shows CTA buttons
     */
    postcodeInputEl.addEventListener('input', () => {
      if (postcodeInputEl && postcodeInputEl.value !== "") {
         document.querySelector('.PJ065-buttons__wrapper').classList.remove('inactive');
         const postcodeErrorMsg = document.querySelector('.PJ065-errorMsg');
          if (postcodeErrorMsg && !postcodeErrorMsg.classList.contains('hide')) {
            postcodeErrorMsg.classList.add('hide');
          }
      } else {
        document.querySelector('.PJ065-buttons__wrapper').classList.add('inactive');
      }
    });

    let orderMethod = "";
    function bindClickEventOnCta(cta) {
      cta.addEventListener('click', () => {
        orderMethod = cta.getAttribute('value');
        if (orderMethod && orderMethod !== "") {
          localStorage.setItem('PJ065-orderMethod', orderMethod);

          // --- SHOW LOADER HERE
          pollerLite(['#fancyStoreConfirm'], () => {
            // ADD LOADER HERE
            document.querySelector('#fancyStoreConfirm').insertAdjacentHTML('afterbegin', `<div class="PJ065-loader__wrapper"><div class="PJ065-loader"></div></div>`);

            // document.querySelector('.PJ065-lightboxContainer').style.display = 'none !important';
            document.querySelector('.PJ065-lightboxContainer').setAttribute('style', 'display: none !important;');
          });
        }
      });
    }

    /**
     * @desc If the user clicks on "No postcode? Click here" link
     * hide lightbox
     */
    pollerLite(['.PJ065-info__wrapper'], () => {
      const noPostcodeLink = document.querySelector('.PJ065-info__wrapper a');

      noPostcodeLink.addEventListener('click', (e) => {
        document.querySelector('.PJ065-lightboxWrapper').setAttribute('style', 'display: none !important;');
      });
      
    });
    /**
     * @desc Call CTA event function once new CTA buttons have been added
     */
    pollerLite(['#PJ065-order__delivery', '#PJ065-order__collect'], () => {
      const deliveryCTA = document.querySelector('#PJ065-order__delivery');
      const collectCTA = document.querySelector('#PJ065-order__collect');

      bindClickEventOnCta(deliveryCTA);
      bindClickEventOnCta(collectCTA);
    });
  }

  pollerLite(['.fancybox-wrap.fancybox-desktop.fancybox-type-inline.fancybox-opened', '.storeDetails p > strong'], () => {
    // --------- STEP 2
    // Hide First Step 
    document.querySelector('.PJ065-lightboxWrapper').setAttribute('style', 'display: none;');
    // Get Order Method
    let orderMethod = '';
    let hideMinimumForDelivery = '';
    let hidePreOrder = '';
    let orderAction = '';
    switch(localStorage.getItem('PJ065-orderMethod')) {
      case 'PJ065-delivery':
        orderMethod = 'Delivering';
        orderAction = '';
        // const minDeliveryContainer = document.querySelector('.fancyStoreConfirmCont .buttons').nextElementSibling;
        // minDeliveryContainer.classList.add('PJ065-minDelivery');
        // // minDeliveryContainer.insertAdjacentHTML('afterend', `<div class="PJ065-hours__tooltip"><div class="PJ065-tooltiptext">Hours etc</div></div>`)
        // document.querySelector('div.fancybox-inner h1').insertAdjacentHTML('afterend', `<div class="PJ065-hours__tooltip"><div class="PJ065-tooltiptext"><p>Opening Hours:</p></div></div>`);
        document.querySelector('.fancyStoreConfirmCont .storeDetails').insertAdjacentHTML('beforeend', `<div class="PJ065-minimum-delivery__msg">* Minimum spend for delivery is £12.99</div>`);
        break;
      case 'PJ065-collection':
        orderMethod = 'Collecting';
        hideMinimumForDelivery = 'hide';
        // document.querySelector('.fancyStoreConfirmCont .buttons').nextElementSibling.setAttribute('style', 'display: none !important;');
        // document.querySelector('div.fancybox-inner h1').insertAdjacentHTML('afterend', `<div class="PJ065-hours__tooltip"><div class="PJ065-tooltiptext"><p>Opening Hours:</p></div></div>`);
        orderAction = '';
        break;
    }

    // Get Opening Hours --- OLD
    const openingHoursEl = document.querySelector('.fancyStoreConfirmCont .storeDetails .openingHours');
    const tooltipEl = document.querySelector('.PJ065-hours__tooltip');
    // const insideTooltipBox = tooltipEl.querySelector('.PJ065-tooltiptext p');
    // insideTooltipBox.insertAdjacentElement('afterend', openingHoursEl);

    document.querySelector('.fancybox-wrap.fancybox-desktop.fancybox-type-inline.fancybox-opened').style.width = '370px !important';
    
    const orderMethodContainer = `<div class="PJ065-orderMethod__wrapper"><div class="PJ065-orderMethod">${orderMethod} from</div></div>`;
    document.querySelector('.fancybox-wrap.fancybox-desktop.fancybox-type-inline.fancybox-opened .storeDetails').insertAdjacentHTML('afterbegin', orderMethodContainer);
    // --- Add new CTA button
    let ctaButton = 'Pre-order';
    if (document.querySelector('#fancyStoreConfirm h2.title').innerText.trim().toUpperCase().indexOf("CURRENTLY CLOSED BUT YOU CAN ORDER FOR LATER") === -1) {
      // hidePreOrder = 'hide';
      ctaButton = 'Start Ordering';
    } else {
      // Add after Address
      document.querySelector('.fancyStoreConfirmCont').insertAdjacentHTML('beforeend', `<div class="PJ065-storeClosed__message">Currently closed PRE-ORDER for later</div>`)
    }
    const newCtaBtn = `<div class="PJ065-buttons__wrapper ">
      <div class="triangle-wrapper"><div></div></div>
      <div class="PJ065-orderOptions__wrapper PJ065-orderNowCTA">
        <div class="PJ065-orderOptions__option greenButton" id="PJ065-order__now" value="PJ065-orderNow">
          <span class="leftB"></span>  
          <span class="centerB">${ctaButton}</span>
          <span class="rightB"></span>
        </div>
      </div>
    </div>`;

    document.querySelector('.fancybox-wrap.fancybox-desktop.fancybox-type-inline.fancybox-opened .fancybox-inner').insertAdjacentHTML('beforeend', newCtaBtn);
    // ----- HIDE LOADER HERE
    setTimeout(function(){
      const loaderContainer = document.querySelector('div.PJ065-loader__wrapper');
      if (loaderContainer) {
        loaderContainer.classList.add('hide');
      }
    }, 1500);

    /**
     * @desc Order Action
     * - Adds Click event listener to lightbox CTA button
     * or if user clicks outside lightbox
     * - Detects click outside lightbox, sends post request for relevant order method
     * and refreshes page
     */
    document.querySelector
    document.querySelector('#PJ065-order__now').addEventListener('click', (e) => {
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
          const postcodeErrorMsg = document.querySelector('.PJ065-errorMsg');
          if (postcodeErrorMsg) {
            postcodeErrorMsg.classList.remove('hide');
          }
        })
      } else if (sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbLoginRegisterItem"
      || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbSelectStoreMenuItem"
      || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbFavoritesItem"
      || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbBasketItem") {
        document.querySelector('.PJ065-lightboxWrapper').classList.add('hide');
      } else if (sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbCloseOnmibar2"
      || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbCloseOnmibar1"
      || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbCloseOnmibar3"
      || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbCloseOnmibar4") {
        document.querySelector('.PJ065-lightboxWrapper').classList.remove('hide');
        document.querySelector('.PJ065-lightboxWrapper').setAttribute('style', '');
      }
    } catch (e) {} 
  });
};

export default activate;
