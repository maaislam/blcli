import settings from '../settings';
import { sortQuery } from './sortQuery';
import removeDups from './removeDups';

export const toggleFilter = {
  getCurrentUrl() {
    return window.location.href;
    // ?q=%3AtopRated%3AinStock%3AinStock%3ApriceRange%3A£0%20-%20£20
  },
  add(filterQuery) {
    console.log(filterQuery);
    const { search } = window.location; 
    let newSearch = '';
    let searchTerm = '';
    let theUrl = window.location.href;
    console.log('search, ', search.length);
    // Is it a new search? E.g. just /clothing
    
    if (search.length === 0) {
      console.log('new search!');
      if (filterQuery.match(/(price-desc|name-asc|price-asc|name-desc)/mi)) {
        window.location.href = `${window.location.href}?q=${filterQuery}`;
      } else {
        if (filterQuery.match(/topRated/g)) {
          window.location.href = `${window.location.href}?q=%3AtopRated`;
        } else {
          window.location.href = `${window.location.href}?q=%3AtopRated${filterQuery}`;
        }
      }
    } else {
      // Is it on a search page?
      let splitUrlRegx;
      let sortByQuery;
      let filterQueries;
      if (window.location.search.match(/^\?q=\w+/)) {
        // console.log('match!');
        splitUrlRegx = new RegExp(/(^\?q\=([\w\d-\.\+_]+)($|(%3A)))/);
        sortByQuery = search.match(splitUrlRegx)[0];
        searchTerm = search.match(splitUrlRegx)[2];
        filterQueries = search.match(splitUrlRegx)[1];
      } else {
        splitUrlRegx = new RegExp(/(^\?q\=\%3A\w+)(.+)/);
        sortByQuery = search.match(splitUrlRegx)[0];
        filterQueries = search.match(splitUrlRegx)[1];
      }

      // Not a new query. 
      // Do some checks;
      // Store just the URL up to the search query. 
      // const startOfUrl = window.location.href.replace(search, '');
      // console.log('start URL', startOfUrl);
      // Is it a sort by?
      if (filterQuery.match(/(price-desc|name-asc|price-asc|name-desc|topRated)/mi)) {
        // It is. swap ?q=%3AtopRated

        if (search.match(/^\?q\=\%3A\w+/)) {
          newSearch = `?q=${search.replace(/^\?q\=\%3A[\w-]+/i, `${filterQuery}`)}`;

          // Replace in local storage
          const storedTerms = this.checkActiveFilters();
          // console.log('stored terms ' , storedTerms);
          const niceQuery = sortQuery(filterQuery);
          // console.log('filter query ', niceQuery);
          const filteredStoredTerms = storedTerms.filter(term => {
            if (!term.match(/(price-desc|name-asc|price-asc|name-desc|topRated)/mi)) {
              // console.log('matched! ', term);
              return term;
            }
          });

          // console.log('stored terms, without sortBy ', filteredStoredTerms);
          window.localStorage.setItem('MP155-filters', filteredStoredTerms.toString())
          // Fix for pagination.
          // Need to remove anything that matches \&sort\=(\w+\-\w+|\w+)\&page=\d+

          if (newSearch.match(/\&sort\=(\w+\-\w+|\w+)\&page=\d+/i)) {
            newSearch = newSearch.replace(/\&sort\=(\w+\-\w+|\w+)\&page=\d+/i, '');
          }

          window.location.href = `${window.location.origin}${window.location.pathname}${newSearch}`;
        } else {
          // Search page query
          // const sortByPart = search.match(/\%3A[\w-]+/i)[0]
          newSearch = `${search.replace(/\%3A[\w-]+/i, `${filterQuery}`)}`;

          // Remove &text as it breaks the filter.
          if (newSearch.match(/\&text\=\w+/i)) {
            newSearch.replace(/\&text\=\w+./i, '');
          }

          // Replace in local storage
          const storedTerms = this.checkActiveFilters();
          // console.log('stored terms ' , storedTerms);
          const niceQuery = sortQuery(filterQuery);
          // console.log('filter query ', niceQuery);
          const filteredStoredTerms = storedTerms.filter(term => {
            if (!term.match(/(price-desc|name-asc|price-asc|name-desc|topRated)/mi)) {
              // console.log('matched! ', term);
              return term;
            }
          });

          // console.log('stored terms, without sortBy ', filteredStoredTerms);
          window.localStorage.setItem('MP155-filters', filteredStoredTerms.toString());
          // Fix for pagination.
          // Need to remove anything that matches \&sort\=(\w+\-\w+|\w+)\&page=\d+
          if (newSearch.match(/\&sort\=(\w+\-\w+|\w+)\&page=\d+/i)) {
            newSearch = newSearch.replace(/\&sort\=(\w+\-\w+|\w+)\&page=\d+/i, '');
          }
          window.location.href = `${window.location.origin}${window.location.pathname}${newSearch}`;
        }
      } else {
        // console.log('just a normal filter query here');
        // not a sort by, a new filter. 
        // Check if it already exists in the URL. If so, ignore.
        const testingRegex = new RegExp(filterQuery + '(?!%20)');
        if (window.location.href.match(testingRegex)) {
          
          return;
        } else {
          // Fix for pagination.
          // Need to remove anything that matches \&sort\=(\w+\-\w+|\w+)\&page=\d+
          if (theUrl.match(/\&sort\=(\w+\-\w+|\w+)\&page=\d+/i)) {
            theUrl = theUrl.replace(/\&sort\=(\w+\-\w+|\w+)\&page=\d+/i, '');
          }

          // Does it have a Sort by term?
          if (!window.location.href.match(/(price-desc|name-asc|price-asc|name-desc|topRated)/mi)) {
            window.location.href = `${theUrl}%3AtopRated${filterQuery}`
          } else {
            // Just add it on.
            window.location.href = (`${theUrl}${filterQuery}`).replace('%3A%3A', '%3A');
          }
        }
      }
    }
    
  },
  remove(filterQuery) {
    let url = this.getCurrentUrl();

    // Replace characters to help match
    if (url.indexOf('%C2') > -1) {
      url = url.replace(/\%C2/g, '£');
    }
    if (url.indexOf('%A3') > -1) {
      url = url.replace(/\%A3/g, '');
    }
    // Check if URL has the removed query
    const testingRegex = new RegExp(filterQuery + '(?!%3A)');
    if (url.match(testingRegex)) {
      // this.checkActiveFilters();
      // let newUrl = url.replace(filterQuery, ''); // Testing the method below for duplicate filters.
      let newUrl = url.replace(new RegExp(filterQuery, 'g'), '');

      // // remove from LS
      // let niceQuery = sortQuery(filterQuery);
      // // Remove double %3A
      // // remove from storage first
      // toggleFilter.removeAFilter(niceQuery);
  
      // Hit 
      window.location.href = newUrl;
    }
  },
  clearAll() {
    this.clearActiveFilters();
    window.localStorage.setItem('MP155-sortBy', '');
    window.localStorage.setItem('MP155-clickedSortBy', '');
    const newSearch = window.location.search.match(/(^\?q\=([\w\d-\.\+_]+)($|(%3A)))/i);
    if (window.location.href.indexOf('/search/') > -1 && newSearch[2]) {
 
      window.location.href = window.location.origin + window.location.pathname + `?q=${newSearch[2]}`;
    } else {
      window.location.search = '';
      // window.location.reload(true);
      window.location.href = window.location.origin + window.location.pathname;
    }
  },
  checkActiveFilters() {
    let urlTerms = decodeURIComponent(window.location.search);

    urlTerms = urlTerms.replace('?q=', '');
    urlTerms = urlTerms.replace(/:(price-desc|name-asc|price-asc|name-desc|topRated):?/ig, '');

    // Match filters
    // So
    //   ':gender:Girls:subCat:Bibs & Muslins'.match(/(:[\w\s\d-_]+:[\w\s\d-_]+)/ig)
    // Would give us
    //   [":gender:Girls", ":subCat:Bibs "]
    //
    const filters = urlTerms.match(/(:?[\w\s\d-_]+:[\w\s\d-_&]+)/ig)
    if(filters) {
      // Return matched filters, ensure each is trimmed
      const resultArray = filters.map((f) => f.trim().replace(/^:/, ''));
      return resultArray;
    }
  },
  storeActiveFilters(filterDataAttr) {

    // Get the existing data
    var existing = localStorage.getItem('MP155-filters');

    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    existing = existing ? existing.split(',') : [];

    if (settings.VARIATION === '1') {
      // Loop over active filters
      const activeOptions = document.querySelectorAll('.checkbox_toggle_bordered.active');
      if (!filterDataAttr || !activeOptions) return;
      
      if (filterDataAttr) {
        existing.push(filterDataAttr);
      } else if (activeOptions) {
        Array.from(activeOptions).forEach((option) => {
          const dataAtt = option.getAttribute('data-search-query');
          existing.push(dataAtt);
        });
      }

    }
    if (settings.VARIATION === '2') {
      let data = decodeURI(filterDataAttr);
      data = data.replace(/\%3A/g, ':');
      existing.push(data);
    }

    // Save back to localStorage
    existing = removeDups(existing);
    localStorage.setItem('MP155-filters', existing.toString());
  },
  clearActiveFilters() {
    localStorage.removeItem('MP155-filters');
    localStorage.removeItem('MP155-clickedSortBy');
    localStorage.removeItem('MP155-sortBy');
  },
  removeAFilter(filterName) {
    let storageArr = window.localStorage.getItem('MP155-filters');
    storageArr = storageArr.split(',');
    if (filterName.match('&')) {
      filterName = filterName.replace(/&/g, '%26');
    }
    storageArr.splice( storageArr.indexOf(filterName), 1 );
    window.localStorage.setItem('MP155-filters', storageArr);
  },
}
