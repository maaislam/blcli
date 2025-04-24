/**
 * BI035
 */
import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { addPoller, addEventListener, addObserver } from './winstack';
import { isLoggedIn, isVibCustomer, getUserData } from './services';
import { runIngrid } from './in-grid';
import { events } from '../../../../../lib/utils';
import settings from './settings';
import PersonalisedToggle from './personalised-toggle';

/**
 * Flag user in storage
 *
 * Updates local storage and session storage with a value to say the user
 * is currently active within a session
 */
const flagUserInStorage = () => {
  sessionStorage.setItem(`${settings.ID}-flag`, 1);
  localStorage.setItem(`${settings.ID}-flag`, 1);
};

/**
 * Store product in local storage
 */
const storeProductInLocalStorage = (data) => {
  if(data && data.title && data.link) {
    let result = [];
    let stored = localStorage.getItem(`${settings.ID}-pstore`);
    if(stored) {
      result = JSON.parse(stored);
    }

    const matchingResults = result.filter((item) => item.link == data.link);
    if(!matchingResults || matchingResults.length == 0) {
      result.push(data);
    }

    localStorage.setItem(`${settings.ID}-pstore`, JSON.stringify(result));
  }
};

/**
 * Helper is this the personalised biscuits page?
 */
const isPersonalisedPage = () => {
  const isPersonalisedPage = (window.location.pathname === '/biscuits/personalised-biscuits');
  return isPersonalisedPage;
}

/**
 * Get products viewed
 */
const getProductsViewed = (latest = 0) => {
  const productsViewed = localStorage.getItem(`${settings.ID}-pstore`);

  let prods = [];
  if(productsViewed) {
    prods = JSON.parse(productsViewed);
  }

  if(latest > 0) {
    prods = prods.slice(-Math.abs(latest));
  }

  return prods;
};

/**
 * Returning user?
 */
const isReturning = () => {
  const sessionExists = sessionStorage.getItem(`${settings.ID}-flag`);
  const localExists = localStorage.getItem(`${settings.ID}-flag`);

  let returning = false;
  if(localExists && !sessionExists) {
    returning = true;
  }

  return returning;
};

/**
 * Hide breadcrumb
 */
const hideBreadcrumb = () => {
  const breadcrumbsElement = document.querySelector('breadcrumbs');
  if(breadcrumbsElement) {
    breadcrumbsElement.classList.add('ng-hide');
  }
};

/**
 * Hide current page headings
 */
const hideCurrentPageHeadings = () => {
  const h1 = document.querySelector('.wrap > h1');
  const h4 = document.querySelector('.wrap > h1 + .h4');

  if(h1) {
    h1.classList.add('ng-hide');
  }

  if(h4) {
    h4.classList.add('ng-hide');
  }

};

/**
 * Add page title
 */
const addPageTitle = () => {
  const main = document.querySelector('main');

  if(main) {
    let title = isPersonalisedPage() ? 'personalised biscuits' : 'all biscuits';
    main.insertAdjacentHTML('afterbegin', `
      <p class="col-11 fw-bold center h1 ${settings.ID}-pagetitle">${title}</p>
    `);
  }
};

/**
 * Create CTA section
 */
const createCtaSection = () => {
  const main = document.querySelector('main');

  if(main) {
    main.insertAdjacentHTML('afterbegin', `
      <div class="${settings.ID}-ctas">
        <p class="h2">occasions trending now...</p>
        <ul class="${settings.ID}-ctas__inner">
          <li class="${settings.ID}-cta">
            <a class="col-11 ${settings.ID}-birthday" href="/biscuits/birthday-biscuits">
              <span>happy birthday<br>biscuits</span>
            </a>
          </li>
          <li class="${settings.ID}-cta">
            <a class="col-11 ${settings.ID}-thankyou" href="/biscuits/thank-you-biscuits">
              <span>thank you<br>biscuits</span>
            </a>
          </li>
          <li class="${settings.ID}-cta">
            <a class="col-11 ${settings.ID}-getwell" href="/biscuits/get-well-biscuits">
              <span>get well soon<br>biscuits</span>
            </a>
          </li>
          <li class="${settings.ID}-cta">
            <a class="col-11 ${settings.ID}-summer" href="/biscuits/summer-biscuits">
              <span>summer<br>biscuits</span>
            </a>
          </li>
        </ul>
      </div>
    `);

    return document.querySelector(`.${settings.ID}-ctas`);
  }
};

/**
 * Create personalised toggle
 */
const createPersonalisedToggle = () => {
  const productsGrid = document.querySelector('.wrap > .grid:nth-of-type(2)');

  if(productsGrid) {
    const onToggleCallback = (active) => {
      if(active) {
        window.location = '/biscuits/personalised-biscuits';
      } else {
        window.location = '/biscuits';
      }
    };

    const toggler = new PersonalisedToggle(isPersonalisedPage(), onToggleCallback);

    productsGrid.insertAdjacentElement('beforebegin', toggler.component);
  }
};

/**
 * Create in grid category links
 */
