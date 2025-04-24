/**
 * UKB002 - Mobile search results
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';

const activate = () => {
    pollerLite(['.search-panel.content', '#ctl00_ctl00_txtKeyword', '#search-results .two-columns .right .result-item'], () => {
      setup();

      // Experiment code
      const searchPanelContainer = document.querySelector('.search-panel.content');
      const searchContainer = searchPanelContainer.querySelector('.container');
      const searchButtonContainer = searchPanelContainer.querySelector('.search-box.btn');
      let searchedTerm = searchPanelContainer.querySelector('#ctl00_ctl00_txtKeyword').value;
      if (searchedTerm === 'Location / event / show') {
        searchedTerm = searchPanelContainer.querySelector('#txtStartDateAlt').value;
      }
      // Get total search results
      let totalSearchResults = '';
      const resultPages = document.querySelector('.numbers .showing');
      if (resultPages) {
        let str = resultPages.innerText;
        str = str.split(" ");
        totalSearchResults = str.pop();
      } else {
        totalSearchResults = document.querySelectorAll('#search-results .two-columns .right .result-item').length;
      }
      
      let searchResultsContainer = '';
      if (totalSearchResults > 0 && totalSearchResults === 1) {
        searchResultsContainer = `<span class="UKB002-results">Matching <span>${totalSearchResults}</span> result</span>`;
      } else if (totalSearchResults > 1) {
        searchResultsContainer = `<span class="UKB002-results">Matching <span>${totalSearchResults}</span> results</span>`;
      }
      // Move Search Button in Search Panel Container
      searchContainer.insertAdjacentElement('beforeend', searchButtonContainer);
      // Add New Search Container
      if (!document.querySelector('.UKB002-container')) {
        const ukb002SearchContainer = `<div class="UKB002-container">
          <span class="title">Search results for</span>
          <div class="UKB002-searchedTerm">${searchedTerm}</div>
          <div class="search-box btn">
            ${searchResultsContainer}
            <button id="UKB002-btnSearch" type="button" class="submit">Search Again</button>
          </div>
        </div>`;
        searchPanelContainer.insertAdjacentHTML('afterbegin', ukb002SearchContainer);
      }

      // Search Again click
      const searchAgainBtn = document.querySelector('button#UKB002-btnSearch');
      searchAgainBtn.addEventListener('click', () => {
        searchContainer.classList.add('UKB002-show');
        document.querySelector('.UKB002-container').classList.add('UKB002-hide');
        // Smooth Scroll
        window.scroll({ top: 0, left: 0, behavior: 'smooth'});
      });

      // Sticky Search
      window.onscroll = function(paddingToAdd) {myFunction()};
        // Get the header
        var header = document.querySelector('.UKB002-container .search-box.btn');
        // Get the offset position of the navbar
        var sticky = header.offsetTop;
        // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
        function myFunction() {
          if (window.pageYOffset > sticky) {
            header.classList.add("UKB002-sticky");
          } else {
            header.classList.remove("UKB002-sticky");
          }
        }
    });
  };

export default activate;
