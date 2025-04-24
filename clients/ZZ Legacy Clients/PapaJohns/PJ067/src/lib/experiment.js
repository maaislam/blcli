/**
 * PJ067 - "% or £ off" Offer Prominence
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
  const {
    ID,
    VARIATION
  } = settings;

  return new Promise((res, rej) => {
    const started = +new Date;

    pollerLite([() => !!window.jQuery], () => {

      $.get('/basket-confirmation.aspx', (data) => {
        const $data = $(data);
        if($data) {
          let result = {
            offerApplicable: false,
            outstandingValue: null,
            outstandingMessage: null,
            discountCellText: null,
          };

          const promoMessage = $data.find('#ctl00_cphBody__pnlPromoError');
          if(promoMessage.length) {
            let outstandingMessage = promoMessage.text().trim();
            result.outstandingMessage = outstandingMessage.trim();

            const match = outstandingMessage.match(/£(\d+\.\d+)/i);
            if(match && match[1]) {
              result.offerApplicable = true;
              result.outstandingValue = parseFloat(match[1]);
            }

            outstandingMessage = outstandingMessage.replace(/\s\s/, ' ');

            
            const percentMatch = outstandingMessage.match(/get \d+% off/ig);
            if(percentMatch) {
              result.discountCellText = percentMatch;
            }

            const poundMatch = outstandingMessage.match(/get £\d+(\.\d+)? off/ig);
            if(poundMatch) {
              result.discountCellText = poundMatch;
            }
          }

          const discountCell = $data.find('#ctl00_cphBody_divBasket .discountRow td:first');
          if(discountCell.length) {
            const discountCellText = discountCell.text().trim();
            if(discountCellText) {
              result.offerApplicable = true;
              result.discountCellText = discountCellText.replace(/\([\w\d]+\)/i, '');
            }
          }

          if(result.offerApplicable) {
            const ended = +new Date;
            const timeElapsed = ended - started;

            let timingMessage = 'slow';

            if(timeElapsed < 600) {
              timingMessage = 'seamless';
            } else if(timeElapsed < 1200) {
              timingMessage = 'quick';
            } else if(timeElapsed < 2000) {
              timingMessage = 'average';
            } else if(timeElapsed < 3000) {
              timingMessage = 'delayed';
            }

            window.dataLayer.push({
              event: ID,
              variant: `${ID}-v-${VARIATION}`,
              action: 'timing--' + timingMessage,
            });

            window.dataLayer.push({
              event: ID,
              variant: `${ID}-v-${VARIATION}`,
              action: 'did-load-offer-info',
            });
          }

          res(result);
        }
      });
    });
  });
};

/**
 * Entry point for experiment
 */
