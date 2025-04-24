import shared from '../../../../../../core-files/shared';
import { pollerLite, observer } from '../../../../../../lib/uc-lib';
import data from '../data';

const { ID, VARIATION } = shared;

export default (url, allFilters) => {
  let priorityOrder = data[url];
  priorityOrder = priorityOrder.reverse();

  for (let i = 0; i < priorityOrder.length; i += 1) {
    let pFilter = priorityOrder[i];
    let filterID = pFilter.toLowerCase();

    //
    let newFilterID = pFilter.toLowerCase().replace(' ', '-');
    //
    if (document.querySelector(`.filter#${filterID}`)) {
      let f = document.querySelector(`.filter#${filterID}`);
      document.querySelector(`.filterBoxOptions`).insertAdjacentHTML('afterbegin', `<div class="filter" id="${ID}-${filterID}"></div>`);
      document.querySelector(`.filter#${ID}-${filterID}`).insertAdjacentElement('afterbegin', f);
    } else {
      // --- Create new filter boxes
      let id = null;
      const newFilterBox = `<div class="filter" id="${ID}-${newFilterID}">
        <div class="filter" id="${newFilterID}">
          <div id="filter${newFilterID}" class="filterBox">
            <div class="filterBoxTitle">
              <p>${pFilter}</p>
            </div>
          </div>
        </div>
      </div>`;
      if (pFilter == 'Set size') {
        if (url == '/shop/cookware/induction') {
          document.querySelector(`.filter#${ID}-size`).insertAdjacentHTML('beforebegin', newFilterBox);
        } else if (url == '/shop/cookware/saucepans') {
          document.querySelector(`.filter#${ID}-usage`).insertAdjacentHTML('beforebegin', newFilterBox);
        } else if (url == '/shop/cookware/stainless-steel') {
          document.querySelector(`.filter#${ID}-type`).insertAdjacentHTML('beforebegin', newFilterBox);
        } else if (url == '/shop/cookware/sets') {
          document.querySelector(`.filter#${ID}-guarantee`).insertAdjacentHTML('beforebegin', newFilterBox);
        } else if (url == '/shop/knives-scissors/knife-sets-with-blocks') {
          pollerLite([`#${ID}-material`], () => {
            setTimeout(() => {
              document.querySelector(`.filterBoxOptions`).insertAdjacentHTML('afterbegin', newFilterBox);
            }, 1000);
          });
        } else if (url == '/shop/knives-scissors/damascus-67'
        || url == '/shop/knives-scissors/procook-professional-x50') {
          pollerLite([`#${ID}-type`], () => {
            setTimeout(() => {
              document.querySelector(`.filter#${ID}-type`).insertAdjacentHTML('afterend', newFilterBox);
            }, 1000);
          });
          
        } else if (url == '/shop/knives-scissors/knife-sets-knife-blocks') {
          document.querySelector(`.filter#${ID}-price`).insertAdjacentHTML('beforebegin', newFilterBox);
          document.querySelector('.filter#size').setAttribute('style', 'display: none;');
        }
        
      } else if (pFilter == 'Features') {
        if (url == '/shop/cookware/induction') {
          document.querySelector(`.filter#${ID}-type`).insertAdjacentHTML('beforebegin', newFilterBox);
        } else if (url == '/shop/cookware/frying-pans'
        || url == '/shop/cookware/sets'
        || url == '/shop/cookware/saucepans') {
          document.querySelector(`.filter#${ID}-material`).insertAdjacentHTML('beforebegin', newFilterBox);
        } else if (url == '/shop/cookware/stainless-steel') {
          document.querySelector(`.filter#${ID}-usage`).insertAdjacentHTML('beforebegin', newFilterBox);
        }
      } else if (pFilter == 'Set type') {
        if (url == '/shop/knives-scissors/damascus-67'
        || url == '/shop/knives-scissors/procook-professional-x50') {
          pollerLite([`#${ID}-type`], () => {
            setTimeout(() => {
              document.querySelector(`.filter#${ID}-type`).insertAdjacentHTML('afterend', newFilterBox);
            }, 1000);
          });
        } 
      }

    }
  }
};