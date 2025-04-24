import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { convertToCamelCase, obsIntersection, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 1500;

const validPages = ['Doors & Door Fittings', 'Fence Panels', 'Patio Kits', 'Doors'];

const data = ['Coverage Per Pack', 'Height', 'Length', 'Manufacturer Guarantee', 'Total Product Weight', 'Width'];

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const updateSpecificationTable = () => {
  const tableContainer = document.querySelector('[data-qaid="pdp-tabpanel-2"]');
  tableContainer.classList.add(`${ID}__tableContainer`);

  const table = document.querySelector('[data-qaid="pdp-tabpanel-2"] table');

  const tableRows = document.querySelectorAll('[data-qaid="pdp-tabpanel-2"] tbody tr');
  tableRows.forEach((row) => {
    const rowCells = row.querySelector('td');
    if (!rowCells) return;

    const cellText = rowCells.innerText; // e.g., "Length (Meters)"

    // Check if any string in the data array is included in the cellText
    if (data.some((item) => cellText.includes(item) && cellText.startsWith(item))) {
      // Find the first matching item from the data array
      const matchingItem = data.find((item) => cellText.includes(item) && cellText.startsWith(item));
      const cellTextArr = convertToCamelCase(matchingItem);
      row.classList.add(`${ID}__${cellTextArr}`);
      row.classList.add(`${ID}__visibleCell`);
      const tableBody = document.querySelector('[data-qaid="pdp-tabpanel-2"] tbody');
      tableBody.insertAdjacentElement('afterbegin', row);
    }
  });

  const rearrangedRows = document.querySelectorAll('[data-qaid="pdp-tabpanel-2"] tbody tr');
  // Add background color for each even/odd row only if it has not data-priority attribute
  rearrangedRows.forEach((row, index) => {
    const rowCells = row.querySelector('td');
    if (!rowCells) return;
    row.classList.add(index % 2 === 0 ? `${ID}__evenRow` : `${ID}__oddRow`);
  });

  const viewAllHtml = `<div class='${ID}__viewAllBtn'>View All</div>`;
  if (!document.querySelector(`.${ID}__viewAllBtn`)) {
    table.insertAdjacentHTML('afterend', viewAllHtml);
  }

  const productTileElem = document.querySelector('[data-qaid="product-tile"]');
  const productTileParentElem = productTileElem.parentElement;
  productTileParentElem.insertAdjacentElement('beforeend', tableContainer);

  //new amends on 17/10/2024
  if (VARIATION === '1' || VARIATION === '2') {
    const tableRows = document.querySelectorAll(`.${ID}__tableContainer tbody tr`);
    tableRows.forEach((row) => {
      row.classList.add(`${ID}__visibleCell`);
    });
    document.querySelector(`.${ID}__viewAllBtn`).remove();
  }
};

const init = () => {
  //check if page is correct
  const pageCondition =
    window.utag.data.basicPageId === 'product page' && validPages.some((pdp) => window.utag.data.basicBreadcrumb.includes(pdp)); //add page check conditions here based on experiment requirement

  if (!pageCondition) {
    //remove DOM element added by the experiment
    // const element = document.querySelector('.element');
    // if (element) element.remove();

    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    return;
  }

  setup();

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/

  fireEvent('Conditions Met');

  if (VARIATION === 'control') return;

  /*****add experiment specific code here*****/
  const deliveryTabElem = document.querySelector('[data-qaid="pdp-tab-3"]');
  deliveryTabElem.click();

  setTimeout(updateSpecificationTable, 500);

  //scr066 - winner variation...
  if (isMobile()) {
    const targetElement = document.querySelector('div[data-qaid="customer_messaging"]');
    const priceElem = document.querySelector('div[data-qaid="product-price"]');
    const priceArea = priceElem.parentElement.cloneNode(true);
    priceElem.classList.add(`${ID}__hide`);
    if (document.querySelector(`.${ID}__priceSection`)) {
      document.querySelector(`.${ID}__priceSection`).remove();
    }
  
    targetElement && targetElement.insertAdjacentElement('beforebegin', priceArea);
    priceArea.classList.add(`${ID}__priceSection`);
    targetElement.classList.add(`${ID}__reviewSection`);
  
    window.scrollBy(0, 220);
  }
};

export default () => {
  /*****Request from Screwfix*****/
  const blExpID = VARIATION === 'control' ? `${ID} control` : ID;
  window.brainLabsExperimentID = window.brainLabsExperimentID || '';
  if (window.brainLabsExperimentID) {
    window.brainLabsExperimentID += `,${blExpID}`;
  } else {
    window.brainLabsExperimentID = blExpID;
  }
  /*****Request from Screwfix*****/

  const clickHandler = (e) => {
    //check if page is correct
    //if (window.utag.data.basicPageId !== 'lister Page') return;

    const { target } = e;

    if (target.closest(`.${ID}__viewAllBtn`)) {
      fireEvent('User interacts with view all cta');

      const tableRows = document.querySelectorAll(`.${ID}__tableContainer tbody tr`);
      tableRows.forEach((row) => {
        row.classList.add(`${ID}__visibleCell`);
      });
      document.querySelector(`.${ID}__viewAllBtn`).remove();
    } else if (target.closest('[aria-controls="tabpanel-2"]') && !document.querySelector(`.${ID}__tableContainer`)) {
      init();
    } else if (target.closest('[data-qaid="pdp-more-info-link"]')) {
      fireEvent('User interacts with view more cta');
    } else if (target.closest('[data-qaid="pdp-tabs"] [role="tab"]') && !document.querySelector(`.${ID}__tableContainer`)) {
      updateSpecificationTable();
    }
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  const interSectionCallback = (entry) => {
    if (entry.isIntersecting) {
      //fireEvent('Conditions Met');
      fireEvent('User scrolls to see the view all CTA');
    }
  };

  obsIntersection(document.querySelector('[data-qaid="pdp-view-all-link"]'), 1, interSectionCallback);

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(
      [
        () => typeof window.tealiumDataLayer === 'object',
        () => window.utag !== undefined,
        () => window.__NEXT_DATA__ !== undefined,
      ],
      () => {
        setTimeout(init, DOM_RENDER_DELAY);
      }
    );
  });
};
