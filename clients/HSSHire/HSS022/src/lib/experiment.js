/**
 * HSS022 - Personalised DIY products on homepage (HSS015 iteration)
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import data from './data';

const { ID, VARIATION } = shared;

const activate = () => {
  if (shared.VARIATION == 'control') {
    events.send('CRO Experiment', `${shared.ID}`, 'Control - Activated', { sendOnce: true });
  } else {
    // rest of experiment code
    events.send('CRO Experiment', `${shared.ID}`, 'V1 - Activated', { sendOnce: true });
    setup();

    if (window.location.pathname == "/hire") {
      // Write experiment code here
      // console.log(`>>> ${shared.ID} is running on  HOMEPAGE`);
      const mainContent = document.querySelectorAll('.container')[1];
      let sectionTitle = '';
      if (sessionStorage.getItem(`${shared.ID}-user-visited-pdp`) !== null) {
        sectionTitle = 'Products Chosen For You';
      } else {
        sectionTitle = 'Most Popular Products';
      }

      // --- Generate Container Items
      let productPages = null;
      if (JSON.parse(sessionStorage.getItem(`${shared.ID}-visited-pdp`)) !== null) {
        productPages = JSON.parse(sessionStorage.getItem(`${shared.ID}-visited-pdp`));
      }
      let similarProducts = null;
      if (JSON.parse(sessionStorage.getItem(`${shared.ID}-suggested-products`)) !== null) {
        similarProducts = JSON.parse(sessionStorage.getItem(`${shared.ID}-suggested-products`));
      }
      let containerItems = '';
      let productsArray = [];
      let numOfItems = 0;
      let remainingItems = '';

      if (productPages == null) {
        for (const key in data) {
          const item = data[key];
          let banner = `<div class="HSS022-banner__wrapper">
            <div class="HSS022-banner">Suggested for you</div>
          </div>`;
          if (productPages !== null 
          && productPages[`${item.url}`]) {
            banner = `<div class="HSS022-banner__wrapper yellow">
              <div class="HSS022-banner">Recently viewed</div>
            </div>`;
          }

          if (sectionTitle === 'Most Popular Products') {
            banner = '';
          }

          let productTitle = item.title;
          const maxLength = 26;
          if (productTitle.length > maxLength) {
            const trimmedString = productTitle.substring(0, maxLength);
            productTitle = `${trimmedString}...`;
          }
          containerItems += `<li class="${shared.ID}-list__item" id="${shared.ID}-tile__${key}">
            ${banner}
            <div class="${shared.ID}-title__wrapper ${shared.ID}-content__blue">
              <div>${productTitle}</div>
            </div>
            <a href="${item.url}"></a>
            <a class="${shared.ID}-btn-info btn" href="${item.url}">View product</a>
          </li>`;
        }
      } else {
        for (const key in productPages) {
          let item = productPages[key];
          // alert('show item');

          if (typeof item == 'object') {
            // alert('recently viewed');
            let productTitle = item.title;
            const maxLength = 26;
            if (productTitle.length > maxLength) {
              const trimmedString = productTitle.substring(0, maxLength);
              productTitle = `${trimmedString}...`;
            }
 
            let productEl = '';
            if (item.type == 'recentlyViewed') {
              productEl = `<li class="${shared.ID}-list__item" style="background-image: url('${item.img}');">
                <div class="HSS022-banner__wrapper yellow">
                  <div class="HSS022-banner">Recently viewed</div>
                </div>
                <div class="${shared.ID}-title__wrapper ${shared.ID}-content__blue">
                  <div>${productTitle}</div>
                </div>
                <a href="${item.url}"></a>
                <a class="${shared.ID}-btn-info btn" href="${item.url}">View product</a>
              </li>`;
            } else if (item.type == 'similarProduct') {
              productEl = `<li class="${shared.ID}-list__item" style="background-image: url('${item.img}');">
                <div class="HSS022-banner__wrapper">
                  <div class="HSS022-banner">Popular Product</div>
                </div>
                <div class="${shared.ID}-title__wrapper ${shared.ID}-content__blue">
                  <div>${productTitle}</div>
                </div>
                <a href="${item.url}"></a>
                <a class="${shared.ID}-btn-info btn" href="${item.url}">View product</a>
              </li>`;
            }
            
            productsArray.push(productEl);

            numOfItems += 1;
          } else if (typeof item == 'boolean' && numOfItems < 4) {
            // alert('suggested for you');
            for (const key in data) {
              const item = data[key];
              let banner = `<div class="HSS022-banner__wrapper">
                <div class="HSS022-banner">Suggested for you</div>
              </div>`;
              if (productPages !== null 
              && productPages[`${item.url}`]) {
                banner = `<div class="HSS022-banner__wrapper yellow">
                  <div class="HSS022-banner">Recently viewed</div>
                </div>`;
              }
              let productTitle = item.title;
              const maxLength = 26;
              if (productTitle.length > maxLength) {
                const trimmedString = productTitle.substring(0, maxLength);
                productTitle = `${trimmedString}...`;
              }

              if (banner.indexOf('Recently viewed') > -1) {
                const productEl = `<li class="${shared.ID}-list__item remaining" id="${shared.ID}-tile__${key}">
                  ${banner}
                  <div class="${shared.ID}-title__wrapper ${shared.ID}-content__blue">
                    <div>${productTitle}</div>
                  </div>
                  <a href="${item.url}"></a>
                  <a class="${shared.ID}-btn-info btn" href="${item.url}">View product</a>
                </li>`
                productsArray.push(productEl);
              } else {
                remainingItems += `<li class="${shared.ID}-list__item remaining" id="${shared.ID}-tile__${key}">
                  ${banner}
                  <div class="${shared.ID}-title__wrapper ${shared.ID}-content__blue">
                    <div>${productTitle}</div>
                  </div>
                  <a href="${item.url}"></a>
                  <a class="${shared.ID}-btn-info btn" href="${item.url}">View product</a>
                </li>`;

              }
              
              numOfItems += 1;
            }
          }
        }
        
      }

      let recentlyViewedList = '';
      let suggestedProductsList = '';
      if (productsArray !== []) {
        for (let i = 0; i < productsArray.length; i += 1) {
          const productTile = productsArray[i];
          if (productTile.indexOf('Recently viewed') > -1) {
            recentlyViewedList = `${productTile}${recentlyViewedList}`;
          } else if (productTile.indexOf('Popular Product') > -1) {
            suggestedProductsList += productTile;
          }
        }
        containerItems += `${recentlyViewedList}${suggestedProductsList}`;
      }

      
      const topContainer = `<div class="${shared.ID}-diyContainer__wrapper col-xs-12">
        <div class="${shared.ID}-diyContainer__header">
          <h2>${sectionTitle}</h2>
        </div>
        <div class="${shared.ID}-diyContainer__container">
          <div class="${shared.ID}-diyContainer__content">
            <ul class="${shared.ID}-list">
              ${containerItems}
              ${remainingItems}
            </ul>
          </div>
        </div>
      </div>`;
      // mainContent.insertAdjacentHTML('beforebegin', topContainer);
      // document.querySelectorAll('.container')[1].insertAdjacentHTML('afterbegin', topContainer);
      if (window.innerWidth > 767) {
        mainContent.insertAdjacentHTML('afterbegin', topContainer);
      } else {
        mainContent.insertAdjacentHTML('beforebegin', topContainer);
      }
    } else if (window.location.pathname.indexOf('/p/') > -1) {
      // alert(`>>> ${shared.ID} is running on  PDP`);
      sessionStorage.setItem(`${shared.ID}-user-visited-pdp`, true);
      let productPages = {
        '/hire/p/light-vibrating-plate-flat-base' : false,
        '/hire/p/floor-and-edge-sander-hire-pack' : false,
        '/hire/p/power-digger-rotavator' : false,
        '/hire/p/mitower' : false,
      };
      if (JSON.parse(sessionStorage.getItem(`${shared.ID}-visited-pdp`)) !== null) {
        productPages = JSON.parse(sessionStorage.getItem(`${shared.ID}-visited-pdp`));
      }
      let oneOfTheTopProducts = false;
      for (const key in data) {
        const item = data[key];
        if (item.url == window.location.pathname) {
          productPages[`${item.url}`] = true;
          sessionStorage.setItem(`${shared.ID}-visited-pdp`, JSON.stringify(productPages));
          oneOfTheTopProducts = true;
        }
      }

      // alert(oneOfTheTopProducts);
      if (!oneOfTheTopProducts) {
        const productImg = document.querySelector('img.primaryPDPImage').getAttribute('src');
        const productTitle = document.querySelector('h1.group_title').innerText;
        const pdpPathname = window.location.pathname;
        if (productTitle !== '') {
          productPages[`${pdpPathname}`] = {
            'type' : 'recentlyViewed',
            'title': `${productTitle}`,
            'img': `${productImg}`,
            'url': `${pdpPathname}`,
          };
          sessionStorage.setItem(`${shared.ID}-visited-pdp`, JSON.stringify(productPages));
        }
        
      }

      /**
       * @desc Check if there are any "Similar/Popular" products
       * and add to content to object
       */
      pollerLite(['.similar-prdts ul.similar-slider li.prod_list', '.similar-prdts ul.similar-slider li.prod_list img[src]'], () => {
        // alert('here');
        setTimeout(() => {
          const allSimilarProducts = document.querySelectorAll('.similar-prdts ul.similar-slider li.prod_list');
          let suggestedProducts = {};
          // if (JSON.parse(sessionStorage.getItem(`${shared.ID}-suggested-products`)) !== null) {
          //   suggestedProducts = JSON.parse(sessionStorage.getItem(`${shared.ID}-suggested-products`));
          // }
          [].forEach.call(allSimilarProducts, (product) => {
            const similarProductImg = product.querySelector('.thumb img.primaryPDPImage').getAttribute('src');
            const similarProductTitle = product.querySelector('.details h2').innerText.trim();
            const similarProductPathname = product.querySelector('a.check-avail').getAttribute('href');

            if (similarProductTitle !== '' && !productPages[`${similarProductPathname}`]) {
              // suggestedProducts[`${similarProductPathname}`] = {
              //   'title': `${similarProductTitle}`,
              //   'img': `${similarProductImg}`,
              //   'url': `${similarProductPathname}`,
              // };
              productPages[`${similarProductPathname}`] = {
                'type' : 'similarProduct',
                'title': `${similarProductTitle}`,
                'img': `${similarProductImg}`,
                'url': `${similarProductPathname}`,
              };
              sessionStorage.setItem(`${shared.ID}-visited-pdp`, JSON.stringify(productPages));
            }
          });

          // if (suggestedProducts !== {}) {
          //   sessionStorage.setItem(`${shared.ID}-suggested-products`, JSON.stringify(suggestedProducts));
          // }
        }, 2000);
          
      });
      
    }
      
    
  }
};


export default activate;