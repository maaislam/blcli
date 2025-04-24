import { fullStory } from '../../../../../lib/utils';
import { events, pollerLite } from '../../../../../lib/utils';
import shared from './shared';
import pageData from './pageData';

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
  document.body.classList.add(`${ID}-${VARIATION}`);
};

/*  ----------------
  Cookie opt in check
  ------------------ */
  export const cookieOpt = () => {
    const { ID, VARIATION } = shared;
    if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
      events.send(`${ID} V${VARIATION}`, 'fired', `test fired`);
    }
    pollerLite([
      '.optanon-alert-box-wrapper',
      '.optanon-toggle-display.cookie-settings-button',
      '.optanon-allow-all.accept-cookies-button',
      ], () => {
        const cookieAllowAll = document.querySelector('.optanon-button-wrapper.optanon-allow-all-button');
        cookieAllowAll.addEventListener('click', () => {
            if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
              events.send(`${ID} V${VARIATION}`, 'fired', `test fired`);
            }
        });
      });
    
      pollerLite(['.optanon-button-wrapper.optanon-save-settings-button'], () => {
        // on click of the buttons in settings
        const cookieAllowAll = document.querySelector('.optanon-button-wrapper.optanon-allow-all-button');
        cookieAllowAll.addEventListener('click', () => {
          if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
            events.send(`${ID} V${VARIATION}`, 'fired', `test fired`);
          }
        });
      
        const saveSettings = document.querySelector('.optanon-button-wrapper.optanon-save-settings-button');
        saveSettings.addEventListener('click', () => {
          if(window.OnetrustActiveGroups.indexOf(',2,') > -1) {
            events.send(`${ID} V${VARIATION}`, 'fired', `test fired`);
          }
        });
      });
  }

  export const fireEvent = (label) => {
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;
  
    events.sendAuto(VARIATION, label);
  
  }

  export const generateExperimentContent = () => {
    const { ID, VARIATION } = shared;
  
    let numOfProducts = document.querySelectorAll('.product_listing_container ul li').length;
    let totalNumOfProducts = parseInt(document.querySelector('.showing_products_total').innerText.trim());

    let progressPercentage = numOfProducts * 100 / totalNumOfProducts;
    let progressBarContainer = `<div class="product_listing-progress-bar">
      <p class="${ID}-progress-bar-viewed product_listing-progress-bar-viewed">Showing ${numOfProducts} of ${totalNumOfProducts}</p>
      <span class="product_listing-progress-bar-indicator" style="background: linear-gradient(to right, #999999 0%,#999999 ${progressPercentage}%,#d0d0d0 ${progressPercentage}%,#d0d0d0 100%);/* margin: 12px auto 0; *//* width: 225px; *//* background: #d0d0d0; *//* height: 3px; *//* display: block; *//* border-radius: 3px; */"></span>
    </div>
    <button class="${ID}-results-btn-viewmore results-btn-viewmore">View more</button>`;
    let paginationEl = document.querySelector('.pageControl.number');
    paginationEl.insertAdjacentHTML('beforebegin', progressBarContainer);

    let currentPage = document.querySelector('.pageControl.number li a.current_state').innerText.trim();
    pageData.currentPage = currentPage;
    let productList = document.querySelector('.product_listing_container ul');
    if (!productList.classList.contains(`${ID}-productList`)) {
      productList.classList.add(`${ID}-productList`);
      productList.setAttribute('data-page', currentPage);
      productList.setAttribute('id', `${ID}-productList__${currentPage}`);
    }

    // --- Check NEXT PAGE -- If this is the last page, hide "VIEW MORE" CTA
    let next = parseInt(currentPage) + 1;
    const nextPageResults = document.querySelector(`a#WC_SearchBasedNavigationResults_pagination_link_${next}_categoryResults`);

    if (currentPage !== '1'
    && parseInt(currentPage) !== document.querySelectorAll(`.product_listing_container ul`).length) {
      document.querySelector(`.product_listing-progress-bar`).setAttribute('style', 'display: none;');
      document.querySelector(`button.${ID}-results-btn-viewmore`).setAttribute('style', 'display: none;');
      document.querySelector('.pageControl.number').setAttribute('style', 'display: block;');
    } else if (currentPage !== '1' && !nextPageResults) {
      document.querySelector(`button.${ID}-results-btn-viewmore`).setAttribute('style', 'display: none;');
    }


    let allProdLists = document.querySelectorAll(`.product_listing_container ul`);
    let originalProds = '';
    if (currentPage == '1') {
      originalProds = document.querySelector(`.product_listing_container ul`).cloneNode(true);
      pageData.list[1] = originalProds; 
    } else {
      // for (let i = 1; i <= allProdLists.length - 1; i += 1) {
      //   let prodList = allProdLists[i];
      //   originalProds = prodList.cloneNode(true);
      //   pageData.list.unshift(originalProds);
      //   pageData.list[1] = originalProds; 
      // }
    }

    // --- VIEW MORE -- CTA
    document.querySelector(`.${ID}-results-btn-viewmore`).addEventListener('click', () => {
      events.send(`experimentation`, `${ID} V${VARIATION}`, `Clicked View More`);
      let next = parseInt(currentPage) + 1;
      const nextPageBtn = document.querySelector(`a#WC_SearchBasedNavigationResults_pagination_link_${next}_categoryResults`);
      if (nextPageBtn) {
        nextPageBtn.click();
      }
    });

    clickEvents();
  };

  export const clickEvents = () => {
    const { ID, VARIATION } = shared;
    // alert('click events');
    const allProducts = document.querySelectorAll('ul.grid_mode li');
    // console.log(allProducts);
    [].forEach.call(allProducts, (prod) => {
      const prodUrl = prod.querySelector('a.product_img_link').getAttribute('href');

      // --- Click ADD TO BASKET
      if (prod.querySelector('.button.primary')) {
        let addCta = prod.querySelector('.button.primary');
        addCta.addEventListener('click', (e) => {
          // alert(`Click - Add to Bag - ${prodUrl}`);
          events.send(`experimentation`, `${ID} V${VARIATION}`, `Click - Add to Bag - ${prodUrl}`);
        });
      }

    })
  };
  
