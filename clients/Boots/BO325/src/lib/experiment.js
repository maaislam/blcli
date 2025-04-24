/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

let promoTextOptions = [];
let promoModal, promoButton, promoTextHolder;

const fireOnListerUpdates = (callback, frequency = 500) => {

  // helper function for comparing nodeLists
  const eq = (A, B) => {
    if (A.length !== B.length) return false;
    for (let i = 0; i < A.length; i++) {
      if (A[i] !== B[i]) return false;
    }
    return true;
  }

  let titles = document.querySelectorAll('.oct-teaser-with-listers').length > 0 ? document.querySelectorAll('.oct-teaser-with-listers') : document.querySelectorAll('.product_name_link');

  window.setInterval(() => {
    let newTitles = document.querySelectorAll('.oct-teaser-with-listers').length > 0 ? document.querySelectorAll('.oct-teaser-with-listers') : document.querySelectorAll('.product_name_link');
    if (!eq(titles, newTitles)) {
      titles = newTitles;
      callback();
    }
  }, frequency)


}

const checkAppliedPromos = () => {

  let appliedPromos = [];

  promoTextOptions.forEach((promo) => {

    if(promo.classList.contains('checkbox-list-facet__child--selected')) {

      appliedPromos.push(promo);

    }

  });

  if(appliedPromos.length > 0) {

    let promoAppliedHolderHTML = `
  
      <div class="${ID}-appliedpromos">

        <div class="${ID}-appliedpromos--title">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none"><path d="M21.4486 14.4693L13.9798 21.938C13.7863 22.1317 13.5566 22.2854 13.3037 22.3902C13.0507 22.4951 12.7796 22.549 12.5059 22.549C12.2321 22.549 11.961 22.4951 11.7081 22.3902C11.4552 22.2854 11.2254 22.1317 11.0319 21.938L2.08398 13.0005V2.58386H12.5007L21.4486 11.5318C21.8366 11.9221 22.0544 12.4501 22.0544 13.0005C22.0544 13.5509 21.8366 14.0789 21.4486 14.4693Z" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.28931 7.79114H7.3094" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Selected Offer${appliedPromos.length == 1 ? `` : `s`}</span>

        </div>

        <div class="${ID}-appliedpromos--list">
          ${appliedPromos.length == 1 ? `<span>${appliedPromos[0].innerText}</span>` : `<span>${appliedPromos.length} offers selected</span>`}
        </div>

        <button class="${ID}-appliedpromos--close"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M0.999999 17L17 1M17 17L1 0.999999" stroke="#05054B" stroke-linecap="round" stroke-linejoin="round"/></svg> </button>
      
      
      </div>
    
    
    
    `;

    let pagination = document.querySelector('.oct-listers-hits__top .oct-listers__pagination');

    if(window.outerWidth < 992) {
      pagination = document.getElementById('hits');
    } else {
      pagination.closest('.oct-listers-hits__top').classList.add(`${ID}-promosactive`);
    }

    pagination.insertAdjacentHTML('beforebegin', promoAppliedHolderHTML);
  } else {
      
    document.querySelector('.oct-listers-hits__top')?.classList.remove(`${ID}-promosactive`);
    document.querySelector(`.${ID}-appliedpromos`)?.remove();
  
    
  }


}

