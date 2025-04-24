import venueLocationData from './locations';
import { events } from '../../../../../lib/utils';

/**
 * RC031 - Venue Region Page Redesign
 */
const RC031 = {
  settings: {
    isMobile: window.innerWidth < 768,
  },
  
  init: function init() {
    // Setup
    const { settings, services, components } = RC031;
    const userPostcode = services.getUserPostcode();
    if (userPostcode) {
      services.restructurePage();

      // Change text of form title
      document.querySelector('.course-search-header').innerHTML = '<i class="icon-search-circle"></i><p>Ready to search for course dates? Start here</p>';

      // Add CTA to each venue and wrap content in a container for easier flex alignment
      const venues = document.querySelectorAll('.venue-search-item');
      [].forEach.call(venues, (el) => {
        const link = el.querySelector('a');
        const url = link.href;
        const cta = document.createElement('div');
        cta.classList.add('RC031_venueCta');
        cta.innerText = 'Go to venue';
        el.appendChild(cta);

        link.insertAdjacentHTML('afterend', `<div>${link.innerText}</div>`);
        link.parentNode.removeChild(link);

        const html = el.innerHTML;
        el.innerHTML = `<a class="RC031_venueInner" href="${url}">${html}</a>`; // eslint-disable-line no-param-reassign
      });

      // Create new venue search component
      components.Search.init();
    } else {
      events.send('RC046', 'Location Error', 'User\'s GTM datalayer did not have location');
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = RC031;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },

    /**
     * @desc Moves elements around to match the new redesign
     */
    restructurePage: function restructurePage() {
      const { settings } = RC031;
      const mainContent = document.querySelector('.main-content');
      const search = mainContent.querySelector('.venues-search');
      const searchResults = mainContent.querySelector('.venue-search-results');

      // Move search bar above results
      mainContent.insertBefore(search, searchResults);

      // Add loader in venue results
      const loader = document.createElement('div');
      loader.classList.add('RC031_loaderWrap');
      loader.innerHTML = `
        <div class="RC031_loadingDots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>`;
      searchResults.appendChild(loader);

      // Wrap map and sidebar in container
      const map = document.querySelector('.venue-search-area-map');
      const sidebar = document.querySelector('.sidebar-last');
      const mapRowContainer = document.createElement('div');
      mapRowContainer.classList.add('RC031_row');
      mainContent.insertBefore(mapRowContainer, map);
      mapRowContainer.appendChild(map);
      mapRowContainer.appendChild(sidebar);

      // Wrap map in container and add copy above
      const mapContainer = document.createElement('div');
      mapContainer.classList.add('RC031_map');
      mapRowContainer.insertBefore(mapContainer, map);
      mapContainer.appendChild(map);
      const mapCopy = `
        <div class='RC031_map__copy'>
          <p>Zoom in to see our venue locations</p>
          <p>Click any of our drop pins to see more information about that venue</p>
        </div>
      `;
      map.insertAdjacentHTML('beforebegin', mapCopy);

      // Mobile specific changes
      if (settings.isMobile) {
        // Move sidebar to bottom of content
        const content = document.querySelector('.main-content-wrap');
        content.appendChild(sidebar);
      }
    },

    /**
     * @desc Returns user postcode if availible from cookie
     * @returns {String|undefined} User postcode
     */
    getUserPostcode: function getUserPostcode() {
      let location;
      if (window.brc && window.brc.gtm && window.brc.gtm.getLocation) {
        location = window.brc.gtm.getLocation();
      } 
      return location;
    },

    /**
     * @param {String} postcode Used to get the Lat Lng values from Google Maps API
     * @param {Function} success Success callback
     * @param {Function} error Error callback
     * @returns {Object} Object with lat and long values
     */
    getUserLatLng: function getUserLatLng(postcode, success, error) {
      const geocoder = new window.google.maps.Geocoder();

      // Async request
      geocoder.geocode({ address: postcode }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          const myResult = results[0].geometry.location; // reference LatLng value
          const response = {
            lat: myResult.lat(),
            lng: myResult.lng(),
          };
          success(response);
        } else {
          error();
        }
      });
    },

    /**
     * @desc Haversine formula to calculate distance between two locations
     * @param {Object} p1 Contains lat/lng values for first location
     * @param {Object} p2 Contains lat/lng values for second location
     * @returns {Number} Distance between the locations in metres
     */
    getDistanceBetweenLocations: function getDistanceBetweenLocations(p1, p2) {
      /* eslint-disable no-mixed-operators */
      const { rad } = RC031.services;
      const R = 6378137; // Earth’s mean radius in metres
      const dLat = rad(p2.lat - p1.lat);
      const dLong = rad(p2.lng - p1.lng);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
                Math.sin(dLong / 2) * Math.sin(dLong / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;
      return d; // returns the distance in metres
      /* eslint-enable no-mixed-operators */
    },

    /**
     * @desc Converts metres to miles
     * @param {Number} x Measurement in metres
     * @returns {Number} Measurement in miles
     */
    getMiles: function getMiles(x) {
      return x * 0.000621371192;
    },

    /**
     * @desc Calculates radius from a circumference
     * @param {Number} x Circumference
     * @returns {Number} Radius
     */
    rad: function rad(x) {
      return (x * Math.PI) / 180;
    },
  },

  components: {
    Search: {
      /**
       * @returns {HTMLElement} Component
       */
      create: function create() {
        const element = document.createElement('div');
        element.classList.add('RC031_search');
        element.innerHTML = `
          <label>Sort by nearest to</label>
          <input type='text' placeholder='Your town or postcode' id="RC031_search__postcode">
          <div class="RC031_search__submit">Go</div>
        `;

        return element;
      },

      /**
       * @param {HTMLElement} element Instance of component
       */
      bindEvents: function bindEvents(element) {
        const component = this;
        const updateResults = () => {
          const postcode = element.querySelector('#RC031_search__postcode').value;
          const loader = document.querySelector('.RC031_loaderWrap');
          if (postcode) {
            // Show loader then update distances
            loader.style.display = 'block';
            component.updateDistances(postcode);
            if (window.jQuery) {
              window.jQuery('body, html').animate({
                scrollTop: window.jQuery('.RC031_search').offset().top - 30,
              }, 700);
            }
            setTimeout(() => {
              loader.style.display = 'none';
            }, 1000);
          }
        };

        // On click, get the postcode from the input and reorder venues based on distance
        element.querySelector('.RC031_search__submit').addEventListener('click', updateResults);

        // Update results on press of enter key and prevent original form from submitting
        element.querySelector('input').addEventListener('keypress', (e) => {
          const key = e.charCode || e.keyCode || 0;
          if (key === 13) {
            e.preventDefault();
            updateResults();
          }
        });

        // Track clicks on search form
        // const search = document.querySelector('#main_0_contentlastitem_0_TownOrPostCodeFormField_Button_DoSearch');
        // search.addEventListener('click', () => {
        //   events.send(RC031.settings.ID, 'Click', 'User clicked search for course dates');
        // });
      },

      /**
       * @param {HTMLElement} element Instance of component
       */
      render: function render(element) {
        const venueResults = document.querySelector('.venue-search-results');
        venueResults.parentElement.insertBefore(element, venueResults);
      },

      /**
       * @desc Add or update the distances between user entered postcode and venue postcode
       *  for all venues
       * @param {String} postcode User entered postcode
       */
      updateDistances: function updateDistances(postcode) {
        const { services, components } = RC031;
        const venues = document.querySelectorAll('.venue-search-item');
        services.getUserLatLng(postcode, (userLocationData) => {
          // Success
          const errorMsg = document.querySelector('.RC031_search__error');
          if (errorMsg) errorMsg.style.display = 'none';

          // Loop through each venue and calculate distance between that and user location
          [].forEach.call(venues, (el) => {
            const name = el.querySelector('h2 > div').innerText.trim();
            const distance = services.getDistanceBetweenLocations(
              venueLocationData[name],
              userLocationData,
            );
            const distanceMiles = Math.round(services.getMiles(distance));
            el.setAttribute('data-distance', distanceMiles);
            const distanceEl = el.querySelector('.RC031_distance');
            const distanceString = `<em>${distanceMiles}</em> miles from <em>${postcode}</em>`;
            if (distanceEl) {
              distanceEl.innerHTML = distanceString;
            } else {
              const element = document.createElement('span');
              element.classList.add('RC031_distance');
              element.innerHTML = distanceString;
              el.querySelector('p').appendChild(element);
            }
          });

          // Once all venue distances have been updated, reorder them from nearest to furthest
          components.Search.reorderVenues();
          // events.send(RC031.settings.ID, 'View', 'Venues sorted by nearest');
        }, () => {
          // Error
          // events.send(RC031.settings.ID, 'Error', 'Error occurred with user location');
          [].forEach.call(venues, (el) => {
            const distanceEl = el.querySelector('.RC031_distance');
            if (distanceEl) {
              distanceEl.parentElement.removeChild(distanceEl);
            }
          });
          const search = document.querySelector('.RC031_search');
          const errorMsg = search.querySelector('.RC031_search__error');
          if (errorMsg) {
            errorMsg.style.display = 'block';
          } else {
            const element = document.createElement('div');
            element.classList.add('RC031_search__error');
            element.innerText = 'Sorry, an error occured. We could not retrieve this location';
            search.appendChild(element);
          }
        });
      },

      /**
       * @desc Reshuffle the order of the venues sorting by nearest to furthest
       */
      reorderVenues: function reorderVenues() {
        const venues = document.querySelectorAll('.venue-search-item');
        const orderedVenues = Array.from(venues).sort((a, b) => {
          const distanceA = Number(a.getAttribute('data-distance'));
          const distanceB = Number(b.getAttribute('data-distance'));
          return distanceA - distanceB;
        });
        for (let i = 0; i < venues.length; i += 1) {
          venues[i].outerHTML = orderedVenues[i].outerHTML;
        }
      },

      init: function init() {
        const { services } = RC031;

        // Create component
        const element = this.create();

        // Bind all event handlers
        this.bindEvents(element);

        // Add distances from user postcode if availible
        const userPostcode = services.getUserPostcode();
        this.updateDistances(userPostcode);
        element.querySelector('input').value = userPostcode;
        

        // Render component on page
        this.render(element);
      },
    },
  },
};

export default RC031;
