import settings from '../../EJ021/src/lib/settings';
import { events } from '../../../../lib/utils';
import { observer, pollerLite } from '../../../../lib/uc-lib';

// Gulp command
// gulp --clientname="ErnestJones" --foldername="EJ021-Control" --id="EJ021" --es6
// or HS021-Control for ID

/**
 * Helper filters events
 */
const filtersEvents = () => {
  const filtersOuterContainer = document.querySelector('#filter-modal .js-modal-content');

  /**
   * Execute
   */
  const onObserve = () => {
    const filterItemsParent = filtersOuterContainer.querySelector('[data-modal-scrollable-content]');
    if(filterItemsParent) {
      const filterContainers =  document.querySelectorAll('.filters-panel__refinement-section');
      [].forEach.call(filterContainers, (cont) => {
        const links = cont.querySelectorAll('.filters-panel__refinement-link');

        [].forEach.call(links, (l) => {
          l.addEventListener('click', () => {
            let head = cont.querySelector('.filters-panel__refinement-heading');
            let data = '';
            if(head) {
              data += head.innerText.trim();
            }
            data += ` | ${l.innerText.trim()}`;

            events.send(settings.ID, 'Control', `Used Filter - ${data}`);
          });
        });
      });
    }
  };

  if(filtersOuterContainer) {
    // --------------------------------------------
    // Filters are always being rebuilt... observe:
    // --------------------------------------------
    observer.connect([filtersOuterContainer], () => {
      onObserve();

      // And now observe the filters content, which changes whilst modal is open
      // when user interacts with filters
      const filterContents = document.querySelector('#filter-modal #filters-panel [data-modal-scrollable-content]');
      observer.disconnect(filterContents);
      observer.connect([filterContents], () => {
        onObserve();

        if(typeof cbDidChangeFilters === 'function') {
          cbDidChangeFilters();
        }
      }, {
        childList: true,
        attributes: true,
        subtree: true,  
      });
    }, {
      childList: true,
      attributes: false,
      subtree: true,
    });
  };
};

// Event tracking control
pollerLite([
  'body',
  '.filter-toggle',
  '.browse__results-and-sort-container',
  () => (((window || {}).navigator || {}).userAgent) && window.navigator.userAgent.indexOf('MSIE ') === -1,
], () => {
  // view
  events.send(settings.ID, 'Control', 'View', {
    sendOnce: true  
  });

  // clicked filters btn
  const filterToggleBtn = document.querySelector('.filter-toggle');

  filterToggleBtn.addEventListener('click', () => {
    events.send(settings.ID, 'Control', 'Clicked Main Filter Button', {
      sendOnce: true  
    });
  });

  // used filter
  filtersEvents();
});
