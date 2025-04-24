import { fullStory } from '../../../../../lib/utils';
import shared from './shared';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

export const generateLightbox = () => {
  const { ID, VARIATION } = shared;

  const mainContainer = document.querySelector('.main-body-container');
  const lightboxContainer = `<div class="${shared.ID}-lightbox__wrapper hide">
    <div class="${shared.ID}-lightbox__container">
      <div  class="${shared.ID}-lightbox__header">
        <span  class="${shared.ID}-lightbox__title">Lowest Price Guaranteed</span>
        <span class="${shared.ID}-lightbox__close"></span>
      </div>
      <div class="${shared.ID}-lightbox__content">
        <div class="${shared.ID}-content__left">
          <div class="${shared.ID}-badge__wrapper hide">
            <div class="${shared.ID}-badge">
              <div>14</div>
              <div>Day Trial</div>
            </div>
          </div>
          <div class="${shared.ID}-product__image""></div>
          <div class="${shared.ID}-product__title"></div>
          <div class="${shared.ID}-product__prices prices price__items">
            
          </div>
          <div class="${shared.ID}-product__ctaBtn">
            <div class="${shared.ID}-ctaBtn btn btn--yellow"></div>
          </div>
        </div>
        <div class="${shared.ID}-product__separator"></div>
        <div class="${shared.ID}-content__right">
          <div class="${shared.ID}-product__offers">
            <ul class="${shared.ID}-list">
              <li>We will not be beaten on price.</li>
              <li>We check our competitors prices every day.</li>
              <li>We can price match on request.</li>
            </ul>

            <a href='https://www.printerland.co.uk/GenuinePriceContent-E189.aspx'>Find out more</a>
          </div>
          <div class="${shared.ID}-product__specialOffers">
            <ul class="checklist tick-list tick-list--blue">                                                
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  mainContainer.insertAdjacentHTML('afterbegin', lightboxContainer);
};

export const plpPopulateLightbox = (pageType, lightboxEl) => {
  const { ID, VARIATION } = shared;
  ///////////////////////////////////////////////
  let allPrinters;
  if (document.querySelector('.grid.grid-view li.product__item')) {
    allPrinters = document.querySelectorAll('.grid.grid-view li.product__item');
  } else if (document.querySelector('.product__items .product__item')) {
    allPrinters = document.querySelectorAll('.product__items .product__item');
  }
  [].forEach.call(allPrinters, (printer) => {
    let title;
    if (pageType === 'plp') {
      title = printer.querySelector('.header__text');
    } else if (pageType === 'home') {
      title = printer.querySelector('.header__text');
    }
    const titleLink = title.querySelector('a');
    // if (titleLink) {
    //   titleLink.removeAttribute('onclick');
    //   titleLink.removeAttribute('href');
    // }
   
    // titleLink.addEventListener("click",function(){
    //   alert("preform action");
    //   // window.event.preventDefault();
    //   titleLink.removeAttribute('onclick');
    //   titleLink.removeAttribute('href');
    // },false);
    if (title) {
      if (window.innerWidth > 1023) {
        // --- DESKTOP
        // console.log('[plp] ---------------------------- desktop');
        title.addEventListener("mouseup",event=>{
          // Prevent Default Actions
          // event.preventDefault();
          console.log('--- YOU ARE HERE');
          window.event.preventDefault();
          event.stopPropagation();
  
          let selection = document.getSelection ? document.getSelection().toString() :  document.selection.createRange().toString();
          if (selection !== '') {
            let titleText;
            if (title.querySelector('a')) {
              titleText = title.querySelector('a').innerHTML.trim();
            } else {
              titleText = title.innerHTML.trim();
            }
            const pricesContent = printer.querySelector('.price__items').innerHTML;
            let offersContent = '';
            if (printer.querySelector('.spec-offer__container ul.tick-list.tick-list--blue')) {
              offersContent = printer.querySelector('.spec-offer__container ul.tick-list.tick-list--blue').innerHTML;
            }
            const imgUrl = printer.querySelector('picture img.lazyloaded').getAttribute('src');
            
            let btn;
            if (pageType === 'plp') {
              btn = printer.querySelector('a.btn.btn--yellow');
            } else if (pageType === 'home') {
              btn = printer.querySelector('a.btn.btn--yellow');
            }
            const productUrlPathname = btn.getAttribute('href');
  
            const titleEl = lightboxEl.querySelector(`.${shared.ID}-product__title`);
            // titleEl.setAttribute('href', `https://www.printerland.co.uk/${productUrlPathname}`);

            titleEl.innerHTML = titleText;
            const pricesContainer = lightboxEl.querySelector(`.${shared.ID}-product__prices`);
            pricesContainer.innerHTML = pricesContent;
            const imageEl = lightboxEl.querySelector(`.${shared.ID}-product__image`);
            imageEl.setAttribute('style', `background-image: url('${imgUrl}')`);
            const specialOffersEl = lightboxEl.querySelector(`.${shared.ID}-product__specialOffers ul`);
            specialOffersEl.innerHTML = offersContent;
            const newCtaBtn = lightboxEl.querySelector(`.${shared.ID}-ctaBtn`);
            // newCtaBtn.setAttribute('href', `${productUrlPathname}`);
            if (pageType === 'home' || pageType === 'plp') {
              newCtaBtn.innerHTML = 'View Product';
            }
  
            newCtaBtn.addEventListener('click', () => {
              window.location.href = `https://www.printerland.co.uk/${productUrlPathname}`;
            });
          
            // --- Hide badge
            if (document.querySelector(`.${shared.ID}-badge__wrapper`)) {
              document.querySelector(`.${shared.ID}-badge__wrapper`).classList.add('hide');
            }
            if (document.querySelector(`.${shared.ID}-product__specialOffers li`)) {
              const lightboxSpecialOffers = document.querySelectorAll(`.${shared.ID}-product__specialOffers li`);
              for (let i = 0; i < lightboxSpecialOffers.length; i += 1) {
                const offer = lightboxSpecialOffers[i];
                if (offer.querySelector('span').innerText) {
                  const offerText = offer.querySelector('span').innerText.trim().toLowerCase();
                  if (offerText.indexOf('14 day trial') > -1) {
                    if (document.querySelector(`.${shared.ID}-badge__wrapper`)) {
                      document.querySelector(`.${shared.ID}-badge__wrapper`).classList.remove('hide');
                    }
    
                    break;
                  }
                }
                
              };
            }
            // --- Show lightbox
            lightboxEl.classList.remove('hide');
          }
        });
      } else {
        // ---- TABLET
        // console.log('[plp] ---------------------------- tablet');
        title.addEventListener("touchend",event=>{
          // Prevent Default Actions
          // event.preventDefault();
          window.event.preventDefault();
          event.stopPropagation();
          let selection = document.getSelection ? document.getSelection().toString() :  document.selection.createRange().toString();
          if (selection !== '') {
            let titleText;
            if (title.querySelector('a')) {
              titleText = title.querySelector('a').innerHTML.trim();
            } else {
              titleText = title.innerHTML.trim();
            }
            const pricesContent = printer.querySelector('.price__items').innerHTML;
            let offersContent = '';
            if (printer.querySelector('.spec-offer__container ul.tick-list.tick-list--blue')) {
              offersContent = printer.querySelector('.spec-offer__container ul.tick-list.tick-list--blue').innerHTML;
            }
            const imgUrl = printer.querySelector('picture img.lazyloaded').getAttribute('src');
            
            let btn;
            if (pageType === 'plp') {
              btn = printer.querySelector('a.btn.btn--yellow');
            } else if (pageType === 'home') {
              btn = printer.querySelector('a.btn.btn--yellow');
            }
            const productUrlPathname = btn.getAttribute('href');
  
            const titleEl = lightboxEl.querySelector(`.${shared.ID}-product__title`);
            titleEl.innerHTML = titleText;
            titleEl.setAttribute('href', `https://www.printerland.co.uk/${productUrlPathname}`);
            const pricesContainer = lightboxEl.querySelector(`.${shared.ID}-product__prices`);
            pricesContainer.innerHTML = pricesContent;
            const imageEl = lightboxEl.querySelector(`.${shared.ID}-product__image`);
            imageEl.setAttribute('style', `background-image: url('${imgUrl}')`);
            const specialOffersEl = lightboxEl.querySelector(`.${shared.ID}-product__specialOffers ul`);
            specialOffersEl.innerHTML = offersContent;
            const newCtaBtn = lightboxEl.querySelector(`.${shared.ID}-ctaBtn`);
            // newCtaBtn.setAttribute('href', `${productUrlPathname}`);
            if (pageType === 'home' || pageType === 'plp') {
              newCtaBtn.innerHTML = 'View Product';
            }
  
            newCtaBtn.addEventListener('click', () => {
              window.location.href = `https://www.printerland.co.uk/${productUrlPathname}`;
            });
          
            // --- Hide badge
            if (document.querySelector(`.${shared.ID}-badge__wrapper`)) {
              document.querySelector(`.${shared.ID}-badge__wrapper`).classList.add('hide');
            }
            if (document.querySelector(`.${shared.ID}-product__specialOffers li`)) {
              const lightboxSpecialOffers = document.querySelectorAll(`.${shared.ID}-product__specialOffers li`);
              for (let i = 0; i < lightboxSpecialOffers.length; i += 1) {
                const offer = lightboxSpecialOffers[i];
                const offerText = offer.querySelector('span').innerText.trim().toLowerCase();
                if (offerText.indexOf('14 day trial') > -1) {
                  if (document.querySelector(`.${shared.ID}-badge__wrapper`)) {
                    document.querySelector(`.${shared.ID}-badge__wrapper`).classList.remove('hide');
                  }
                  
                  break;
                }
              };
            }
            // --- Show lightbox
            lightboxEl.classList.remove('hide');
          }
        });
      }

    }
  });
  ////////////////////////////////////////////////////////
};

