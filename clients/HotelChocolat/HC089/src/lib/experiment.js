import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { observer, pollerLite } from '../../../../../lib/utils';
import AgeLightbox from './ageLightbox';
import { ctaClick, skus } from './helpers';

export default () => {
  const { ID, VARIATION } = shared;

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

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  
  const addNewCTA = (button, text) => {
    const ageCheckCTA = document.createElement('div');
    ageCheckCTA.classList.add(`${ID}-ageCheck`);
    ageCheckCTA.innerHTML = text;
    
    button.insertAdjacentElement('beforebegin', ageCheckCTA);

  }

  const addNewSubscriptionCTA = (button) => {
   
      const ctaText = document.querySelector('.upsell-offer .offer-heading').textContent;
      const ageCheckCTA = document.createElement('div');
      ageCheckCTA.classList.add(`${ID}-ageCheckSubscription`);
      ageCheckCTA.innerHTML = ctaText;
      button.insertAdjacentElement('beforebegin', ageCheckCTA);

  }


  new AgeLightbox();

  const plpQuickView = (products, quickviewTrigger) => {
    for (let index = 0; index < products.length; index += 1) {
      const element = products[index];

      element.querySelector(quickviewTrigger).addEventListener('click', () => {

        let sku;
        if(JSON.parse(element.querySelector('input').value).impression_product_SKU) {
          sku = JSON.parse(element.querySelector('input').value).impression_product_SKU;
        } else {
          sku = JSON.parse(element.querySelector('input').value).productID;
        }
        

        if(sku) {
          
          pollerLite(['#QuickViewDialog .button-fancy-large.add-to-cart', '#product-detail-wrapper input'], () => {

            if(skus.indexOf(sku) > -1) {

              document.documentElement.classList.add(`${ID}-alcohol`);

              // if subscription CTA
              pollerLite(['#QuickViewDialog .upsell-offer'], () => {
                console.log('here')
                setTimeout(() => {
                  addNewSubscriptionCTA(document.querySelector('.impulse-upsell-wrapper'));

                  const ageAddSub = document.querySelector(`.${ID}-ageCheckSubscription`);
                  ctaClick(ageAddSub);
                }, 500);
                
              });

              setTimeout(() => {
                addNewCTA(document.querySelector('#QuickViewDialog .add-to-cart'), 'Add to bag'); 
                const ageAdd = document.querySelector(`.${ID}-ageCheck`);
              
                ctaClick(ageAdd);  
              }, 500);
             
            } else {
              document.documentElement.classList.remove(`${ID}-alcohol`);
            }
          });
        } 
      });
    }
  }

  // PLP
  const allProducts = document.querySelectorAll(`.grid-tile`);
  if(allProducts) {
    plpQuickView(allProducts, '.quickview');

    if(document.querySelector('.search-result-content')) {
      observer.connect(document.querySelector('.search-result-content'), () => {
        if(document.querySelector(`.HC085-ageBox`)) {
          document.querySelector(`.HC085-ageBox`).remove();
        }

        setTimeout(() => {
          const allNewProducts = document.querySelectorAll(`.grid-tile`);
          plpQuickView(allNewProducts, '.quickview');  
        }, 1000);
      
      }, {
        config: { attributes: true, childList: true, subtree: false },
        throttle: 1000,
      });
    }
  }

  // Basket
  // if small view carousel
  pollerLite(['.einstain-inited .content-tile'], () => {
    if(document.querySelectorAll('.einstain-inited .content-tile')) {

      const quickViewInCarousel = document.querySelectorAll('.einstain-inited .content-tile');

      if(quickViewInCarousel) {
         console.log('here')
        plpQuickView(document.querySelectorAll('.einstain-inited .content-tile'), 'a');
      }
   
  }
  })
  

  // Recipe PDP
  if(window.location.href.indexOf('recipe') > -1) {

    const checkIfAlcohol = () => {
      return new Promise((resolve,reject) => {
        const allSubItems = document.querySelectorAll('.product-recipe-item');
        for (let index = 0; index < allSubItems.length; index+= 1) {
          const element = allSubItems[index];

          const itemSKU = element.querySelector('input[name="pid"]');
          if(skus.indexOf(itemSKU.value) > -1) {
            document.documentElement.classList.add(`${ID}-alcohol`);
            addNewCTA(element.querySelector('.sub-product-item.add-to-cart'), 'Add to bag');
            resolve();
          }
        }
      });
    }

    checkIfAlcohol().then(() => {
      addNewCTA(document.querySelector('.button-fancy-large.add-all-to-cart'), 'Add all ingredients to bag');

      const allAgeCheckButtons = document.querySelectorAll(`.${ID}-ageCheck`);
      for (let index = 0; index < allAgeCheckButtons.length; index++) {
        const element = allAgeCheckButtons[index];
        ctaClick(element);
      }
    });



  // PDP
  } else if(window.location.href.indexOf('.html') > -1) {

    if(!document.querySelector('.grid-tile .product-tile')) {
      const PDPsku = document.querySelector('#pid').value
      if(PDPsku) {
        if(skus.indexOf(PDPsku) > -1) {
          document.documentElement.classList.add(`${ID}-alcohol`);
          addNewCTA(document.querySelector('.button-fancy-large.add-to-cart'), 'Add to bag');

          const ageAdd = document.querySelector(`.${ID}-ageCheck`);
          ctaClick(ageAdd);

          pollerLite(['.pdpForm .impulse-upsell-wrapper .upsell-offer'], () => {
            addNewSubscriptionCTA(document.querySelector('.pdpForm .impulse-upsell-wrapper'));

            const addsub = document.querySelector(`.${ID}-ageCheckSubscription`);
            ctaClick(addsub);
          })
        }
      }

    }
  }

};
