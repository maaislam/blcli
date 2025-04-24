/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { addPoller, addEventListener, addObserver } from './winstack';
import { events, logMessage, pollerLite } from '../../../../../lib/utils';
import settings from './shared';

// V2 functions 
const initialWindowHeight = window.innerHeight;
let floatingBar;
let resizedHeight;

const reportWindowSize = () => {
  resizedHeight = window.innerHeight;

  if(resizedHeight > initialWindowHeight) {
    floatingBar.classList.add('navbar-hidden');
  } else if(resizedHeight = initialWindowHeight) {
    floatingBar.classList.remove('navbar-hidden');
  }

}

const createFloatingCTABar = () => {

  let currProdName = document.querySelector('h1').innerHTML;
  let currProdPrice = document.querySelector('local-product-view price').innerHTML;

  let newCTABoxHTML = `

    <div class="${settings.ID}-floating-bar">
      <div class="floating-bar-product-details">
        <div class="floating-bar-product-details-single">
          <p class="floating-bar-product-name"> ${currProdName} </p>
          <p class="floating-bar-product-price"> ${currProdPrice} </p>
        </div>
      </div>
      <div class="floating-bar-price-section hidden">
        <p class="floating-bar-product-price" id="BIC-96-current-total-price"> ${currProdPrice} </p>
      </div>
      <div class="floating-bar-cta">
        
      </div>
    </div>

  `;

  document.body.insertAdjacentHTML('beforeend', newCTABoxHTML);

  let cloneATBButton = document.querySelector('.p-b.main local-add-to-basket').cloneNode(true);
  cloneATBButton.id = "BIC-96-buy-button";
  cloneATBButton.classList.add('BIC-96-buy-button');
  let floatingBarCTASection = document.querySelector('.BIC-96-floating-bar .floating-bar-cta');
  if(floatingBarCTASection.childNodes.length <= 1) {
    floatingBarCTASection.appendChild(cloneATBButton);
  }
  
  document.getElementById('BIC-96-buy-button').addEventListener('click', () => {
    let mainATBButton = document.querySelector('.p-b.main local-add-to-basket');
    let bodyPos = document.body.getBoundingClientRect();
    let yPos = mainATBButton.getBoundingClientRect();
    mainATBButton.querySelector('.button').click();
    window.scrollTo(0, yPos.top - bodyPos.top - 200);
  })

  floatingBar = document.querySelector('.BIC-96-floating-bar');

  window.onresize = reportWindowSize;

}

const showFloatingBar = () => {

  document.querySelector('.BIC-96-floating-bar').classList.add('active');

}

const hideFloatingBar = () => {

  document.querySelector('.BIC-96-floating-bar').classList.remove('active');

}

const beginFloatingBar = () => {

      createFloatingCTABar();  

      let windowScrollYPrev = 0; 

      let button = document.querySelector('.p-b.main local-add-to-basket'); 

      let scrollWatch = new window.IntersectionObserver(entries => {
        entries.forEach(entry => {
          

          if(entry.isIntersecting == false && window.scrollY < windowScrollYPrev) {
            hideFloatingBar();
          }

          if (entry.intersectionRatio > 0) {
            windowScrollYPrev = window.scrollY;
            showFloatingBar();
          } 

        });
      }, { root: null });

      scrollWatch.observe(button);



}

const checkScrollFunction = () => {
  let lastKnownScrollPosition = window.scrollY;
  if(lastKnownScrollPosition > 50) {
    beginFloatingBar();
    document.removeEventListener('scroll', checkScrollFunction);
  }
}

// v1 functions

const mobileChanges = () => {
  const inPage = document.querySelector(`.${settings.ID}-inpage`);
  if(inPage) {
    inPage.parentNode.removeChild(inPage);
  }

  pollerLite([
    'upsell-products',
    'local-basket-add-notice > .pos-fixed',
    'local-basket-add-notice button',
    '.basket-add-notice-open'
  ], () => {
    window.scrollTo(0,0);

    const elm = document.querySelector('local-basket-add-notice > .pos-fixed');
    const main = document.querySelector('main');

    if(elm && main) {
      const elmCopy = elm.cloneNode(true);

      document.querySelector('local-basket-add-notice button').click();

      document.body.classList.remove('basket-add-notice-open');

      main.insertAdjacentElement('afterbegin', elmCopy);
      elmCopy.classList.add(`${settings.ID}-mobile-addons`);
      elmCopy.classList.add(`${settings.ID}-inpage`);
      elmCopy.classList.add(`${settings.ID}-DOD`);
    }
  }, {
    multiplier: 1,
    wait: 40,
    timeout: 12000
  });
};

