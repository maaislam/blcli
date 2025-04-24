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

const processAddingAdditionalInfo = (product, listerOption, index) => {

  let currPositionInRow = 0;
  if (window.outerWidth > 1500) {
  currPositionInRow = index % 4;
  } else if (window.outerWidth <= 1280 && window.outerWidth > 575) {
    currPositionInRow = index % 3;
  } else if (window.outerWidth <= 575) {
    currPositionInRow = index % 2;
  }

  let currListerOption = listerOption;

  if (currPositionInRow == 1 && window.outerWidth > 575) {
    listerOption.previousElementSibling.insertAdjacentElement('beforebegin', currListerOption);
  } else if (currPositionInRow == 2 && window.outerWidth > 575) {
    listerOption.previousElementSibling.previousElementSibling.insertAdjacentElement('beforebegin', currListerOption);
  } else if (currPositionInRow == 3 && window.outerWidth > 575) {
    listerOption.previousElementSibling.previousElementSibling.previousElementSibling.insertAdjacentElement('beforebegin', currListerOption);
  }

  let theLister = '';

  if(listerOption == '') {
    theLister = document.querySelector('.oct-listers-hits .oct-grid__cell');
  } else {
    theLister = listerOption;
  }

  theLister.classList.add(`${ID}-promoted`);  


  let newHTML = `

            <div class="${ID}-additionalinfo">
              
              <div class="${ID}-additionalinfo--header">
                <svg viewBox="0 0 92 85" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect width="92" height="85" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0_2043_182" transform="matrix(0.00286174 0 0 0.00311214 -0.195402 -0.0634259)"/></pattern><image id="image0_2043_182" width="486" height="342" xlink:href="data:image/png;base64,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AAQgAAEIQMAhAgizQ87AFAhAAAIQgADCTAxAAAIQgAAEHCKAMDvkDEyBAAQgAAEIIMzEAAQgAAEIQMAhAgizQ87AFAhAAAIQgADCTAxAAAIQgAAEHCKAMDvkDEyBAAQgAAEIIMzEAAQgAAEIQMAhAgizQ87AFAhAAAIQgADCTAxAAAIQgAAEHCKAMDvkDEyBAAQgAAEIIMzEAAQgAAEIQMAhAgizQ87AFAhAAAIQgADCTAxAAAIQgAAEHCKAMDvkDEyBAAQgAAEIIMzEAAQgAAEIQMAhAgizQ87AFAhAAAIQgADCTAxAAAIQgAAEHCKAMDvkDEyBAAQgAAEIIMzEAAQgAAEIQMAhAgizQ87AFAhAAAIQgADCTAxAAAIQgAAEHCKAMDvkDEyBAAQgAAEIIMzEAAQgAAEIQMAhAgizQ87AFAhAAAIQgADCTAxAAAIQgAAEHCKAMDvkDEyBAAQgAAEIIMzEAAQgAAEIQMAhAgizQ87AFAhAAAIQgADCTAxAAAIQgAAEHCKAMDvkDEyBAAQgAAEIIMzEAAQgAAEIQMAhAgizQ87AFAhAAAIQgADCTAxAAAIQgAAEHCKAMDvkDEyBAAQgAAEIIMzEAAQgAAEIQMAhAgizQ87AFAhAAAIQgADCTAxAAAIQgAAEHCKAMDvkDEyBAAQgAAEIIMzEAAQgAAEIQMAhAgizQ87AFAhAAAIQgADCTAxAAAIQgAAEHCKAMDvkDEyBAAQgAAEIIMzEAAQgAAEIQMAhAgizQ87AFAhAAAIQgADCTAxAAAIQgAAEHCKAMDvkDEyBAAQgAAEIIMzEAAQgAAEIQMAhAgizQ87AFAhAAAIQgADCTAxAAAIQgAAEHCKAMDvkDEyBAAQgAAEIIMzEAAQgAAEIQMAhAgizQ87AFAhAAAIQgADCTAxAAAIQgAAEHCKAMDvkDEyBAAQgAAEIIMzEAAQgAAEIQMAhAgizQ87AFAhAAAIQgADCTAxAAAIQgAAEHCKAMDvkDEyBAAQgAAEIIMzEAAQgAAEIQMAhAgizQ87AFAhAAAIQgADCTAxAAAIQgAAEHCKAMDvkDEyBAAQgAAEIIMzEAAQgAAEIQMAhAgizQ87AFAhAAAIQgADCTAxAAAIQgAAEHCKAMDvkDEyBAAQgAAEIIMzEAAQgAAEIQMAhAgizQ87AFAhAAAIQgADC3MgxUMx7xdY1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"/></defs></svg>
                <h3>${VARIATION == 1 ? `No7 Future Renew Serum 25ml` : `No7 Future Renew&trade; Defence Shield SPF 50 50ml`}</h3>
              </div>
              
              <div class="${ID}-additionalinfo--detail">
          
                ${VARIATION == 1 ? `
              
                  <h2> Clinically proven to <span>reverse</span> visible signs of sun damage* including, uneven skin tone, lines and wrinkles, and loss of firmness. </h2>
              
                  <ul>
                  
                    <li>A world-first peptide technology</li>
                    <li>Dermatologist approved.</li>
                    <li><span>Reverse & protect</span> against sun damage by using alongside NEW Future Renew Defence Shield SPF 50</li>
                  
                  </ul>
              
                ` : `
                
                  <h2> Expertly developed to help <span>protect</span> against visible signs of sun damage*. </h2>

                  <ul>

                    <li>Formulated with SPF 50 to help protect skin from visible damage caused by UV: uneven skin tone, fine lines & wrinkles, and dryness.</li>
                    <li>The invisible, fast-absorbing texture is suitable for all skin types and creates the perfect base for makeup.</li>
                    <li>This lightweight day cream leaves skin looking and feeling hydrated.</li>

                  </ul>
                
                `}
              
              </div>            
            
            </div>
            

          `;

  if(!theLister.querySelector(`.${ID}-additionalinfo`)) {
    theLister.querySelector('.oct-teaser-wrapper').insertAdjacentHTML('afterend', newHTML);
  }

}


