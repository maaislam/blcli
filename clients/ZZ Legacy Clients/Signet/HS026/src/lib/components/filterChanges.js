import { pollerLite } from '../../../../../../lib/uc-lib';
import settings from '../settings';
import { events } from '../../../../../../lib/utils';

const stickyFilter = () => {
  pollerLite(['#filter-modal [data-modal-fixed-header]'], () => {
    const filter = document.querySelector('#filter-modal [data-modal-fixed-header]');
    const filterContent = document.querySelector('#filter-modal [data-modal-scrollable-content]');

    const removeClearAll = () => {
      const clearButton = document.querySelector('#filter-modal .button-holder #clear');
      if (clearButton && clearButton.style.display === 'none') {
        clearButton.classList.add(`${settings.ID}-clear_button-hide`);
      } else {
        clearButton.classList.remove(`${settings.ID}-clear_button-hide`);
      }
    };
    removeClearAll();
    // const applyFilterButton = document.querySelector('#filter-modal .filters-panel__cta');
    // change text of filter button

    /* if (applyFilterButton) {
      applyFilterButton.textContent = 'Done';
    } */

    const filterScroll = () => {
    // make the header in the filters sticky to remove title
      document.querySelector('#filter-modal').onscroll = () => {
        const navOffset = (filterContent.getBoundingClientRect().y + window.scrollY);
        const scrollTop = (document.documentElement && document.documentElement.scrollTop)
        || document.body.scrollTop;
        if (scrollTop >= navOffset) {
          filter.classList.add(`${settings.ID}_fixed`);
        } else {
          filter.classList.remove(`${settings.ID}_fixed`);
        }
      };
    };

    filterScroll();
  });

  // on click of the filter
  const filterButton = document.querySelector(`.${settings.ID}-filter`);
  const filters = document.querySelector('.cta.js-modal-trigger.filter-toggle');
  if (filterButton && filters) {
    filterButton.addEventListener('click', () => {
      if (filterButton.classList.contains(`${settings.ID}-listenerAdded`)) {
        return false;
      }
      filterButton.classList.add(`${settings.ID}-listenerAdded`);
      events.send(`${settings.ID} v${settings.VARIATION}`, 'filter click', `${settings.ID} v${settings.VARIATION} filter click`);
      document.querySelector('.cta.js-modal-trigger.filter-toggle').click();
    });
  }
};

export default stickyFilter;
