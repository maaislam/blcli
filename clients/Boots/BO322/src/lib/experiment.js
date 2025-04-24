/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite, logMessage } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;
let templateType = '';

const updatePLPItems = () => {
  let templateSelector = '.estore_product_container';
  if (templateType == 'PL-NEW') {
    templateSelector = '.oct-listers-hits > .oct-grid__cell';
  }

  let allCurrentPLPItems = document.querySelectorAll(templateSelector);

  allCurrentPLPItems.forEach((item) => {
    if (templateType == 'PLC' && (item.innerHTML.indexOf('3f2') > -1 || item.innerHTML.indexOf('3 for 2') > -1)) {
      item.classList.add(`${ID}-3for2`);
    }

    if (templateType == 'PL-NEW' && (item.innerHTML.indexOf('3f2') > -1 || item.innerHTML.indexOf('3 for 2') > -1)) {
      item.classList.add(`${ID}-3for2`);
    }
  });
};

const getLastUniquePromo = (returnedData) => {
  console.log('🚀 ~ getLastUniquePromo ~ returnedData:', returnedData);
  return new Promise((resolve) => {
    let allCurrItemsInBasket = returnedData.orderItems;
    let allPromosAvailable = allCurrItemsInBasket.filter((item) => {
      let allItemLevel3for2AppliedPromotions = item.orderItemLevelAppliedPromotions;
      allItemLevel3for2AppliedPromotions = allItemLevel3for2AppliedPromotions.filter((promo) => {
        return promo.code.toLowerCase().indexOf('3 for 2') > -1 || promo.code.toLowerCase().indexOf('3f2') > -1;
      });

      if (item.orderItemLevelApplicablePromotions.length > 0 && allItemLevel3for2AppliedPromotions.length === 0) {
        return true;
      }
    });
    let allUniquePromosAvailable = allPromosAvailable.filter((item, index, self) => {
      let found =
        self.findIndex((t) => {
          return t.orderItemLevelApplicablePromotions[0].code === item.orderItemLevelApplicablePromotions[0].code;
        }) === index;
      return found;
    });

    let allUniquePromoDetails = allUniquePromosAvailable.map((item) => {
      let promoCode = item.orderItemLevelApplicablePromotions[0].code;

      let itemsInPromo = allCurrItemsInBasket.filter((currItem) => {
        let allItemLevel3for2AppliedPromotions = item.orderItemLevelAppliedPromotions;
        allItemLevel3for2AppliedPromotions = allItemLevel3for2AppliedPromotions.filter((promo) => {
          return promo.code.toLowerCase().indexOf('3 for 2') > -1 || promo.code.toLowerCase().indexOf('3f2') > -1;
        });

        if (currItem.orderItemLevelApplicablePromotions.length > 0 && allItemLevel3for2AppliedPromotions.length === 0) {
          return currItem.orderItemLevelApplicablePromotions[0].code === promoCode;
        }
      });

      let newObject = {
        promoName: item.orderItemLevelApplicablePromotions[0].code,
        promoDescription: item.orderItemLevelApplicablePromotions[0].description,
        promoURL: item.orderItemLevelApplicablePromotions[0].promotionURL,
        promoItems: itemsInPromo,
      };

      return newObject;
    });

    let lastUniquePromo = allUniquePromoDetails.filter((item) => {
      if (
        item.promoName.indexOf('3f2') > -1 ||
        item.promoName.indexOf('3 for 2') > -1 ||
        item.promoName.indexOf('Xmas Mix and Match') > -1
      ) {
        return true;
      }
    });
    logMessage('LAST UNIQUE PROMO', lastUniquePromo);
    resolve(lastUniquePromo);
  });
};

