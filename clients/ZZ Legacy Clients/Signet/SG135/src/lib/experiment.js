/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import {
  setup,
  getSiteFromHostname,
  cookieOpt
} from './services';
import {
  events
} from '../../../../../lib/utils';
import shared from './shared';
import {
  EJData,
  HSData,
  lastViewedURLScraper
} from './data';

const {
  ID,
  VARIATION
} = shared;

export default () => {
  setup();
  cookieOpt();

  if(VARIATION !== 'control') {
    let dataJSON;


    let storage;
    if (getSiteFromHostname() === 'ernestjones') {
      storage = window.sessionStorage.EJUrls;
      dataJSON = EJData;
    } else {
      storage = window.sessionStorage.HSUrls;
      dataJSON = HSData;
    }

    // save the URLs
    if (!storage || JSON.parse(storage).length < 3) {
      lastViewedURLScraper();
    }

    let productData = [];

    // get sku and view count
    const getSkuCount = () => {

      const productSKU = window.digitalData.product[0].productInfo.masterSku

      return new Promise((resolve, reject) => {
        dataJSON.forEach(obj => {
          Object.entries(obj).forEach(([key, value]) => {
            if (key === productSKU) {
              const data = {
                sku: key,
                views: value
              }
              productData.push(data);
              resolve();
            }
          });
        });
      });
    }

    
    // wait for storage

    if(window.sessionStorage.HSUrls || window.sessionStorage.EJUrls) {
      let storedURLS;
      if (getSiteFromHostname() === 'ernestjones') {
        storedURLS = window.sessionStorage.EJUrls;
      } else {
        storedURLS = window.sessionStorage.HSUrls;

      }
      // if product pages have been visited, check the skus
      if (storedURLS && JSON.parse(storedURLS).length >= 1) {
        const currentURL = window.location.href;
        const storedProducts = JSON.parse(storedURLS);
        if ((storedProducts[0] && currentURL.indexOf(storedProducts[0].link) > -1) || (storedProducts[1] && currentURL.indexOf(storedProducts[1].link) > -1) ||
          (storedProducts[2] && currentURL.indexOf(storedProducts[2].link) > -1)) {

          getSkuCount().then(() => {

            const prodViews = productData[0].views;

            const firstContent = () => {
              let firstMessage;
              //if more than 200
              if (prodViews >= 200) {
                if (VARIATION === '1') {
                  firstMessage = `In Demand Product`;
                } else if (VARIATION === '2') {
                  firstMessage = `One Of Our Most Popular Products`;
                }
              }

              // if 100-200
              if (prodViews >= 100 && prodViews < 200) {
                firstMessage = `Trending Product`;
              }

              // if 50 - 100
              if (prodViews >= 50 && prodViews < 100) {
                firstMessage = `Popular Product`;
              }

              return firstMessage;
            }

            const secondContent = () => {
              let secondMessage;

              if (prodViews >= 200) {
                secondMessage = `Viewed Over <b>200</b> Times`;
              }

              // if 100-200
              if (prodViews >= 100 && prodViews < 200) {
                secondMessage = `Viewed Over <b>100</b> Times`;
              }

              // if 50 - 100
              if (prodViews >= 50 && prodViews < 100) {
                secondMessage = `Viewed Over <b>50</b> Times`;
              }

              return secondMessage;

            }

            const scarcityMessages = () => {
              const scarcityContainer = document.createElement('div');
              scarcityContainer.classList.add(`${ID}-scarcityMessages`);
              scarcityContainer.innerHTML = `
            <div class="${ID}-scarcity ${ID}-first">${firstContent()}</div>
            <div class="${ID}-scarcity ${ID}-second">${secondContent()}${VARIATION==='2'? ` this week` : ''}</div>`;

              document.querySelector('.product-gallery__main').insertAdjacentElement('afterbegin', scarcityContainer);
            }

            scarcityMessages();

            const showHideMessages = () => {
              //  the first after 2 seconds, the second after 4 seconds.
              const firstEl = document.querySelector(`.${ID}-scarcity.${ID}-first`);
              const secondEl = document.querySelector(`.${ID}-scarcity.${ID}-second`);


              //1st message shows at 2 and disappears at 7
              setTimeout(() => {
                firstEl.classList.add(`${ID}-show`);
              }, 2000);
              setTimeout(() => {
                firstEl.classList.add(`${ID}-fadeOut`);
                firstEl.classList.remove(`${ID}-show`);
              }, 7000)

              setTimeout(() => {
                secondEl.classList.add(`${ID}-show`);
              }, 4000);
              setTimeout(() => {
                secondEl.classList.add(`${ID}-fadeOut`);
                firstEl.classList.remove(`${ID}-show`);
              }, 9000);

              setTimeout(() => {
              document.querySelector(`.${ID}-scarcityMessages`).remove();
              }, 9700);

            };

            showHideMessages();

          });
        }
      }
    }
  }
}
