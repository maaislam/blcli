/**
 * PJ074 - "% or £ off" Offer Prominence - Mobile
 * @author User Conversion
 */
import {
  setup,
  generateOfferBlock,
  modifycounter,
} from './services';
import {
  cacheDom
} from '../../../../../lib/cache-dom';
import {
  pollerLite,
  observer
} from '../../../../../lib/uc-lib';
import settings from './settings';

const {
  ID,
  VARIATION
} = settings;

/**
 * Helper - ping the basket and scrape offer information
 * from it - offer is either met (in table cell) or a notification
 * is shown instructing on how to meet offer (promo message)
 *
 * @return {Promise}
 */
const getOfferInfoFromBasket = () => {
  return new Promise((res, rej) => {
    pollerLite([() => !!window.jQuery], () => {
      const basketMessage = document.querySelector('#ctl00__objHeader_trBasketMessageMobile');
      const basketDiscountEl = document.querySelector('#ctl00__objHeader_upHeaderBasketMobile .fancyScrollable .intBasket');
      let result = {
        offerApplicable: false,
        outstandingValue: null,
        outstandingMessage: null,
        discountCellText: null,
      };
      if (basketMessage && basketMessage.querySelector('div.errorMessage p')) {
        const messageText = basketMessage.querySelector('div.errorMessage p').innerText.trim();
        result.outstandingMessage = messageText;
        // console.log('MESSAGE    :');
        // console.log(messageText);
        // console.log(result.outstandingMessage);
        
        let match = messageText.match(/£(\d+\.\d+)/i);
        // console.log(match);
        // console.log('-  -  -  -  -  -  -  -  -   -');
        if(match && match[1]) {
          result.offerApplicable = true;
          result.outstandingValue = parseFloat(match[1]);
        }

        match = messageText.match(/(\d+\%)/i);
        if(match && match[0]) {
          result.offerApplicable = true;
          result.discountCellText = `get ${match[0]} off`;
        }
      } else if (basketDiscountEl) {
        const offerActivatedLeft = basketDiscountEl.nextElementSibling;

        result.offerApplicable = true;
        result.outstandingValue = -100;
      }

      res(result);
    });
  });
  /////////////////////////////////////////////////////
};

/**
 * Entry point for experiment
 */
