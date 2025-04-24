/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { pollerLite } from '../../../../../lib/utils';
import {
  cookieOpt,
  fireEvent,
  setup
} from './services';
import shared from './shared';

export default () => {
  const {
    ID,
    VARIATION
  } = shared;

  setup();
  cookieOpt();

  if(VARIATION === '1') {
    let products = [];

    let groupToLoad = 0;


   /* if (sessionStorage.getItem(`${ID}-loaded`)) {
      groupToLoad = sessionStorage.getItem(`${ID}-loaded`);
    } else {
      groupToLoad = 0;
    }*/

    const chunkArrayInGroups = (arr, size) => {
      let myArray = [];
      for (let i = 0; i < arr.length; i += size) {
        myArray.push(arr.slice(i, i + size));
      }
      return myArray;
    }


    const offerProductWrapper = () => {
      const offers = document.createElement('div');
      offers.classList.add(`${ID}-offerWrapper`);
      offers.innerHTML = `
      <h3><span>Special Offers</span></h3>
      <div class="${ID}-products search-result-items tiles-container clearfix"></div>
      <div class="${ID}-loadCTA" data-target="${groupToLoad}">Load More</div>`;

      document.querySelector('.search-result-content').appendChild(offers);
    }
    offerProductWrapper();

    const checkAllActive = () => {
      const allLists = document.querySelectorAll(`.${ID}-productList`);
      const allActive = document.querySelectorAll(`.${ID}-productList.${ID}-active`);

      if(allActive.length === allLists.length) {
        return true;
      }
    }

    const increaseButtonNo = () => {
      const loadMore = document.querySelector(`.${ID}-loadCTA`);
      loadMore.dataset.target = ++groupToLoad;


      const matchingProducts = document.querySelector(`.${ID}-productList[group-no="${loadMore.dataset.target}"]`);
      matchingProducts.classList.add(`${ID}-active`);

      // store the amount shown incase of page refresh
      sessionStorage.setItem(`${ID}-loaded`, loadMore.dataset.target);


      // if all are loaded, hide the load more
      const allLists = document.querySelectorAll(`.${ID}-productList`);
      const allActive = document.querySelectorAll(`.${ID}-productList.${ID}-active`);

      if(checkAllActive()) {
        loadMore.classList.add(`${ID}-hidden`);
      }

    }

    const getAllProducts = () => {
      return new Promise(function (resolve, ref) {
        const request = new XMLHttpRequest();
        request.open('GET', 'https://www.hotelchocolat.com/uk/shop/collections/prices/special-offers/?sz=156', true);
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            const temp = document.createElement('html');
            temp.innerHTML = request.responseText;
            const items = temp.querySelectorAll('#search-result-items .grid-tile');
            const divsArr = Array.from(items);
            products.push(divsArr);
            resolve();
          }
        };
        request.send();
      });
    }

  
    const addCTAToAll = () => {
      const mixOffers = {
        'Any2 Batons for £12': {
          offer: 'Any 2 Batons for £12',
          link: 'https://www.hotelchocolat.com/uk/shop/collections/products/all-products/?pmid=multibuy-iconic-batons',
        },
        'Enrobed Fruits - £9 each or 3 for £22' : {
          offer: 'Enrobed Fruits - £9 each or 3 for £22',
          link: 'https://www.hotelchocolat.com/uk/shop/collections/products/all-products/?pmid=CONT_HC_MB_ENROB',
        },
        'Hot Chocolate - 2 for £15' : {
          offer: 'Hot Chocolate - 2 for £15',
          link: 'https://www.hotelchocolat.com/uk/shop/collections/products/all-products/?pmid=2021_2for15_hotchocolatepouch',
        },
        'Buyany 3 Little Tipples for £10' : {
          offer: 'Buy any 3 Little Tipples for £10',
          link: 'https://www.hotelchocolat.com/uk/shop/collections/products/all-products/?pmid=18032021_tipples_multi',
        },
        '3 Macarons for £25' : {
          offer: '3 Macarons for £25',
          link: 'https://www.hotelchocolat.com/uk/shop/collections/products/all-products/?pmid=macarons-3for25',
        },
        'RibbonBags - £6 each or 2 for £10' : {
          offer: 'Ribbon Bags - £6 each or 2 for £10',
          link: 'https://www.hotelchocolat.com/uk/shop/collections/products/all-products/?pmid=CONT_HC_MB_NIB',
        },
        'Any3 Selectors for £10 or 6 for £20' : {
          offer: 'Any 3 Selectors for £10 or 6 for £20',
          link: 'https://www.hotelchocolat.com/uk/shop/collections/products/all-products/?pmid=CONT_HC_MB_SELECT_New',
        },
      
      }
      const allProducts = document.querySelectorAll('.product-tile');

        for (let index = 0; index < allProducts.length; index += 1) {
          const element = allProducts[index];
          if(element.querySelector('.promotion')) {
            if(element.querySelector('.promotion .promotion-callout').textContent.trim().indexOf('MIX & MATCH') > -1) {
              element.classList.add(`${ID}-hasOffer`);
              const offerName = element.querySelector('.promotion .promotion-callout').textContent.trim().replace('MIX & MATCH', '').replace(/\s+/, "");      

              Object.keys(mixOffers).forEach((i) => {
                const data = mixOffers[i];
              
                if([i][0] === offerName) {
                  const offerButton = `
                  <div class="${ID}-offerCTA">
                  <span>MIX & MATCH</span>
                  <p>${data.offer}</p>
                  </a>`;
                  element.insertAdjacentHTML('beforeend', offerButton);

                  element.querySelector(`.${ID}-offerCTA`).addEventListener('click', () => {
                    window.location.href = data.link;
                    fireEvent('Clicked Mix & Match Offer');
                  });
                }
              });
            }
          }
          
        }
    }


    getAllProducts().then(() => {

      let groupedProducts;
      if(window.innerWidth >= 1280) {
        groupedProducts = chunkArrayInGroups(products[0], 20);
      } else {
        groupedProducts = chunkArrayInGroups(products[0], 18);
      }

      // loop through all and append them to grid
      for (let index = 0; index < groupedProducts.length; index += 1) {
        const element = groupedProducts[index];
        const productBlock = document.createElement('ul');
        productBlock.setAttribute('group-no', [index]);
        productBlock.className = `${ID}-productList search-result-items tiles-container`;

        // make first one active
        if (index === 0) {
          productBlock.classList.add(`${ID}-active`);
        }
        for (let x = 0; x < element.length; x += 1) {
          const productEl = element[x];
          productBlock.appendChild(productEl);
        }
        document.querySelector(`.${ID}-products`).appendChild(productBlock);
      }

      // make any active from local storage
     /* if (sessionStorage.getItem(`${ID}-loaded`)) {

        document.querySelector(`.search-result-content`).scrollIntoView();
        // increase no of active from session to incluce 0 based
        const noActive = (parseFloat(sessionStorage.getItem(`${ID}-loaded`)) + 1);
        setTimeout(() => {

       
          const previouslyActive = document.querySelectorAll(`.${ID}-productList:nth-child(-n+${noActive})`);
          for (let i = 0; i < previouslyActive.length; i += 1) {
            const listEl = previouslyActive[i];
            listEl.classList.add(`${ID}-active`);
          }
        }, 5000);
       
      }*/

      
      // on load more click
      const loadMorebutton = document.querySelector(`.${ID}-loadCTA`);
      loadMorebutton.addEventListener('click', () => {
        increaseButtonNo();
      });

      // if all already loaded, hide load more
      if(checkAllActive()) {
        loadMorebutton.classList.add(`${ID}-hidden`);
      }

      addCTAToAll();
      


    });
  }
};