export const pdpPopulateLightbox = (pageType, lightboxEl) => {
  const { ID, VARIATION } = shared;

  const title = document.querySelector('.product-page__title .main__title h1#productTitle');
  const skuCode = document.querySelector('.product-page__title p span[itemprop="sku"]');
  if (title && skuCode) {
    if (window.innerWidth > 959) {
      //window.innerWidth > 1023
      // --- DESKTOP
      // console.log('[pdp] ---------------------------- desktop');
      pdpDesktop(title, lightboxEl, 'title');
      pdpDesktop(skuCode.parentElement, lightboxEl, 'sku');
    } else {
      // ---- TABLET
      // console.log('[pdp] ---------------------------- tablet');
      // //////////////////////
      // console.log('------ touchmove event');
      pdpTablet(title, lightboxEl, 'title');
      pdpTablet(skuCode, lightboxEl, 'sku');
    }

  }
};

export const closeLightbox = (lightboxEl, pageType) => {
  const { ID, VARIATION } = shared;

  // --- Close Icon
  const closeIcon = document.querySelector(`.${shared.ID}-lightbox__close`);
  
  closeIcon.addEventListener('click', () => {
    lightboxEl.classList.add('hide');
    if (pageType === 'pdp') {
      lightboxEl.parentNode.removeChild(lightboxEl);
    }
  });

  // --- Clicked outside Lightbox
  if (window.innerWidth > 1023) {
    document.querySelector(`.${shared.ID}-lightbox__wrapper`).addEventListener('click', (e) => {
      if (document.querySelector(`.${shared.ID}-lightbox__container`) && !document.querySelector(`.${shared.ID}-lightbox__container`).classList.contains('hide')) {
        if (!document.querySelector(`.${shared.ID}-lightbox__container`).contains(e.target)) {
          // Clicked outside the box
          lightboxEl.classList.add('hide');
          if (pageType === 'pdp') {
            lightboxEl.parentNode.removeChild(lightboxEl);
          }
        }
      }
    });
  }
  
};