const activate = () => {

  setup();

  const urlPathname = window.location.pathname;
  
  if(settings.VARIATION != 'control') {
    if (urlPathname.indexOf('/offers.aspx') > -1) {
      const allOffers = document.querySelectorAll('.menuList.offerList');
      [].forEach.call(allOffers, (offer) => {
        const offerTitle = offer.querySelector('h3');
        let offerTitleText = '';
        if (offerTitle) {
          offerTitleText = offerTitle.innerHTML.toLowerCase();

          /**
           * @desc Gets all offers that have '£ off' and/or '%' in their name
           * and adds the offer name in LocalStorage
           */
          if (offerTitleText.indexOf('%') > -1 || (offerTitleText.indexOf('£') > -1 && offerTitleText.indexOf('off ') > -1 && offerTitleText.indexOf('meal deal') === -1)) {
            let ctaBtn = null;
            if (offer.querySelector('a.greenButton')) {
              ctaBtn = offer.querySelector('a.greenButton');
            } else if (offer.querySelector('a.aspNetDisabled.blackButton')) {
              ctaBtn = offer.querySelector('a.aspNetDisabled.blackButton');
            }

            ctaBtn.addEventListener('click', (e) => {
              localStorage.setItem(`${ID}-offerSelected`, `${offerTitleText}`);
              //e.preventDefault();

              //setTimeout(() => {
              //  let result = confirm('Selecting this offer will remove your current offer. Do you want to proceed?');
              //  if(result){
              //    localStorage.setItem(`${ID}-offerSelected`, `${offerTitleText}`);

              //    window.location = '/pizzas.aspx';
              //  }
              //}, 100);
            });
          }
        }
      });
    }
  }

  if(urlPathname.indexOf('/pizzas.aspx') > -1 && settings.VARIATION != 'control') {
    document.body.classList.add(`${ID}-is-pizzas`);
  } else {
    document.body.classList.add(`${ID}-not-is-pizzas`);
  }

  if(urlPathname.indexOf('/offers.aspx') > -1 
    || urlPathname.indexOf('/pizzas.aspx') > -1
    || urlPathname.indexOf('/sides.aspx') > -1
    || urlPathname.indexOf('/sides.aspx') > -1
    || urlPathname.indexOf('/drinks.aspx') > -1
  ) {
    getOfferInfoFromBasket().then((offerInfo) => {
     if (urlPathname.indexOf('/offers.aspx') == -1) {
      window.dataLayer.push({
        event: ID,
        variant: `${ID}-v-${VARIATION}`,
        action: 'will-show-offer-block',
      });
     }

     if(settings.VARIATION == 'control') {
      return;
     } else {
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
        } else if (urlPathname.indexOf('/pizzas.aspx') > -1 && offerInfo.offerApplicable) {
          const allPizzas = document.querySelectorAll('.menuListCont');
          //Inject the test
          generateOfferBlock('pizza', offerInfo);
          modifycounter(offerInfo);
          [].forEach.call(allPizzas, (pizza) => {
          });
          // ----- Check with Joe if there is something added to the dataLayer when an item is added to the basket
          // instead of adding event listeners on user action
          // ID for adding to basket, below:
          // sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$rptProductLists$ctl01$_objMenuProductList$rptProducts$ctl01$_objMenuProduct$lbAddToBasket"
        } else if (urlPathname.indexOf('/sides.aspx') > -1 && offerInfo.offerApplicable) {
          generateOfferBlock('sides', offerInfo);
          modifycounter(offerInfo);
          // --- NEW - Hide promo banner
          const promoBanner = document.querySelector('#ctl00_cphBody__objMenuHeader_pnlFeatureBanner');
          if (promoBanner) {
            promoBanner.setAttribute('style', 'display: none !important;');
          }
          if (localStorage.getItem('PJ067-offerSelected').indexOf('off pizzas') > -1) {
            // Show banner loader as inactive
            // Page is not part of the offer
          } else {
            // Show active loader
            // and run test to calculate
          }
        } else if (urlPathname.indexOf('/drinks.aspx') > -1 && offerInfo.offerApplicable) {
          generateOfferBlock('sides', offerInfo);
          modifycounter(offerInfo);
          // --- NEW - Hide promo banner
          const promoBanner = document.querySelector('#ctl00_cphBody__objMenuHeader_pnlFeatureBanner');
          if (promoBanner) {
            promoBanner.setAttribute('style', 'display: none !important;');
          }
          if (localStorage.getItem('PJ067-offerSelected').indexOf('off pizzas') > -1) {
            // Show banner loader as inactive
            // Page is not part of the offer
          } else {
            // Show active loader
            // and run test to calculate 
          }
        }
     }
    });
  }

  if(settings.VARIATION == 'control') {
    return;
  }

  // ----- Will probably need the same for Desserts and Vegan Pages (you should check with Dan)


  // -------------------------------------------
  // PRM Manager Listen for State Changes
  // -------------------------------------------
  window.prm.add_endRequest(function (sender, error) {
    try {
      if (sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$_objOffers$rdFilterMealDeals" || 
      sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$_objOffers$rdFilterSpecialPricePizza" || 
      sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$_objOffers$rdFilterPoundOrOff" || 
      sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$_objOffers$rdFilterAll" || 
      sender['_postBackSettings'].asyncTarget === "ctl00_cphBody_pnlMenuHolder"
      ) {
        activate();
      }

      getOfferInfoFromBasket().then((offerInfo) => {
        if(offerInfo && offerInfo.offerApplicable) {
          modifycounter(offerInfo);
        }
      });
    } catch (e) {}
  });
};

export default activate;
