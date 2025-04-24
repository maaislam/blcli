/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import elementTypes from './elementTypes';

const { ID, VARIATION } = shared;
const testID = `${ID}|£ vs % Discount Badging`;
const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
const testIDAndVariant = `${testID}|${testVariant}`;

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

const processPDPDetails = () => {

  pollerLite(['#PDP_productPrice', '#estore_pdp_trcol_2', '#estore_pdp_trcol_6'], () => {

    let productPriceNow = document.getElementById('PDP_productPrice');
    let productPriceWas = document.querySelector('.was_price');


    if(productPriceWas) {

      productPriceNow = productPriceNow.innerText.replace('£', '');
      productPriceNow = parseFloat(productPriceNow);

      productPriceWas = productPriceWas.innerText.split('£')[1];
      productPriceWas = parseFloat(productPriceWas);

      let discount = ((productPriceWas - productPriceNow) / productPriceWas) * 100;

      discount = Math.round(discount);
      discount = discount.toFixed(0);

      if(discount > 5) {
        // fireEvent(`Conditions Met - PDP saving ${VARIATION == "control" ? 'would have been' : 'is'} updated and displayed`, true);

        if (VARIATION !== "control") {
          document.documentElement.classList.add(`${ID}-pdp`);
          if (!document.getElementById('PDP_productPrice').classList.contains('price_redesign')) {

            let savingHTML = `

              <div class="${ID}-saving--badge">
                <span class="${ID}-saving--badgetext">Save ${discount}%</span>
              </div>
            `;

            document.getElementById('s7viewer').insertAdjacentHTML('afterbegin', savingHTML);


            let savingSmallHTML = `

              <div class="${ID}-saving--lozenge">
                <span class="${ID}-saving--lozengetext">- ${discount}%</span>
              </div>
            `;

            let priceNode = document.querySelector('.price');
            priceNode.insertAdjacentHTML('beforebegin', savingSmallHTML);

            // if (document.getElementById('estore_pdp_trcol_2')) {
            //   let offersCountdown = document.getElementById('estore_pdp_trcol_2');
            //   document.getElementById('estore_pdp_trcol_6').insertAdjacentElement('afterend', offersCountdown);
            // }

            document.getElementById('estore_product_price_widget').classList.add(`${ID}-pricearea`);


          } else {

            document.querySelector('.product_price')?.classList.add(`${ID}-saving`);

            let savingHTML = `

              <div class="${ID}-saving--badge">
                <span class="${ID}-saving--badgetext">- ${discount}%</span>
              </div>
            `;

            document.getElementById('s7viewer').insertAdjacentHTML('afterbegin', savingHTML);


            let savingSmallHTML = `

              <div class="${ID}-saving--lozenge">
                <span class="${ID}-saving--lozengetext">- ${discount}%</span>
              </div>
            `;

            let priceNode = document.querySelector('.price');
            priceNode.insertAdjacentHTML('beforebegin', savingSmallHTML);

            // if (document.getElementById('estore_pdp_trcol_2')) {
            //   let offersCountdown = document.getElementById('estore_pdp_trcol_2').closest('.row');
            //   document.getElementById('estore_pdp_trcol_6').insertAdjacentElement('afterend', offersCountdown);
            // }

            document.getElementById('estore_product_price_widget').classList.add(`${ID}-pricearea`);
          }


        }

      }
      

        
      
    }
    
  })



}

