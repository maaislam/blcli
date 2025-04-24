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

export const getSearchedTerm = (url) => {
  let searchedTerm = getUrlParameter('searchstr', url);
  searchedTerm = decodeURI(searchedTerm);
  if (searchedTerm.indexOf('+') > -1) {
    searchedTerm = searchedTerm.split('+').join(' ');
  }

  return searchedTerm;
};

export const getPopularSizeFilters = (url) => {
  let popularSizes = {};

  let searchedTerm = getSearchedTerm(url);
  // let searchedTerm = getUrlParameter('searchstr', url);
  // searchedTerm = decodeURI(searchedTerm);
  // if (searchedTerm.indexOf('+') > -1) {
  //   searchedTerm = searchedTerm.replace('+', ' ');
  // }

  if (!!data[`${searchedTerm}`]) {
    popularSizes = data[`${searchedTerm}`];
  } 
  // else {
  //   for (let i = 1; i < pages.length; i += 1) {
  //     let page = pages[i];
  //     // --- Check if page URL is a sublevel of experiment pages
  //     if (window.location.href.indexOf(`${page}`) > -1) {
  //       popularSizes = data[`${page}`];
  //       break;
  //     }
  //   }
  // }
  
  return popularSizes;
};



export const addSizeFiltersIDs = (popularSizes) => {
  let searchedTerm = getSearchedTerm(window.location.href);
  let filterId = '';
  if (searchedTerm.indexOf('knives') > -1 || searchedTerm.indexOf('knife') > -1) {
    filterId = 'filterType';
  } else {
    filterId = 'filterSize';
  }
  const filterBox = document.querySelector(`.filterBox#${filterId}`).closest('.filter');
  const allFilters = filterBox.querySelectorAll('.filterBoxDropDown ul li label.filterText');

  [].forEach.call(allFilters, (f) => {

    if (popularSizes.indexOf(f.innerText.trim()) > -1) {
      // --- Set filter ID
      f.closest('li').setAttribute('id', `${ID}-${f.innerText.trim().split(' ').join('').replace('/', '')}`);
      f.closest('li').classList.add(`${ID}-size-filter`);

      let id = f.closest('li').getAttribute('id');

      if (f.closest('li').querySelector('input').checked) {
        document.querySelector(`ul.${ID}-popular-sizes__content li[data-id="${id.replace('PC-231-', '').split(' ').join('').replace('/', '')}"]`).classList.add('selected');
      } else {
        document.querySelector(`ul.${ID}-popular-sizes__content li[data-id="${id.replace('PC-231-', '').split(' ').join('').replace('/', '')}"]`).classList.remove('selected');
      }
    }

  });

  if (!document.querySelector(`ul.PC-231-popular-sizes__content.filters-active`)) {
    sizeFiltersEvents();
  }
};

export const sizeFiltersEvents = () => {
  const allExpFilters = document.querySelectorAll(`ul.PC-231-popular-sizes__content li`);
  [].forEach.call(allExpFilters, (f) => {
    f.addEventListener('click', () => {
      f.classList.toggle('selected');
      let filterID = f.getAttribute('data-id');
      if (document.querySelector(`.${ID}-size-filter#${ID}-${filterID}`)) {
        document.querySelector(`.${ID}-size-filter#${ID}-${filterID} input`).click();
      }
      
    });
  });

  document.querySelector(`ul.${ID}-popular-sizes__content`).classList.add('filters-active');
};

export const generatePopularFilterSizes = (url) => {
  let popularSizes = getPopularSizeFilters(url);
  let list = '';
  for (let i = 0; i < popularSizes.length; i += 1) {
    let size = popularSizes[i];
    list += `<li class="search-term" data-id="${size.split(' ').join('').replace('/', '')}">${size}</li>`;
  }

  document.querySelector(`.${ID}-popular-sizes__content.desktop`).insertAdjacentHTML('beforeend', list);
  // document.querySelector(`.${ID}-popular-sizes__content.mobile`).insertAdjacentHTML('beforeend', list);

  // --- Get List Width
  let listWidth = 0;
  const allLinks = document.querySelectorAll(`.${ID}-popular-sizes__content.mobile a`);
  [].forEach.call(allLinks, (link) => {
    listWidth = listWidth + (link.clientWidth + 15);
  });

  // document.querySelector(`.${ID}-popular-sizes__content.mobile`).setAttribute('style', `width: ${parseFloat(listWidth)}px;`);

  addSizeFiltersIDs(popularSizes);
};

export const clickEvents = (name, url) => {
  //Focus search
  document.querySelector('input.ais-SearchBox-input').addEventListener('click', (e) => {
    fireEvent('Click - Focus search');
  });
  //Search completed
  document.querySelector('button.ais-SearchBox-submit').addEventListener('click', (e) => {
    fireEvent('Click - Search completed');
  });
  //Click popular filter
  const allQuickLinks = document.querySelectorAll(`.${ID}-popular-sizes__content li.search-term`);
  [].forEach.call(allQuickLinks, (link) => {
    link.addEventListener('click', (e) => {
      fireEvent(`Click - Popular filter - ${link.innerText.trim()}`);
    });
  });

  document.querySelector('body').classList.add(`${ID}-ga-tracking-added`);
};