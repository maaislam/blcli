import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import data from './data';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export const getUrlParameter = (name, url) => {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,'\\\]');
  const regexS = `[\\?&]${name}=([^&#]*)`;
  const regex = new RegExp(regexS);
  const results = regex.exec(url);
  return results == null ? null : results[1];
};

export const generateRecentSearchTerms = (url) => {
  let recentSearches = [];
  let pages = ['/'];
  let list = '';
  recentSearches = JSON.parse(localStorage.getItem(`${ID}-recent-searches`));

  if (recentSearches.length > 5) {
    recentSearches = recentSearches.splice(0,5);
  }
  for (let i = 0; i < recentSearches.length; i += 1) {
    list += `<a href="/shop/search?searchstr=${encodeURIComponent(recentSearches[i])}"><li class="search-term">${recentSearches[i]}</li></a>`;
  }


  document.querySelector(`.${ID}-recent-searches__content.desktop`).insertAdjacentHTML('beforeend', list);
  document.querySelector(`.${ID}-recent-searches__content.mobile`).insertAdjacentHTML('beforeend', list);

  // --- Get List Width
  let listWidth = 0;
  const allLinks = document.querySelectorAll(`.${ID}-recent-searches__content.mobile a`);
  [].forEach.call(allLinks, (link) => {
    listWidth = listWidth + (link.clientWidth + 15);
  });

  document.querySelector(`.${ID}-recent-searches__content.mobile`).setAttribute('style', `width: ${parseFloat(listWidth)}px;`)
};

export const updateRecentlySearchedTerms = (searchedFor) => {
  let recentlySearched = [];
  if (localStorage.getItem(`${ID}-recent-searches`) !== null) {
    recentlySearched = JSON.parse(localStorage.getItem(`${ID}-recent-searches`));
    if (recentlySearched.indexOf(`${searchedFor}`) == -1) {
      recentlySearched.unshift(`${decodeURIComponent(searchedFor)}`);
    }
    
    localStorage.setItem(`${ID}-recent-searches`, JSON.stringify(recentlySearched));
  } else if (localStorage.getItem(`${ID}-recent-searches`) == null
    && document.querySelectorAll('.category-products .category-product').length > 0) {
    if (recentlySearched.indexOf(`${searchedFor}`) == -1) {
      recentlySearched.unshift(`${decodeURIComponent(searchedFor)}`);
    }
    
    localStorage.setItem(`${ID}-recent-searches`, JSON.stringify(recentlySearched));
    sessionStorage.removeItem(`${ID}-searched-term`);
  }
};

export const clickEvents = (name, url) => {
  //Focus search
  document.querySelector('input.ais-SearchBox-input').addEventListener('click', (e) => {
    fireEvent('Clicked - Focus search');
  });
  //Search completed
  document.querySelector('button.ais-SearchBox-submit').addEventListener('click', (e) => {
    fireEvent('Clicked - Search completed');
  });
  //Click ‘recent’ searched term (note we’ll eventually need to differentiate between ‘popular’ OR ‘recent’
  const allQuickLinks = document.querySelectorAll(`.${ID}-recent-searches__content li.search-term`);
  [].forEach.call(allQuickLinks, (link) => {
    link.addEventListener('click', (e) => {
      fireEvent(`Clicked - Recently searched term - ${link.innerText.trim()}`);
    });
  });
};