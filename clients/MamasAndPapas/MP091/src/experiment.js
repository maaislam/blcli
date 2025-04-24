/*eslint-disable */
import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{MP091}} - {{Prominent Filters}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'MP091',
    VARIATION: '1',
  },

  init: function init() {
    if (!(window.location.pathname.indexOf('/c/may-day-offers') > -1) && !(window.location.pathname.indexOf('/c/clearance') > -1)) {
      // Setup
      const { settings, services } = Experiment;
      services.tracking();
      document.body.classList.add(settings.ID);
      // Gets filter list from menu
      const filterList = document.querySelector('.filter_group').getElementsByTagName('li');
      const filters = [];
      for (let key in filterList) {
        const obj = filterList[key].textContent;
        if (!obj) {
          continue;
        } else {
          filters.push(obj);
        }
      }

      /**
      * @desc Mobile and Tablet version 
      **/  
      if (window.innerWidth < 769) {
        // Filters Wrapper 
        const filterWrapper = document.querySelector('.productFilter_filterSelectors');
        const container = `<p id='MP091-filterHeading'>Filter By<p><div class='MP091-filterContainer'></div>`;
        filterWrapper.insertAdjacentHTML('afterbegin', container);

        const filterContainer = document.querySelector('.MP091-filterContainer');
        let elementId;
        const elementIds = [];

        // Generates filter buttons and stores their IDs into an array
        filters.forEach((element) => {
          switch (element) {
            case 'Available for home delivery':
              element = 'Home Delivery';
              elementId = 'inStock';
              elementIds.push(elementId);
              break;
            case 'Price Range':
              elementId = services.camelize(element);
              elementIds.push(elementId);
              break;
            case 'Product Type':
              elementId = 'subCat';
              elementIds.push(elementId);
              break;
            case 'Size':
              elementId = services.camelize(element);
              elementIds.push(elementId);
              break;
            case 'Colour':
              elementId = services.camelize(element);
              elementIds.push(elementId);
              break;
            case 'Brand':
              elementId = services.camelize(element);
              elementIds.push(elementId);
              break;
            case 'Collection':
              elementId = 'collectionCharacter';
              elementIds.push(elementId);
              break;
          }
            const filterBlock = `<div class='MP091-filter' data-target='filter_${elementId}' data-goto-category='filter_${elementId}'>
            <p id='MP091-${elementId}'>${element}</p>
            <i class='MP091-filterIcon ico ico-plus productFilter_icon'> </i></div>`;
            filterContainer.insertAdjacentHTML('beforeend', filterBlock);
        });
      
        // Adds event listeners on each filter button
        let link;
        let id;
        const filterButton = document.querySelector('div[data-target="#filter-by-slide"]');

        elementIds.forEach((elementId) => {
          link = document.querySelector('[data-target="filter_' + elementId + '"]');
          link.addEventListener('click', () => {
            id = document.querySelector('li[data-goto-category="filter_' + elementId + '"]');
            id.click();
            filterButton.click();
            events.send('MP091', 'Filter clicked', elementId, { sendOnce: true });
          });
        });

        /**
         * @desc Slider
         **/  
        /*eslint-disable */
        poller([
          function() {
        try {
          return !!window.jQuery.fn.slick();
        } catch (e) {
          }
        }
        ], () => {
          $('.MP091-filterContainer').slick({
            dots: true,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 2,
            responsive: [
              {
                breakpoint: 375,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 2
                }
              },
              {
                breakpoint: 322,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 2
                }
              }
            ] 
          }).on('swipe', function(event, slick, direction){
            events.send('MP091', 'User swiped', direction, { sendOnce: true });
          });
        });
      /* eslint-enable */

      /**
       * @desc Desktop version
       */
      } else {
        const filterWrapper = `<div class='MP091-filterButtons__desktop'></div><div class='MP091-filterContainer__desktop'></div>`;// eslint-disable-line quotes
        // Swaps places of the filter buttons
        const container = document.querySelector('.productFilter_filterSelectors');
        const filterButton = container.children[0];
        const sortButton = container.children[1];

        container.insertAdjacentHTML('afterbegin', filterWrapper);
        const filterButtons = document.querySelector('.MP091-filterButtons__desktop');
        filterButtons.insertAdjacentElement('afterbegin', filterButton);
        filterButtons.insertAdjacentElement('afterbegin', sortButton);

        const filtersContainer = document.querySelector('.MP091-filterContainer__desktop');
        let elementId;
        const elementIds = [];

        // Generates filter buttons and stores their IDs into an array
        filters.forEach((element) => {
          switch (element) { // eslint-disable-line default-case
            case 'Available for home delivery':
              element = 'Home Delivery';// eslint-disable-line no-param-reassign
              elementId = 'inStock';
              elementIds.push(elementId);
              break;
            case 'Price Range':
              elementId = services.camelize(element);
              elementIds.push(elementId);
              break;
            case 'Product Type':
              elementId = 'subCat';
              elementIds.push(elementId);
              break;
            case 'Size':
              elementId = services.camelize(element);
              elementIds.push(elementId);
              break;
            case 'Colour':
              elementId = services.camelize(element);
              elementIds.push(elementId);
              break;
            case 'Brand':
              elementId = services.camelize(element);
              elementIds.push(elementId);
              break;
            case 'Collection':
              elementId = 'collectionCharacter';
              elementIds.push(elementId);
              break;
          }

          const filterBlock = `<div class='MP091-filter' data-target='filter_${elementId}' data-goto-category='filter_${elementId}'>
          <p id='MP091-${elementId}'>${element}</p>
          <i class='MP091-filterIcon ico ico-plus productFilter_icon'> </i></div>`;
          filtersContainer.insertAdjacentHTML('beforeend', filterBlock);
        });

        // Adds event listeners on each filter button
        let link;
        let id;
        const button = document.querySelector('div[data-target="#filter-by-slide"]');

        elementIds.forEach((elementId) => { // eslint-disable-line no-shadow
          link = document.querySelector('[data-target="filter_' + elementId + '"]'); // eslint-disable-line prefer-template
          link.addEventListener('click', () => {
            id = document.querySelector('li[data-goto-category="filter_' + elementId + '"]'); // eslint-disable-line prefer-template
            id.click();
            button.click();
            events.send('MP091', 'Filter clicked', elementId, { sendOnce: true });
          });
        });
      }
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
    /**
     * @desc Transforms element IDs to camelCase
     */
    /*eslint-disable */
    camelize: function camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
      }).replace(/\s+/g, '');
    /* eslint-enable */
    },
  },

  components: {},
};

export default Experiment;
