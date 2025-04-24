import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { obsIntersection, onUrlChange } from './helpers/utils';
//import targetSkus from './targetSkus';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const validPages = ['Doors & Door Fittings', 'Fence Panels', 'Patio Kits', 'Doors'];

const dataV1 = ['Coverage Per Pack', 'Height', 'Length', 'Manufacturer Guarantee', 'Total Product Weight', 'Width'];

const dataV2 = [
  'Brand',
  'Coverage Per Pack',
  'Finish',
  'Fixings Supplied',
  'Height',
  'Length',
  'Pack Size',
  'Timber Treatment',
  'Total Product Weight',
  'Width',
];

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
  const convertToCamelCase = (text) => {
    return text
      .toLowerCase() // Convert to lowercase
      .split(' ') // Split the string by spaces
      .map((word, index) => {
        // Capitalize the first letter of each word except the first one
        if (index === 0) {
          return word; // Keep the first word lowercase
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(''); // Join the words back together
  };

  const data = VARIATION === '1' ? dataV1 : dataV2;

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
      fireEvent('User interacts with view more anchor');
    }
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  const interSectionCallback = (entry) => {
    if (!entry.isIntersecting && entry.boundingClientRect.y < 250) {
      //fireEvent('Conditions Met');
      fireEvent('User scrolls to see the reviews section');
    }
  };

  obsIntersection(document.querySelector('[data-qaid="pdp-tabs"]'), 1, interSectionCallback);

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
