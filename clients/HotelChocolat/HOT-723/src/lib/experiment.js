import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import plpData from './data/plpData';
import { onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;

const setItemsActive = () => {
  const filterWrapper = document.querySelector('#secondary.refinements');
  const activeFilterItems = filterWrapper.querySelectorAll('li.selected');
  const allNewItems = document.querySelectorAll(`.${ID}-quicklinks--item`);

  if (allNewItems && allNewItems.length > 0) {
    allNewItems.forEach((item) => {
      item.classList.remove(`${ID}__selected`);
    });
  }

  if (activeFilterItems && activeFilterItems.length > 0) {
    activeFilterItems.forEach((filterItem) => {
      const activeItem = filterItem.querySelector('a');
      const tagName = activeItem.title;
      const linkItem = document.querySelector(`.${ID}-quicklinks--item[title="${tagName}"]`);
      if (linkItem) {
        linkItem.classList.add(`${ID}__selected`);
      }
    });
  }
};

//please don't modify below this line
const startExperiment = () => {
  const { pathname } = window.location;
  let toDisplay = false;
  let displayedArray = [];

  const isExistingPlp = plpData.filter((item) => pathname === item.pageUrl);

  if (isExistingPlp && isExistingPlp.length > 0) {
    toDisplay = true;
    displayedArray = isExistingPlp[0].data.map((item) => {
      const isAvailabaleItem = document.querySelector(`#secondary li > a[title="${item.title}"]`);
      if (isAvailabaleItem) {
        return {
          ...item,
          isStock: true,
        };
      }

      return {
        ...item,
        isStock: false,
      };
    });
  }

  if (!toDisplay) {
    fireEvent(`Interaction - the experiment shouldn't fire on this category page`, true);
  } else {
    const linksUsed = displayedArray;
    const linksHTML = `
    <div class="${ID}-quicklinks">
      <div class="${ID}-quicklinks--inner">
        ${linksUsed
          .map((item) => {
            return `
                <div data-href="${item.link}" title="${item.title}" class="${ID}-quicklinks--item ${
              !item.isStock ? `${ID}__notAvailable` : ''
            }">
                  <p class="${ID}__text">${item.name}</p>
                </div>
              `;
          })
          .join('')}
      </div>
    </div>  
  `;

    pollerLite(['#page_heading'], () => {
      let pageHeading = document.getElementById('page_heading');
      pageHeading.insertAdjacentHTML('afterend', linksHTML);
      fireEvent('Interaction - experiment displayed on screen', true);

      if (!window.previousOpenedFilter && window[`${ID}__selected`]) {
        const selectedItem = document.querySelector(`#secondary li > a[title="${window[`${ID}__selected`]}"]`);
        const existingFilterItem = selectedItem.closest('#secondary .refinement.active:not(.instock):not(.price-refinement)');
        if (existingFilterItem) existingFilterItem.classList.remove('active');

        window.previousOpenedFilter = true;
        window[`${ID}__selected`] = null;
      }

      //on load item active
      setItemsActive();
    });
  }
};

export default () => {
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-B37NQR1RWZ';
  setup();

  fireEvent('Conditions Met');
  document.body.addEventListener('click', (event) => {
    const { target } = event;
    if (target.closest(`.${ID}-quicklinks--item`)) {
      const clickedItem = target.closest(`.${ID}-quicklinks--item`);
      const linkText = clickedItem.querySelector('p').innerText;
      const clickItemTitle = clickedItem.title;
      const exisitingFilterItem = document.querySelector(`#secondary li > a[title="${clickItemTitle}"]`);

      const existingFilterItemWrapper = exisitingFilterItem.closest('.refinement');

      if (existingFilterItemWrapper && !existingFilterItemWrapper.classList.contains('active')) {
        window.previousOpenedFilter = false;
        window[`${ID}__selected`] = clickItemTitle;
      }

      if (exisitingFilterItem) exisitingFilterItem.click();
      clickedItem.classList.add(`${ID}__selected`);

      fireEvent(`Click - user clicked ${linkText} link`, true);
    }
  });

  if (VARIATION !== 'control') {
    startExperiment();

    onUrlChange(() => {
      if (document.querySelector(`.${ID}-quicklinks`)) {
        document.querySelector(`.${ID}-quicklinks`).remove();
      }
      startExperiment();
    });
  }
};