const getLast3for2Deal = () => {
  return new Promise((resolve) => {
    if (localStorage.getItem(`${ID}-numcalls`)) {
      let numCalls = parseInt(localStorage.getItem(`${ID}-numcalls`)) + 1;
      localStorage.setItem(`${ID}-numcalls`, numCalls);
    } else {
      localStorage.setItem(`${ID}-numcalls`, 1);
    }

    let headers = {
      siteid: 'UK',
      channel: 'Ecommerce',
      context: 'BASKET',
    };

    window.jQuery.ajax({
      cache: true,
      type: 'GET',
      url: '/api/checkout/basket',
      data: '',
      headers: headers,
      dataType: 'json',
      success: function (returnedData) {
        if (returnedData) {
          logMessage('RETURNED DATA');
          logMessage(returnedData);
          if (returnedData.basketDetails === undefined) {
            logMessage('NO ITEMS IN BASKET');
            return null;
          } else {
            let lastUniquePromo = getLastUniquePromo(returnedData.basketDetails);
            resolve(lastUniquePromo);
          }
        }
      },
    });
  });
};

const checkBasketCode = (number, promoURL, promoDescription) => {
  //console.log('🚀 ~ checkBasketCode ~ number:', number);

  let theNumber = ``;
  if (number == 1) {
    theNumber = `one`;
  } else if (number == 2) {
    theNumber = `two`;
  } else if (number == 3) {
    theNumber = `three`;
  }

  if (parseInt(number) > 0) {
    let newItemHTML = `
    
      <a href="${promoURL}" class="${ID}-basket3for2">

        <div class="${ID}-basket3for2--inner">

          <div class="${ID}-basket3for2--inner--text">
            <h3> Don't miss the ${promoDescription} offer! </h2>
            <p> Add <span id="${ID}-number">${theNumber}</span> more <span id="${ID}-prodstext">product${
      number > 1 ? `s` : ``
    }</span> and get the cheapest free. </p>
          </div>

          <div class="${ID}-basket3for2--inner--button">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="#0C2162" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 5L12 19" stroke="#0C2162" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

        </div>

      </a>
    
    `;

    pollerLite(['.oct-basket-messaging'], () => {
      let octBasketMessaging = document.querySelector('.oct-basket-messaging');
      if (!document.querySelector(`.${ID}-basket3for2`)) {
        octBasketMessaging.insertAdjacentHTML('beforeend', newItemHTML);
      } else {
        document.getElementById(`${ID}-number`).innerHTML = theNumber;
        document.getElementById(`${ID}-prodstext`).innerHTML = `product${number > 1 ? `s` : ``}`;
      }
    });
  } else {
    document.querySelector(`.${ID}-basket3for2`)?.remove();
  }
};

const removeBasketCode = () => {
  document.querySelector(`.${ID}-basket3for2`)?.remove();
};

const setupBasketCode = (number, promoURL, promoDescription) => {
  checkBasketCode(number, promoURL, promoDescription);
};