const processPromos = () => {

  let allPromosLength = promoTextOptions.length;

  promoTextHolder.innerHTML = `<p><span>${allPromosLength}</span> offer${allPromosLength > 1 ? `s` : ``} available</p>`;
 
  let all3f2Promos = [];
  let allPercentPromos = [];
  let allFreeGiftPromos = [];
  let allAdCardPromos = [];
  let allSavingsPromos = [];

  promoTextOptions.forEach((promo) => {

    if (promo.querySelector('.checkbox__label').innerText.toLowerCase().includes('3 for 2')) {

      all3f2Promos.push(promo);

    } else if (promo.querySelector('.checkbox__label').innerText.toLowerCase().includes('%') || promo.querySelector('.checkbox__label').innerText.toLowerCase().includes('percent')) {

      allPercentPromos.push(promo);

    } else if (promo.querySelector('.checkbox__label').innerText.toLowerCase().includes('free gift')) {

      allFreeGiftPromos.push(promo);

    } else if (promo.querySelector('.checkbox__label').innerText.toLowerCase().includes('advantage card')) {
        
        allAdCardPromos.push(promo);
  
    } else {

      allSavingsPromos.push(promo);

    }
  
  });

  let allPromoStrategies = [];

  allPromoStrategies.push({ identifier: "3f2", name: '3 for 2', promos: all3f2Promos});
  allPromoStrategies.push({ identifier: "percdiscount", name: '% Discounts', promos: allPercentPromos});
  allPromoStrategies.push({ identifier: "freegift", name: 'Free gift', promos: allFreeGiftPromos});
  allPromoStrategies.push({ identifier: "adcard", name: 'Advantage Card', promos: allAdCardPromos});
  allPromoStrategies.push({ identifier: "savings", name: 'Savings', promos: allSavingsPromos});

  let insertionPoint = promoModal.querySelector(`.${ID}-promo--modal--options`);

  allPromoStrategies.forEach((strategy, index) => {

    if(strategy.promos.length > 0) {

      let promoHTML = `
    
        <div class="${ID}-options ${ID}-options--${strategy.identifier} ${index == 0 ? `${ID}-active` : ``}">
          <button class="${ID}-option ${ID}-option--title">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none"><path d="M21.4486 14.4693L13.9798 21.938C13.7863 22.1317 13.5566 22.2854 13.3037 22.3902C13.0507 22.4951 12.7796 22.549 12.5059 22.549C12.2321 22.549 11.961 22.4951 11.7081 22.3902C11.4552 22.2854 11.2254 22.1317 11.0319 21.938L2.08398 13.0005V2.58386H12.5007L21.4486 11.5318C21.8366 11.9221 22.0544 12.4501 22.0544 13.0005C22.0544 13.5509 21.8366 14.0789 21.4486 14.4693Z" stroke="#CC0033" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.28931 7.79114H7.3094" stroke="#CC0033" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>${strategy.name}</span>
          </button>

          ${strategy.promos.map((promo) => {

          let promoText = promo.innerText;

          if (promoText.indexOf('-') > -1) {
            promoText = promoText.substring(0, promo.innerText.indexOf('-') - 1);
          }
          if (promoText.indexOf('(') > -1) {
            promoText = promoText.substring(0, promo.innerText.indexOf('('));
          }

          let promoActive = false;
          if (promo.classList.contains('checkbox-list-facet__child--selected')) {
            promoActive = true;
          }

          return `
              <button class="${ID}-option ${ID}-option--offer ${promoActive ? `${ID}-active` : ``}" data-origPromoText="${promo.innerText}">
                <div class="${ID}-checkbox"></div>
                <span title="${promoText}">${promoText}</span>
              </button>
            `;

        }).join('')}


        </div>
      
      
      `;

      insertionPoint.insertAdjacentHTML('beforeend', promoHTML);

    }

  });

  

}