const processListerDetails = () => {

  pollerLite(['.oct-listers-hits#hits'], () => {
  
    let allCurrProducts = document.querySelectorAll('.oct-listers-hits#hits .oct-grid__cell');

    allCurrProducts = [].slice.call(allCurrProducts).filter((product) => {
      if (!product.querySelector('.oct-teaser__inGrid') && !product.classList.contains('AT-1505ContentSlot')) {
        return product;
      }
    });

    allCurrProducts.forEach((product) => {

      const productName = product.querySelector('.oct-teaser__title').innerText;
      const productNameLower = productName.toLowerCase();

      if(productNameLower.indexOf('dior') > -1 || productNameLower.indexOf('chanel') > -1) {
        return;
      } else {
        
      let productPriceNow = product.querySelector('.oct-teaser__productPrice');
      let productPriceWas = product.querySelector('.oct-teaser__productPriceWas');

      if(productPriceWas) {

        productPriceNow = productPriceNow.innerText.replace('£', '');
        productPriceNow = parseFloat(productPriceNow);

        productPriceWas = productPriceWas.innerText.replace('£', '').replace('Was ', '');
        let productPriceWasUpdated = "£" + productPriceWas;
        productPriceWas = parseFloat(productPriceWas);

        let discount = ((productPriceWas - productPriceNow) / productPriceWas) * 100;

        discount = Math.round(discount);
        discount = discount.toFixed(0);

        if(discount > 5) {
          // fireEvent(`Conditions Met - Lister saving ${VARIATION == "control" ? 'would have been' : 'is'} updated and displayed`, true);

          if (VARIATION !== "control") {

            product.querySelector('.oct-teaser__productPriceWas').innerText = productPriceWasUpdated;

            product.classList.add(`${ID}-saving`);

            let savingHTML = `
        
              <div class="${ID}-saving--badge">
                <span class="${ID}-saving--badgetext">- ${discount}%</span>
              </div>
            `;

            if (!product.querySelector(`.${ID}-saving--badge`)) {
              product.querySelector('.oct-teaser').insertAdjacentHTML('afterbegin', savingHTML);
            }
          }
        }
        
        
      }

      let priceWrapper = product.querySelector('.oct-teaser__price-wrapper');

      //product.querySelector('.oct-teaser__offer__container')?.insertAdjacentElement('beforebegin', priceWrapper);
      
      priceWrapper.classList.add(`${ID}-pricewrapper`);
      
      if (product.querySelector('.oct-teaser__productPriceDetail').innerText !== "") {
        let detailHolder = product.querySelector('.oct-teaser__productPriceDetail').closest('.oct-teaser__price-detail-wrapper');
        product.querySelector('.oct-teaser__price-wrapper').insertAdjacentElement('beforeend', detailHolder);
      }

      }
      
    });

  
  
  })


}

const addTracking = (pageType) => {

  if (pageType == "PDP" && document.querySelector('.was_price')) {

    document.body.addEventListener('click', (e) => {

      if (e.target.closest('#add2CartBtn')) {
        // fireEvent(`Click - user clicked on the ATC button for product: ${window.location.href}`, true);
        fireBootsEvent(`Click - user clicked on the ATC button for product: ${window.location.href}`, true, eventTypes.experience_action, {
          action: actionTypes.add_to_cart,
          action_details: `Clicked on the ATC button for product: ${window.location.href}`
        });
      }


    });

  } 
  // else if (pageType == "PLP" || pageType == "SLP") {

  //   document.body.addEventListener('click', (e) => {
  //     if (e.target.closest('.oct-grid__cell')) {

  //       if(e.target.closest('a')) {
  //         let product = e.target.closest('.oct-grid__cell');
  //         let productPromoted = product.classList.contains(`${ID}-saving`) ? true : false;
  //         let productURL = e.target.closest('a').href;
  //         fireEvent(`Click - user clicked on the product: ${productURL} to visit that product ${productPromoted ? `which was a promoted product from the test` : `which was not a promoted product from the test`}`, true);
  //       }

  //       if (e.target.closest(`.oct-add-to-basket_button`)) {
  //         let product = e.target.closest('.oct-grid__cell');
  //         let productPromoted = product.classList.contains(`${ID}-saving`) ? true : false;
  //         let productURL = product.querySelector('a').href;
  //         fireEvent(`Click - user clicked on the ATB CTA to add the product: ${productURL} to their basket ${productPromoted ? `which was a promoted product from the test` : `which was not a promoted product from the test`}`, true);
  //       }


        
  //     }


  //   });

  // }





}

const startExperiment = (pageType) => {

  addTracking(pageType);

  if(pageType == "PDP") {
    
    processPDPDetails();
    fireBootsEvent(`PDP discount render`, true, eventTypes.experience_render, {
        rendered_element: elementTypes.Promotions,
				render_detail: `PDP discount render`
    })
  } 
  else if(pageType == "PLP") {

    document.documentElement.classList.add(`${ID}-plp`);
    processListerDetails();

    fireOnListerUpdates(() => {
      processListerDetails();
    });


  }



}

export default () => {

  bootsEvents.initiate = true;
	bootsEvents.methods = ["datalayer"];
	bootsEvents.property = "G-C3KVJJE2RH"; 
	bootsEvents.testID = testIDAndVariant;

  setup();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  const isChanelOrDior = window.location.href.indexOf("chanel") > -1 || window.location.href.indexOf("dior") > -1;

	if (isChanelOrDior) {
		return;
	} else {
    pollerLite([
      () => {
        if (window.dataLayer.find((item) => item.event == "defaultPageView")) {
          return true;
        }
      }
    ], () => {

      let dataLayer = window.dataLayer || [];
      let pageView = dataLayer.filter((item) => {
        if (item.event == "defaultPageView") {
          return item;
        }
      });

      if (pageView[0].page.type == "PDP") {
        
        startExperiment("PDP");


      } 
      else if(pageView[0].page.type == "PLP" || pageView[0].page.type == "SLP") {
        
        startExperiment("PLP");

      }

    });
  }
};
