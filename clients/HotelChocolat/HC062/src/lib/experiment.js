/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { fireEvent, setup } from './services';
import shared from './shared';
import { observer } from '../../../../../lib/utils';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  if(VARIATION === 'control') {
    fireEvent('Test Fired');
  } else {
    fireEvent('Test Fired');
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


    const addCTAToAll = () => {
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

    const removeAll = () => {
      const allOffers = document.querySelectorAll(`.${ID}-offerCTA`);
      if(allOffers) {
        for (let index = 0; index < allOffers.length; index += 1) {
          const element = allOffers[index];
          element.remove();
        }
      }

      const allProducts = document.querySelectorAll('.product-tile');
      for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];
        if(element.querySelector('.promotion')) {
          if(element.querySelector('.promotion .promotion-callout').textContent.trim().indexOf('MIX & MATCH') > -1) {
            element.classList.remove(`${ID}-hasOffer`);
          }
        }
      }
    }

    addCTAToAll();

    observer.connect(document.querySelector('.search-result-content'), () => {
      removeAll();
      setTimeout(() => {
        addCTAToAll();
      }, 1000);
     
    }, {
      config: { attributes: true, childList: true, subtree: false },
      throttle: 1000,
    });



  }

};
