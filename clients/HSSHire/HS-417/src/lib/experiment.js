/**
 * HS417 - Product specs and suitability on listing pages V3
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
// import { fireEvent } from '../../../../../core-files/services';
import data from './data';
import data2 from './data2';

const { ID, VARIATION } = shared;

/**
 * Data scrape
 */
const scrapeItemData = (dataObject, key) => {
    return dataObject && dataObject[key.trim().toLowerCase()] ? 
      dataObject[key.trim().toLowerCase()] : [];
};

/**
 * Entry point
 */
export default () => {
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

  const prodItemContainers = document.querySelectorAll('.prod_list_outer');
  [].forEach.call(prodItemContainers, (itemContainer) => {
      const details = itemContainer.querySelector('.details');
      if(details) {
          const title = details.querySelector('.productMainLink a');
          if(title) {
            const titleText = title.innerText.trim();
            const url = title.getAttribute('href').replace('https://www.hss.com', '');
            if(url) {
                let assocData;
                if (VARIATION == '1') {
                  assocData = scrapeItemData(data, url);
                } else if (VARIATION == '2') {
                  assocData = scrapeItemData(data2, url);
                }
                if(assocData.length) {
                    details.insertAdjacentHTML('beforeend', `<ul class="${shared.ID}-list">`);

                    const ul = details.querySelector(`.${shared.ID}-list`);

                    for(let i = assocData.length - 1; i >= 0; i--) {
                        ul.insertAdjacentHTML('afterbegin', `
                            <li>${assocData[i]}</li>
                        `);
                    }

                    details.insertAdjacentHTML('beforeend', `</ul>`);
                }
            }
          }
      }
  });
};
