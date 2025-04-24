/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import FilterLevel1 from './components/filterCategories';
import FiltersMarkup from './components/newFilterMarkup';
import addTitles from './components/addTitles';
import { observer, pollerLite } from '../../../../../lib/uc-lib';
import PriceDropdown from './components/priceChanges/priceDropdown';
import settings from './settings';
import lastFiltered from './components/lastFiltered';
import resetFilter from './components/resetFilter';
import newPriceSlider from './components/priceChanges/newPriceSlider';
import state from './components/state';
import removePriceChanges from './components/removePrices';
import { events } from '../../../../../lib/utils';


const activate = () => {
  setup();

  /*--------------------
  * ADD TOP LEVEL FILTERS
  --------------------*/
  const markup = new FiltersMarkup();

  // add the main filter categories
  const URL = window.location.pathname;
  if (window.digitalData.page.category.subCategory1 === 'Rings') {
    const filterTopLevel = new FilterLevel1({
    filters: [
      {
        title: 'Price',
        name: 'price',
        accordianTarget: '#refinement-price',
      },
      {
        title: 'Occasion',
        name: 'occasion',
        accordianTarget: '#refinement-occasion',
      },
      {
        title: 'Metal Type',
        name: 'metaltype',
        accordianTarget: '#refinement-material',
      },
      {
        title: 'Stone Shape',
        name: 'stoneshape',
        accordianTarget: '#refinement-stone-shape',
      },
      {
        title: 'Gender',
        name: 'gender',
        accordianTarget: '#refinement-recipient',
      },
      {
        title: 'Stone Type',
        name: 'stonetype',
        accordianTarget: '#refinement-stone-type',
      },
      {
        title: 'Carat Weight',
        name: 'caratweight',
        accordianTarget: '#refinement-carat-weight',
      },
      {
        title: 'Stone Colour',
        name: 'stonecolour',
        accordianTarget: '#refinement-stone-colour',
      },
      {
        title: 'Birthstone',
        name: 'birthstone',
        accordianTarget: '#refinement-birthstone',
      },
    ],
    });
  } else if (window.digitalData.page.category.primaryCategory === 'Watches') {
    const filterTopLevel = new FilterLevel1({
      filters: [
        {
          title: 'Price',
          name: 'price',
          accordianTarget: '#refinement-price',
        },
        {
          title: 'Gender',
          name: 'gender',
          accordianTarget: '#refinement-recipient',
        },
        {
          title: 'Brand',
          name: 'brand',
          accordianTarget: '#refinement-brand',
        },
        {
          title: 'Strap Material',
          name: 'strapmaterial',
          accordianTarget: '#refinement-strap-material',
        },
        {
          title: 'Category',
          name: 'category',
          accordianTarget: '#refinement-category_watches',
        },
        {
          title: 'Watch Features',
          name: 'watchfeatures',
          accordianTarget: '#refinement-watch-features',
        },
        {
          title: 'Movement',
          name: 'movement',
          accordianTarget: '#refinement-movement',
        },
      ],
    });
  }


  /*--------------------
  * Destroy the slider and rebuild it
  --------------------*/
  const destroyRebuildSlider = () => {
    if (state.slider) {
      state.slider.destroy(); // destroy the slider
      removePriceChanges(); // remove all the price changes
    }

    newPriceSlider(); // add the price slider back in
    pollerLite([`.${settings.ID}-applyPrice`], () => {
      const priceDropdown = new PriceDropdown();  // add the dropdown back in
    });
  };

  /*--------------------
  * FILTER BUTTON CLICK
  --------------------*/

  const filterClick = () => {
    addTitles();
    sessionStorage.removeItem(`${settings.ID}-filtered`);

    // if any are active, remove them
    if (document.querySelector(`.${settings.ID}-filter_active`)) {
      document.querySelector(`.${settings.ID}-filter_active`).classList.remove(`${settings.ID}-filter_active`);
    }

    destroyRebuildSlider();
  };

  const filterButton = document.querySelector('.cta.js-modal-trigger.filter-toggle');
  filterButton.addEventListener('click', () => {
    events.send('HS019 V1', 'click', 'Clicked filters', { sendOnce: true });
    filterClick();
  });

  /*--------------------
  * ALL FILTER OBSERVER
  --------------------*/

  observer.connect([document.querySelector('#filter-modal')], () => {
    const filterButtonNew = document.querySelector('.cta.js-modal-trigger.filter-toggle');
    const changedURL = window.location.href;
    // if URL changes and is not rings or watches, force page refresh
    if (window.digitalData.page.category.primaryCategory !== 'Watches' && window.digitalData.page.category.subCategory1 !== 'Rings') {
      window.location.reload();
    }
    // remove any that are active on filter click
    filterButtonNew.addEventListener('click', () => {
      filterClick();
    });

    addTitles(); // add the H3 titles to the filters
    lastFiltered(); // if any were last filtered, make it active
    resetFilter(); // add the top filter button events back in
  }, {
    throttle: 1000,
    config: {
      attributes: false,
      childList: true,
      subtree: true,
    },
  });


  /*--------------------
  * MAIN PRODUCT PAGE OBSERVER
  --------------------*/
  const mainContent = document.querySelector('.browse__main-content');
  if (mainContent) {
    observer.connect([mainContent], () => {
      addTitles();
      resetFilter();

      destroyRebuildSlider();
    }, {
      attributes: false,
      childList: true,
    });
  }
};

export default activate;
