import { fullStory, events } from '../../../../lib/utils';
import { venueLocation } from './lib/RC039-mapLocation';
import RC023 from './lib/RC023';
import { poller } from '../../../../lib/uc-lib';

const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'RC039',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    document.body.classList.add(settings.ID);
    document.body.classList.add(`${settings.ID}v${settings.VARIATION}`);
    services.tracking();

    if (settings.VARIATION === 'control') {
      RC023();
    } else if (settings.VARIATION === '1') {
      RC023();
      poller(['.rc18-courseListingGroup', '.rc23-labelbar'], () => {
        components.createtopContent();
        components.addDistanceField();
        components.labelChange();
        components.getLocationAndMiles();
        components.addPriceBlock();
        components.mapAPI();
        components.seeMoreRows();
      });
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc create the top content that will contain the map, new title and course info
     */
    createtopContent: function createtopContent() {
      const searchBar = document.querySelector('.course-search-form-main');
      const newTopWrapper = document.createElement('div');
      newTopWrapper.classList.add('RC039-topContent_wrapper');
      newTopWrapper.innerHTML = `
      <div class="RC039-results_title"></div>
      <div class="RC039map_courseinfo">
        <div class="RC039-map"></div>
        <div class="RC039-course_info">
          <h4>Course Information</h4>
          <p></p>
        </div>
      </div>`;

      searchBar.insertAdjacentElement('afterend', newTopWrapper);

      /**
      * @desc Get the main info from the current title and create new one
      */
      const courseTitle = document.querySelectorAll('.course-search-summary strong');
      const courseName = courseTitle[0].textContent.trim();
      const searchLocation = courseTitle[1].textContent.trim();
      const searchResultsCount = document.getElementById('search-results-count').textContent.trim();

      document.querySelector('.RC039-results_title').innerHTML = `<h3>${courseName} near ${searchLocation}</h3><span>(${searchResultsCount} results found)</span>`;

      /**
      * @desc Add the course information from the results
      */
      const courseTagline = document.querySelector('.tagline').textContent;
      const tooltipInfo = document.querySelector('.tooltip-content').innerHTML;
      if (document.querySelector('.RC039-results_title h3').textContent.indexOf('First aid for baby and child') > -1) {
        document.querySelector('.RC039-course_info p').innerHTML = `<span>${courseTagline}</span> ${tooltipInfo}<p class="RC039-smalltext">Please note attendance on our courses is limited to adults only</p>`;
      } else {
        document.querySelector('.RC039-course_info p').innerHTML = `<span>${courseTagline}</span> ${tooltipInfo}`;
      }
    },
    /**
     * @desc Insert the distance row in the results
     */
    addDistanceField: function addDistanceField() {
      const courseRows = document.querySelectorAll('.rc18-courseRow.rc18-coursetableName');
      for (let i = 0; i < courseRows.length; i += 1) {
        const element = courseRows[i];

        const distanceField = document.createElement('div');
        distanceField.classList.add('RC039-distance_row');
        distanceField.innerHTML = '<div class="RC039-loc_distance"><span></span><p>miles away</p><a>Map & Contact</a></div>';

        const courseDate = element.querySelector('.course-col-date');
        element.insertBefore(distanceField, courseDate.previousSibling);

        // only show the first distance in the row
        const rowAmount = element.parentNode.querySelector('.RC039-distance_row');
        if (rowAmount) {
          rowAmount.classList.add('RC039-distance_show');
        }
      }
    },
    /**
     * @desc Add the course distance text and change the row title to the location
     */
    getLocationAndMiles: function getLocationAndMiles() {
      const distanceRow = document.querySelectorAll('.course-search-location');
      for (let i = 0; i < distanceRow.length; i += 1) {
        const distanceText = distanceRow[i].querySelector('.course-venue-distance strong');
        const locationName = distanceRow[i].querySelector('.course-venue-heading').textContent;
        const mapLightbox = distanceRow[i].querySelector('.course-venue-name a');

        const courseResults = document.querySelectorAll('.rc18-wrapper');
        for (let x = 0; x < courseResults.length; x += 1) {
          const distanceInResults = courseResults[i].querySelector('.RC039-distance_row span');
          const courseName = courseResults[i].querySelector('.course-result-name');
          if (distanceRow[i] === courseResults[x].previousElementSibling) {
            distanceInResults.appendChild(distanceText);
            courseName.textContent = locationName;

            // show the map when the new map link is clicked
            courseResults[i].querySelector('a').addEventListener('click', () => {
              mapLightbox.click();
            });
          }
        }
      }
    },
    /**
     * @desc put the price in to it's own block
     */
    addPriceBlock: function addPriceBlock() {
      const courseRows = document.querySelectorAll('.rc18-courseRow.rc18-coursetableName');
      const sortBy = document.querySelector('.course-search-sorts .course-sortby .js-select .ui-selectmenu-text').textContent;
      for (let i = 0; i < courseRows.length; i += 1) {
        const element = courseRows[i];
        const coursePrice = element.querySelector('.course-col-price').innerHTML;
        const courseDate = element.querySelector('.course-col-date');

        const newPriceBlock = document.createElement('div');
        newPriceBlock.classList.add('RC039-course_price');
        newPriceBlock.innerHTML = `<div class="RC039-price">${coursePrice}</div>`;
        courseDate.insertAdjacentElement('beforebegin', newPriceBlock);

        // only show the first distance in the row
        const priceAmount = element.parentNode.querySelector('.RC039-course_price');
        if (priceAmount) {
          priceAmount.classList.add('RC039-price_show');

          // move the places remaining in to price when sorted by time
          if (sortBy === 'date') {
            const placesLeft = element.parentNode.querySelector('.course-result-cart-wrapper span');
            priceAmount.appendChild(placesLeft);
          }
        }
      }
    },
    /**
     * @desc Change the table labels
     */
    labelChange: function labelChange() {
      const labels = document.querySelectorAll('.rc23-labels');
      for (let i = 0; i < labels.length; i += 1) {
        const labelBar = labels[i];
        const labelNames = ['Location', 'Distance', 'Price', 'Date/Time', 'Book'];
        [].forEach.call(labelNames, (element) => {
          const newLabels = document.createElement('div');
          newLabels.classList.add('RC039-label');
          newLabels.classList.add(`RC039label-${element}`);
          newLabels.innerHTML = `<span>${element}</span>`;
          labelBar.appendChild(newLabels);
        });
      }
    },
    /**
    * @desc Map API
    */
    mapAPI: function mapAPI() {
      /* eslint-disable */
      // Add the map API
      const mapWrapper = document.querySelector('.RC039-map');
      const map = new google.maps.Map(mapWrapper, {
        center: { lat: 53.4757548, lng: -2.2908058000000437 },
        zoom: 8,
      });

      // loop through the course locations to get the information
      const courseLocation = document.querySelectorAll('.course-search-location');
      for (let i = 0; i < courseLocation.length; i += 1) {
       const element = courseLocation[i];
       const elementName = element.querySelector('.course-venue-heading').textContent.trim();
        
       for (let i = 0; i < Object.keys(venueLocation).length; i += 1) {
        const data = Object.entries(venueLocation)[i];
        const key = data[0];
        const category = data[1];
  
          if(key === elementName){
            const marker = new google.maps.Marker({
              position: category,
              map: map,
              title: category.key,
            });

            // get the matching map
            const matchingMap = element.querySelector('.course-venue-name .modal');
            marker.addListener('click', function() {
              matchingMap.click();
            });
           }
        }
      }
    },
    /**
     * @desc Add see more if there is more than one row
     */
    seeMoreRows: function seeMoreRows() {
      const rowBlocks = document.querySelectorAll('.rc18-wrapper');
      [].forEach.call(rowBlocks, (element) => {
        const allInnerRows = element.querySelectorAll('.rc18-courseRow');
        if(allInnerRows.length > 1){
          element.classList.add('RC039-moreThan2');
        }
      });

      // add the link
      const multipleRows = document.querySelectorAll('.RC039-moreThan2');
      for (let i = 0; i < multipleRows.length; i++) {
        const seeMoreLink = document.createElement('div');
        seeMoreLink.classList.add('RC039-seeMore');
        seeMoreLink.innerHTML = 'Show more dates';
        const element = multipleRows[i];
        element.querySelector('.course-result-name').appendChild(seeMoreLink);

        // if see more is clicked
        const seeMorelink = element.querySelector('.RC039-seeMore');
        seeMorelink.addEventListener('click', () => {
          if (seeMorelink.classList.contains('RC039-seeMore_showing')) {
            seeMoreLink.classList.remove('RC039-seeMore_showing');
            seeMoreLink.textContent = 'Show more dates';
            element.classList.remove('RC039-showAll');
          } else {
            seeMoreLink.classList.add('RC039-seeMore_showing');
            element.classList.add('RC039-showAll');
            seeMoreLink.textContent = 'Show less dates';
          }
        });
      }
    }
  },
};

export default Experiment;