export default () => {
  setup();

  logMessage(settings.ID + " - Variation: " + settings.VARIATION);
  pollerLite(['.p-b.main local-add-to-basket', '.cursor-zoom-in.loaded'], () => {
    const upsellBtn = document.querySelector('.p-b.main local-add-to-basket');
    if(upsellBtn && settings.VARIATION == 1) {
      upsellBtn.insertAdjacentHTML('beforebegin', `
        <upsell-products id="${settings.ID}-upsell" 
          class="${settings.ID}-DOD"
          products="vm.model.data.id" 
          options="{source: 'upSell', nonRoutable : true}" 
          data="vm.upSellProducts"
       ></upsell-products>
      `);

      tco.get('app')
        .$compile(
          angular.element(document.getElementById(`${settings.ID}-upsell`))
        )(
          angular.element(document.querySelector('local-product-view')).data()['$localProductViewController'].$scope
        );
        
      setTimeout(() => {
        const heading = document.querySelector('upsell-products .fs-4.lowercase');
        if(heading) {
          heading.innerHTML = '<span></span><strong><em>Make it extra special</em></strong>';
        }
      }, 2000);

      const productPageAdd = document.querySelector('local-add-to-basket .button');
      if(productPageAdd) {
        addEventListener(productPageAdd, 'click', mobileChanges);
      }
    } else if(upsellBtn && settings.VARIATION == 2) {
      pollerLite(['local-product-view'], () => {
        upsellBtn.insertAdjacentHTML('beforebegin', `
          <upsell-products id="${settings.ID}-upsell" 
            class="${settings.ID}-DOD"
            products="vm.model.data.id" 
            options="{source: 'upSell', nonRoutable : true}" 
            data="vm.upSellProducts"
         ></upsell-products>
        `);
        tco.get('app')
        .$compile(
          angular.element(document.getElementById(`${settings.ID}-upsell`))
        )(
          angular.element(document.querySelector('local-product-view')).data()['$localProductViewController'].$scope
        );

      });

      pollerLite(['#BIC-96-upsell .product'], () => {
        let initialScrollListener = document.addEventListener('scroll', checkScrollFunction);

        let tickBoxes = document.querySelectorAll('#BIC-96-upsell upsell-products-item');
        console.log(tickBoxes);
        [].slice.call(tickBoxes).forEach((tickBox) => {
          tickBox.addEventListener('click', (e) => {
            console.log(e);
            let targetParent = e.target.closest('label');
            let targetItem = targetParent.closest('upsell-products-item');
            let currTotalElement = document.getElementById('BIC-96-current-total-price');
            let currTotalPounds = currTotalElement.querySelector('.price-value').innerHTML;
            let currTotalPence = currTotalElement.querySelector('.price-cent').innerHTML;
            let currTotalNumber = parseFloat(currTotalPounds + "." + currTotalPence);

            if(targetParent.classList.contains('is-checked')) {

              let prodPriceElement = targetItem.querySelector('price');

              let prodPricePounds = prodPriceElement.querySelector('.price-value').innerHTML;
              let prodPricePence = prodPriceElement.querySelector('.price-cent').innerHTML;

              let prodPriceNumber = parseFloat(prodPricePounds + "." + prodPricePence);

              let newTotal = parseFloat(currTotalNumber + prodPriceNumber).toFixed(2);

              let newTotalPounds = newTotal.toString().split('.')[0];
              let newTotalPence = newTotal.toString().split('.')[1];

              currTotalElement.innerHTML = '<span class="price-symbol">£</span><span class="price-value">'+newTotalPounds+'</span><span class="price-separator">.</span><span class="price-cent">'+newTotalPence.substring(0, 2)+'</span>';

              currTotalElement.closest('.floating-bar-price-section').classList.remove('hidden');

              let prodPrice = prodPriceElement.innerHTML;
              let prodName = targetItem.querySelector('.product > .flex-grow > a').innerHTML;

              let addProductHTML = `
                <div class="floating-bar-product-details-single">
                  <p class="floating-bar-product-name"> ${prodName} </p>
                  <p class="floating-bar-product-price"> ${prodPrice} </p>
                </div>
              `;

              let insertionPoint = document.querySelector('.BIC-96-floating-bar > .floating-bar-product-details');
              if(!insertionPoint.classList.contains('additional')) {
                insertionPoint.classList.add('additional');
              }
              insertionPoint.insertAdjacentHTML('beforeend', addProductHTML);

            } else {

              let prodNameTBRemoved = targetItem.querySelector('.product > .flex-grow > a').innerHTML;

              let allCurrPDSingles = document.querySelectorAll('.floating-bar-product-details-single');

              let amountTBRemoved = 0;

              [].slice.call(allCurrPDSingles).forEach((item) => {
                let trimmedItemName = item.querySelector('.floating-bar-product-name').innerHTML.trim();
                if(trimmedItemName == prodNameTBRemoved) {
                  item.remove();

                  let itemPriceElement = item.querySelector('.floating-bar-product-price');

                  let itemPricePounds = itemPriceElement.querySelector('.price-value').innerHTML;
                  let itemPricePence = itemPriceElement.querySelector('.price-cent').innerHTML;

                  let itemPriceNumber = parseFloat(itemPricePounds + "." + itemPricePence);

                  let removedNewTotal = parseFloat(currTotalNumber - itemPriceNumber).toFixed(2);

                  let removedNewTotalPounds = removedNewTotal.toString().split('.')[0];
                  let removedNewTotalPence = removedNewTotal.toString().split('.')[1];

                  currTotalElement.innerHTML = '<span class="price-symbol">£</span><span class="price-value">'+removedNewTotalPounds+'</span><span class="price-separator">.</span><span class="price-cent">'+removedNewTotalPence.substring(0, 2)+'</span>';

                  if(document.querySelectorAll('.floating-bar-product-details-single').length == 1) {
                    document.querySelector('.BIC-96-floating-bar > .floating-bar-product-details').classList.remove('additional');
                    document.querySelector('.BIC-96-floating-bar > .floating-bar-price-section').classList.add('hidden');
                  }

                } 

              });

            }

          });
        });

        

      });

      
        
      setTimeout(() => {
        const heading = document.querySelector('upsell-products .fs-4.lowercase');
        if(heading) {
          heading.innerHTML = '<span></span><strong><em>Make it extra special</em></strong>';
        }
      }, 2000);

      const productPageAdd = document.querySelector('local-add-to-basket .button');
      if(productPageAdd) {
        addEventListener(productPageAdd, 'click', mobileChanges);
      }
      




    }

  });

  // --------------------------
  // Workaround for orientation change
  // --------------------------
  addEventListener(window, 'orientationchange', () => {
    window.location.reload();
  });

};
