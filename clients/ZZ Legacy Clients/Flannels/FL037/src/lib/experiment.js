/**
 * FL037 - Branded Search
 * @author User Conversion
 */
import { setup, getBrands, buildBrandList, removeEvents, removeExtraLabels, checkActiveFilters, toggleFromOriginalFilters } from './services';
import controlFilters from './controller';
import settings from './settings';
import { cacheDom } from './../../../../../lib/cache-dom';
import { events } from './../../../../../lib/utils';
import { observer } from './../../../../../lib/uc-lib';

events.analyticsReference = '_gaUAT';

const activate = () => {
  if (settings.VARIATION === '1') {
    events.send(settings.ID, 'Variation 1', 'Variation 1 is active');
  }

  if (settings.VARIATION === '2') {
    events.send(settings.ID, 'Control', 'Control is active');

    const filterAnchors = cacheDom.getAll('a.FilterAnchor');
    if (filterAnchors.length) {
      for (let i = 0; filterAnchors.length > i; i += 1) {
        filterAnchors[i].addEventListener('click', () => {
          events.send(settings.ID, 'Control', 'Filter by brand');
        });
      }
    }
    return false;
  }

  if (settings.VARIATION === '3') {
    events.send(settings.ID, 'Variation 3', 'Variation 3 is active');
  }
  
  setup();

  /**
   * Cache any needed elements
   */
  const filtersD = cacheDom.getAll('.productFilterList .FilterListItem.ABRA');
  const refD = cacheDom.get('.s-maincontent-container .topheadbox');
  const defaultFiltersD = cacheDom.get('.FiltersTitle.toggleFilters .refineIco');
  const applyFiltersD = cacheDom.get('h2.FiltersTitle #dnn_ctr179057_ViewTemplate_ctl00_desktopCloseFilters_lblCloseFilters');


  /**
   * Determine if mobile or not
   */
  let isMobile = false;
  if (window.dataLayer) {
    if (window.dataLayer[1].isMobile === 'True') {
      isMobile = true;
    }
  }

  /**
   * Run the code
   */
  // Run Desktop Code
  const brandList = getBrands(filtersD);
  buildBrandList(brandList, refD, 'afterend', false);

  removeEvents();

  // Add filter controls
  const brandElements = cacheDom.getAll('.FL037-brands .FL037-brand .FilterAnchor > span');
  // const selectedFilters = cacheDom.getAll('.FL037-brands .Fl037-brand .SelectedFilter');
  for (let i = 0; brandElements.length > i; i += 1) {
    brandElements[i].addEventListener('click', (e) => {
      events.send(settings.ID, 'Clicked', 'Brand option');
      controlFilters.toggleFilter(e);
      if (e.currentTarget && e.currentTarget.classList.contains('SelectedFilter')) {
        e.currentTarget.classList.remove('SelectedFilter');
        e.currentTarget.classList.add('SelectableFilter');
        if (e.currentTarget.parentElement.parentElement && e.currentTarget.parentElement.parentElement.classList.contains('FL037-active')) {
          e.currentTarget.parentElement.parentElement.classList.remove('FL037-active');
        }
      }
    });
  }

  // Event for 'More Brands'
  const moreBrands = document.getElementById('FL037-more-brands');
  const originalFilters = document.querySelectorAll('.flanProdList ul.productFilters>li.productFilter');
  moreBrands.addEventListener('click', (e) => {
    events.send(settings.ID, 'Clicked', 'More brands');
    setTimeout(() => {
      document.querySelector('.hiddenMenuOpen').classList.add('DesktopHide');
      document.getElementById('ToggleFiltersContainer').classList.remove('DesktopHide');
      document.querySelector('.toggleFilters').classList.add('filtersOpen');
    }, 100);
    // Add blur to original filters.
    if (originalFilters.length) {
      for (let i = 0; originalFilters.length > i; i += 1) {
        const filterTitle = originalFilters[i].querySelector('.productFilterTitle');
        if (filterTitle && filterTitle.textContent.toLowerCase() === 'brand') {
          originalFilters[i].classList.add('FL037-focus');
          setTimeout(() => {
            originalFilters[i].classList.remove('FL037-focus');
          }, 2000);
        }
      }
    }
    const mobMenu = document.getElementById('filterByMob');
    if (window.innerWidth < 1022) {
      mobMenu.click();
    }
  });

  // checkActiveFilters();
  const filterContainer = document.querySelector('.SelectedFiltersContainer');
  observer.connect(filterContainer, () => {
    removeExtraLabels();
    checkActiveFilters();
    setTimeout(() => {
      toggleFromOriginalFilters();
    }, 1000);
  }, {
    config: {
      attibutes: true,
      childList: true,
      subTree: false,
    },
  });
};

export default activate;