export const pdpDesktop = (title, lightboxEl, el) => {
  const run = (event) => {

    let selection = document.getSelection ? document.getSelection().toString() :  document.selection.createRange().toString();
    if (selection !== '') {
      let titleText = title.innerHTML.trim();
      const pricesContent = document.querySelectorAll('.price__items')[1].innerHTML;
      let offersContent = '';
      if (document.querySelector('.container.product-container ul.tick-list')) {
        offersContent = document.querySelector('.container.product-container ul.tick-list').innerHTML;
      }
      const imgUrl = document.querySelector('a#hlinkLargeImage').getAttribute('href');
      const btn = document.querySelector('.pricing__controls a.btn.btn--yellow');
      const productUrlPathname = btn.getAttribute('href');


      const titleEl = lightboxEl.querySelector(`.${shared.ID}-product__title`);
      if (el === 'sku') {
        titleText = document.querySelector('h1#productTitle').innerText;
        titleEl.innerHTML = document.querySelector('h1#productTitle').innerText;
      } 
      if (titleText.length > 65) {
        titleEl.classList.add('short');
      }
      titleEl.innerHTML = titleText;
      
      const pricesContainer = lightboxEl.querySelector(`.${shared.ID}-product__prices`);
      pricesContainer.innerHTML = pricesContent;
      const imageEl = lightboxEl.querySelector(`.${shared.ID}-product__image`);
      imageEl.setAttribute('style', `background-image: url('${imgUrl}')`);
      const specialOffersEl = lightboxEl.querySelector(`.${shared.ID}-product__specialOffers ul`);
      specialOffersEl.innerHTML = offersContent;
      const newCtaBtn = lightboxEl.querySelector(`.${shared.ID}-ctaBtn`);
      newCtaBtn.innerHTML = 'Add to Basket';
    
      // --- Hide badge
      if (document.querySelector(`.${shared.ID}-badge__wrapper`)) {
        document.querySelector(`.${shared.ID}-badge__wrapper`).classList.add('hide');
      }
      
      if (document.querySelector(`.${shared.ID}-product__specialOffers li`)) {
        const lightboxSpecialOffers = document.querySelectorAll(`.${shared.ID}-product__specialOffers li`);
        for (let i = 0; i < lightboxSpecialOffers.length; i += 1) {
          const offer = lightboxSpecialOffers[i];
          const offerText = offer.querySelector('span').innerText.trim().toLowerCase();
          if (offerText.indexOf('14 day trial') > -1) {
            if (document.querySelector(`.${shared.ID}-badge__wrapper`)) {
              document.querySelector(`.${shared.ID}-badge__wrapper`).classList.remove('hide');
            }

            break;
          }
        };
      }
      // --- Show lightbox
      lightboxEl.classList.remove('hide');

      // --- Add to Basket CTA
      newCtaBtn.addEventListener('click', () => {
        if (!newCtaBtn.classList.contains('button-eventAdded')) {
          btn.click();
          newCtaBtn.classList.add('button-eventAdded');
          lightboxEl.classList.add('hide');
          lightboxEl.parentNode.removeChild(lightboxEl);
        }
      });
    }
  };

  let mouseDownElement = null;

  document.addEventListener('mousedown', (e) => {
    mouseDownElement = e.target;
  });

  document.addEventListener('mouseup', (e) => {
    if(title == mouseDownElement || title == mouseDownElement.parentElement || title == e.target || title == e.target.parentElement) {
      run(e);
    }
  });

  //title.addEventListener("mouseup",event=>{ run(event) });
  //title.addEventListener("touchend",event=>{ run(event) });
};