const activate = () => {
  setup();

  const urlPathname = window.location.pathname;
  if (urlPathname.indexOf('/offers.aspx') > -1) {
    const allOffers = document.querySelectorAll('.offer-m');
    [].forEach.call(allOffers, (offer) => {
      const offerTitle = offer.querySelector('h2');
      let offerTitleText = '';
      if (offerTitle) {
        offerTitleText = offerTitle.innerHTML.toLowerCase();

        /**
         * @desc Gets all offers that have '£ off' and/or '%' in their name
         * and adds the offer name in LocalStorage
         */
        if (offerTitleText.indexOf('%') > -1 || (offerTitleText.indexOf('£') > -1 && offerTitleText.indexOf('off ') > -1 && offerTitleText.indexOf('meal deal') === -1)) {
          let ctaBtn = null;
          if (offer.querySelector('a.actionButton')) {
            ctaBtn = offer.querySelector('a.actionButton');
          } else if (offer.querySelector('a.aspNetDisabled.blackButton')) {
            ctaBtn = offer.querySelector('a.aspNetDisabled.blackButton');
          }

          if (ctaBtn !== null) {
            ctaBtn.addEventListener('click', (e) => {
              localStorage.setItem(`${ID}-offerSelected`, `${offerTitleText}`);
            });
          }
        }
      }
    });
  }

  if(urlPathname.indexOf('/offers.aspx') > -1 
    || urlPathname.indexOf('/pizzas.aspx') > -1
    || urlPathname.indexOf('/sides.aspx') > -1
    || urlPathname.indexOf('/desserts.aspx') > -1
    || urlPathname.indexOf('/drinks.aspx') > -1
    || urlPathname.indexOf('/vegan.aspx') > -1
  ) {
    getOfferInfoFromBasket().then((offerInfo) => {
     if (urlPathname.indexOf('/offers.aspx') > -1) {
        //const allOffers = document.querySelectorAll('.menuList.offerList');
        //const offerSelected = localStorage.getItem(`${ID}-offerSelected`);

        //// Change the button name and BG if the offer is already into the localstorage
        //if(offerInfo.offerApplicable && offerSelected){
        //  const offerButton = offer.querySelector('.greenButton');
        //  if(offerTitle.textContent.trim().indexOf(offerSelected.substr(0, 3)) > -1){
        //    offerButton.innerHTML = '<span class="leftB"></span><span class="centerB" style="color:#000!important;">Offer in basket</span><span class="rightB"></span>';
        //    offerButton.setAttribute('style', 'background-color:#f1f1f1;');
        //  }
        //}
      } else if (urlPathname.indexOf('/pizzas.aspx') > -1 || urlPathname.indexOf('/vegan.aspx') > -1 && offerInfo.offerApplicable) {
        // console.log('[163]   offers:');
        // console.log(offerInfo);
        const allPizzas = document.querySelectorAll('.menuListCont');
        //Inject the test
        generateOfferBlock('pizza');
        modifycounter(offerInfo.outstandingValue);
        [].forEach.call(allPizzas, (pizza) => {
        });
        // ----- Check with Joe if there is something added to the dataLayer when an item is added to the basket
        // instead of adding event listeners on user action
        // ID for adding to basket, below:
        // sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$rptProductLists$ctl01$_objMenuProductList$rptProducts$ctl01$_objMenuProduct$lbAddToBasket"
      } else if (urlPathname.indexOf('/sides.aspx') > -1 && offerInfo.offerApplicable) {
        generateOfferBlock('sides');
        modifycounter(offerInfo.outstandingValue);
        // --- NEW - Hide promo banner
        const promoBanner = document.querySelector('#ctl00_cphBody__objMenuHeader_pnlFeatureBanner');
        if (promoBanner) {
          promoBanner.setAttribute('style', 'display: none !important;');
        }
        if (localStorage.getItem('PJ074-offerSelected').indexOf('off pizzas') > -1) {
          // Show banner loader as inactive
          // Page is not part of the offer
        } else {
          // Show active loader
          // and run test to calculate
        }
      } else if (urlPathname.indexOf('/drinks.aspx') > -1 && offerInfo.offerApplicable) {
        generateOfferBlock('sides');
        modifycounter(offerInfo.outstandingValue);
        // --- NEW - Hide promo banner
        const promoBanner = document.querySelector('#ctl00_cphBody__objMenuHeader_pnlFeatureBanner');
        if (promoBanner) {
          promoBanner.setAttribute('style', 'display: none !important;');
        }
        if (localStorage.getItem('PJ074-offerSelected').indexOf('off pizzas') > -1) {
          // Show banner loader as inactive
          // Page is not part of the offer
        } else {
          // Show active loader
          // and run test to calculate 
        }
      } else if (urlPathname.indexOf('/desserts.aspx') > -1 && offerInfo.offerApplicable) {
        generateOfferBlock('sides');
        modifycounter(offerInfo.outstandingValue);
        // --- NEW - Hide promo banner
        const promoBanner = document.querySelector('#ctl00_cphBody__objMenuHeader_pnlFeatureBanner');
        if (promoBanner) {
          promoBanner.setAttribute('style', 'display: none !important;');
        }
        if (localStorage.getItem('PJ074-offerSelected').indexOf('off pizzas') > -1) {
          // Show banner loader as inactive
          // Page is not part of the offer
        } else {
          // Show active loader
          // and run test to calculate 
        }
      }
    });
  }

  // ----- Will probably need the same for Desserts and Vegan Pages (you should check with Dan)
  pollerLite(['.fancybox-overlay'], () => {
    observer.connect(document.querySelector('.fancybox-overlay'), () => {
      const basketOverlay = document.querySelector('.fancybox-overlay');
      const basketOverlayStyle = basketOverlay.getAttribute('style');
      if (basketOverlayStyle.indexOf('display: block;') > -1) {
        document.querySelector(`.${ID}_offerWrap`).removeAttribute('style');
      }
    }, {
      throttle: 200,
      config: {
        attributes: false,
        childList: true,
        // subtree: true,
      },
    });
  });

  // // --- If mainMobileInside style changes
  // observer.connect(document.querySelector('#ctl00__objHeader_upBasketNotification'), () => {
  //   let mainContainerStyle = document.querySelector('.main.mainMobileInside').getAttribute('style');
  //   mainContainerStyle = mainContainerStyle.replace('margin-top', 'padding-top');
  //   document.querySelector(`.${ID}_offerWrap`).setAttribute('style', `${mainContainerStyle}`);
  // }, {
  //   throttle: 200,
  //   config: {
  //     attributes: false,
  //     childList: true,
  //     // subtree: true,
  //   },
  // });

  // --- If top white space has been added and basket notification removed
  // ---- Remove white space
  observer.connect(document.querySelector('.header .basketNotification'), () => {
    const basketNotification = document.querySelector('.header .basketNotification');
    const basketNotificationStyle = basketNotification.getAttribute('style');
    if (basketNotificationStyle.indexOf('display: block') === -1) {
      document.querySelector(`.${ID}_offerWrap`).removeAttribute('style');
    } else {
      // if (!basketNotification.querySelector('span')) {
      //   console.log('[229] - - - - - - -  here');
      //   let mainContainerStyle = document.querySelector('.main.mainMobileInside').getAttribute('style');
      //   mainContainerStyle = mainContainerStyle.replace('margin-top', 'padding-top');
      //   document.querySelector(`.${ID}_offerWrap`).setAttribute('style', `${mainContainerStyle}`);
      // }
      
    }
  }, {
    throttle: 200,
    config: {
      attributes: true,
      childList: false,
      // subtree: true,
    },
  });

  // -------------------------------------------
  // PRM Manager Listen for State Changes
  // -------------------------------------------
  window.prm.add_endRequest(function (sender, error) {
    // console.log(sender);
    try {
      if (sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$_objOffers$rdFilterMealDeals" || 
      sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$_objOffers$rdFilterSpecialPricePizza" || 
      sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$_objOffers$rdFilterPoundOrOff" || 
      sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$_objOffers$rdFilterAll" || 
      sender['_postBackSettings'].asyncTarget === "ctl00_cphBody_pnlMenuHolder"
      ) {
        activate();
      } else if (sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbNotificationViewBasket") {
        // console.log('[325] REMOVE STYLE -----');
        const basketOverlay = document.querySelector('.fancybox-overlay');
        const basketOverlayStyle = basketOverlay.getAttribute('style');
        if (basketOverlayStyle.indexOf('display: block;') > -1) {
          document.querySelector(`.${ID}_offerWrap`).removeAttribute('style');
        }
      } else if (sender['_postBackSettings'].asyncTarget.indexOf("_objMenuProduct$lbAddToBasket") > -1) {
        //sender['_postBackSettings'].asyncTarget ==="ctl00$_objHeader$lbBasketItem"
        const headerBasketNotification = document.querySelector('.header .basketNotification');
        const notificationDisplay = headerBasketNotification.getAttribute('style');
        // if (notificationDisplay.indexOf('display: block') > -1) {
        //   console.log('[269] - - - - - - -  here');
        //   let mainContainerStyle = document.querySelector('.main.mainMobileInside').getAttribute('style');
        //   mainContainerStyle = mainContainerStyle.replace('margin-top', 'padding-top');
        //   document.querySelector(`.${ID}_offerWrap`).setAttribute('style', `${mainContainerStyle}`);
        // }
      }

      getOfferInfoFromBasket().then((offerInfo) => {
        if(offerInfo && offerInfo.offerApplicable) {
          modifycounter(offerInfo.outstandingValue);
        }
      });
    } catch (e) {}
  });
};

export default activate;
