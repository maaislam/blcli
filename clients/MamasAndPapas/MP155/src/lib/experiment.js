/**
 * MP155 - Desktop PLP Sticky Filters
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events, getCookie, setCookie } from './../../../../../lib/utils';
import { observer, pollerLite } from './../../../../../lib/uc-lib';
import { buildFilters } from './helpers/buildFilters';
import { toggleFilter } from './helpers/toggleFilter';
import { sortQuery } from './helpers/sortQuery';
import removeDups from './helpers/removeDups';

const activate = () => {

  // Exclude search result pages.
  if (window.location.href.indexOf('/search/?text') > -1) {
    return false;
  }

  console.log('test!');

  setup();

  // events.send(settings.ID, 'Active', `Variation ${settings.VARIATION} is active`);

  let url = window.location.pathname;
  const { search } = window.location;
  
  if (getCookie('MP155-currentURL')) {
    if (getCookie('MP155-currentURL') !== url) {
      setCookie('MP155-currentURL', url);
      toggleFilter.clearActiveFilters();
      toggleFilter.clearAll();
    }
  } else {
    setCookie('MP155-currentURL', url);
  }


  // Search pages
  if (window.location.search.match(/^\?text=/)) {
    // window.location.search = window.location.search.replace(/(^\?text\=(\w+)($|(%3A)))/, '?q=$2%3AtopRated');    
    window.location.search = window.location.search.replace(/^\?text=/, '?q=');
  }
  
  if(window.location.search && !window.location.search.match(/^\?q=%3AtopRated/) && !window.location.search.match(/^\?q=/) && !window.location.search.match(/^\?text=/)) {
    if (window.location.search.match(/^\?utm_/)) {
      window.location = window.location.pathname;
    } else {
      window.location = window.location.pathname + '?q=%3AtopRated';
    }
  }

  // query what we need
  const cache = {
      topCats: document.querySelectorAll('ul.filter_group > li'),
      options: document.querySelectorAll('.js_slideContent .filter_category'),
      apply: document.querySelector('.productFilter_footer-bottom button:first-of-type'),
      clear: document.querySelector('.productFilter_footer-bottom button:last-of-type'),
      selectedFilterNumber: document.querySelector('.productFilter_label.filter0'),
      ogFilterRef: document.querySelector('.row.productFilter_filterSelectors'),
    }
    
  let ref;
  // Get DOM ref for appending filter.
  if (settings.VARIATION === '1') {
    ref = document.querySelector('#page .plp-block.row');
    // Check for big red sale banner
    const clearenceBanner = document.querySelector('.clearance-list');
    if (clearenceBanner) {
      document.body.classList.add('MP155-hasSaleBanner');
    }

    // If search, container is different
    if (!ref) {
      ref = document.querySelector('#grid .productLister');
    }
  }
  if (settings.VARIATION === '2') {
    ref = document.querySelector('#js-productFilters');
  }


  // Bundle the titles with filter options for later reconstruction
  const bundleTitlesWithOptions = Array.from(cache.topCats).map((cat) => {
    const filterBundle = {};
    const catDataTitle = cat.textContent;
    const catDataCat = cat.getAttribute('data-goto-category');
    // console.log('cat title', catDataTitle);
    const matchedOption = Array.from(cache.options).filter(option => {
      const optionData = option.getAttribute('data-category');
      // console.log('cat option, ', optionData);
      if (optionData === catDataCat) {
        return option.innerHTML;
      }
    });
    // console.log(catDataCat);
    // console.log(matchedOption);
    filterBundle.data = catDataCat;
    filterBundle.name = catDataTitle;
    filterBundle.options = matchedOption;
    return filterBundle;
  });

  // Build the filters and add to DOM
  const html = buildFilters(bundleTitlesWithOptions, cache.selectedFilterNumber);
  ref.insertAdjacentHTML('beforebegin', html.outerHTML);
  
  // Work with filters
  if (settings.VARIATION === '1') {
    // Open first two by default
    const prevFilters = toggleFilter.checkActiveFilters();
    const addedOptions = document.querySelectorAll('.MP155-filter--options');
    const addedTitles = document.querySelectorAll('button.MP155-filter--title');
    if (addedOptions.length && addedTitles.length) {
      addedOptions[0].classList.add('MP155-show-option');
      // addedOptions[1].classList.add('MP155-show-option');
      addedTitles[0].classList.add('MP155-show-option');
      // addedTitles[1].classList.add('MP155-show-option'); // Removed these to only show one option on load.
    }

    // Check for previously added filters
    if (prevFilters) {
      prevFilters.map((prevFilter) => {
        const matchingOption = document.querySelector(`.MP155-filter--options [data-search-query="${prevFilter}"]`);
        if (matchingOption) {
          matchingOption.classList.add('MP155-active');
          matchingOption.classList.add('active');
        }
      });
    }

    // Change product class for a 3 col layout
    const products = document.querySelectorAll('.productLister .col-sm-3');
    Array.from(products).forEach((prod) => {
      prod.classList.remove('col-sm-3');
      prod.classList.add('col-sm-4');
    });

    // Remove other filters
    pollerLite(['.panelSlide.slide-panel-left2.cartSlider'], () => {
      const ogFilters = document.querySelectorAll('.panelSlide.slide-panel-left2.cartSlider');
      if (ogFilters) {
        for (let i = 0; ogFilters[i].length > i; i += 1) {
          if (!ogFilters[i].classList.contains('slide-panel-left-options')) {
            ogFilters[i].parentElement.removeChild(ogFilters[i]);
          }
        }
      }
    });

    // Amend Sort By Button to look like design.
    const sortByContainer = document.querySelector('.row.productFilter_filterSelectors');
    const sortByEl = document.querySelector('div[data-target="#sort-by-slide"]');
    const sortByFilters = document.querySelectorAll('#js-filterSortOrder .d-inline-block');
    
    if (sortByEl && sortByFilters && sortByContainer) {
      // Pull Sort By Filters and create a Select
      sortByContainer.insertAdjacentHTML('beforeend', `
        <div id="MP155-1--sortBy">
          <p><strong>Sort By: </strong></p>
          <select name="sortBy">
            ${Array.from(sortByFilters).map((filter, key) => {
              return `<option class="MP155-filter--option" value="SortBy-${key}">
                <p>${filter.textContent.trim()}</p>
              </option>`;
            }).join(' ')}
          </select>
        </div>
      `);

      // Attach click events
      const addedSortByFilters = document.querySelector('#MP155-1--sortBy select');

      if (addedSortByFilters) {
        addedSortByFilters.addEventListener('change', (e) => {
          const sortByFilters = document.querySelectorAll('#js-filterSortOrder .d-inline-block');
          const { selectedIndex } = e.target;
          console.log(selectedIndex);
          const relatedCheckbox = sortByFilters[selectedIndex].querySelector('.checkbox_toggle_bordered');
          console.log('related checkbox ', relatedCheckbox);
          if (relatedCheckbox) {
            console.log('has it');
            relatedCheckbox.click();
            window.localStorage.setItem('MP155-clickedSortBy', e.target.value);
          }
        });
      
      }

      // Check for a stored 'Sort By' filter to show in the dropdown
      const storedSortBy = window.localStorage.getItem('MP155-clickedSortBy');
      if (storedSortBy) {
        const getOption = addedSortByFilters.querySelector(`option[value=${storedSortBy}`);
        if (getOption) {
          getOption.setAttribute('selected', 'selected');
        }
      }
    }

    // If list has active filters, show dropdown.
    const titles = document.querySelectorAll('.MP155-filter--title');
    [].forEach.call(titles, (title) => {
      const options = title.nextElementSibling;
      if(options) {
        if(options.querySelectorAll('.MP155-active').length) {
          options.classList.add('MP155-show-option');
          title.classList.add('MP155-show-option');
        }
      }
    });

    // Force lower case
    const textOptions = document.querySelectorAll('.checkbox_text');
    if (textOptions) {
      for (let i = 0; textOptions.length > i; i += 1) {
        if (textOptions[i].textContent) {
          textOptions[i].textContent = textOptions[i].textContent.toLowerCase();
        }
      }
    }
  }

  if (settings.VARIATION === '2') {
    // Get and add 'Sort by' element
    const sortByElement = document.querySelector('#js-filterSortOrder');
    const sortByRef = document.querySelector('.MP155-filters-2');
    if (sortByElement && sortByRef) {
      const sortByOptions = sortByElement.querySelectorAll('.d-inline-block');
      sortByRef.insertAdjacentHTML('afterbegin', `
      <div class="MP155-select--wrap">
        <select>
          <option value="">Sort By</option>
          ${sortByOptions ? Array.from(sortByOptions).map((opt) => {
            const queryVal = opt.querySelector('div[data-search-query]');
            return `<option class="MP155-option" value="${queryVal.getAttribute('data-search-query')}">${opt.innerHTML.trim()}</option>`
          }).join(' ') : ''}
        </select>
      </div>
      `);
    }

    // If Cookie banner, move further down.
    if (document.body.classList.contains('pt-cookie') || document.querySelector('.optanon-alert-box-wrapper')) {
      document.body.classList.add('MP155-2-hasCookie');
    }
    observer.connect(document.body, () => {
      if (document.body.classList.contains('pt-cookie')) {
        document.body.classList.add('MP155-2-hasCookie');
      } else {
        document.body.classList.remove('MP155-2-hasCookie');
      }
    }, {
      config: {
        attributes: true,
        childList: false,
        subtree: false,
      }
    });

    // Make sure all dropdowns are NOT capital.
    const allOptions = document.querySelectorAll('.MP155-filters-2 option.MP155-option');
    if (allOptions) {
      const toLowerCase = (el) => {
        el.textContent ? el.textContent = el.textContent.toLowerCase() : null;
      }
      for (let i = 0; allOptions.length > i; i += 1) {
        toLowerCase(allOptions[i]);
      }
    }
  }

  // On Scroll from top, add class to filters
  const stickyFilters = document.querySelector('.MP155-filters');
  window.addEventListener('scroll', function() {
    const scrollPos = this.scrollY
    if (stickyFilters) {
      if (settings.VARIATION === '1') {
        if (scrollPos > 210) {
          stickyFilters.classList.add('MP155-1--up');
        } else {
          stickyFilters.classList.remove('MP155-1--up');
        }
      } else if (settings.VARIATION === '2') {
        if (scrollPos > 330) {
          stickyFilters.classList.add('MP155-2--up')
        } else {
          stickyFilters.classList.remove('MP155-2--up')
        }
      }
    }
  });

  // Add click events
  if (settings.VARIATION === '1') {
    
    const addedFilters = document.querySelector('.MP155-filters-1');
    if (addedFilters) {
      addedFilters.addEventListener('click', (e) => {
        // Toggle filter blocks
        if (e.target.classList.contains('MP155-filter--title')) {
          // Title.
          const thisTitle = e.target;
          let name = thisTitle.getAttribute('data-item');
          if (name) {
            name = name.replace(/filter_/g, ' ');
            // events.send(settings.ID, 'Click', `Filter ${name}`);
          }
          thisTitle.classList.toggle('MP155-show-option');
          // Also toggle the next block of options
          const optionBlock = thisTitle.nextElementSibling;
          if (optionBlock && optionBlock.classList.contains('MP155-filter--options')) {
            optionBlock.classList.toggle('MP155-show-option');
          }
        }
      });

      // Checkbox filters
      const inactiveFilters = addedFilters.querySelectorAll('.checkbox_toggle_bordered:not(.active)');
      const activeFilters = addedFilters.querySelectorAll('.checkbox_toggle_bordered.active');

      if (inactiveFilters) {
        for (let i = 0; inactiveFilters.length > i; i += 1) {
          inactiveFilters[i].addEventListener('click', (e) => {
            const el = e.currentTarget;
            let name = el.getAttribute('data-search-query');
            if (name) {
              name = name.replace(/\:/g, ' ');
              // events.send(settings.ID, 'Click', `Filter type: ${name}`);
            }
          });
        }
      }

      if (activeFilters) {
        for (let i = 0; activeFilters.length > i; i += 1) {
          activeFilters[i].addEventListener('click', (e) => {
            const checkbox = e.currentTarget;
            const checkboxQuery = checkbox.getAttribute('data-search-query');
            const query = sortQuery(checkboxQuery);

            if(settings.VARIATION === '1') {
              let url = toggleFilter.getCurrentUrl();

              // Replace characters to help match
              if (url.indexOf('%C2') > -1) {
                url = url.replace(/\%C2/g, '£');
              }
              if (url.indexOf('%A3') > -1) {
                url = url.replace(/\%A3/g, '');
              }
              toggleFilter.removeAFilter(checkboxQuery);

              const testingRegex = new RegExp(query + '(?!%20)');
              let newUrl = url.replace(new RegExp(testingRegex), '');
              window.location.href = newUrl;
            } else {
              toggleFilter.remove(query);
              toggleFilter.storeActiveFilters(checkboxQuery); // No longer stored
            }
          });
        }
      }
      if (inactiveFilters) {
        for (let i = 0; inactiveFilters.length > i; i += 1) {
          inactiveFilters[i].addEventListener('click', (e) => {
            const checkbox = e.currentTarget;
            const checkboxQuery = checkbox.getAttribute('data-search-query');
            const query = sortQuery(checkboxQuery);

            toggleFilter.add(query);
            toggleFilter.storeActiveFilters(checkboxQuery);
          });
        }
      }
    }

    const clearAllBtn = document.querySelector('.MP155-filters-1 #MP155-clear');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        // events.send(settings.ID, 'Click', 'Cleared Filters');
      });
    }
  }
  if (settings.VARIATION === '2') {

    // Check for a stored 'Sort By' filter to show in the dropdown
    const storedSortBy = window.localStorage.getItem('MP155-sortBy');

    // Add event to all select elements
    const selectElements = document.querySelectorAll('.MP155-filters-2 select');

    for (let i = 0; selectElements.length > i; i += 1) {
      // Add filters
      selectElements[i].addEventListener('change', function(e) {
        // Add selected attribute to options
        const theseOptions = selectElements[0].querySelectorAll('options');
        for (let j = 0; theseOptions.length > j; j += 1) {
          theseOptions[j].removeAttribute('selected');
        }
        const { options } = e.target;
        const optionTitle = options[0].textContent;
        
        //events.send(settings.ID, 'User interacted', `Clicked ${optionTitle}`, { sendOnce: true });
        
        if (e.target && e.target.value) {
          const selectQuery = e.target.value;
          const selectOption = this.selectedOptions[0];
          
          if (i === 0) {
            // options.setAttribute('selected', 'selected');
            window.localStorage.setItem('MP155-sortBy', selectQuery);
          }
          
          const query = sortQuery(selectQuery);
  
          if (selectOption.classList.contains('active')) {
            // Remove
            selectOption.classList.remove('active');
            selectOption.removeAttribute('selected');
            toggleFilter.remove(query);
          } else {
            // Add
            selectOption.classList.add('active');
            selectOption.setAttribute('selected', 'selected');
            toggleFilter.add(query);
            toggleFilter.storeActiveFilters(query);
          }
        }
      });
      
    }

    if (storedSortBy) {
      const getOption = selectElements[0].querySelector(`option[value=${storedSortBy}`);
      if (getOption) {
        getOption.setAttribute('selected', 'selected');
      }
    }

    // Add active filters below the select boxes.
    const activeFilters = toggleFilter.checkActiveFilters();
    const addedFilters = document.querySelector('.MP155-filters-2');
    // console.log('active filters ', activeFilters);
    const activeButtons = () => {

      addedFilters.insertAdjacentHTML('beforeend', `
        <div class="MP155-active--filters">
          ${activeFilters.map((filter) => {
            // console.log('filter! ,', filter);
            if (filter.match('%26')) {
              filter = filter.replace(/%26/g, '&');
            }
            if (filter.match('%2B')) {
              filter = filter.replace(/%2B/g, '+');
            }
            if (!filter.match(/(price-desc|name-asc|price-asc|name-desc|topRated)/mi)) {

              // Don't create buttons for sort By.
              // return(
              //   `<button class="MP155-clear-each MP155-sortBy-btn" data-filter="">${filter.replace(/:(.*?):/, '')}</button>` // For removing individual filters
              // )
              return(
                `<button class="MP155-clear-each" data-filter="${filter}"><i class="ico ico-cross close-btn closeBtn"></i> ${filter.replace(/:(.*?):/, '')}</button>` // For removing individual filters
              )
            }
          }).join(' ')}
        </div>
      `);
      const addedButtons = document.querySelectorAll('button.MP155-clear-each');
      if (addedButtons) {
        for (let i = 0; addedButtons.length > i; i += 1) {
          addedButtons[i].addEventListener('click', (e) => {
            const queryToRemove = e.currentTarget.getAttribute('data-filter');
            let query = sortQuery(queryToRemove);
            // Remove double %3A
            // remove from storage first
            toggleFilter.removeAFilter(queryToRemove);
            if (query) {
              query = query.replace(/^%3A/, '');
              toggleFilter.remove(query);
            }
            
          });
        }
      }
    }
    
    if (activeFilters) {
      activeButtons();
    }

  }

  // Clear all link
  const clearAllEl = document.querySelector('#MP155-clear');
  if (clearAllEl) {
    clearAllEl.addEventListener('click', () => {
      toggleFilter.clearAll();
    })
  }

  // Fix to top of products
  // Add window scroll event for fixing the filters
  const newFilters = document.querySelector('.MP155-filters');
  window.addEventListener('scroll', (e) => {
    
    if (window.scrollY > 400) {
      newFilters.classList.add('MP155-fix');
    } else {
      newFilters.classList.remove('MP155-fix');
    }
  });

};

export default activate;
