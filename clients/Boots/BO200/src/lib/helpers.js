import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";


const { ID } = shared;

export const tracking = () => {
    // tracking
    const allButtons = document.querySelectorAll(`.${ID}-buttons .${ID}-button`);
    if(allButtons) {
      for (let index = 0; index < allButtons.length; index += 1) {
        const element = allButtons[index];
        element.addEventListener('click', (e) => {
          fireEvent('Clicked CTA ' + e.currentTarget.innerText.trim());
        });
      }
    }

    const allOffers = document.querySelectorAll(`.${ID}-offers .${ID}-offer`);
    if(allOffers) {
      for (let i = 0; i < allOffers.length; i += 1) {
        const offer = allOffers[i];
        offer.addEventListener('click', () => {
          fireEvent('Clicked Offer');
        });
      }
    }
  }

export const sessionCount = () => {
    if (localStorage.getItem("BOcount") === null) {
      sessionStorage.setItem("BOcount", 's');
      localStorage.setItem("BOcount", 's');
    }
    else if (sessionStorage.getItem("BOcount") === null) {
      var lsCount = localStorage.getItem("BOcount");
      sessionStorage.setItem("BOcount", lsCount + 's');
      localStorage.setItem("BOcount", lsCount + 's');
    }
    
    var sessionRetrieve = sessionStorage.getItem("BOcount");
    return sessionRetrieve.length;
}

export const checkPurchaseMade = () => {
    const url = window.location.href;

    if (url.indexOf('checkoutorderconfirmation') > -1) {
        localStorage.setItem(`${ID}purchaseMade`, 1);
    }
}

export const isReturningNoPurchase = () => {

    if (localStorage.getItem(`${ID}-time`)) {
        const now = (new Date()).getTime();
        const time = parseInt(localStorage.getItem(`${ID}-time`));


        if (now - time < 1209600000) {
            if (!localStorage.getItem(`${ID}purchaseMade`)) {
                return true;
            }
        }
    }
}

export const storeLastViewed = () => {
    let cache = window.localStorage.BOUrls;

    let cachedCatData = cache ? JSON.parse(cache) : [];
    let newURL = true;


    // get data from page
    const title = document.querySelector('h1');
    const pageLink =  window.location.pathname;

    const data = {
        pageTitle: title.textContent.trim(),
        link: pageLink
    }


    for (let i = 0; i < cachedCatData.length; i += 1) {
        const cachedData = cachedCatData[i];
        if (data.link === cachedData.link) {
            // Product already exists, move it to the end of the array
            const urlToMove = cachedCatData.splice(i, 1);
            cachedCatData = cachedCatData.concat(urlToMove);
            newURL = false;
            break;
        }
    }

    // Push product data if new product
    if (newURL) cachedCatData.push(data);

    // Keep cachedProductData limited to 8 urls
    if (typeof cachedCatData.length === 'number') {
        while (cachedCatData.length > 1) cachedCatData.shift();
    }

    window.localStorage.BOUrls = JSON.stringify(cachedCatData);

}