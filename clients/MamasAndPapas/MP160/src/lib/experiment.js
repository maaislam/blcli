/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();
  
  events.send(settings.ID, 'Active', `${settings.ID} is Active`);
  
  // cache
  let filterButton = cacheDom.get('div[data-target="#filter-by-slide"]');
  let panelSliderContainer = cacheDom.get('.panelSlide');
  const blackoutEl = cacheDom.get('.blackout');
  const productFilterFooter = cacheDom.get('#js-productFilters');
  const closeBtn = cacheDom.get('.MP160-closeBtn');
  const panel = cacheDom.get('.panelSlide.slide-panel-left2.cartSlider');
  const applyClear = cacheDom.get('.productFilter_footer.productFilter_footer-bottom');
  const topLevelFilters = cacheDom.getAll('div[data-category="filter_primary"] > .filter_group > li');
  const applyBtn = cacheDom.get('button.js-applyFilters');
  const clearBtnOg = cacheDom.get('button.js-clearCheckbox');
    
  const headerContent = document.querySelector('.yCmsComponent.content-plp');
  if (headerContent) {
    headerContent.classList.add('clearfix');
    setTimeout(() => {
      const headerContentHeight = headerContent.offsetHeight;
      if (headerContentHeight === 0) return;
      const totalHeight = headerContentHeight + 107;
      productFilterFooter.style.top = `${totalHeight}px`;
    }, 1000);
  }

  filterButton.addEventListener('click', () => {
    events.send(settings.ID, 'Click', 'User interacted with filters');
  });

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      events.send(settings.ID, 'Click', 'Applied Filters');
    });
  }
  if (clearBtnOg) {
    clearBtnOg.addEventListener('click', () => {
      events.send(settings.ID, 'Click', 'Cleared Filters');
    });
  }

  // Add new icon
  filterButton.insertAdjacentHTML('beforeend', `
    <i class="fa fa-filter" aria-hidden="true"></i>
  `);
  const filterChildren = filterButton.childNodes;
  if (filterChildren) {
    for (let i = 0; filterChildren.length > i; i += 1) {
      if (filterChildren[i].nodeType === 3) {
        filterChildren[i].textContent = 'Filter';
        break;
      }
    }
  }
  // Move filters on scroll
  window.addEventListener('scroll', function() {
    const pos = this.scrollY;
    if (pos >= 110) {
      productFilterFooter.classList.add('MP160-up');
    } else {
      productFilterFooter.classList.remove('MP160-up');
    }
  });

  // V2
  if (settings.VARIATION === '2') {
    // Wrap the apply and clear buttons and filters in a
    // container. This will allow the dragable content **** Iteration!
    // applyClear.insertAdjacentHTML('beforeend', `
    //   <div class="MP160-drag">
    //     <span></span>
    //     <span></span>
    //     <span></span>
    //   </div>
    // `);
    observer.connect(panel, () => {
      // Remove no scroll
      const htmlNoScroll = document.querySelector('html.no-scroll');
      const body = document.body;
      if (htmlNoScroll) {
        htmlNoScroll.classList.remove('no-scroll');
      }
      body.classList.remove('no-scroll', 'no-scroll-mobile');

      // Change height triggered from new position of 
    }, {
      config: {
        attributes: true,
        childList: false,
        subtree: false,
      }
    });
  }


  // Click events on top level filters
  if (topLevelFilters) {
    for (let i = 0; topLevelFilters.length > i; i += 1) {
      topLevelFilters[i].addEventListener('click', (e) => {
        const listItem = e.currentTarget;
        const cat = listItem.getAttribute('data-goto-category');
        if (cat) {
          const name = cat.replace('filter_', '');
          events.send(settings.ID, 'Click', `Product type ${name}`);
        }
      });
    }
  }

  // Both Versions, swap > for + & -
  const filterLinks = cacheDom.getAll('.filter_group li a.d-block.py-3');
  for (let i = 0; filterLinks.length > i; i += 1) {
    filterLinks[i].insertAdjacentHTML('beforeend', `
      <i class="fa fa-plus-thin" aria-hidden="true"></i>
    `);
  }

  // Move dropdowns into titles
  const filterTitles = cacheDom.getAll('ul.filter_group li[data-goto-category]');
  for (let i = 0; filterTitles.length > i; i += 1) {
    const filterName = filterTitles[i].getAttribute('data-goto-category');
    // Get matching filter items.
    const matchingFilters = document.querySelector(`.filter_category[data-category="${filterName}"]`);
    if (matchingFilters) {
      filterTitles[i].insertAdjacentHTML('beforeend', matchingFilters.outerHTML);
    }
  }
  
  // Clear all
  const clearAll = () => {
    window.localStorage.setItem('MP160-activeBtns', '');
    const newSearch = window.location.search.match(/(^\?q\=([\w\d-\.\+_]+)($|(%3A)))/i);
    if (window.location.href.indexOf('/search/') > -1 && newSearch[2]) {
 
      window.location.href = window.location.origin + window.location.pathname + `?q=${newSearch[2]}`;
    } else {
      window.location.search = '';
      window.location.href = window.location.origin + window.location.pathname;
    }
  };

  const removeDups = (arr) => {
    let unique = {};
    arr.forEach(function(i) {
      if(!unique[i]) {
        unique[i] = true;
      }
    });
    return unique;
  }

  // Add 'Active Buttons below the filter title buttons.
  const filterContainer = document.querySelector('.py-3.filterFooter0.filterFooterCarousel.js-uncheckCheckboxContainer');
  const ref = document.querySelector('.productFilter_filterSelectors');
  const applyFilterContainer = document.querySelector('.productFilter_footer.productFilter_footer-bottom .row .col-xs-12');
  let buttons;

  // If they already exist add them from local storage
  const existingFilters = window.localStorage.getItem('MP160-activeBtns');
  if (existingFilters && ref) {
    ref.insertAdjacentHTML('beforeend', existingFilters);
  }

  if (applyFilterContainer) {
    observer.connect(blackoutEl, () => {
      // observer.disconnect(applyFilterContainer);

      observer.connect(applyFilterContainer, () => {

        const textNode = filterContainer.childNodes[0].nodeValue;
        
        const prevAdded = document.querySelector('.MP160-activeButtons');
        if (prevAdded && prevAdded.parentElement) {
          prevAdded.parentNode.removeChild(prevAdded);
        } 
        
        pollerLite(['.productFilter_label .js-uncheckCheckbox'], () => {
          buttons = document.querySelectorAll('.productFilter_label .js-uncheckCheckbox');          
        

          const buttonData = Array.from(buttons).map((btn) => btn.dataset.clear);
          // Find
          let findDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) != index);
          const dupeBtns = findDuplicates(buttonData);
          // Remove
          dupeBtns.forEach((btnQry) => {
            const btnToRemove = document.querySelector(`div[data-clear="${btnQry}"]`);
            btnToRemove.click();
          });

          pollerLite(['.filterFooter0.filterFooterCarousel .productFilter_label'], () => {
            // Get new buttons
            setTimeout(() => {
              buttons = document.querySelectorAll('.filterFooter0.filterFooterCarousel .productFilter_label');
              // Add new ones.
              if (buttons) {

                const html = `
                  <div class="MP160-activeButtons">
                    ${buttons ? Array.from(buttons).map((btn) => {
                      return `
                        <button class="MP160-activeBtn">
                          ${btn.innerHTML}
                        </button>
                      `
                    }).join(' ') : ''}
    
                    <button id="MP160-clear">Clear All</button>
                  </div>  
                `;
                // Store them for re load.
                ref.insertAdjacentHTML('beforeend', html);
                window.localStorage.setItem('MP160-activeBtns', html);
              }
            }, 1000);
          });
        })

      }, {
        config: {
          attributes: false,
          childList: true,
          subtree: true,
        },
      });
    }, {
      config: {
        attributes: true,
        childList: false,
        subtree: false,
      },
    })
    
  }

  // Remove buttons on the open filter if active. Otherwise, it duplicates.
  // const activeButtons = document.querySelectorAll('.checkbox_toggle_bordered.active');
  // const addedFilterLabels = document.querySelectorAll('.productFilter_label');
  
  const activeButtons = document.querySelectorAll('button.MP160-activeBtn');
  const applyFilterBtn = document.querySelector('.productFilter_footer-bottom button[type="submit"]');
  if (activeButtons) {
    for (let i = 0; activeButtons.length > i; i += 1) {
      const textLabel = activeButtons[i].querySelector('span.checkbox_label');
      if (textLabel.textContent) {
        textLabel.textContent = textLabel.textContent.toLowerCase();
      }
      activeButtons[i].addEventListener('click', () => {
        const filterEl = activeButtons[i].querySelector('.js-uncheckCheckbox');
        const qry = filterEl.getAttribute('data-clear');
        // console.log(qry);
        if (qry) {
          // Find it in the main filters.
          let ogFilter = document.querySelector(`.productFilter_label div[data-clear="${qry}"]`);
          if (!ogFilter) {
            // 
            ogFilter = document.querySelector(`.productFilter_label div[data-search-query="${qry}"]`);
          }
          const buttonString = activeButtons[i].outerHTML;
          
          // Click apply
          if (ogFilter) {
            // window.localStorage.setItem('MP160-activeBtns', '');
            window.localStorage.setItem('MP160-activeBtns', window.localStorage.getItem('MP160-activeBtns').replace(buttonString, ''));
            ogFilter.click();
            applyFilterBtn.click();
          }
        }
      });
    }
  }

  const clearBtn = document.querySelector('button.js-clearCheckbox');
  const clearAllBtn = document.querySelector('button#MP160-clear');

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      events.send(settings.ID, 'Click', 'Cleared Filter');
      clearAll();
    });
  }
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      events.send(settings.ID, 'Click', 'Cleared All Filters');
      clearAll();
    });
  }

  // Check for when the returned product list is empty. If so remove all buttons.
  const totalCountEl = document.querySelector('span.total-count');
  const totalFilterSelectedEl = document.querySelector('.productFilter_label.filter0');
  if (totalCountEl) {
    const totalCountText = totalCountEl.textContent;
    const numberCount = totalCountText.match(/^\d+/);

    if (numberCount) {
      const numb = parseInt(numberCount, 10);

      if (numb === 0) {
        // Remove all buttons
        window.localStorage.setItem('MP160-activeBtns', '');
        let activeFilters = 0;
        if (activeButtons) {
          for (let i = 0; activeButtons.length > i; i += 1) {
            activeFilters += 1;
            activeButtons[i].parentNode.removeChild(activeButtons[i]);
          }
        }

        // Show that there is active filters
        if (totalFilterSelectedEl && totalFilterSelectedEl.textContent) {
          totalFilterSelectedEl.textContent = `${activeFilters} Selected`;
        }
      }
    }
  }

  // Make all checkbox text lowercase
  const allText = document.querySelectorAll('.checkbox_text.pl-2');
  if (allText) {
    for (let i = 0; allText.length > i; i += 1) {
      if (allText[i].textContent) {
        allText[i].textContent = allText[i].textContent.toLowerCase();
      }
    }
  }

  // Check if filters are applied, if so, show Clear All btn
  const filterNumberEl = document.querySelector('.productFilter_label.font-weight-light.filter0');
  if (filterNumberEl) {
    const filterNumber = filterNumberEl.textContent.match(/^\d+/);
    if (filterNumber) {
      const num = parseInt(filterNumber, 10);
      if (num > 0) {
        clearAllBtn.classList.add('MP160-show');
      }
    }
  }

  // Store URL pathname
  const thisPathname = window.location.pathname;
  const storedUrl = window.localStorage.getItem('MP160-Url');
  if (storedUrl) {
    if (!storedUrl.match(thisPathname)) {
      // Clear all buttons
      clearAll();
    }
  }
  window.localStorage.setItem('MP160-Url', window.location.pathname);
};

export default activate;