const startExperiment = (currentPromo) => {
  document.documentElement.classList.add(`${ID}-promodisplayed`);

  let animated = false;
  let completelyHidden = true;
  let hiddenReason = '';
  if (parseInt(localStorage.getItem(`${ID}-displayed`)) < 5 || localStorage.getItem(`${ID}-displayed`) == null) {
    animated = true;
    let count;
    if (localStorage.getItem(`${ID}-displayed`) == null) {
      count = 1;
    } else {
      count = parseInt(localStorage.getItem(`${ID}-displayed`)) + 1;
    }
    localStorage.setItem(`${ID}-displayed`, count);
  }

  let allCurrItems = currentPromo.promoItems;
  let numProducts = 0;

  let allItems = [];
  allCurrItems.filter((item) => {
    if (item.quantity > 0) {
      for (var i = 0; i < item.quantity; i++) {
        allItems.push(item);
      }
    }
  });

  numProducts = allItems.length;

  let currentPromoURL = currentPromo.promoURL;
  let currentPromoDescription = currentPromo.promoDescription;
  let addNowsToAttach = 3 - numProducts;
  let addNows = Array(addNowsToAttach)
    .fill()
    .map((item, index) => {
      return index;
    });
  console.log('🚀 ~ startExperiment ~ addNows:', addNows, addNowsToAttach);

  if (localStorage.getItem(`${ID}-nomore`) == 'true' || addNowsToAttach == 2 || addNowsToAttach == 3) {
    completelyHidden = true;

    if (localStorage.getItem(`${ID}-nomore`) == 'true') {
      hiddenReason = 'user clicked to never see the popup again';
    } else {
      hiddenReason = 'the number of items on the 3f2 offer in the basket was NOT 2';
    }
  }

  let slideoutHTML = `

    <button class="${ID}-deal-button ${animated == true ? `${ID}-hidden` : ``}">
      ${currentPromo.promoDescription} 
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 15L12 9L18 15" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>

    <div class="${ID}-deal-container">

      <button class="${ID}-close"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">g id="Menu / Close_MD"><path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></button>

      <h2> <span>${currentPromo.promoDescription}</span></h2>

      <p> Don't miss out! </p>

      <div class="${ID}-deal">

        ${allItems
          .map((item) => {
            let shortenedItemName = item.item.name;
            if (shortenedItemName.length > 45) {
              shortenedItemName = shortenedItemName.substring(0, 45) + '...';
            }

            return `
            <a href="https://www.boots.com/${
              item.item.displayUrl.indexOf(';') > -1 ? item.item.displayUrl.split(';')[0] : item.item.displayUrl
            }" class="${ID}-deal--product">
              <svg class="${ID}-deal--svg" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.1641 17.9721C10.882 17.9505 10.6195 17.8193 10.433 17.6066L6.04652 13.2201C5.94879 13.0155 5.9169 12.7856 5.95525 12.562C5.99359 12.3385 6.10029 12.1324 6.26065 11.9721C6.421 11.8117 6.62712 11.705 6.85063 11.6667C7.07414 11.6283 7.30404 11.6602 7.50867 11.7579L11.1202 15.3695L23.5924 2.98499C23.797 2.88726 24.0269 2.85538 24.2504 2.89372C24.4739 2.93207 24.6801 3.03877 24.8404 3.19912C25.0008 3.35948 25.1075 3.5656 25.1458 3.78911C25.1842 4.01262 25.1523 4.24252 25.0545 4.44715L11.8951 17.6066C11.7086 17.8193 11.4462 17.9505 11.1641 17.9721Z" fill="#208028"/><path d="M13.3573 26.3796C11.0053 26.3758 8.69741 25.7418 6.67364 24.5434C4.64988 23.3451 2.98425 21.6263 1.8501 19.5659C0.987993 18.0306 0.455172 16.3326 0.285597 14.58C0.0179937 12.0096 0.513122 9.41737 1.70922 7.12659C2.90531 4.8358 4.74943 2.9479 7.01151 1.69838C8.54681 0.836272 10.2449 0.303451 11.9975 0.133876C13.7435 -0.0539412 15.5095 0.115196 17.1881 0.631009C17.3379 0.660941 17.4798 0.721844 17.6047 0.809816C17.7296 0.897787 17.8348 1.01088 17.9134 1.14186C17.9921 1.27283 18.0425 1.41879 18.0614 1.57039C18.0804 1.72198 18.0674 1.87586 18.0234 2.02216C17.9794 2.16846 17.9054 2.30395 17.806 2.41995C17.7065 2.53595 17.584 2.62991 17.4462 2.69579C17.3083 2.76167 17.1582 2.79802 17.0055 2.80251C16.8528 2.80701 16.7009 2.77955 16.5594 2.72189C15.1391 2.29483 13.6478 2.15564 12.1729 2.31249C10.7152 2.46176 9.30264 2.90441 8.0204 3.61381C6.78507 4.29532 5.69286 5.20881 4.80366 6.30417C3.88814 7.42003 3.20449 8.70735 2.79274 10.0907C2.38099 11.4741 2.24941 12.9258 2.40572 14.3607C2.55499 15.8184 2.99765 17.2309 3.70704 18.5132C4.38856 19.7485 5.30204 20.8407 6.39741 21.7299C7.51327 22.6454 8.80059 23.3291 10.184 23.7408C11.5674 24.1526 13.019 24.2842 14.4539 24.1279C15.9117 23.9786 17.3242 23.5359 18.6064 22.8265C19.8417 22.145 20.934 21.2315 21.8232 20.1362C22.7387 19.0203 23.4223 17.733 23.8341 16.3496C24.2458 14.9662 24.3774 13.5146 24.2211 12.0797C24.2067 11.929 24.2221 11.7769 24.2665 11.6321C24.3109 11.4873 24.3833 11.3527 24.4797 11.236C24.5761 11.1192 24.6946 11.0226 24.8283 10.9516C24.9621 10.8806 25.1085 10.8366 25.2592 10.8222C25.41 10.8078 25.562 10.8233 25.7068 10.8676C25.8516 10.912 25.9862 10.9845 26.103 11.0809C26.2197 11.1773 26.3164 11.2957 26.3873 11.4295C26.4583 11.5632 26.5023 11.7096 26.5167 11.8604C26.7829 14.4323 26.2856 17.0256 25.0868 19.3165C23.888 21.6075 22.0409 23.4945 19.7761 24.742C18.2245 25.6394 16.5002 26.1975 14.7171 26.3796C14.2638 26.3796 13.7959 26.3796 13.3573 26.3796Z" fill="#208028"/></svg>
              <img src="${item.item.imageUrl}" alt="${item.item.name} image" />
              <p title="${item.item.name}"> ${shortenedItemName} </p>
            </a>
          `;
          })
          .join('')}

        ${addNows
          .map(() => {
            return `
            <button class="${ID}-deal--product ${ID}-deal--productempty" data-url="${allItems[0].promoURL}">
              <div class="${ID}-plusholder"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z" fill="#11205E"/></svg></div>
              <p> ADD Now </p>
            </button>
          `;
          })
          .join('')}

      </div>

      <a href="#" id="${ID}-nomore" class="${ID}-nomore">I don't want to see this again</a>
        

    </div>

  `;

  let docBody = document.body;
  if (completelyHidden == true) {
    if (VARIATION !== 'control') {
      docBody.insertAdjacentHTML('beforeend', slideoutHTML);

      let dealButton = document.querySelector(`.${ID}-deal-button`);
      let dealSlideout = document.querySelector(`.${ID}-deal-container`);
      let closeX = document.querySelector(`.${ID}-close`);

      let dealButtonWidth = dealButton.outerWidth + 'px';
      dealSlideout.style.width = dealButtonWidth;

      if (animated == true) {
        setTimeout(() => {
          dealSlideout.classList.add(`${ID}-animate`);
        }, 1000);
      }

      dealButton.addEventListener('click', () => {
        dealButton.classList.add(`${ID}-hidden`);
        dealSlideout.classList.toggle(`${ID}-deal-container--active`);
        fireEvent('Click - user has clicked to open the slideout');
      });

      closeX.addEventListener('click', () => {
        dealButton.classList.remove(`${ID}-hidden`);
        dealSlideout.classList.remove(`${ID}-deal-container--active`);
        dealSlideout.classList.remove(`${ID}-animate`);
        localStorage.setItem(`${ID}-displayed`, 10);
        fireEvent('Click - user has clicked to close the slideout');
      });

      let allAddNows = document.querySelectorAll(`.${ID}-deal--productempty`);
      allAddNows.forEach((addNow) => {
        addNow.addEventListener('click', () => {
          fireEvent('Click - user has clicked the empty product to go to the new promo URL: ' + currentPromoURL);
          window.location.href = currentPromoURL;
        });
      });

      let nomoreButton = document.getElementById(`${ID}-nomore`);
      nomoreButton.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem(`${ID}-nomore`, true);
        fireEvent('Click - user has clicked that they dont want to see this again', true);
        dealButton.remove();
        dealSlideout.remove();
      });
    }

    fireEvent(
      `Interaction - slideout created and ${
        VARIATION == 'control' ? `not shown` : `shown`
      }, user has two 3f2 products in their basket`,
      true
    );
  } else {
    fireEvent(`Interaction - popout hidden because ${hiddenReason}`, true);
  }

  if (VARIATION == 1) {
    setupBasketCode(addNowsToAttach, currentPromoURL, currentPromoDescription);
    updatePLPItems();
  }
};

