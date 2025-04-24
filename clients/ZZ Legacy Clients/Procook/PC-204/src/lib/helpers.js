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

export const generatPopulaQuickSearchTerms = (url) => {
  let popularSearches = {};
  let pages = ['/', 
  '/shop/cookware',
  '/shop/cast-iron',
  '/shop/knives-scissors',
  '/shop/tableware-dining',
  '/shop/kitchen-accessories',
  '/shop/baking'];
  
  if (!!data[`${url}`]) {
    popularSearches = data[`${url}`];
  } else {
    for (let i = 1; i < pages.length; i += 1) {
      let page = pages[i];
      // --- Check if page URL is a sublevel of experiment pages
      if (window.location.href.indexOf(`${page}`) > -1) {
        popularSearches = data[`${page}`];
        break;
      }
    }
  }

  let obj = popularSearches;
  let list = '';
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let url = '';
      if (VARIATION == '1') {
        url = obj[`${key}`]['plp'];
      } else if (VARIATION == '2') {
        url = obj[`${key}`]['search'];
      }
      list += `<a href="${url}"><li class="search-term">${key}</li></a>`;
    }
  }

  document.querySelector(`.${ID}-popular-searches__content.desktop`).insertAdjacentHTML('beforeend', list);
  document.querySelector(`.${ID}-popular-searches__content.mobile`).insertAdjacentHTML('beforeend', list);

  // --- Get List Width
  let listWidth = 0;
  const allLinks = document.querySelectorAll(`.${ID}-popular-searches__content.mobile a`);
  [].forEach.call(allLinks, (link) => {
    listWidth = listWidth + (link.clientWidth + 15);
  });

  document.querySelector(`.${ID}-popular-searches__content.mobile`).setAttribute('style', `width: ${parseFloat(listWidth)}px;`)
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
  //Click ‘popular’ quick term (note we’ll eventually need to differentiate between ‘popular’ OR ‘recent’
  const allQuickLinks = document.querySelectorAll(`.${ID}-popular-searches__content li.search-term`);
  [].forEach.call(allQuickLinks, (link) => {
    link.addEventListener('click', (e) => {
      fireEvent(`Clicked - Popular quick term - ${link.innerText.trim()}`);
    });
  });
};