const createIngridCategoryLinks = () => {
    const grid = document.querySelector('category-view .grid');
    const imagesToShow = (settings.INGRID.ITEMS).slice(0,settings.INGRID.NUM_TO_SHOW);

    runIngrid(grid, imagesToShow);

    addObserver([grid], () => {
      const grid = document.querySelector('category-view .grid');

      runIngrid(grid, imagesToShow);
    }, {
      childList: true,
      attributes: false,
    });
};

/**
 * Create recently viewed section
 */
const createRecentlyViewedSection = (prods) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add(`${settings.ID}-recentlyviewed`);

  wrapper.innerHTML = `
    <p class="h2">last time you loved...</p>

    <div class="wrap">
    <div class="${settings.ID}-recentlyviewed__prods grid m-t">
      ${Array.prototype.map.call(prods, (p) => `
        <div class="p-r-2 p-b-9 p-b-5-s p-l-2 w-3 w-4-m w-6">
          <div class="${settings.ID}-recentlyviewed__prod">
            <div class="pos-relative">
              <a href="${p.link}">
                <div class="ratio-1-1">
                  <img class="rf" src="${p.image}">
                </div>
              </a>
            </div>
            <div class="m-t-12px m-t-8px-s ${settings.ID}-meta">
              <a class="fs-4-s lh-1 link-2" href="${p.link}">${p.title}</a>

              <div class="m-t-1">
                <div class="inline-block col-11"><!--
                  --><!----><price class="inline-block fs-4-s price" precision="2">${p.price}</price>
                </div><!--
                --><bar class="p-r-1 p-l-1 fs-2 col-12"></bar><!--
                --><a href="${p.link}" class="button-inline fs-4-s">buy now</a>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
      </div>
    </div>
    </div>
  `;

  return wrapper;
};

/**
 * Read product info from datalayer
 */
const readProdFromDatalayer = () => {
  const contentView = (window.dataLayer.filter((d) => d.event && d.event == 'content-view' 
    && d.ecommerce && d.ecommerce.detail && d.ecommerce.detail.products
    && d['content-name']
    && d['content-name'] == window.location.pathname
  ) || {})[0];
  if(contentView) {
    const prod = (((contentView.ecommerce || {}).detail || {}).products || {})[0];

    if(prod && prod.id) {
      return prod;
    }
  }

  return false;
};

/**
 * ACTIVATE
 *
 * Entry point for running experiment
 */
const activate = () => {
  if(window.location.pathname == '/biscuits' || window.location.pathname == '/biscuits/personalised-biscuits') {
    events.send(`${settings.ID}-${settings.VARIATION}`, 'did-see-biscuits-page');

  }

  const variation = settings.VARIATION == 'control' ? 'control' : settings.VARIATION;

  if(variation == 'control') {
    return;
  }

  setup();

  // get scroll Y on load

  const onLoadScrollY = window.scrollY;

  if(window.location.pathname == '/biscuits' || window.location.pathname == '/biscuits/personalised-biscuits') {
    addPoller([
      '.wrap > .grid',
      'category-view .grid',
    ], () => {
      if(isReturning() && getProductsViewed().length >= 2) {
      } else {
        // Update local and session storage to flag user as active + first session
        flagUserInStorage();
      }

      // Hide breadcrumb
      hideBreadcrumb();

      // Hide current page headings
      hideCurrentPageHeadings();

      // Create CTAS section
      const ctas = createCtaSection();

      if(ctas && isReturning() && getProductsViewed().length >= 2) {
        // ---------------------------------------------------
        // Returning user that has viewed products
        // Show them the last 2 products that they viewed
        // ---------------------------------------------------
        const latestProducts = getProductsViewed(2);
        if(latestProducts) {
          const section = createRecentlyViewedSection(latestProducts);
          ctas.insertAdjacentElement('beforebegin', section);
        }
      }

      // Add title to page
      addPageTitle();

      // On Toggle
      createPersonalisedToggle();

      // Create the In Grid Category Links
      if(!isPersonalisedPage()) {
        createIngridCategoryLinks();
      }

      if(onLoadScrollY) {
        window.scrollTo(0, onLoadScrollY); // We're adding content, it shifts us in Y - so reset
      }
    });
  } else {
    addPoller([
      'local-product-view',
      'product-carousel .carousel__inner img.rf.loaded',
      () => window.dataLayer && window.dataLayer.length > 0,
      () => !!readProdFromDatalayer(),
    ], () => {
      let p = {
        title: '',
        link: window.location.pathname,
        image: '',
        price: '',
      };

      const productTitle = document.querySelector('local-product-view h1');
      if(productTitle) {
        p.title = productTitle.innerText.trim();
      }

      const image = document.querySelector('.carousel__inner img.rf.loaded');
      if(image) {
        const prefix = 'https://thumbor-gc.tomandco.uk/unsafe/fit-in/513x513/center/middle/smart/filters:upscale():fill(white):sharpen(0.5,0.5,true)/https://www.biscuiteers.com/static/media/catalog';
        p.image = prefix + image.getAttribute('image');
      }

      const price = document.querySelector('local-product-view price.price');
      if(price) {
        p.price = price.innerText.trim();
      }

      const prod = readProdFromDatalayer();
      if(prod) {
        p.id = prod.id;
        p.simple_sku = prod.simple_sku;
        p.product_id = prod.product_id;
      }

      storeProductInLocalStorage(p);
    });
  }
};

export default activate;
