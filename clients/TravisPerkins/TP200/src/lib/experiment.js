/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';

const { ID, VARIATION } = shared;

const runPlpChanges = () => {
  const products = document.querySelectorAll('[data-test-id="product"]');
  products ? (
    [].forEach.call(products, (product) => {
      if ( !product.querySelector(`.${shared.ID}__wrap`)) {
        // get the total price
        const price = product.querySelector('[data-test-id="main-price"]').childNodes[1].nodeValue.replace('£', '').replace(',', '');
  
        // get the pack qty
        const productTitle = product.querySelector('[data-test-id="product-card-title"]').innerText;
        if (productTitle.match(/pack of/i)) {

          var packQty = ((productTitle.match(/pack of ([\d\.]+)/i) || [])[1] || '');

          packQty = packQty.trim();

          if (!packQty.includes('...') && packQty.length >= 3) {
            var pricePerBrick = price / packQty;
            pricePerBrick = pricePerBrick.toFixed(2);
            if (pricePerBrick) {
              // Add markup
              const markup = `
                <div class="${shared.ID}__wrap">
                  <span class="${shared.ID}__wrap__span">£${pricePerBrick}</span> per item
                </div>
              `;
  
              const secondPrice = product.querySelector('[data-test-id="second-price"]');
              if (secondPrice) {
                secondPrice.insertAdjacentHTML('afterend', markup);
                fireEvent(`added ppi PLP - ${productTitle}`);
              }
            }
          }
        }
      }
    })
  ) : null;
}

const runPdpChanges = () => {
  if( !document.querySelector(`.${shared.ID}__pdp-wrap`)) {
    const mainPriceWrap = document.querySelector(`[data-test-id="main-price"]`);
    if (mainPriceWrap) {
      const textSpan = mainPriceWrap.querySelector('span');
      if (textSpan) {
        var innerText = textSpan.innerText.toLowerCase();
        if (innerText != 'each') {
          const price = document.querySelector('[data-test-id="main-price"]').childNodes[1].nodeValue.replace('£', '').replace(',', '');


          let coverageValue = 0;
          try {
            [].forEach.call(document.querySelectorAll('[data-test-id="product-specifications"] [class*="TableRow"], [class*="PDPDesktop__SectionBody"] [data-test-id="product-specifications"] [class*="ProductTSDesktop__Property"]'), row => {
              const label = row.children[0];
              const value = row.children[1];
              if(label && value && label.innerText.match(/pack coverage/i)) {
                 coverageValue = parseFloat(value.innerText);
              }
            });
          } catch(e) {}

          const productTitle = document.querySelector('[data-test-id="product-name"]').innerText;

          if(coverageValue > 0) {
            const pricePerSqm = (price / coverageValue).toFixed(2);

            const markup = `
              <div class="${shared.ID}__pdp-wrap">
                <span class="${shared.ID}__pdp-wrap__span">£${pricePerSqm}</span> per m<sup>2</sup>
              </div>
            `;

            const secondPrice = document.querySelector('[data-test-id="second-price"]');
            if (secondPrice) {
              secondPrice.insertAdjacentHTML('afterend', markup);
              fireEvent(`added ppsqm PDP - ${productTitle}`);
            };
          } else if (price && productTitle) {
            var packQty = productTitle.toLowerCase().split('pack of')[1].replace(')', '') || undefined;
            packQty = packQty.trim();

            if(packQty.length >= 3) {
              var pricePerBrick = price / packQty;
              pricePerBrick = pricePerBrick.toFixed(2);
              if(pricePerBrick != 'nan') {
                if (pricePerBrick) {
                  const markup = `
                    <div class="${shared.ID}__pdp-wrap">
                      <span class="${shared.ID}__pdp-wrap__span">£${pricePerBrick}</span> per item
                    </div>
                  `;
                  const secondPrice = document.querySelector('[data-test-id="second-price"]');
                  if (secondPrice) {
                    secondPrice.insertAdjacentHTML('afterend', markup);
                    fireEvent(`added ppi PDP - ${productTitle}`);
                  };
                }
              }
            }
          }
        }
      }
    }
  }
}

const init = () => {
  const componentAlreadyExists = false; 

  if (componentAlreadyExists) {
    return;
  }

  // Experiment Code...
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  const plpAdded = document.querySelectorAll(`.${shared.ID}__wrap`);
  [].forEach.call(plpAdded, p => p.remove());


  const pdpAdded = document.querySelectorAll(`.${shared.ID}__pdp-wrap`);
  [].forEach.call(pdpAdded, p => p.remove());

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  pollerLite([
    '[data-test-id="plp-list"]'
  ], () => {
    runPlpChanges();

    // ---------------------
    // Handle list reload
    // ---------------------
    const list = document.querySelector('[data-test-id="plp-list"]');

    let isRunning = false;

    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if(!isRunning) {
          isRunning = true;

          setTimeout(() => {
            runPlpChanges();

            isRunning = false;
          }, 2000);
        }
      });
    });

    const config = {
        childList: true,
        subtree: false
    };

    observer.observe(list, config);
  });

  pollerLite([
    '[data-test-id="pdp-wrapper"]'
  ], () => {
    runPdpChanges();
  });
}

export default () => {
  init();

  // Poll and re-run init
  pollerLite([
    '#app-container',
  ], () => {
    const appContainer = document.querySelector('#app-container');

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    pollerLite([
      '[data-test-id="vat-switch-button"]',
    ], () => {
      const vatBtn = document.querySelector('[data-test-id="vat-switch-button"]');
      if(vatBtn) {
        vatBtn.addEventListener('click', e => {
          setTimeout(() => {
            init();
          }, 1500);
        });
      }
    });

    pollerLite([
      '[data-test-id="header-control-bar"]',
    ], () => {
      const vatBtn = document.querySelector('[data-test-id="header-control-bar"]');
      if(vatBtn) {
        vatBtn.addEventListener('click', e => {
          if(e.target.closest('[data-test-id="menu-vat-switch"]')) {
            setTimeout(() => {
              init();
            }, 2000);
          }
        });
      }
    });
    

    //let oldHref = document.location.href;
    //const observer = new MutationObserver(function(mutations) {
    //  mutations.forEach(function(mutation) {
    //    if (oldHref != document.location.href) {
    //      oldHref = document.location.href;

    //      document.body.classList.remove(`${shared.ID}`);

    //      setTimeout(() => {
    //        // -----------------------------------
    //        // Timeout ensures router has started to rebuild DOM container
    //        // and we don't fire init() too early
    //        // -----------------------------------
    //        init();
    //      }, 2000);
    //    }
    //  });
    //});

    //const config = {
    //    childList: true,
    //    subtree: true
    //};

    //// observer.observe(appContainer, config);
  });
};
