/**
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import data from './data';

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

  const prodItemContainers = document.querySelectorAll('.prod_list_outer');
  [].forEach.call(prodItemContainers, (itemContainer) => {
      const details = itemContainer.querySelector('.details');
      if(details) {
          const title = details.querySelector('.productMainLink a');
          if(title) {
            const titleText = title.innerText.trim();
            if(titleText) {
                const assocData = scrapeItemData(data, titleText);
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
