/**
 * PL030 - Increased Bundles Visibility & Clarity
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  // console.log(`${shared.ID} is running!`);
  const leftContainer = document.querySelector(`.content__wrapper.product_main__body .row.limited-row .column._50`);
  const quickLinksEl = document.querySelector(`.container.product-page__quick-links`);
  leftContainer.insertAdjacentElement('beforeend', quickLinksEl);

  // --- Move "View all images" to center-align
  const viewAllImagesContainer = document.querySelector('.imagezoom .main .row_block.txc');
  if (viewAllImagesContainer) {
    quickLinksEl.insertAdjacentElement('beforebegin', viewAllImagesContainer);
  }

  const bundles = document.querySelectorAll('ul.product__items.bundle_items .product__item');
  let bundleElements = '';

  let topBundles = 0;
  for (let i = 0; i < bundles.length; i += 1) {
    const bundle = bundles[i];
    const title = bundle.querySelector('span.header__text.bundle_title');
    let titleText = title.innerText.trim();
    let splitParts = titleText.split('+');
    if (splitParts.length == 2) {
      titleText = `${splitParts[0]} </br> + ${splitParts[1]}`;
    }
    // titleText = titleText
    const url = title.parentElement.getAttribute('href');
    const imageContainer = bundle.querySelector('.product-item__body').outerHTML;
    
    let validBundle = false;
    let pricesContainer;
    let exVatPrice = '';
    let incVatPrice = '';
    let addCta;

    if (bundle.querySelector('.price__items')) {
      pricesContainer = bundle.querySelector('.price__items');

      if (pricesContainer.querySelector('.price-ex')) {
        exVatPrice = pricesContainer.querySelector('.price-ex').outerHTML;
        validBundle = true;
      }
      
      if (pricesContainer.querySelector('.price-inc')) {
        incVatPrice = pricesContainer.querySelector('.price-inc').outerHTML;
        validBundle = true;
      }
    }
    
    
    // const exVatPrice = pricesContainer.querySelector('.price-ex').outerHTML;
    // const incVatPrice = pricesContainer.querySelector('.price-inc').outerHTML;
    const saveAmount = bundle.querySelector('.savings-pip');
    let saveAmountText = '';
    let amountText = '';
    if (saveAmount) {
      saveAmountText = saveAmount.innerText.trim();
      amountText = saveAmountText.split('£')[1];
      saveAmountText = `You save <span class="green">£${amountText}</span>`;
    }
    // const addCta = bundle.querySelector('a.btn.btn--yellow').outerHTML;
    if (bundle.querySelector('a.btn.btn--yellow')) {
      addCta = bundle.querySelector('a.btn.btn--yellow');
      addCta.classList.add(`${shared.ID}-addBundle${i}`);
    }
    // const addCta = bundle.querySelector('a.btn.btn--yellow');
    // addCta.classList.add(`${shared.ID}-addBundle${i}`);

    if (title && addCta && validBundle) {
      if (window.innerWidth > 551) {
        bundleElements += `<div class="${shared.ID}-bundle">
          <div class="${shared.ID}-bundle__content-left">
            <div class="${shared.ID}-bundle__img">${imageContainer}</div>
            <div class="${shared.ID}-bundle__save">${saveAmountText}</div>
          </div>
          <div class="${shared.ID}-bundle__content-right">
            <a class="${shared.ID}-bundle__title" href="${url}">${titleText}</a>
            <div class="${shared.ID}-inner">
              <span class="${shared.ID}-prices">
                <span class="${shared.ID}-price__exVat">${exVatPrice}</span>
                <span class="${shared.ID}-price__incVat">${incVatPrice}</span>
              </span>
              <span class="${shared.ID}-addCta">
                <a class="btn btn--yellow" href="javascript:void(0);" id="${shared.ID}-addBundle${i}">Add to Basket</a>
              </span>
            </div>
          </div>
        </div>`;

        topBundles += 1;
      } else {
        bundleElements += `<div class="${shared.ID}-bundle mobile">
          <div class="${shared.ID}-bundle__content-top">
            <div class="${shared.ID}-bundle__content-image">
              <div class="${shared.ID}-bundle__img">${imageContainer}</div>
              <div class="${shared.ID}-bundle__save">${saveAmountText}</div>
            </div>
            <a class="${shared.ID}-bundle__title" href="${url}">${titleText}</a>
          </div>
          <div class="${shared.ID}-bundle__content-bottom">
            <div class="${shared.ID}-inner">
              <span class="${shared.ID}-prices">
                <span class="${shared.ID}-price__exVat">${exVatPrice}</span>
                <span class="${shared.ID}-price__incVat">${incVatPrice}</span>
              </span>
              <span class="${shared.ID}-addCta">
                <a class="btn btn--yellow" href="javascript:void(0);" id="${shared.ID}-addBundle${i}">Add to Basket</a>
              </span>
            </div>
          </div>
        </div>`;

        topBundles += 1;
      }
    }
    
    if (topBundles == 2) {
      i  = 100;
    }
  }
  // [].forEach.call(bundles, (bundle) => {
  //   const title = bundle.querySelector('span.header__text.bundle_title');
  //   const titleText = title.innerText.trim();
  //   const url = title.parentElement.getAttribute('href');

  //   console.log(`${titleText} has url: ${url}`);
  //   console.log('-  -  -  -  -  - -  -');
  // });
  const newEl = `<div class="${shared.ID}-container container product-container">
    <div class="container__title">Buy this printer in a bundle and save...</div>
    <div class="${shared.ID}-container__body container__body">
      ${bundleElements}
    </div>
    <div class="${shared.ID}-bundleCta__container">
      <div class="${shared.ID}-bundleCta">View other Bundles</div>
    </div>
  </div>`;
  const rightSideContainer = document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_pnlAction');
  rightSideContainer.insertAdjacentHTML('afterend', newEl);

  // --- Change CTA text
  const addBundleBtns = document.querySelectorAll(`.${shared.ID}-addCta a`);
  if (window.innerWidth > 551) {
    [].forEach.call(addBundleBtns, (btn) => {
      btn.innerText = 'Add to Basket';

      btn.addEventListener('click', (e) => {
        const bundleId = btn.getAttribute('id');
        document.querySelector(`.${bundleId}`).click();

        btn.innerText = 'Added';
        btn.setAttribute('style', 'background-color: #1e824c; color: #FFF; width: 85%;');

        // --- Re-add experiment class to Bundle CTA
        setTimeout(() => {
          document.querySelectorAll('ul.product__items.bundle_items .product__item a.btn.btn--yellow')[0].classList.add(`${shared.ID}-addBundle0`);
          document.querySelectorAll('ul.product__items.bundle_items .product__item a.btn.btn--yellow')[1].classList.add(`${shared.ID}-addBundle1`);
        }, 2000);
      });
    });
  } else {
    [].forEach.call(addBundleBtns, (btn) => {
      btn.innerText = 'Add';

      btn.addEventListener('click', (e) => {
        const bundleId = btn.getAttribute('id');
        document.querySelector(`.${bundleId}`).click();

        btn.innerText = 'Added';
        btn.setAttribute('style', 'background-color: #1e824c; color: #FFF; width: 85%;');

        // --- Re-add experiment class to Bundle CTA
        setTimeout(() => {
          document.querySelectorAll('ul.product__items.bundle_items .product__item a.btn.btn--yellow')[0].classList.add(`${shared.ID}-addBundle0`);
          document.querySelectorAll('ul.product__items.bundle_items .product__item a.btn.btn--yellow')[1].classList.add(`${shared.ID}-addBundle1`);
        }, 2000);
      });
    });
  }

  // --- If there are less than 3 bundles, hide Scroll down Button
  if (document.querySelector('.product__items.bundle_items')
  && document.querySelectorAll('ul.product__items.bundle_items .product__item').length < 3) {
    document.querySelector(`.${shared.ID}-bundleCta__container`).setAttribute('style', 'display: none;');
  }
  // --- Scroll into View 
  document.querySelector(`.${shared.ID}-bundleCta`).addEventListener('click', (e) => {
    if (window.innerWidth <= 552) {
      document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_pnlOverViewColumn a').click();
    }
    
    document.querySelector('#ctl00_ctl00_contentPlaceHolderBase_ContentPlaceHolderMain_pnlOverViewColumn').scrollIntoView({behavior: "smooth", block: "start"});
  });
  
};

export default activate;