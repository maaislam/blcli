/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { events } from '../../../../../lib/utils';
import { observer } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();
  const trackFilters = () => {
    const allFilters = document.querySelectorAll('.filters-panel__refinement-section-container .filters-panel__refinement-link');
    for (let index = 0; index < allFilters.length; index += 1) {
      const element = allFilters[index];
      if (element) {
        element.addEventListener('click', (e) => {
          const filterName = e.currentTarget.textContent;
          events.send('EJ006 control', 'Filtered', `${filterName}`, { sendOnce: false });
        });
      }
    }
  };

  observer.connect(document.querySelector('#filter-modal'), () => {
    // Happens when pane first loads
    setTimeout(() => {
      trackFilters();
    }, 500);
  }, {
    // Options
    config: {
      attributes: true,
      childList: false,
      subtree: false,
    },
  });

  observer.connect(document.querySelector('.browse__main-content'), () => {
    // Happens when pane is reloaded whilst open
    setTimeout(() => {
      trackFilters();
    }, 500);
  }, {
    // Options
    config: {
      attributes: false,
      childList: true,
      subtree: false,
    },
  });
};

export default activate;
