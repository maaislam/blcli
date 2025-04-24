/**
 * NH071 - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { getUrlParameter, getCookie, deleteCookie } from '../../../../../lib/utils';
import shared from './shared';
import { createLoader, hideLoader, showLoader } from './components/loader';
import NoResultsMarkup from './components/markup';
import excludeWords from './components/exclusionWords';

/**
 * Push an item to the datalayer
 */
const dataLayerPush = (actionString) => {
  let variant = `${shared.ID}-v${shared.VARIATION}`;

  if(shared.VARIATION == 'control') {
    variant = `${shared.ID}-control`;
  }

  window.dataLayer.push({
    event: `${shared.ID}`,
    variant: variant,
    action: actionString
  });
};

export default () => {
  setup();

  const { ID } = shared;

  // url Parameters
  const location = getUrlParameter('t3p');
  const fromDate = getUrlParameter('min');
  const toDate = getUrlParameter('max');
  const region = getUrlParameter('rg');

  /**
   * Did we get a no results page?
   */
  function checkIfZeroResults() {
    const noResults = document.querySelector('.content.search-content .container h1');
    if(noResults && noResults.textContent.match('no results were found')) {
      return true;
    }
  }

  /**
   * Show results wrapper
   */
  function showResultsWrapper() {
    const wrapper = document.querySelector(`.${ID}_noResultsWrapper`);
    if(wrapper) {
      wrapper.classList.remove(`${ID}_noResultsWrapper--hidden`);
    }
  }

  /**
   * @desc on the search results, check if there is a region, if not hide quick view etc 
   **/ 
  function removeElementsOnSearch () {
    const getCurrentURL = window.location.href;
    if(!location) {
      document.body.classList.add(`${ID}-results_show`);
    }
  }

  /**
   * + encoded urls
   */
  function simpleEncodeUrlTerm(term) {
    return encodeURIComponent(term).replace(/%20/g, '+');
  }

  /**
   * Strip non alphabetic chars
   */
  function stripNonAlphabetChars(str) {
    return str.replace(/[^A-Z\s]/ig, '').replace(/\s{2,}/, ' ');
  }

  /**
   * Return first n words of string
   */
  function getFirstTwoWords(str) {
    const m = str.match(/^([^\s]+\s+[^\s]+)/g);
    if(!m) {
      return str;
    }

    return m;
  }

  /**
   * @desc AJAX request the new urls based on the search terms 
   */ 
  function querySearchSingleTerm(term) {
    
    // if we want to include the location & region
    const showLocation = true;
    const showRegion = true;

    // create the new URL
    let searchURL = '/search-results?';
    let pieces = [];

    if(showLocation) {
      pieces.push(`t3p=${location}`);
    }
    if(showRegion) {
      pieces.push(`rg=${region}`);
    }

    pieces.push(`s=${term}`);
    pieces.push(`min=${fromDate}`);
    pieces.push(`max=${toDate}`);
    searchURL += pieces.join('&');

    
    return new Promise((res, rej) => {
      const request = new XMLHttpRequest();
      request.open('GET', searchURL, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const temp = document.createElement('html');
          temp.innerHTML = request.responseText;
          const items = temp.querySelectorAll('.result-item');

          let numOfResults;
          // if the number of results exists, or just put 10
          if(temp.querySelector('.numbers .showing')) {
            numOfResults = parseFloat(temp.querySelector('.numbers .showing').textContent.match(/(\d+)(?!.*\d)/));
          } else {
            numOfResults = items.length;
          }

          const result = {
            term: term,
            numResults: numOfResults,
            link: searchURL
          };
          res(result);
        }
      };
      request.send();
    });

  }
  
  /**
   * @desc AJAX request using the ex search
   */ 
  function queryTermIntelligenceApi(term) {
    let url = shared.TERMSUGGEST_URL + '?term=' + term;

    return new Promise((res, rej) => {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const json = request.responseText;
          if(json) {
            const results = JSON.parse(json);

            res(results);
          }
          res(null);
        }
      };
      request.send();
    });
  }

  // override the existing departure cookie
  function removeDepartureCookie() {

    return new Promise(function(res, ref) {
      $.ajax({
        url: '/WebServices/JSONServices.asmx/SetRegionCookie',
        type: "POST",
        dataType: "json",
        data: '{"postcode":"","departureRegionId":"","departurePointId":"","multiPointCsv":""}',
        contentType: "application/json",
        success: function () {
          res();
        }
     });
    });
  }

  /* remove cookie and create the new URL */
  function newURLwithoutRegion () {
    // create the url to search
    const searchTerm = document.querySelector(`.${ID}-searchAgain input`);

    if(searchTerm.value !== '') {
       const newSearchURL = constructUrl(searchTerm.value, fromDate, shared.FUTURE_DATE);

       window.location.href = newSearchURL;
    } else {
      searchTerm.classList.add(`${ID}-search_error`);
    }
  }


  /**
   * create the URL to search all holidays in the region
   */
  function searchAllHolidaysInRegion () {
    const newSearchURL = constructUrl('', fromDate, shared.FUTURE_DATE, location, region);

    window.location.href = newSearchURL;
  }

  /**
   * If there are still no results after all the checks, show the last markup
   */
  function noResultsAtAll () {

    const noResultsToShow = document.querySelector(`.${ID}-viewAllResults`);
    noResultsToShow.style.display = 'block';

    const closestMatch = document.querySelector(`.${ID}-closestMatch`);
    if(closestMatch) {
      closestMatch.style.display = 'none';
    }

    // change the text of the search box
    const searchAgainText = document.querySelector(`.${ID}-searchAgain`);
    searchAgainText.querySelector('h3').textContent = "We couldn't find any results for your search";

    const searchAgainInnertext = document.createElement('p');
    searchAgainInnertext.classList.add(`${ID}-force-show`);
    searchAgainInnertext.innerHTML = 'Try searching again, but just use key words e.g. rather than "Les Miserables All Star Concert", just search "Les Miserable"';
    searchAgainText.querySelector('h3').insertAdjacentElement('afterend', searchAgainInnertext);
  }

  /**
   * Check if all divs are hidden
   */
  function areAllDivsHidden() {
    const resultDivHidden = document.querySelectorAll(`.${ID}-resultDiv--hidden`);
    if(resultDivHidden.length == 3) {
      return true;
    }

    return false;
  }

  /**
   * Construct a search URL
   */
  function constructUrl(s, fromDate, toDate, location, region) {
    let newSearchURL = '/search-results?';
    let newSearchPieces = [];

    newSearchPieces.push(`s=${s}`);
    newSearchPieces.push(`min=${fromDate}`);
    newSearchPieces.push(`max=${toDate}`);

    if(location) {
      newSearchPieces.push(`t3p=${location}`);
    }

    if(region) {
      newSearchPieces.push(`rg=${region}`);
    }

    newSearchURL += newSearchPieces.join('&');

    return newSearchURL;
  }

  // ========================================
  // Handle 0 results
  // ========================================
  if(checkIfZeroResults()) {
    document.body.classList.add('zero-results');

    dataLayerPush('did-get-zero-results');

    if(shared.VARIATION == 'control') {
      return;
    }

    // ========================================
    // Create loader on page load
    // ========================================
    createLoader();

    // ========================================
    // Show loader
    // ========================================
    showLoader();

    // ========================================
    // Add the markup - divs will be hidden based on results available
    // ========================================
    const templateMarkup = new NoResultsMarkup();

    // ========================================
    // New search box without departure point
    // ========================================
    const newSearchArea = document.querySelector(`.${ID}-searchAgain`);
    if(newSearchArea) {
      const searchButton = document.querySelector(`.${ID}-search_again_button`);
      searchButton.addEventListener('click', () => {
        removeDepartureCookie().then(newURLwithoutRegion);
      });

      const input = newSearchArea.querySelector(`input[type=text]`); 
      if(input) {
        input.addEventListener('keydown', (event) => {
          if (event.which == 13 || event.keyCode == 13) {
            removeDepartureCookie().then(newURLwithoutRegion);
          }
        });
      }
    }

    // ========================================
    // Handle show all holidays 
    // ========================================
    const allHolidaysButton = document.querySelector(`.${ID}-allDepartures`);
    if(allHolidaysButton) {
      allHolidaysButton.addEventListener('click', (e) => {
        e.preventDefault();

        searchAllHolidaysInRegion();
      });
    }

    // ========================================
    // Grab search parameter
    // ========================================
    const searchTerms = getUrlParameter('s');
    
    // ========================================
    // Query our own Term API first
    // ========================================
    const termApi = queryTermIntelligenceApi(searchTerms);
    termApi.then((termResults) => {
      // ========================================
      // Handle term results
      // ========================================
      if(termResults.misspellings && Object.keys(termResults.misspellings).length) {
        // ========================================
        // MISSPELLINGS
        // ========================================
        const didYouMeanLinks = document.querySelector(`.${ID}-didYouMean .${ID}-term_links`);
        if(didYouMeanLinks) {
          let promises = [];
          Object.keys(termResults.misspellings).forEach((term, idx) => {
            if(idx >= 1) {
              return;
            }

            Object.keys(termResults.misspellings[term]).forEach((t, idx) => {
              if(idx >= 3) {
                return;
              }

              const resultTerm = termResults.misspellings[term][t];
              if(resultTerm.toLowerCase() != term.toLowerCase()) {
                // Query against site to see if ay exist
                let func = querySearchSingleTerm(resultTerm);
                promises.push(func);
              }
            });

            if(promises.length) {
              Promise.all(promises).then((values) => {
                let numWithResults = 0;

                Object.keys(values).forEach((i) => {
                  const resultsData = values[i];
                  
                  // if some results found
                  if(resultsData.numResults !== 0) {
                    numWithResults++;

                    didYouMeanLinks.insertAdjacentHTML('beforeend', `
                      <div class="${ID}-suggestion" data-term="${resultsData.term}">
                        <a href="">
                          ${resultsData.term} (${resultsData.numResults})
                        </a>
                      </div>
                    `);
                  }
                });

                if(numWithResults > 0) {
                  document.querySelector(`.${ID}-didYouMean`).classList.remove(`${ID}-resultDiv--hidden`);
                  if(areAllDivsHidden()) {
                    noResultsAtAll();
                  }

                  dataLayerPush('did-show-spelling-suggestions');

                  // ========================================
                  // Handle did-you-mean suggestions
                  // ========================================
                  [].forEach.call(document.querySelectorAll(`.${ID}-didYouMean .${ID}-suggestion`), (suggestionLink) => {
                    suggestionLink.addEventListener('click', (e) => {
                      e.preventDefault();

                      const dt = e.currentTarget.dataset.term;
                      if(dt) {
                        const dtEncoded = simpleEncodeUrlTerm(stripNonAlphabetChars(dt));

                        window.location = constructUrl(dtEncoded, fromDate, shared.FUTURE_DATE, location, region);
                      }
                    });
                  });
                }
              });
            }
          });

        }
      }

      // ========================================
      // PACKAGE SUGGESTIONS
      // ========================================
      if(termResults.packages && termResults.packages.hits && termResults.packages.hits.length) {
        const closestMatch = document.querySelector(`.${ID}-closestMatch .${ID}-term_links`);
        if(closestMatch) {
          const result = termResults.packages.hits[0];
          closestMatch.insertAdjacentHTML('beforeend', `
            <div class="${ID}-suggestion" data-term="${result._source.title}">
              <a href="/">${result._source.title}</a>
            </div>
          `);

          document.querySelector(`.${ID}-closestMatch`).classList.remove(`${ID}-resultDiv--hidden`);
          if(areAllDivsHidden()) {
            noResultsAtAll();
          }

          dataLayerPush('did-show-closest-match-suggestions');
          
          // ========================================
          // Handle closest match
          // ========================================
          [].forEach.call(document.querySelectorAll(`.${ID}-closestMatch .${ID}-suggestion`), (suggestionLink) => {
            suggestionLink.addEventListener('click', (e) => {
              e.preventDefault();

              const dt = e.currentTarget.dataset.term;
              if(dt) {
                const dtEncoded = simpleEncodeUrlTerm(getFirstTwoWords(stripNonAlphabetChars(dt)));

                window.location = constructUrl(dtEncoded, fromDate, '2022-01-01', location, region);
              }
            });
          });
        }
      }

      // ========================================
      // Single Ajax Requests
      // 
      // Requests are made to the site itself
      // to check individual search terms
      // ========================================
      const promises = [];
      searchTerms.split('+').forEach((word) => {
        let func = querySearchSingleTerm(word);
        promises.push(func);
      });

      Promise.all(promises).then((values) => {
        hideLoader();
        showResultsWrapper();

        let hasResults = false;
        let resultsArray = [];

        // loop through the promises to get the values
        Object.keys(values).forEach((i) => {
          const resultsData = values[i];
          
          // if some results found
          if(resultsData.numResults !== 0) {

            hasResults = true;

            // check the values against excluded words
            if(excludeWords.indexOf(resultsData.term) === -1) {
              const newSearchResult = document.createElement('div');
              newSearchResult.classList.add(`${ID}-suggestion`);
              newSearchResult.innerHTML = `<a href="${resultsData.link}">${resultsData.term}<span> (${resultsData.numResults === 10 ? '10+' : `${resultsData.numResults}`})</span></a>`;
              resultsArray.push(newSearchResult);
            }
          }
        });

        // if there are results, add the results to the page
        if(hasResults) {
          for (let index = 0; index < resultsArray.length; index += 1) {
            const element = resultsArray[index];
            document.querySelector(`.${ID}-otherSuggestions .${ID}-term_links`).appendChild(element);
          }
          dataLayerPush('did-show-word-suggestions');
        } else {
          // hide the other suggestions block
          document.querySelector(`.${ID}-otherSuggestions`).classList.add(`${ID}-resultDiv--hidden`);

          if(areAllDivsHidden()) {
            noResultsAtAll();
          }
        }
      });
    });
  } else {
    // ========================================
    // if there is no region in the search results but results are showing
    // and ensure the cookie is not set (we have removed it)
    // ========================================
    if(document.querySelector('.result-item') && !document.cookie.match(/dep-region=[^&]+/)) {
      removeElementsOnSearch();

      const fromPointSpan = document.querySelector('.from-point');
      if(fromPointSpan) {
        fromPointSpan.classList.add(`${shared.ID}-force-hide`);
        fromPointSpan.previousElementSibling.classList.add(`${shared.ID}-force-hide`);
      }
    }
  }
};