const startExperiment = () => {

  let promoTextHolderHTML = `
  
    <div class="${ID}-promo-holder">
    
      <div class="${ID}-promo">
      
        <div class="${ID}-promo--title">
          <p> <span>0</span> offers available </p>
        </div>

        <div class="${ID}-promo--button">
          <button id="${ID}-promo--button--cta" class="${ID}-promo--button--cta"><span>Filter offers</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none"><path d="M18 13.9011L10 6.52539L2 13.9011L2.67718 14.5254L10 7.77396L17.3228 14.5254L18 13.9011Z" fill="#CC0033"/></svg></button>
        </div>

        <div class="${ID}-promo--modal">
        
          <div class="${ID}-promo--modal--header">
            <p> Select an offer: </p>

            <button class="${ID}-promo--modal--clearall">Clear all</button>

            <button class="${ID}-promo--modal--close"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M0.999999 17L17 1M17 17L1 0.999999" stroke="#05054B" stroke-linecap="round" stroke-linejoin="round"/></svg> </button>

            
          
          </div>

          <div class="${ID}-promo--modal--options">
          
          </div>
        
        </div>
      
      </div>
    
    </div>
  
  `;

  let insertionPoint = document.querySelector('.oct-listers-hits__top .oct-listers-sort-by');
  let insertionType = 'beforebegin';
  if(window.outerWidth < 992) {
    insertionPoint = document.getElementById('hits');
  }

  insertionPoint.insertAdjacentHTML(insertionType, promoTextHolderHTML);

  if(window.outerWidth > 992) {
    insertionPoint.closest('.oct-listers-hits__top').classList.add(`${ID}-promo-button-displayed`);
  }
  

  promoModal = document.querySelector(`.${ID}-promo--modal`);
  promoButton = document.querySelector(`.${ID}-promo--button--cta`);
  promoTextHolder = document.querySelector(`.${ID}-promo--title`);

  processPromos();
  checkAppliedPromos();

  document.body.addEventListener('click', (e) => {

    if(e.target.classList.contains(`${ID}-promo--button--cta`) || e.target.closest(`.${ID}-promo--button--cta`)) {

      fireEvent('Click - promo open/close button clicked', true);

      if(promoButton.classList.contains(`${ID}-active`)) {

        promoModal.classList.remove(`${ID}-active`);
        promoButton.classList.remove(`${ID}-active`);

      } else {

        promoModal.classList.add(`${ID}-active`);
        promoButton.classList.add(`${ID}-active`);

      }

    }

    if(e.target.classList.contains(`${ID}-promo--modal--close`) || e.target.closest(`.${ID}-promo--modal--close`)) {

      fireEvent('Click - promo modal close clicked', true);

      promoModal.classList.remove(`${ID}-active`);
      promoButton.classList.remove(`${ID}-active`);

    }

    if(e.target.classList.contains(`${ID}-option--title`) || e.target.closest(`.${ID}-option--title`)) {

      fireEvent('Click - promo filter title clicked', true);

      if(e.target.closest(`.${ID}-options`).classList.contains(`${ID}-active`)) {

        e.target.closest(`.${ID}-options`).classList.remove(`${ID}-active`);

      } else {

        let allOptions = document.querySelectorAll(`.${ID}-options`);

        allOptions.forEach((option) => {

          option.classList.remove(`${ID}-active`);

        });

        e.target.closest(`.${ID}-options`).classList.add(`${ID}-active`);

      }

    }

    if(e.target.classList.contains(`${ID}-promo--modal--clearall`) || e.target.closest(`.${ID}-promo--modal--clearall`) || e.target.classList.contains(`${ID}-appliedpromos--close`) || e.target.closest(`.${ID}-appliedpromos--close`)) {

      let allOptions = document.querySelectorAll(`.${ID}-option--offer`);

      fireEvent('Click - clear all filters clicked', true);

      allOptions.forEach((option) => {

        option.classList.remove(`${ID}-active`);

      });

      if(window.outerWidth < 992) {

        if (!document.querySelector('.oct-listers-facet-menu')) {
          document.querySelector('.oct-listers-facet-burger-menu').classList.add(`${ID}-pullingdata`);
          document.querySelector('.oct-listers-facet-burger-menu > button').click();
        }

        document.querySelector('.applied-filters__clear-all')?.click();

        document.querySelector('.oct-listers-facet-burger-menu').classList.remove(`${ID}-pullingdata`);
        document.querySelector('.oct-listers__close')?.click();
        document.querySelector('.oct-listers-facet-menu__backdrop')?.click();


      } else {
        document.querySelector('.applied-filters__clear-all')?.click();
      }

      

      promoModal.classList.remove(`${ID}-active`);
      promoButton.classList.remove(`${ID}-active`);

    }

    if (window.outerWidth > 992) {
      if (e.target.closest('#searchBar')) {
        promoModal.classList.remove(`${ID}-active`);
        promoButton.classList.remove(`${ID}-active`);
      }

      if ((e.target.classList.contains(`.oct-iconButton`) || e.target.closest('.oct-iconButton')) && e.target.closest('#mobileLink_basket')) {
        promoModal.classList.remove(`${ID}-active`);
        promoButton.classList.remove(`${ID}-active`);
      }

      if ((e.target.classList.contains(`.oct-notification__ctas_left`) || e.target.closest('.oct-notification__ctas_left')) && e.target.closest('#oct-notification-container')) {
        promoModal.classList.remove(`${ID}-active`);
        promoButton.classList.remove(`${ID}-active`);
      }

      if (!e.target.closest(`.${ID}-promo`)) {
        promoModal.classList.remove(`${ID}-active`);
        promoButton.classList.remove(`${ID}-active`);

      }

    } else {

      if (e.target.id == "mobileBurgerMenuIcon" || e.target.closest('#mobileBurgerMenuIcon')) {
        promoModal.classList.remove(`${ID}-active`);
        promoButton.classList.remove(`${ID}-active`);
      }

      if (e.target.id == "mobileLink_search" || e.target.closest('#mobileLink_search')) {
        promoModal.classList.remove(`${ID}-active`);
        promoButton.classList.remove(`${ID}-active`);
      }

      if (e.target.id == "mobileLink_basket" || e.target.closest('#mobileLink_basket')) {
        promoModal.classList.remove(`${ID}-active`);
        promoButton.classList.remove(`${ID}-active`);
      }

      if(!e.target.closest(`.${ID}-promo`)) {
        promoModal.classList.remove(`${ID}-active`);
        promoButton.classList.remove(`${ID}-active`);
      
      }

    }

    

    if(e.target.classList.contains(`${ID}-option--offer`) || e.target.closest(`.${ID}-option--offer`)) {
      
      let offerOption = e.target.classList.contains(`${ID}-option--offer`) ? e.target : e.target.closest(`.${ID}-option--offer`);

      fireEvent(`click on promo: ${offerOption.querySelector('span').innerText}`, true);

      if(window.outerWidth < 992) {

        if (!document.querySelector('.oct-listers-facet-menu')) {
          document.querySelector('.oct-listers-facet-burger-menu').classList.add(`${ID}-pullingdata`);
          document.querySelector('.oct-listers-facet-burger-menu > button').click();
        }

        pollerLite(['.oct-listers-facets__item--promotionalText'], () => {

          let promoTextOptionsHolder = document.querySelector('.oct-listers-facets__item--promotionalText');

          promoTextOptionsHolder.querySelector('button').click();

          setTimeout(() => {

            if (document.querySelector('.checkbox-list-facet__view-all')) {
              document.querySelector('.checkbox-list-facet__view-all').click();
            }

            let allCurrOptions = document.querySelectorAll('.checkbox-list-facet__child');

            let origPromoText = offerOption.getAttribute('data-origPromoText');

            origPromoText = origPromoText.substring(0, origPromoText.indexOf('(')).toLowerCase().trim();

            allCurrOptions.forEach((promo) => {

              let promoInnerText = promo.innerText.toLowerCase().substring(0, promo.innerText.toLowerCase().indexOf('(')).trim();
              if (promoInnerText == origPromoText) {
                promo.querySelector('input').click();
              } 

            });

            document.querySelector('.oct-listers-facet-burger-menu').classList.remove(`${ID}-pullingdata`);
            document.querySelector('.oct-listers__close')?.click();
            document.querySelector('.oct-listers-facet-menu__backdrop')?.click();

          }, 10);



        })


      } else {

        
        let origPromoText = offerOption.getAttribute('data-origPromoText');
        promoTextOptions.forEach((promo) => {

          if (promo.innerText.toLowerCase() == origPromoText.toLowerCase()) {
            promo.querySelector('input').click();

          }

        });

      }

      

      if (offerOption.classList.contains(`${ID}-active`)) {
        offerOption.classList.remove(`${ID}-active`);
      } else {
        offerOption.classList.add(`${ID}-active`);
      }

      

    }

  });

  if(window.outerWidth > 992) {
    let globalNav = document.getElementById('topLevelMenu');
    globalNav.addEventListener('mouseenter', () => {

      promoModal.classList.remove(`${ID}-active`);
      promoButton.classList.remove(`${ID}-active`);
    });
  }
  

}