const startExperiment = () => {

  pollerLite(['.oct-listers-hits .oct-grid__cell'], () => {

   
    setTimeout(() => {
      let allCurrListerOptions = document.querySelectorAll('.oct-listers-hits > .oct-grid__cell');
      allCurrListerOptions = [].slice.call(allCurrListerOptions).filter((listerOption) => {
        if (listerOption.getAttribute('style') == "display: none !important;") {
          return false;
        } else {
          return listerOption;
        }
        
      });
      let foundProduct = false;
      allCurrListerOptions.forEach((listerOption, index) => {
        let listerOptionSKU = '';
      
        if(!listerOption.getAttribute('data-productid')) {
          const urlParams = new URLSearchParams(window.location.search);
          const searchTerm = urlParams.get('searchTerm');
          if(isNaN(parseInt(searchTerm))) {
            let product = listerOption.querySelector('.oct-link').href;
            let skuCode = product.split('-')[product.split('-').length - 1];
            listerOptionSKU = skuCode;
          } else {
            listerOptionSKU = searchTerm;
          }
        } else {
          listerOptionSKU = listerOption.getAttribute('data-productid') ? listerOption.getAttribute('data-productid').replace('.P', '') : '00000000';
        }


        // change these out for the real SKU values once it's set up
        if ((listerOptionSKU == "10338928" || listerOptionSKU == "10322081") && foundProduct == false) {
          let claimFound = true;

          
          
          

          if (VARIATION !== "control" && claimFound == true) {
            if (listerOptionSKU == "10322081" && VARIATION == 1) {
              processAddingAdditionalInfo("10322081", listerOption, index);
              hidePromoTiles();
              foundProduct = true;
            } else if (listerOptionSKU == "10338928" && VARIATION == 2) {
              processAddingAdditionalInfo("10338928", listerOption, index);
              hidePromoTiles();
              foundProduct = true;
            }
          
          } 

          if(VARIATION == "control" && claimFound == true) {
            if(listerOptionSKU == "10322081" || listerOptionSKU == "10338928") {
              foundProduct = true;
            }
          }

          if (foundProduct == true) {
            fireEvent('Conditions Met', true);
            fireEvent(`Interaction - product found, experience ${VARIATION == "control" ? "would have" : "was"} displayed on page: ${window.location.href} with product sku: [${listerOptionSKU}] highlighted`, true);
          } 

        }
        
      });

    }, 1000);


  })

}

const hidePromoTiles = () => {

  let allIngridTeasers = document.querySelectorAll('.oct-teaser__inGrid');

  [].slice.call(allIngridTeasers).forEach((ingridTeaser) => {
    
      ingridTeaser.closest('.oct-grid__cell').classList.add(`${ID}-hidden`);
    
  });


}

const addTracking = () => {

  document.body.addEventListener('click', (e) => {

    if (e.target.classList.contains('oct-add-to-basket_button') || e.target.closest('.oct-add-to-basket_button')) {

      let promotedCTA = e.target.closest(`.${ID}-promoted`) ? true : false;
      let productName = e.target.closest('.oct-grid__cell').querySelector('.oct-link').href;

      fireEvent(`Click - user has clicked ATB button for product [${productName}] on page [${window.location.href}] which ${promotedCTA ? "was" : "was not"} promoted by the experiment`);

    }


  });

}

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

export default () => {

  setup();

  

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
 
  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  addTracking();

  let oldHref = document.location.href;
  let bodyList = document.querySelector("body");
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function () {
      if (oldHref != document.location.href) {
        oldHref = document.location.href;

        
        document.querySelector(`.${ID}-promoted`)?.classList.remove(`${ID}-promoted`);
        document.querySelector(`.${ID}-additionalinfo`)?.remove();
        startExperiment();
        

      }
    });
  });
  const config = {
    childList: true,
    subtree: true
  };

  observer.observe(bodyList, config);

  fireOnListerUpdates(() => {

    document.querySelector(`.${ID}-promoted`)?.classList.remove(`${ID}-promoted`);
    document.querySelector(`.${ID}-additionalinfo`)?.remove();
    startExperiment();

  });


};
