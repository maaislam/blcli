import { fullStory, events } from '../../../../lib/utils';
import RC031 from './lib/RC031';
import { pollerLite, observer } from '../../../../lib/uc-lib';


/**
 * {{RC046}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'RC046',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    RC031.init();

    pollerLite(['.RC031_distance', '.RC031_row', '.RC031_venueInner p'], () => {
      const { settings, services, components } = Experiment;
      services.tracking();
      document.body.classList.add(settings.ID);
      
      const mainContentWrap = document.querySelector('.main-content-wrap');
      const mapRowElement = document.querySelector('.RC031_row');

      mainContentWrap.insertAdjacentElement('beforeend', mapRowElement);

      // Append 'See more venues' before map container
      const mainContent = mainContentWrap.querySelector('.main-content');
      const seeMoreContent = `<div class='RC046-seeMoreWrapper'>
        <div id='RC046-seeMoreContainer'>
          <div class='RC046-seeMore'>See more venues</div>
        </div>
      </div>`;
      mainContent.insertAdjacentHTML('afterend', seeMoreContent);

      /**
       * @desc Makes a GET request to a category URL and retrieves the venue details
       * @param {String} url URL to retrieve the venue information from
       * @param {Function} callback Function to run when the request was successful
       */
      /*eslint-disable */
      const getVenueDetails = (url, callback) => {
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            const temp = document.createElement('html');
            temp.innerHTML = request.responseText;
            // const pageTitle = temp.querySelector('.venue-summary-info > p').innerText;
            const noSearchResults = temp.querySelector('.venues-search__no-results');
            let venueDetails = [];
            if (!noSearchResults) {
              const tableRows = temp.querySelectorAll('.course-search-results table tbody tr');
              let courseDetails;
              for (let i = 0; i < 6; i += 1) {
                if (!tableRows[i]) {
                  break;
                }
                const courseTitle = tableRows[i].querySelector('.course-result-name');
                const courseDate = tableRows[i].querySelector('.course-col-date');
                if (courseTitle && courseDate) {
                  const courseTitleText = courseTitle.querySelector(`span[id*='_Label_CourseName']`).innerText.trim();
                  let courseDateText = courseDate.innerText.trim();
                  courseDateText = courseDateText.replace(/(?:\r\n|\r|\n)/g, '');
                  courseDetails = {
                    'title': courseTitleText,
                    'date': courseDateText,
                  };
                  venueDetails.push(courseDetails);
                }
              }
            }
            callback(venueDetails);
          }
        };
        request.send();
      };
      
      let allVenues;
      let ctaBtn;
      let href;
      let venueCount = 0;
      allVenues = document.querySelectorAll('.venue-search-item');
      [].forEach.call(allVenues, (venue) => { // eslint-disable-line prefer-destructuring
        const venueName = venue.querySelector('h2 > div').innerText.trim();
        href = venue.querySelector('.RC031_venueInner').href; // eslint-disable-line prefer-destructuring
        venue.querySelector('.RC031_venueInner').removeAttribute('href');
        const distanceEl = venue.querySelector('.RC031_distance');
        const distance = distanceEl.outerHTML;
        const addressEl = venue.querySelector('p');
        const newDistanceContainer = `<div class='RC046-distance'>(${distance})</div>`;
        addressEl.insertAdjacentHTML('beforebegin', newDistanceContainer); // eslint-disable-line quotes
        addressEl.insertAdjacentHTML('afterbegin', `<strong>Address:</strong>`); // eslint-disable-line quotes
        
        // Add 'More Venue Information' link
        addressEl.insertAdjacentHTML('beforeend', `<a class='RC046-moreInfo__link 'href=${href}>More venue information</a>`);
        const moreInfoLink = venue.querySelector('.RC046-moreInfo__link ');
        moreInfoLink.addEventListener('click', () => {
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - More Info Link: ${venueName}`, { sendOnce: true });
        });
        // Change Text in CTA button
        ctaBtn = venue.querySelector('.RC031_venueCta');
        ctaBtn.innerText = 'See more dates or book now';
        ctaBtn.addEventListener('click', () => {
          window.location.href = `${href}`;
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - See more dates or book now: ${venueName}`, { sendOnce: true });
        });

        // Gets the 5 first available courses for each venue
        if (venueCount < 4) {
          // Adds Loader
          const loaderContent = `<div class='RC046-courseLoaderWrapper'><div class='RC046-loader'></div></div>`;
          ctaBtn.insertAdjacentHTML('beforebegin', loaderContent);
          const loader = venue.querySelector('.RC046-courseLoaderWrapper');
          
          getVenueDetails(`${href}`, (venueDetails) => {
            components.createVenueContent(venueDetails, loader, ctaBtn);
          });
        }
        // Event Listener for Table Tabs
        services.tabsEventListener(venue, href, getVenueDetails);

        venueCount += 1;
      });

      // See More Venues
      components.openMoreVenues();

      // Sort By Distance
      const sortByDistance = document.querySelector('.RC031_search__submit');
      sortByDistance.addEventListener('click', (e) => {
        services.removeTables();
        // GA Tracking
        if (sortByDistance) {
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - Sort By Distance`, { sendOnce: true });
        }
        // pollerLite(['.venue-search-row', '.venue-search-item'], () => {
        //   const venues = document.querySelectorAll('.venue-search-item');
        //   venueCount = 0;
        //   [].forEach.call(venues, (venue) => {
        //     if (venueCount < 4) {
        //       // venue.style.backgroundColor = 'lightcoral';
        //       href = venue.querySelector('.RC046-moreInfo__link').href; // eslint-disable-line prefer-destructuring
        //       ctaBtn = venue.querySelector('.RC031_venueCta');
        //       // Adds Loader
        //       // const loaderContent = `<div class='RC046-courseLoaderWrapper'><div class='RC046-loader'></div></div>`;
        //       // ctaBtn.insertAdjacentHTML('beforebegin', loaderContent);
        //       // const loader = venue.querySelector('.RC046-courseLoaderWrapper');
              
        //       getVenueDetails(`${href}`, (venueDetails) => {
        //         components.createVenueContent(venueDetails, loader, ctaBtn);
        //       });
        //     }
        //     venueCount += 1;
        //   });
        // });
      });

      // Observe any changes on the venues
      components.observerVenueRows(getVenueDetails);

      /* eslint-enable */
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    /**
     * @desc Removes All Tables
     */
    removeTables() {
      const tables = document.querySelectorAll('.RC046-venueTable');
      [].forEach.call(tables, (table) => {
        table.parentNode.removeChild(table);
      });
    },
    /**
     * @desc Event Listener for table tabs
     */
    tabsEventListener(venue, href, getVenueDetails) {
      venue.addEventListener('click', (e) => {
        // PUBLIC TAB CLICKED
        if (e.target.classList.contains('RC046-publicTab')) {
          const currentEl = e.currentTarget;
          getVenueDetails(`${href}?type=General%20Public#title_over_venue_search`, (venueDetails) => {
            // console.log('VENUE DETAILS:');
            // console.log(venueDetails);
            if (venueDetails !== undefined && venueDetails.length !== 0) {
              // Array exists and is not empty
              // Populate table tab
              let tableRows = `<tr class='RC046-venueTable__row tableHeading'><th class='RC046-venueTable__item RC046-workplaceTab hiddenContent'>Workplace</th><th class='RC046-venueTable__item RC046-publicTab'>Public</th></tr>`; // eslint-disable-line quotes
              for (let i = 0; i < venueDetails.length; i += 1) {
                const title = venueDetails[i].title; // eslint-disable-line prefer-destructuring
                const date = venueDetails[i].date; // eslint-disable-line prefer-destructuring
                tableRows += `<tr class='RC046-venueTable__row'>
                  <td class='RC046-venueTable__item courseItem'>${title}</td>
                  <td class='RC046-venueTable__item courseItem'>${date}</td>
                </tr>`;
              }
              if (tableRows) {
                const venueTable = `<table class='RC046-venueTable'>
                  <tbody>${tableRows}</tbody>
                </table>`;
                // ctaBtn.insertAdjacentHTML('beforebegin', venueTable);
                pollerLite(['table.RC046-venueTable'], () => {
                  currentEl.querySelector('table.RC046-venueTable').outerHTML = venueTable;
                });
              }
              /**
               * @desc Request Returned empty array
               */
            } else {
              const tableHeader = `<tr class='RC046-venueTable__row tableHeading'><th class='RC046-venueTable__item RC046-venueTable__item RC046-workplaceTab hiddenContent'>Workplace</th><th class='RC046-venueTable__item RC046-publicTab'>Public</th></tr>`; // eslint-disable-line quotes
              const emptyContent = `<tr class='RC046-venueTable__row emptyContent'><td colspan='2' class='RC046-venueTable__item emptyContentMessage' style='color:#E72C38;'>There are currently no courses scheduled at this venue.</td></tr>`; // eslint-disable-line quotes
              if (tableHeader) {
                const venueTable = `<table class='RC046-venueTable'>
                  <tbody>${tableHeader} ${emptyContent}</tbody>
                </table>`;
                pollerLite(['table.RC046-venueTable'], () => {
                  currentEl.querySelector('table.RC046-venueTable').outerHTML = venueTable;
                });
                // ctaBtn.insertAdjacentHTML('beforebegin', venueTable);
              }
            }
          });
          // WORKPLACE TAB CLICKED
        } else if (e.target.classList.contains('RC046-workplaceTab')) {
          const currentEl = e.currentTarget;
          getVenueDetails(`${href}`, (venueDetails) => {
            if (venueDetails !== undefined && venueDetails.length !== 0) {
              // Array exists and is not empty
              // Populate table tab
              let tableRows = `<tr class='RC046-venueTable__row tableHeading'><th class='RC046-venueTable__item RC046-workplaceTab'>Workplace</th><th class='RC046-venueTable__item RC046-publicTab hiddenContent'>Public</th></tr>`; // eslint-disable-line quotes
              for (let i = 0; i < venueDetails.length; i += 1) {
                const title = venueDetails[i].title; // eslint-disable-line prefer-destructuring
                const date = venueDetails[i].date; // eslint-disable-line prefer-destructuring
                tableRows += `<tr class='RC046-venueTable__row'>
                  <td class='RC046-venueTable__item courseItem'>${title}</td>
                  <td class='RC046-venueTable__item courseItem'>${date}</td>
                </tr>`;
              }
              if (tableRows) {
                const venueTable = `<table class='RC046-venueTable'>
                  <tbody>${tableRows}</tbody>
                </table>`;
                // ctaBtn.insertAdjacentHTML('beforebegin', venueTable);
                pollerLite(['table.RC046-venueTable'], () => {
                  currentEl.querySelector('table.RC046-venueTable').outerHTML = venueTable;
                });
              }
              /**
               * @desc Request Returned empty array
               */
            } else {
              const tableHeader = `<tr class='RC046-venueTable__row tableHeading'><th class='RC046-venueTable__item RC046-venueTable__item RC046-workplaceTab'>Workplace</th><th class='RC046-venueTable__item RC046-publicTab hiddenContent'>Public</th></tr>`; // eslint-disable-line quotes
              const emptyContent = `<tr class='RC046-venueTable__row emptyContent'><td colspan='2' class='RC046-venueTable__item emptyContentMessage' style='color:#E72C38;'>There are currently no courses scheduled at this venue.</td></tr>`; // eslint-disable-line quotes
              if (tableHeader) {
                const venueTable = `<table class='RC046-venueTable'>
                  <tbody>${tableHeader} ${emptyContent}</tbody>
                </table>`;
                pollerLite(['table.RC046-venueTable'], () => {
                  currentEl.querySelector('table.RC046-venueTable').outerHTML = venueTable;
                });
                // ctaBtn.insertAdjacentHTML('beforebegin', venueTable);
              }
            }
          });
        }
      });
    },
  },

  components: {
    /**
     * @desc Creates content inside each venue
     */
    createVenueContent(venueDetails, loader, ctaBtn) {
      if (venueDetails !== undefined && venueDetails.length !== 0) {
        // Array exists and is not empty
        let tableRows = `<tr class='RC046-venueTable__row tableHeading'><th class='RC046-venueTable__item RC046-workplaceTab'>Workplace</th><th class='RC046-venueTable__item RC046-publicTab hiddenContent'>Public</th></tr>`; // eslint-disable-line quotes
        for (let i = 0; i < venueDetails.length; i += 1) {
          const title = venueDetails[i].title; // eslint-disable-line prefer-destructuring
          const date = venueDetails[i].date; // eslint-disable-line prefer-destructuring
          tableRows += `<tr class='RC046-venueTable__row'>
            <th class='RC046-venueTable__item courseItem'>${title}</th>
            <th class='RC046-venueTable__item courseItem'>${date}</th>
          </tr>`;
        }
        if (tableRows) {
          const venueTable = `<table class='RC046-venueTable'>
            <tbody>${tableRows}</tbody>
          </table>`;
          // ctaBtn.insertAdjacentHTML('beforebegin', venueTable);
          if (loader) {
            loader.outerHTML = venueTable; // eslint-disable-line no-param-reassign
          }
        }
      } else if (venueDetails.length === 0) {
        const tableHeader = `<tr class='RC046-venueTable__row tableHeading'><th class='RC046-venueTable__item RC046-workplaceTab'>Workplace</th><th class='RC046-venueTable__item RC046-publicTab hiddenContent'>Public</th></tr>`; // eslint-disable-line quotes
        const emptyContent = `<tr class='RC046-venueTable__row emptyContent'><td colspan='2' class='RC046-venueTable__item emptyContentMessage' style='color:#E72C38;'>There are currently no courses scheduled at this venue.</td></tr>`; // eslint-disable-line quotes
        if (tableHeader && emptyContent) {
          const venueTable = `<table class='RC046-venueTable'>
            <tbody>${tableHeader} ${emptyContent}</tbody>
          </table>`;
          // ctaBtn.insertAdjacentHTML('beforebegin', venueTable);
          if (loader) {
            loader.outerHTML = venueTable; // eslint-disable-line no-param-reassign
          }
        }
      }
    },
    /**
     * @desc Observes Venue Items on each row
     * If something changes, it rearranges the elements inside each venue item
     */
    observerVenueRows(getVenueDetails) {
      const { services } = Experiment;
      pollerLite(['.venue-search-row', '.venue-search-item', 'table.RC046-venueTable', '.RC046-distance'], () => {
        const venueRows = document.querySelectorAll('.venue-search-row');
        [].forEach.call(venueRows, (row) => {
          observer.connect(row, () => {
            const venuesInRow = row.querySelectorAll('.venue-search-item');
            [].forEach.call(venuesInRow, (venue) => {
              const distanceEl = venue.querySelector('.RC046-distance');
              const addressEl = venue.querySelector('p');
              const insideAddressEl = addressEl.querySelector('.RC031_venueInner');
              insideAddressEl.outerHTML = insideAddressEl.innerHTML;
              let tableEl;
              if (venue.querySelector('table.RC046-venueTable')) {
                tableEl = venue.querySelector('table.RC046-venueTable');
              }
              const ctaBtnEl = venue.querySelector('.RC031_venueCta');

              distanceEl.insertAdjacentElement('afterend', ctaBtnEl);
              if (tableEl) {
                distanceEl.insertAdjacentElement('afterend', tableEl);
              }
              distanceEl.insertAdjacentElement('afterend', addressEl);

              const href = venue.querySelector('.RC046-moreInfo__link').href; // eslint-disable-line prefer-destructuring
              // Re-add event listeners
              services.tabsEventListener(venue, href, getVenueDetails);
            });
          }, {
            throttle: 200,
            config: {
              attributes: false,
              childList: true,
            },
          });
        });
      });
    },
    /**
     * @desc Shows more available venues
     */
    openMoreVenues() {
      const seeMore = document.querySelector('#RC046-seeMoreContainer');
      const venueRows = document.querySelectorAll('.venue-search-row');
      seeMore.addEventListener('click', () => {
        [].forEach.call(venueRows, (row) => {
          row.style.display = 'flex'; // eslint-disable-line no-param-reassign
        });
        seeMore.style.display = 'none';
      });
    },
  },
};

export default Experiment;
