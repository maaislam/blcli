/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';

export default () => {
  setup();

  //Push Search Term to Session Storage - needs ammending - and set if search is to search page or PLP
  ga('create', 'UA-31570-7', 'auto');
  var search = document.getElementById('js-search-form');
  var termStore = sessionStorage.getItem('search_term');
  var searchUsed = sessionStorage.getItem('search_used');
  var path = window.location.pathname;
  search.addEventListener('submit', function () {
    var text = document.getElementById('js-search-input').value;
    sessionStorage.setItem('search_term', text);
    sessionStorage.setItem('search_used', 1);
    ga('send', 'event', 'Search', 'Search - Made A Search', text)
  })
  if (searchUsed === '1') {
    if (path.indexOf('search') == -1) {
      ga('send', 'event', 'Search', 'Search - Search to PLP', termStore)
      sessionStorage.setItem('search_used', 0)
    } else {
      ga('send', 'event', 'Search', 'Search - Regular Search', termStore)
      sessionStorage.setItem('search_used', 0)
    }
  }
  //No search results + number of results shown
  var h1 = document.querySelector('h1').innerText;
  var path = window.location.pathname;
  var numberResults = document.getElementsByClassName("product-tile js-product-item").length;
  if (path.indexOf('search') > -1) {
    if (h1.indexOf('NOT FOUND') > -1) {
      ga('send', 'event', 'Search', 'Search - No search results', termStore)
    } else {
      ga('send', 'event', 'Search', 'Search - Number of Results shown', termStore + ' - ' + numberResults, {
        nonInteraction: true
      })
    }
  }
  //predictive search
  window.onclick = e => {
    var clickClass = e.target.className;
    var clickText = e.target.innerText;
    if (clickClass === 'search__item-text') {
      ga('send', 'event', 'Search', 'Search - Predictive', clickText)
    }
  }
  //search load more
  if (document.getElementsByClassName("load-next loading-button").length > 0) {
    document.getElementsByClassName("load-next loading-button")[0].addEventListener('click', function () {
      ga('send', 'event', 'Search', 'Search - Load More Results', termStore)
    })
  }

};