export const pdpTablet = (title, lightboxEl, el) => {
  // console.log('[383] --- pdpTablet');
  // title.setAttribute('style', 'background-color: lightblue;');
  // title.addEventListener("mouseup",event=>{
  title.addEventListener("touchend",event=>{
    // Prevent Default Actions
    // event.preventDefault();
    window.event.preventDefault();
    event.stopPropagation();
    // title.setAttribute('style', 'background-color: lightcoral;');
    
    let selection = document.getSelection ? document.getSelection().toString() :  document.selection.createRange().toString();
    // if (selection !== '') {
      let titleText;
      if (title.querySelector('a')) {
        titleText = title.querySelector('a').innerHTML.trim();
      } else {
        titleText = title.innerHTML.trim();
      }
      const pricesContent = document.querySelectorAll('.price__items')[1].innerHTML;
      let offersContent = '';
      if (document.querySelector('.container.product-container ul.tick-list')) {
        offersContent = document.querySelector('.container.product-container ul.tick-list').innerHTML;
      }
      const imgUrl = document.querySelector('img.productimage').getAttribute('src');
      
      const btn = document.querySelector('.pricing__controls a.btn.btn--yellow');

      const titleEl = lightboxEl.querySelector(`.${shared.ID}-product__title`);
      
      if (el === 'sku') {
        titleText = document.querySelector('h1#productTitle').innerText;
        titleEl.innerHTML = document.querySelector('h1#productTitle').innerText;
        // titleEl.setAttribute('href', `https://www.printerland.co.uk/${productUrlPathname}`);
      } 
      if (titleText.length > 65) {
        titleEl.classList.add('short');
      }
      titleEl.innerHTML = titleText;
      const pricesContainer = lightboxEl.querySelector(`.${shared.ID}-product__prices`);
      pricesContainer.innerHTML = pricesContent;
      const imageEl = lightboxEl.querySelector(`.${shared.ID}-product__image`);
      imageEl.setAttribute('style', `background-image: url('${imgUrl}')`);
      const specialOffersEl = lightboxEl.querySelector(`.${shared.ID}-product__specialOffers ul`);
      specialOffersEl.innerHTML = offersContent;
      const newCtaBtn = lightboxEl.querySelector(`.${shared.ID}-ctaBtn`);
      newCtaBtn.innerHTML = 'Add to Basket';

      newCtaBtn.addEventListener('click', () => {
        if (!newCtaBtn.classList.contains('button-eventAdded')) {
          btn.click();
          newCtaBtn.classList.add('button-eventAdded');
          lightboxEl.classList.add('hide');
        }
      });
    
      // --- Hide badge
      if (document.querySelector(`.${shared.ID}-badge__wrapper`)) {
        document.querySelector(`.${shared.ID}-badge__wrapper`).classList.add('hide');
      }
      
      if (document.querySelector(`.${shared.ID}-product__specialOffers li`)) {
        const lightboxSpecialOffers = document.querySelectorAll(`.${shared.ID}-product__specialOffers li`);
        for (let i = 0; i < lightboxSpecialOffers.length; i += 1) {
          const offer = lightboxSpecialOffers[i];
          const offerText = offer.querySelector('span').innerText.trim().toLowerCase();
          if (offerText.indexOf('14 day trial') > -1) {
            if (document.querySelector(`.${shared.ID}-badge__wrapper`)) {
              document.querySelector(`.${shared.ID}-badge__wrapper`).classList.remove('hide');
            }

            break;
          }
        };
      }
      // --- Show lightbox
      lightboxEl.classList.remove('hide');
    // }
  });
};
