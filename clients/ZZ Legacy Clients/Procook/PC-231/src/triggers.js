/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { getUrlParameter, getSearchedTerm } from './lib/helpers';
import data from './lib/data';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite([
    'body',
    '.search-bar',
    'input.ais-SearchBox-input',
    'button.ais-SearchBox-submit',
    '#filterSize',
    '#filterType',
    '.filterBoxDropDown ul li label.filterText',
    '.template-category-list',
    () => {
      let runExp = false;
      /**
       * @desc If user is on the Search Results page and has searched for one of the keywords
       * then experiment fires
       */
      if (getUrlParameter('searchstr') !== null
      && !!data[`${getSearchedTerm(window.location.href)}`]) {
        // console.log(`>>> USER IS ON SEARCH RESULTS: ${getUrlParameter('searchstr')}`);
        // console.log(`>>>>KEYWORD: ${getSearchedTerm(window.location.href)}`);
        // console.log(`in data: ${data[`${getSearchedTerm(window.location.href)}`]}`);
        runExp = true;
      }

      return runExp;
    },
  ], activate);


  pollerLite(['body'], () => {
  
    // for observer
    let oldHref = document.location.href;
    let bodyList = document.querySelector("body");
    const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;
                    // document.documentElement.classList.remove('PC-231');
                    // document.querySelector('.PC-231-popular-filter-sizes__wrapper').parentElement.removeChild(document.querySelector('.PC-231-popular-filter-sizes__wrapper'));
                    pollerLite([
                      '#filterSize',
                      '#filterType',
                      '.filterBoxDropDown ul li label.filterText',
                      '.template-category-list',
                      () => {
                        let runExp = false;
                        if (getUrlParameter('searchstr') !== null
                        && !!data[`${getSearchedTerm(window.location.href)}`]) {
                          runExp = true;
                        }
                  
                        return runExp;
                      },
                    ], activate);
                }
            });
        });
    const config = {
        childList: true,
        subtree: true
    };
    
    observer.observe(bodyList, config);
  });
}