const fireOnListerUpdates = () => {
  const frequency = 1000; // check every 500ms
  // helper function for comparing nodeLists
  const eq = (A, B) => {
    if (A.length !== B.length) return false;
    for (let i = 0; i < A.length; i++) {
      if (A[i] !== B[i]) return false;
    }
    return true;
  };

  let titles =
    document.querySelectorAll('.oct-teaser-with-listers').length > 0
      ? document.querySelectorAll('.oct-teaser-with-listers')
      : document.querySelectorAll('.product_name_link');

  let interval = window.setInterval(() => {
    let newTitles =
      document.querySelectorAll('.oct-teaser-with-listers').length > 0
        ? document.querySelectorAll('.oct-teaser-with-listers')
        : document.querySelectorAll('.product_name_link');
    if (!eq(titles, newTitles)) {
      titles = newTitles;
      updatePLPItems();
      clearInterval(interval);
    }
  }, frequency);
};

const sortPromos = (promo) => {
  promo.sort((a, b) => {
    let aNumItems = 0;
    let bNumItems = 0;

    a.promoItems.forEach((item) => {
      aNumItems += item.quantity;
    });

    b.promoItems.forEach((item) => {
      bNumItems += item.quantity;
    });

    return bNumItems - aNumItems;
  });

  return promo;
};