const checkMobilePromos = () => {

  return new Promise((resolve, reject) => {

    if (!document.querySelector('.oct-listers-facet-menu')) {
      document.querySelector('.oct-listers-facet-burger-menu').classList.add(`${ID}-pullingdata`);
      document.querySelector('.oct-listers-facet-burger-menu > button').click();
    }

    pollerLite(['.oct-listers-facets__item--promotionalText'], () => {

      let promoTextOptionsHolder = document.querySelector('.oct-listers-facets__item--promotionalText');

      promoTextOptionsHolder.querySelector('button').click();



      setTimeout(() => {

        if (document.querySelector('.checkbox-list-facet__view-all')) {
          document.querySelector('.checkbox-list-facet__view-all').click();
        }

        let allCurrOptions = document.querySelectorAll('.checkbox-list-facet__child');

        promoTextOptions = allCurrOptions;

        resolve();

        document.querySelector('.oct-listers-facet-burger-menu').classList.remove(`${ID}-pullingdata`);
        document.querySelector('.oct-listers__close')?.click();
        document.querySelector('.oct-listers-facet-menu__backdrop')?.click();

        

      }, 5);



    })

  });

}

const checkPromos = () => {

  if(window.outerWidth < 992) {

    checkMobilePromos().then(() => {


      if (promoTextOptions.length > 0) {

        let dataLayer = window.dataLayer || [];
        let pageView = dataLayer.filter((item) => {
          if (item.event == "defaultPageView") {
            return item;
          }
        });

        fireEvent(`Conditions Met on ${pageView[0].page.type}`, true);
        let currentlyFiring = false;
        if(VARIATION !== "control") {
          startExperiment();
          fireOnListerUpdates(() => {
            currentlyFiring = true;
            checkMobilePromos().then(() => {
              if(currentlyFiring) {

                document.querySelector(`.${ID}-promo--modal--options`).innerHTML = ``;
                document.querySelector(`.${ID}-appliedpromos`)?.remove();
                processPromos();
                checkAppliedPromos();
                currentlyFiring = false;
              }
              

            });



          });
        }
        

      }

    });



  } else {

    let promoTextOptionsHolder = document.querySelector('.oct-listers-facets__item--promotionalText');

    promoTextOptions = promoTextOptionsHolder.querySelectorAll('.checkbox-list-facet__child');

    if (promoTextOptions.length > 0) {

      let dataLayer = window.dataLayer || [];
      let pageView = dataLayer.filter((item) => {
        if (item.event == "defaultPageView") {
          return item;
        }
      });

      fireEvent(`Conditions Met on ${pageView[0].page.type}`, true);

      if(VARIATION !== "control") {
        startExperiment();

        fireOnListerUpdates(() => {



          let promoTextOptionsHolder = document.querySelector('.oct-listers-facets__item--promotionalText');

          if (promoTextOptionsHolder.querySelector('.checkbox-list-facet__view-all')) {
            promoTextOptionsHolder.querySelector('.checkbox-list-facet__view-all').click();
          }

          promoTextOptions = promoTextOptionsHolder.querySelectorAll('.checkbox-list-facet__child');

          document.querySelector(`.${ID}-promo--modal--options`).innerHTML = ``;
          document.querySelector(`.${ID}-appliedpromos`)?.remove();
          processPromos();
          checkAppliedPromos();

        });
      }
      

    }




  }

  

}

