/**
 * BO110 - PDP Reviews - Helpful v filter
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.boots.com/max-factor-divine-lashes-black-10289681
 */

import { cookieOpt, setup, fireEvent, clickRatingFilter, expClickEvents } from './services';
import { pollerLite } from '../../../../../lib/uc-lib';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
    Experiment code 
    ------------------ */
  if (VARIATION == 'control') {
    fireEvent(`Conditions Met - Control fired`);
  } else if (VARIATION == '1') {
    fireEvent(`Conditions Met - V1 fired`);
    document.querySelector('button.bv-content-btn.bv-filter-control.bv-expand-filter-button.bv-focusable').click();
    /**
     * @desc DESKTOP
     * --- Rating Filter Button
     */
    pollerLite(['.bv-dropdown[data-bv-filter-for="Rating"] button'], () => {
      const filterRatingBtn = document.querySelector('.bv-dropdown[data-bv-filter-for="Rating"] button');
      filterRatingBtn.click();

      // --- Add New Filter Rating Container
      const newFilterRatingContainer = `<div class="${ID}-filterRating__wrapper">
        <h3>Review Snapshot</h3>
        <ul class="${ID}-filter-options" style="margin: 5px 0 !important;"></ul>
        <span class="subtext">Select a row above to filter reviews</span>
      </div>`;

      if (!document.querySelector(`.${ID}-filterRating__wrapper`)) {
        document.querySelector('#BVRRContainer .bv-action-bar').insertAdjacentHTML('afterend', newFilterRatingContainer);

        pollerLite(['.bv-control-bar.bv-control-bar-filter-offset'], () => {
          document.querySelector('.bv-control-bar.bv-control-bar-filter-offset').setAttribute('style', 'margin-bottom: 0 !important;');
        });
      }

      pollerLite(['ul#bv-content-filter-dropdown-Rating li.bv-dropdown-item'], () => {
        const allStarOptions = document.querySelectorAll('ul#bv-content-filter-dropdown-Rating li.bv-dropdown-item');

        [].forEach.call(allStarOptions, (option) => {
          let numOfStars = '';
          let filterBy = '';

          switch(option.querySelector('span').innerText.trim()) {
            case '1 star':
              numOfStars = `<abbr title="1 out of 5 stars." class="bv-rating-max bv-rating-stars bv-rating-stars-on bv-width-from-rating-stats-100" aria-hidden="true"> ★ </abbr>`;
              filterBy = '1 star';
              break;
            case '2 stars':
              numOfStars = `<abbr title="2 out of 5 stars." class="bv-rating-max bv-rating-stars bv-rating-stars-on bv-width-from-rating-stats-100" aria-hidden="true"> ★★</abbr>`;
              filterBy = '2 stars';
              break;
            case '3 stars':
              numOfStars = `<abbr title="3 out of 5 stars." class="bv-rating-max bv-rating-stars bv-rating-stars-on bv-width-from-rating-stats-100" aria-hidden="true"> ★★★ </abbr>`;
              filterBy = '3 stars';
              break;
            case '4 stars':
              numOfStars = `<abbr title="4 out of 5 stars." class="bv-rating-max bv-rating-stars bv-rating-stars-on bv-width-from-rating-stats-100" aria-hidden="true"> ★★★★ </abbr>`;
              filterBy = '4 stars';
              break;
            case '5 stars':
              numOfStars = `<abbr title="5 out of 5 stars." class="bv-rating-max bv-rating-stars bv-rating-stars-on bv-width-from-rating-stats-100" aria-hidden="true"> ★★★★★ </abbr>`;
              filterBy = '5 stars';
              break;
          }

          let starFilter = `<li class="${ID}-star-filter" data-filter-by="${filterBy}">
            <span class="bv-rating-stars-container">
              <abbr title="5 out of 5 stars." class="bv-rating bv-rating-stars bv-rating-stars-off" aria-hidden="true"> ★★★★★ </abbr>
              ${numOfStars}
            </span>
          </li>`;
          document.querySelector(`.${ID}-filterRating__wrapper ul.${ID}-filter-options`).insertAdjacentHTML('afterbegin', starFilter);
        });

        clickRatingFilter();
        expClickEvents();
      });
      
    });

    /**
     * @desc MOBILE
     * --- Rating Filter Button
     */
    pollerLite(['select.bv-content-filter-select-element.bv-dropdown[data-bv-filter-for="Rating"]'], () => {
      const filterRatingBtn = document.querySelector('select.bv-content-filter-select-element.bv-dropdown[data-bv-filter-for="Rating"]');
      filterRatingBtn.click();

      // --- Add New Filter Rating Container
      const newFilterRatingContainer = `<div class="${ID}-filterRating__wrapper">
        <h3>Review Snapshot</h3>
        <ul class="${ID}-filter-options"></ul>
        <span class="subtext">Select a row above to filter reviews</span>
      </div>`;

      if (!document.querySelector(`.${ID}-filterRating__wrapper`)) {
        document.querySelector('#BVRRContainer .bv-action-bar').insertAdjacentHTML('afterend', newFilterRatingContainer);
      }
      

      pollerLite(['select.bv-content-filter-select-element.bv-dropdown[data-bv-filter-for="Rating"] option'], () => {
        const allStarOptions = document.querySelectorAll('select.bv-content-filter-select-element.bv-dropdown[data-bv-filter-for="Rating"] option');
        [].forEach.call(allStarOptions, (option) => {
          let numOfStars = '';
          let filterBy = '';

          switch(option.textContent.trim()) {
            case '1 star':
              numOfStars = `<abbr title="1 out of 5 stars." class="bv-rating-max bv-rating-stars bv-rating-stars-on bv-width-from-rating-stats-100" aria-hidden="true"> ★ </abbr>`;
              filterBy = '1 star';
              break;
            case '2 stars':
              numOfStars = `<abbr title="2 out of 5 stars." class="bv-rating-max bv-rating-stars bv-rating-stars-on bv-width-from-rating-stats-100" aria-hidden="true"> ★★</abbr>`;
              filterBy = '2 stars';
              break;
            case '3 stars':
              numOfStars = `<abbr title="3 out of 5 stars." class="bv-rating-max bv-rating-stars bv-rating-stars-on bv-width-from-rating-stats-100" aria-hidden="true"> ★★★ </abbr>`;
              filterBy = '3 stars';
              break;
            case '4 stars':
              numOfStars = `<abbr title="4 out of 5 stars." class="bv-rating-max bv-rating-stars bv-rating-stars-on bv-width-from-rating-stats-100" aria-hidden="true"> ★★★★ </abbr>`;
              filterBy = '4 stars';
              break;
            case '5 stars':
              numOfStars = `<abbr title="5 out of 5 stars." class="bv-rating-max bv-rating-stars bv-rating-stars-on bv-width-from-rating-stats-100" aria-hidden="true"> ★★★★★ </abbr>`;
              filterBy = '5 stars';
              break;
          }

          if (numOfStars !== '') {
            let starFilter = `<li class="${ID}-star-filter" data-filter-by="${filterBy}">
              <span class="bv-rating-stars-container">
                <abbr title="5 out of 5 stars." class="bv-rating bv-rating-stars bv-rating-stars-off" aria-hidden="true"> ★★★★★ </abbr>
                ${numOfStars}
              </span>
            </li>`;
            document.querySelector(`.${ID}-filterRating__wrapper ul.${ID}-filter-options`).insertAdjacentHTML('afterbegin', starFilter);
          }
          
        });

        clickRatingFilter();
        expClickEvents();
      });
      
    });

  }

};