export default () => {
  setup();
  console.log('Test running');
  fireEvent('Conditions Met');

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains(`.oct-iconButton`) || e.target.closest('.oct-iconButton')) {
      fireEvent('Click - user has clicked on the basket to open it');
    }
  });

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  if (sessionStorage.basketDetails !== null && sessionStorage.basketDetails !== undefined) {
    let details = JSON.parse(sessionStorage.basketDetails);
    console.log('🚀 ~ details:', details);

    getLastUniquePromo(details.basketDetails).then((promo) => {
      document.querySelector(`.${ID}-deal-button`)?.remove();
      document.querySelector(`.${ID}-deal-container`)?.remove();

      if (promo.length > 0) {
        let usedPromo = sortPromos(promo);
        startExperiment(usedPromo[0]);
      } else {
        removeBasketCode();
      }
    });
  }

  window.addEventListener('oct-basket:updated', (data) => {
    getLastUniquePromo(data.detail).then((promo) => {
      document.querySelector(`.${ID}-deal-button`)?.remove();
      document.querySelector(`.${ID}-deal-container`)?.remove();

      if (promo.length > 0) {
        let usedPromo = sortPromos(promo);
        startExperiment(usedPromo[0]);
      } else {
        removeBasketCode();
      }
    });
  });

  window.addEventListener('add-to-basket:success', (data) => {
    getLastUniquePromo(data.detail.payload.basketNotificationDetails).then((promo) => {
      document.querySelector(`.${ID}-deal-button`)?.remove();
      document.querySelector(`.${ID}-deal-container`)?.remove();

      if (promo.length > 0) {
        let usedPromo = sortPromos(promo);
        startExperiment(usedPromo[0]);
      } else {
        removeBasketCode();
      }
    });
  });

  // if(VARIATION == 1) {
  //   pollerLite(['.dijitContentPane'], () => {
  //     templateType = "PLC";

  //     updatePLPItems();

  //     fireOnListerUpdates();

  //   });

  //   pollerLite(['#octListers'], () => {
  //     templateType = "PL-NEW";
  //     updatePLPItems();

  //     fireOnListerUpdates();

  //   });
  // }
};
