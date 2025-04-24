import settings from './settings';
import pubSub from './PublishSubscribe';
import { observer } from '../../../../../lib/uc-lib';
import { createElement, triggerOnClick, didScrollPastElement, reorderElements } from './dom';

/**
 * Add body classes
 *
 * @access private
 */
const addBodyClasses = () => {
  document.body.classList.add(`${settings.ID}`);
  document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);
};

/**
 * Count num active filters from num tags
 * @return {Number}
 */
const countActiveFilters = () => {
  const filters = document.querySelectorAll('.browse__applied-filters__item');
  return filters.length;
};

/**
 * Helper modify filters UI
 * @access private
 */
const modifyFiltersUi = (cbDidChangeFilters) => {
  // --------------------------------------------
  // Modify the filters
  // --------------------------------------------
  const filtersOuterContainer = document.querySelector('#filter-modal .js-modal-content');

  /**
   * Execute
   */
  const onObserve = () => {
    const filterItemsParent = filtersOuterContainer.querySelector('[data-modal-scrollable-content]');
    if(filterItemsParent) {
      if(settings.VARIATION === '2') {
        const priorityElements = [
          '#filter-modal #refinement-recipient', 
          '#filter-modal #refinement-price', 
          '#filter-modal [id^="refinement-category"]', 
          '#filter-modal #refinement-brand'
        ];

        // --------------------------------------------
        // Reorder the filters
        // --------------------------------------------
        reorderElements(priorityElements, filterItemsParent);
        
        // --------------------------------------------
        // Identify if has chosen filters
        // --------------------------------------------
        [].forEach.call(document.querySelectorAll('#filter-modal .filters-panel__refinement-section-container'), (c) => {
          if(c.querySelector('.clearLink')) {
            c.classList.add(`${settings.ID}-has-selected-filters`);
          }
        });
        
        // --------------------------------------------
        // Change name of category to product category
        // --------------------------------------------
        const catFilterLegend = document.querySelector('#filter-modal [id^="refinement-category"] legend');
        if(catFilterLegend) {
          catFilterLegend.innerText = 'Product Category';
        }
        
        // --------------------------------------------
        // Auto-expand certain menus
        // --------------------------------------------
        const recipientElm = document.querySelector('#filter-modal #refinement-recipient');
        const autoExpandElms = [recipientElm];

        autoExpandElms.forEach((elm) => {
          const legend = elm.querySelector('legend');
          const panel = elm.querySelector('.filters-panel__refinement-section-container');

          if(panel && legend && !legend.classList.contains('open')) {
            panel.style.display = 'block';
            legend.classList.add('open');
          }
        });
        
        // --------------------------------------------
        // Stylize reipcient for him / her / children
        //
        // We can do most of this with CSS actually, just
        // identify as stylized and scope for reusable
        // --------------------------------------------
        recipientElm.classList.add(`${settings.ID}-stylized-checkboxes`);
        
        // --------------------------------------------
        // Add Other Filters demcarcation
        // --------------------------------------------
        const demarcationExisting = document.querySelector(`.${settings.ID}-filters-demarcation`);
        if(demarcationExisting) {
          demarcationExisting.parentNode.removeChild(demarcationExisting);
        }

        const lastPriorityFilterElm = document.querySelector(priorityElements[priorityElements.length - 1]);
        if(lastPriorityFilterElm) {
          lastPriorityFilterElm.insertAdjacentHTML('afterend', `
            <div class="${settings.ID}-filters-demarcation">
              Other Filters
            </div>
          `);
        }
      }

      // --------------------------------------------
      // Add Other Filters demcarcation
      // --------------------------------------------
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
            pubSub.publish('used-filter', data);
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

/**
 * Entry point for running experiment
 *
 * @access public
 */
export default () => {
  // --------------------------------------------
  // Experiment is running
  // --------------------------------------------
  pubSub.publish('experiment-init');

  // --------------------------------------------
  // Add classes to body
  // --------------------------------------------
  addBodyClasses();
  
  // --------------------------------------------
  // Ref
  // --------------------------------------------
  const sortContainer = document.querySelector('.browse__results-and-sort-container');
  const filterToggleBtn = document.querySelector('.filter-toggle');

  filterToggleBtn.addEventListener('click', () => pubSub.publish('clicked-main-filter-button'));
  
  // --------------------------------------------
  // Check active filters
  // --------------------------------------------
  if(countActiveFilters() > 0) {
    document.body.classList.add(`${settings.ID}-active-filters`);
  } else {
    document.body.classList.remove(`${settings.ID}-active-filters`);
  }
  
  // --------------------------------------------
  // Add scroll to top button to DOM
  // --------------------------------------------
  const triggersFauxClickOnFilters = triggerOnClick(filterToggleBtn, 'click');
  const fauxBtn = triggersFauxClickOnFilters(
  createElement({
    type: 'a',
      text: 'Filter',
      atts: [
        {
          'key': 'class',
          'value': `${settings.ID}-btn ${settings.ID}-init-filters ${settings.ID}-btn--faux-click`,
        }
      ],
    })
  );

  document.body.insertAdjacentElement('afterbegin', fauxBtn);

  fauxBtn.addEventListener('click', () => pubSub.publish('clicked-scroll-filter-button'));

  // --------------------------------------------
  // Show hide on scroll
  // --------------------------------------------
  /**
   * Helper check scroll
   */
  const containerScrollCheck = (sortContainer) => {
    if(didScrollPastElement(sortContainer, 50)) {
      fauxBtn.classList.add(`${settings.ID}-init-filters--active`);
    } else {
      fauxBtn.classList.remove(`${settings.ID}-init-filters--active`);
    }
  };

  window.addEventListener('scroll', () => containerScrollCheck(sortContainer));
  containerScrollCheck(sortContainer);

  // --------------------------------------------
  // Filters considerations
  // --------------------------------------------
  modifyFiltersUi(() => {
    // We have to reinitialise the faux button after filter changes
    const sortContainer = document.querySelector('.browse__results-and-sort-container');
    const filterToggleBtn = document.querySelector('.filter-toggle');
    const triggersFauxClickOnFilters = triggerOnClick(filterToggleBtn, 'click');

    triggersFauxClickOnFilters(fauxBtn);

    window.addEventListener('scroll', () => containerScrollCheck(sortContainer));
  });
};