const startFilterTracking = () => {

  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.checkbox-list-facet__child') && e.target.tagName.toLowerCase() == "input") {

      let thisFilterType;
      if (window.outerWidth < 992) {
        thisFilterType = e.target.closest('.oct-listers-facets-wrapper').querySelector('.oct-listers__filter-by__heading').innerText;
      } else {
        thisFilterType = e.target.closest('.oct-accordion__item').querySelector('.oct-accordion__text-wrapper h2').innerText;
      }
      let thisFilterName = e.target.closest('.checkbox-list-facet__child').querySelector('.checkbox__label').innerText;
      let isCurrentlyActive = e.target.closest('.checkbox-list-facet__child').classList.contains('checkbox-list-facet__child--selected') ? true : false;
      thisFilterName = thisFilterName.substring(0, thisFilterName.indexOf('('));
      if (isCurrentlyActive === false) {
        fireEvent(`click on checkbox filter: ${thisFilterName} with type: ${thisFilterType}`, true);

      }


    }

    if (e.target.closest('.colour-facet__child')) {

      let thisFilterType = "Colour";
      let thisFilterName = e.target.closest('.colour-facet__child').querySelector('.colour-facet__child__name').innerText;
      fireEvent(`click on colour filter: ${thisFilterName} with type: ${thisFilterType}`, true);

    }

    if (e.target.closest('.rating-facet__child')) {
      let thisFilterType = "Rating";
      let thisFilterName = e.target.closest('.rating-facet__child').getAttribute('aria-label');
      thisFilterName = thisFilterName.substring(0, thisFilterName.indexOf('stars') + 5);
      fireEvent(`click on rating filter: ${thisFilterName} with type: ${thisFilterType}`, true);
    }

  })


}

export default () => {

  setup();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  startFilterTracking();

  if (window.outerWidth > 992) {

    // DESKTOP

    pollerLite(['.oct-listers-facets__item--promotionalText'], () => {

      let promoTextOptionsHolder = document.querySelector('.oct-listers-facets__item--promotionalText');

      if (promoTextOptionsHolder.querySelector('.checkbox-list-facet__view-all')) {
        promoTextOptionsHolder.querySelector('.checkbox-list-facet__view-all').click();
      }

      setTimeout(() => {

        if (!document.querySelector('.oct-view-chanel__view-chanel-cta')) {
          checkPromos();
        }
        

      }, 100);


    })
  } else {

    // MOBILE

    pollerLite(['.oct-listers-facet-burger-menu'], () => {

      if (!document.querySelector('.oct-view-chanel__view-chanel-cta')) {
        checkPromos();
      }

    });

  }
  

};
