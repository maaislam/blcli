import { setup, fireEvent } from '../../../../../core-files/services';
import { getCookie, observer, pollerLite, setCookie } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;
const processTiles = () => {
  if (window.location.href.indexOf('/uk/shop/') > -1 || window.location.href.indexOf('/uk/search') > -1) {
    pollerLite(['.grid-tile'], () => {
      const gridTiles = document.querySelectorAll('.grid-tile');
      gridTiles.forEach((tile) => {
        if (!tile.classList.contains(`${ID}-quick-add-enabled`)) {
          let currProductImpression = JSON.parse(tile.querySelector('input[name="productImpression"]')?.value);

          let prodID = currProductImpression.impression_product_SKU;

          if (prodID) {
            tile.querySelector('.tile-wrapper .product-pricing').classList.add(`${ID}-quick-add-holder`);
            if (VARIATION == 1) {
              tile
                .querySelector('.tile-wrapper .product-pricing')
                .insertAdjacentHTML(
                  'beforeend',
                  `<button data-prodid="${prodID}" class="${ID}-quick-add"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20.9 6.4H15.9C15.9 3.4 14.1 2 12 2C9.9 2 8.1 3.4 8.1 6.4H3.1C2.5 6.4 2 6.9 2 7.6V18.7V20.9C2 21.5 2.5 22 3.1 22H20.9C21.5 22 22 21.5 22 20.9V18.7V7.6C22 6.9 21.5 6.4 20.9 6.4ZM12 3.1C13.5 3.1 14.8 4 14.8 6.4H9.2C9.2 4 10.5 3.1 12 3.1ZM3.1 7.6H20.9V17.6H3.1V7.6Z" fill="black"/><path d="M15.9 12H8.09998V13.1H15.9V12Z" fill="black"/><path d="M12.5 8.70001H11.4V16.5H12.5V8.70001Z" fill="black"/></svg></button>`
                );
            }

            if (VARIATION == 1 || VARIATION == 2) {
              tile.classList.add(`${ID}-quick-add-enabled`);
            }
          }
        }
      });
    });
  }
};

const startExperiment = () => {
  processTiles();

  fireEvent(
    `Interaction, experiment started, quick add icons ${VARIATION == 1 ? `shown` : `not shown, quick add disabled`}`,
    true
  );

  document.body.addEventListener('click', (e) => {
    if ((e.target.closest(`.${ID}-quick-add`) || e.target.classList.contains(`${ID}-quick-add`)) && VARIATION == 1) {
      e.preventDefault();
      let productTile = e.target.closest('.grid-tile');
      let productName = productTile.querySelector('.product-name').innerText;
      let productURL = productTile.querySelector('.quickviewbutton').getAttribute('href');
      let productSKU;
      // if(productTile.querySelector('.product-tile').getAttribute('data-tagg-rootid')){
      //   productSKU = productTile.querySelector('.product-tile').getAttribute('data-tagg-rootid');
      // } else {
      //   productSKU = productTile.querySelector('.product-tile').getAttribute('data-itemid');
      // }
      productSKU = e.target.closest(`.${ID}-quick-add`).getAttribute('data-prodid');
      console.log(productSKU, 'productSKU');
      window.jQuery.ajax({
        url: 'https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax',
        type: 'post',
        data: `Quantity=1&cartAction=add&pid=${productSKU}`,
        success: function () {
          fireEvent(
            `Click - variation quick add clicked - on product: [${productName}] with SKU: [${productSKU}] with URL: [${productURL}]`
          );
          window.location.reload();
          setCookie(`${ID}-product-added`, true);
        },
      });
    }

    if (e.target.closest('.load-more-link')) {
      setTimeout(() => {
        processTiles();
      }, 1000);
    }
  });

  observer.connect(
    document.getElementById('main'),
    () => {
      setTimeout(() => {
        processTiles();
      }, 1000);
    },
    {
      childList: true,
      subtree: true,
      attributes: true,
    }
  );
};

const addTracking = () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.closest(`.quickviewbutton`) && VARIATION == 'control' && e.isTrusted) {
      e.stopPropagation();
      let productTile = e.target.closest('.grid-tile');
      let productName = productTile.querySelector('.product-name').innerText;
      let productURL = productTile.querySelector('.quickviewbutton').getAttribute('href');
      let productSKU = productTile.getAttribute('data-tagg-rootid');
      productTile.querySelector('.quickviewbutton').click();
      fireEvent(
        `Click - control quick add clicked - on product: [${productName}] with SKU: [${productSKU}] with URL: [${productURL}]`
      );
    }

    if (e.target.id == 'add-to-cart' && e.target.closest('#QuickViewDialog') && VARIATION == 'control') {
      let productName = document.querySelector('#QuickViewDialog #page_heading > h2').innerText;
      let productURL = document.querySelector('#QuickViewDialog .button.view-details').href;
      fireEvent(`Click - ATC within QuickView clicked - on product: [${productName}] with URL: [${productURL}]`);
    }
  });
};

const checkScreenPosition = () => {
  let startPos = 220;
  if (window.outerWidth < 767) {
    startPos = 100;
  }

  if (window.scrollY < startPos) {
    document.querySelector(`.${ID}-newitem`)?.classList.remove(`${ID}-stuck`);
  } else {
    if (!document.querySelector(`.${ID}-newitem`)?.classList.contains(`${ID}-stuck`)) {
      document.querySelector(`.${ID}-newitem`)?.classList.add(`${ID}-stuck`);
    }
  }
};

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  addTracking();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  startExperiment();

  if (getCookie(`${ID}-product-added`) && getCookie(`${ID}-product-added`) == 'true' && VARIATION == 1) {
    setCookie(`${ID}-product-added`, false);
    let newItemHTML = `
    
      <div class="${ID}-newitem">

          <svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 12.5L10.167 17L19.5 8" stroke="#118F40" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <p>Item was added to your basket</p>
          <button class="${ID}-newitem--close">x</button>

      </div>
    
    `;

    let primaryContent = document.querySelector('.breadcrumb .primary-content');
    primaryContent.insertAdjacentHTML('beforeend', newItemHTML);
    primaryContent.classList.add(`${ID}-newitem-visible`);

    let timeout = setTimeout(() => {
      document.querySelector(`.${ID}-newitem`).remove();
      primaryContent.classList.remove(`${ID}-newitem-visible`);
    }, 8000);

    document.querySelector(`.${ID}-newitem--close`).addEventListener('click', () => {
      clearTimeout(timeout);
      document.querySelector(`.${ID}-newitem`).remove();
      primaryContent.classList.remove(`${ID}-newitem-visible`);
    });

    checkScreenPosition();
    // write a scroll handler
    window.addEventListener('scroll', () => {
      checkScreenPosition();
    });
  }
};
