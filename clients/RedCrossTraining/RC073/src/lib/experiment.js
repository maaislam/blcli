/**
 * RC073 - COVID Venue Messaging (100%)
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.redcrossfirstaidtraining.co.uk/where-we-train/
 * /where-we-train/aberdeen-holiday-inn-express-aberdeen-city-centre/
 * https://www.redcrossfirstaidtraining.co.uk/where-we-train/course-search
 */
import { setup, csvToArray } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  const spreadsheetUrlCsv = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS7h8AreJplLBb2pGYEaO1bT4kbgubQuGXGJ8_vJNKUhY7HgLgHplUg7ac2GHDyRdxEkGIzWACyknoz/pub?output=csv';

  window.jQuery.get(spreadsheetUrlCsv, (responseData, xhr) => {

    // Response data is csv, turn to json
    const arrData = csvToArray(responseData, ',');

    if(arrData) {
      const data = {};
      
      // Build object from csv data
      arrData.forEach((row) => {
        if(row[0] && row[1] && row[2]) {
          data[row[1]] = {
            status: row[2],
            name: row[0],
            note: row[3] || '',
          };
        }
      });

      if(data && Object.keys(data).length > 0) {

        // Write experiment code here
        const mainContainer = document.querySelector('main');

        let device = '';
        let venueStatusMsg = '';
        if (window.innerWidth > 420) {
          device = 'desktop';
          venueStatusMsg = 'Venue currently';
        } else {
          device = 'mobile';
          venueStatusMsg = 'Currently';
        }

        if (window.location.pathname === "/where-we-train/") {
          const pageTitle = document.querySelector('h1');
          const subtitle = `<div class="${shared.ID}-subtitle__wrapper" id="${shared.ID}-where-we-train">
            <div>Due to the ongoing coronavirus situation not all of our training venues will be open for training. 
            When you enter your location search criteria a list of the nearest training locations will be shown. Please check for each venue location if it is open or closed. For more information visit our <a href="/covid-19-update/">Covid-19 guidance</a> page for the latest updates on our training services</div>
          </div>`;

          pageTitle.insertAdjacentHTML('afterend', subtitle);


          const results = document.querySelectorAll('.venue-list-result');
          const openVenueEl = `<div class="${shared.ID}-venueIcon open ${device}">
            <div class="icon"></div>
            <div class="status  open">${venueStatusMsg} open</div>
          </div>`;
          const closedVenueEl = `<div class="${shared.ID}-venueIcon closed ${device}">
            <div class="icon"></div>
            <div class="status closed">${venueStatusMsg} closed</div>
          </div>`;

          for (let i = 0; i < results.length; i += 1) {
            const item = results[i];
            const url = item.querySelector('h2 a').getAttribute('href');
            for (let j = 0; j < Object.keys(data).length; j += 1) {
              const el = data[`${url}`];
              if (el) {
                if (el.status === 'open') {
                  item.querySelector('.venue-list-heading').insertAdjacentHTML('afterend', openVenueEl);
                } else {
                  item.querySelector('.venue-list-heading').insertAdjacentHTML('afterend', closedVenueEl);
                }
                break;
              }
            }
          }
          
        } else if (window.location.pathname === "/where-we-train/course-search/") {
          pollerLite(['.component.booking-table .wrapper'], () => {
            if (device === "desktop") {
              const resultsTable = document.querySelector('.component.booking-table .wrapper table');
              const headers = resultsTable.querySelectorAll('thead');
              [].forEach.call(headers, (header) => {
                const venueTitle = header.querySelectorAll('tr')[1].querySelector('h4 a');
                const url = venueTitle.getAttribute('href');
                const el = data[`${url}`];
                const status = el.status;
                header.querySelectorAll('tr')[0].insertAdjacentHTML('afterbegin', '<th style="border: none;">Status</th>');
                header.querySelectorAll('tr')[1].insertAdjacentHTML('afterbegin', `<td colspan="1" style="border: none;"><div class="${shared.ID}-icon ${status}"><span class="tooltiptext">${venueStatusMsg} ${status}</br><a href="/covid-19-update/">Covid-19 guidelines</a> </span></div></td>`);
              });
              
              const tableContent = resultsTable.querySelectorAll('tbody');
              [].forEach.call(tableContent, (content) => {
                const tableRows = content.querySelectorAll('tr');
                [].forEach.call(tableRows, (row) => {
                  row.insertAdjacentHTML('afterbegin', '<td style="border: none;"></td>');
                });
              });
            } else {
              const headers = document.querySelectorAll('.booking-table--location');
              [].forEach.call(headers, (header) => {
                const venueTitle = header.querySelector('h4');
                const url = venueTitle.querySelector('a').getAttribute('href');
                const el = data[`${url}`];
                const status = el.status;

                venueTitle.insertAdjacentHTML('afterend', `<div class="${shared.ID}-icon mobile ${status}"></div>`);
              });
            }
            
          });

        } else  {
          const heroBannerContainerClosed = `<div class="component content-page-hero" id="RC073-venue-closed">
            <div class="wrapper">
              <h1 class="hero-title">Venue Currently Closed</h1>
                <div class="RC073-subtitle__wrapper">This venue is currently closed for training courses due to the ongoing coronavirus situation. Alternatively, enter your location search details on our main <a href="/where-we-train/">where we train</a> page and look for venues with the “Open” badge.</div>
              </div>
          </div>`;

          

          const heroBannerContainerOpen = `<div class="component content-page-hero" id="RC073-venue-open">
            <div class="wrapper">
              <h1 class="hero-title">Venue Currently Open</h1>
                <div class="RC073-subtitle__wrapper">This venue is currently open for training courses. For more information on what delegates need to prepare prior to attending and during their course, visit our <a href="/covid-19-update/">Covid-19 guidance</a> page for the latest updates on our training services.</div>
              </div>
          </div>`;

          const pathname = window.location.pathname;
          for (let j = 0; j < Object.keys(data).length; j += 1) {
            const el = data[`${pathname}`];
            if (el) {
              if (el.status === 'open') {
                mainContainer.insertAdjacentHTML('afterbegin', heroBannerContainerOpen);
              } else {
                mainContainer.insertAdjacentHTML('afterbegin', heroBannerContainerClosed);
              }
              break;
            }
          }

          // -- Change Food and Drink message
          pollerLite(['.rich-text-container p'], () => {
            const paragraphs = document.querySelectorAll('.rich-text-container p');
            const foodDrinkParagraph = paragraphs[paragraphs.length - 1];
            foodDrinkParagraph.innerHTML = `<strong>Food and drink</strong></br>
            Tea and coffee facilities may not be available on-site and lunch is not provided. We recommend making your own arrangements, such as bringing a packed lunch and drinks or purchasing from local amenities, if available.`;
          });
        }
      }
    }

  });

  
};


export default activate;
