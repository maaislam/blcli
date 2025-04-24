/**
 * RC062 - Sitewide course search
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, closeLightbox } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { updateUrlParameter } from '../../../../../lib/utils';
import shared from './shared';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  // Write experiment code here

  // --- Homepage - background white
  if (window.location.pathname === "/") {
    document.body.classList.add(`${shared.ID}-homepage`);
  }

  if (window.location.pathname.indexOf('/course-search/') === -1) {
    const courseFinderEl = `<div class="${shared.ID}-course-finder-wrapper course-finder-wrapper">
      <div class="${shared.ID}-header__wrapper">
        <div class="${shared.ID}-header__title">Book a course</div>
        <div class="${shared.ID}-header__subtitle">Book a course with us today and join the thousands that train with us every year.</div>
      </div>
      <div class="course-finder-fields">
          <div class="course-finder-input course-type-input">
              <select id="productId" name="productId" type="select">
                  <option value="" disabled="" selected="">Select Course Type</option>
                      <option value="226-ct">AED with life support</option>
                      <option value="CT-AE2">Automated external defibrillators (AED)</option>
                      <option value="305-ct">Emergency first aid at work</option>
                      <option value="607-ct">Emergency paediatric first aid</option>
                      <option value="591-ct">Fire marshal training</option>
                      <option value="327-ct">First aid annual skills update</option>
                      <option value="306-ct">First aid at work</option>
                      <option value="308-ct">First aid at work (1 day a week)</option>
                      <option value="307-ct">First aid at work requalification</option>
                      <option value="382-ct">First aid for adult</option>
                      <option value="383-ct">First aid for adult (evenings)</option>
                      <option value="594-ct">First aid for appointed persons</option>
                      <option value="358-ct">First aid for baby and child</option>
                      <option value="359-ct">First aid for baby and child (evenings)</option>
                      <option value="CT-EFS">First aid for sports</option>
                      <option value="CT-BFT">First aid for teachers</option>
                      <option value="CT-MH2">Introduction to moving and handling</option>
                      <option value="713-ct">Leading a resilient team</option>
                      <option value="540-ct">Paediatric first aid</option>
                      <option value="539-ct">Paediatric first aid (2 days in 2 weeks)</option>
                      <option value="CT-SHO">Use of oxygen</option>
              </select>
          </div>
          
          
          <div class="course-finder-input location-input">
              <input id="location" name="location" type="text" placeholder="Town or Postcode" autocomplete="off" data-kwimpalastatus="alive" data-kwimpalaid="1579521405964-2" class="">
          <span style="opacity: 1; left: 1245.52px; top: 196.859px; width: 19px; min-width: 19px; height: 13px; position: absolute; background-image: url(&quot;data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTciIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNyAxMiI+IDxkZWZzPiA8cGF0aCBpZD0iYSIgZD0iTTcuOTA5IDEuNDYybDIuMTIxLjg2NHMtLjY3MS4xMy0xLjIwOS4yOTRjMCAwIC40MzcuNjM0Ljc3LjkzOC4zOTEtLjE4LjY1Ny0uMjQ4LjY1Ny0uMjQ4LS44MTEgMS42NjgtMi45NzkgMi43MDMtNC41MyAyLjcwMy0uMDkzIDAtLjQ4Mi0uMDA2LS43MjcuMDE1LS40MzUuMDIxLS41ODEuMzgtLjM3NC40NzMuMzczLjIwMSAxLjE0My42NjIuOTU4IDEuMDA5QzUuMiA4LjAwMy45OTkgMTEgLjk5OSAxMWwuNjQ4Ljg4Nkw2LjEyOSA4LjYzQzguNjAyIDYuOTQ4IDEyLjAwNiA2IDE1IDZoM1Y1aC00LjAwMWMtMS4wNTggMC0yLjA0LjEyMi0yLjQ3My0uMDItLjQwMi0uMTMzLS41MDItLjY3OS0uNDU1LTEuMDM1YTcuODcgNy44NyAwIDAgMSAuMTg3LS43MjljLjAyOC0uMDk5LjA0Ni0uMDc3LjE1NS0uMDk5LjU0LS4xMTIuNzc3LS4wOTUuODIxLS4xNi4xNDYtLjI0NS4yNTQtLjk3NC4yNTQtLjk3NEw3LjU2OS4zODlzLjIwMiAxLjAxMy4zNCAxLjA3M3oiLz4gPC9kZWZzPiA8dXNlIGZpbGw9IiNiNmI2YjYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEpIiB4bGluazpocmVmPSIjYSIvPiA8L3N2Zz4=&quot;); background-repeat: no-repeat; background-position: 0px 0px; border: none; display: inline; visibility: visible; z-index: auto;"></span></div>
      </div>
      <div class="location-search-button">
          <button type="submit" class="cta" data-text="Search" data-filter-text="Search">
            <a class="disabled" id="${shared.ID}-searchResults" href="/where-we-train/course-search/?productId=&fromdate=&todate=&location=">
              <span class="icon-menu-arrow" style="background-image: none;"><svg role="presentation" width="10" height="15" viewBox="0 0 10 15" version="1.1" xmlns="http://www.w3.org/2000/svg" focusable="false"><title>Arrow icon</title><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-281 -169)" fill="#262626"><g transform="translate(0 60)"><g transform="translate(20 91)"><path d="M259.071 20.071h9v2h-8v8h-2v-10h1z" transform="rotate(135 263.071 25.071)"></path></g></g></g></g></svg></span><span>Check Availability</span>
            </a>
          </button>
      </div>
      <div class="${shared.ID}-header__error disable">*Both fields are required to check for course availability</div>
    </div>`;

    let redirectUrl = '';
    pollerLite(['.site-header'], () => {
      document.querySelector('.site-header').insertAdjacentHTML('afterend', courseFinderEl);

      var courseSelect = document.querySelector('select#productId');
      courseSelect.addEventListener('change', (e) => {
        const courseSelectedText = courseSelect.options[courseSelect.selectedIndex].innerText;
        const courseSelectedValue = courseSelect.options[courseSelect.selectedIndex].value;
        redirectUrl = document.querySelector(`a#${shared.ID}-searchResults`).getAttribute('href');
        redirectUrl = updateUrlParameter(redirectUrl, 'productId', courseSelectedValue);
        document.querySelector(`a#${shared.ID}-searchResults`).setAttribute('href', redirectUrl);
      });

      const locationInput = document.querySelector('input#location');
      locationInput.addEventListener('input', (e) => {
        redirectUrl = document.querySelector(`a#${shared.ID}-searchResults`).getAttribute('href');
        redirectUrl = updateUrlParameter(redirectUrl, 'location', locationInput.value);
        document.querySelector(`a#${shared.ID}-searchResults`).setAttribute('href', redirectUrl);
      });



      // --- Check Availability
      const searchCTA = document.querySelector('.location-search-button');
      searchCTA.addEventListener('click', (e) => {
        const courseSelection = document.querySelector(`.${shared.ID}-course-finder-wrapper select#productId`).selectedIndex;
        const locationToSearch = document.querySelector(`.${shared.ID}-course-finder-wrapper input#location`).value;

        if (courseSelection !== 0 && locationToSearch !== "") {
          searchCTA.querySelector('a').classList.remove('disable');
          searchCTA.querySelector('a').click();
        } else {
          document.querySelector(`.${shared.ID}-header__error`).classList.remove('disable');
          document.querySelector(`.${shared.ID}-course-finder-wrapper select#productId`).classList.add('error');
          document.querySelector(`.${shared.ID}-course-finder-wrapper input#location`).classList.add('error');

          setTimeout(() => {
            document.querySelector(`.${shared.ID}-header__error`).classList.add('disable');
          document.querySelector(`.${shared.ID}-course-finder-wrapper select#productId`).classList.remove('error');
          document.querySelector(`.${shared.ID}-course-finder-wrapper input#location`).classList.remove('error');
          }, 3000);
        }
      });
    });

  } else {
    /**
     * COURSE SEARCH PAGE
     */
    // --- New Search
    const newMessageBubble = `<div class="${shared.ID}-speech-bubble">
      <span class="${shared.ID}-speech-bubble__text">Further refine your results here</span>
      <span class="${shared.ID}-speech-bubble__close"></span>
    </div>`;
    if (!document.querySelector(`.${shared.ID}-speech-bubble`)) {
      document.querySelector('form#form-course-finder').insertAdjacentHTML('beforeend', newMessageBubble);

      const bubbleEl = document.querySelector(`.${shared.ID}-speech-bubble`); 
      closeLightbox(bubbleEl);

      // -- Hide Bubble after 5 seconds
      setTimeout(() => {
        bubbleEl.classList.add('hide');
      }, 5000);
      
    }
    
    pollerLite(['.component.venue-list h2 p'], () => {

      // ---- Error Message
      const searchResultsMsg = document.querySelector('.component.venue-list h2 p').innerText;
      if (searchResultsMsg.indexOf('30 mile radius') > -1) {
        document.querySelector('input#location').classList.add(`${shared.ID}-highlight`);

        const searchCTA = document.querySelector('.location-search-button');
        searchCTA.insertAdjacentHTML('beforeend', `<div class="${shared.ID}-message">*Please try again using a new location</div>`);
      }
    });
  }
};
