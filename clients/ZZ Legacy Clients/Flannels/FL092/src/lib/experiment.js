/**
 * FL092 - PLP Filters Desktop
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './shared';
import { events, observer } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

export default () => {

  const { ID, VARIATION } = settings;
  if (VARIATION == 3) {
    events.send(ID, 'FL092 Control', 'FL092 Control is active');
    return false;
  } else {
    events.send(ID, `FL092 Variation ${VARIATION}`, `FL092 Variation ${VARIATION} is active`);
  }

  setup();

  const filterTitles = document.querySelectorAll('#filterlist li.productFilter .productFilterTitleBox');
  const sortByFilter = document.querySelector('.sortbyfilter .sortOptionsContainer');
  const applyBtn = document.querySelector('.toggleFilterInner h2.FiltersTitle');
  const bodyWrap = document.querySelector('.BodyWrap');

  let activeEl = null;
  let activeList = null;


  const openFilter = (filterTitle) => {

    const parentLi = filterTitle.parentElement;
      
    if (!parentLi) return;

    // const elRec = parentLi.getBoundingClientRect();
    // console.log(elRec.top);
    // if (elRec.top > 170) {
    //   window.scrollTo({
    //     top: elRec.top + 50,
    //     left: 0,
    //     behavior: 'smooth',
    //   })
    // }
    parentLi.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})


    let filterList = parentLi.querySelector('.productFilterList');

    const filterTitleWrap = parentLi.querySelector('.productFilterTitleBox');

    filterTitle.classList.toggle('FL092-active');
    filterList.classList.toggle('FL092-show');

    
    if (applyBtn && !applyBtn.classList.contains('show')) {
      setTimeout(() => {
        applyBtn.classList.add('show'); // Apply button
        filterList = parentLi.querySelector('.productFilterList');
        if (filterList.classList.contains('FL092-show')) {
          const filterListHeight = filterList.offsetHeight;
          
          applyBtn.style.top = `${filterListHeight}px`; 
        }
      }, 500);
    }

    if (!document.querySelector('.FL092-active')) {
      applyBtn.classList.remove('show'); // Hide Apply button
    }

    
  }

  // Add events to all title filters.
  for (let i = 0; filterTitles.length > i; i += 1) {
    filterTitles[i].addEventListener('click', () => {
      if (filterTitles[i].classList.contains('FL092-active')) {
        bodyWrap.click();
      } else {
        const activeEls = document.querySelectorAll('.FL092-active');
        if (activeEls.length) {
          for (let j = 0; activeEls.length > j; j += 1) {
            activeEls[j].click();
          }
        }
        openFilter(filterTitles[i]);
        const hiddenFilterItems = document.querySelectorAll('.FilterListItem');
        if (hiddenFilterItems.length) {
          for (let i = 0; hiddenFilterItems.length > i; i += 1) {
            hiddenFilterItems[i].style.display = 'inline-block';
          }
        }
        // Clear input
        const input = document.querySelector('.productFilter input[type="text"]');
        input ? input.value = '' : null;
      }
    });

    // Check if BRANDS comes 2nd
    const thisTitle = filterTitles[i].querySelector('h3.productFilterTitle');
    if (thisTitle) {
      const titleText = thisTitle.textContent.trim();
      if (titleText && titleText == 'Brand') {
        filterTitles[i].parentElement ? filterTitles[i].parentElement.classList.add('FL092-isBrand') : null;
      }
    }
  }

 
  if (applyBtn) {
    // const applyBtnSpan = applyBtn.querySelector('span');
    applyBtn.addEventListener('click', () => {
      
      const activeEls = document.querySelectorAll('.FL092-active');
      if (activeEls.length) {
        for (let i = 0; activeEls.length > i; i += 1) {
          activeEls[i].click();
        }
      }

      // Clear input
      const input = document.querySelector('.productFilter input[type="text"]');
      input ? input.value = '' : null;

      const hiddenFilterItems = document.querySelectorAll('.FilterListItem');
      if (hiddenFilterItems.length) {
        for (let i = 0; hiddenFilterItems.length > i; i += 1) {
          hiddenFilterItems[i].style.display = 'inline-block';
        }
      }
    });
  }


  const addTrigger = (filterTitle) => {
    if (!filterTitle) return;
    const parentLi = filterTitle.closest('li.productFilter');
    if (!parentLi) return;
    const filterList = parentLi.querySelector('.productFilterList');
    const filterTitleWrap = parentLi.querySelector('.productFilterTitleBox');

    filterTitle.addEventListener('click', () => {
    
      filterTitle.classList.toggle('FL092-active');
      filterList.classList.toggle('FL092-show');
      
      // // Close others
      // if (activeEl && activeEl !== filterTitle) {
      //   activeEl.classList.remove('FL092-active');
      // }
      // if (activeList && activeList !== filterList) {
      //   activeList.classList.remove('FL092-show');
      // }
      
      // activeEl = filterTitleWrap;
      // activeList = filterList;

    });
  };

 


  // Trigger class on sortBy
  sortByFilter.addEventListener('click', (e) => {
    e.preventDefault();

    if (document.querySelector('.productFilterTitleBox.FL092-active')) {
      const activeEl = document.querySelector('.productFilterTitleBox.FL092-active');
      activeEl.click();
    }
    const sortByWrap = sortByFilter.closest('.sortbyfilter');
    if (!sortByWrap) return;
    sortByWrap.classList.toggle('FL092-activeSortBy');
  });

  sortByFilter.addEventListener('mouseleave', () => {
    const sortByWrap = sortByFilter.closest('.sortbyfilter');
    if (!sortByWrap) return;
    sortByWrap.classList.remove('FL092-activeSortBy');
  });


  // Click outside closes all open (which should only be 1 + sort by)
  
  bodyWrap.addEventListener('click', function(event) {
    
    const el = document.querySelectorAll('.FL092-active');
    const list = document.querySelectorAll('.FL092-show');
    
    if (el && list) {
      for (let i = 0; el.length > i; i += 1) {
        var clickInEl = el[i].contains(event.target);
        // if (clickInEl) return;
        var clickInList = list[i].contains(event.target);
        // if (clickInList) return;
  
        if (!clickInEl && !clickInList) {
          // Remove
          el[i].classList.remove('FL092-active');
          list[i].classList.remove('FL092-show');

          applyBtn.classList.remove('show');
        }
      }
    }
  });


  // V2 close on click
  const filterItems = document.querySelectorAll('.flanProdList .productFilterList .FilterAnchor');
  if (filterItems && VARIATION == 2) {
    const len = filterItems.length;
    for (let i = 0; len > i; i += 1) {
      filterItems[i].addEventListener('click', () => {
        const allOpen = document.querySelectorAll('.FL092-active');
        const allActive = document.querySelectorAll('.FL092-show');

        for (let j = 0; allOpen.length > j; j += 1) {
          allOpen[j].classList.remove('FL092-active');
        }
        for (let j = 0; allActive.length > j; j += 1) {
          allActive[j].classList.remove('FL092-show');
        }
      });
    }
  }


  // Observe for active filters
  const hasItems = document.querySelectorAll('#SelectedFiltersWrapper ul.selectedFilters li');
  if (hasItems && hasItems.length > 0) {
    applyBtn.textContent = '';
    applyBtn.insertAdjacentHTML('beforeend', '<span class="hideFilters hidden-xs hidden-sm">Apply</span>');
  } else {
    applyBtn.textContent = '';
    applyBtn.insertAdjacentHTML('beforeend', '<span class="hideFilters hidden-xs hidden-sm">Close</span>');
  }
  
  const filterWrap = document.querySelector('#SelectedFiltersWrapper');
  observer.connect(filterWrap, () => {
    
    if (applyBtn) {
      const hasItems = document.querySelectorAll('#SelectedFiltersWrapper ul.selectedFilters li');
      if (hasItems && hasItems.length > 0) {
        applyBtn.textContent = '';
        applyBtn.insertAdjacentHTML('beforeend', '<span class="hideFilters hidden-xs hidden-sm">Apply</span>');
      } else {
        applyBtn.textContent = '';
        applyBtn.insertAdjacentHTML('beforeend', '<span class="hideFilters hidden-xs hidden-sm">Close</span>');
      }
    }
  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: false,
    }
  })
  
};
