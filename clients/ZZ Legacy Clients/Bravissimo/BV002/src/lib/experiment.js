import settings from './settings';
import { addPoller, addObserver } from './winstack';
import { setup } from './services';
import { categories } from './data';
import { styleFacetTokens, onFacetTokenClick } from './facets';
import { generateList, injectApplyButton, markActiveOnLoad } from './filters';

const activate = () => {
  if (((window.dataLayer || [])[0] || {}).pageType === 'productListing') {
    setup();

    // --------------------------------------------
    // Check whether to run
    // --------------------------------------------
    const address = window.location.href;

    categories.forEach(function (category, i) {
      if (address.indexOf(category.categoryUrl) > -1) {

        generateList(category.categoryParent);
        injectApplyButton();
        
        styleFacetTokens();
        onFacetTokenClick();
        
        setTimeout(() => {
          styleFacetTokens();
          onFacetTokenClick();
        }, 1000);

        markActiveOnLoad();

        /*
         * Adds experiment class to HTML since Vue or React
         * remove it from the body when you tap on the filters button
         * removing it some styles I apply to fix problems are not working
         * with this I am ensuring we have an untouchable reference to our css file
         */
        document.documentElement.classList.add(`${settings.ID}`);
      }
    });

    // --------------------------------------------
    // Restyle facets when they get rebuilt
    // --------------------------------------------
    addObserver(document.querySelector('.c-results-list'), () => {
      addPoller([
        '.c-results-list__items',
      ], () => {
        styleFacetTokens();
        onFacetTokenClick();
        setTimeout(() => {
          styleFacetTokens();
          onFacetTokenClick();
        }, 1000);
      });
    }, {
      childList: true,
      attributes: true
    });

    // --------------------------------------------
    // Restyle facets when they get rebuilt
    // --------------------------------------------
    addObserver(document.querySelector('.c-results-facets--list'), () => {
      categories.forEach(function (category, i) {
        if (address.indexOf(category.categoryUrl) > -1) {

          generateList(category.categoryParent);
          injectApplyButton();

          markActiveOnLoad();
        }
      });
    }, {
      subtree: false,
      childList: true,
      attributes: true
    });


    // Add observer to body to re add the class
    addObserver(document.querySelector('body'), () => {
      const bod = document.querySelector('body');
      
      styleFacetTokens();
      onFacetTokenClick();
      
      setTimeout(() => {
        styleFacetTokens();
        onFacetTokenClick();
      }, 500);
      // if (!bod.classList.contains('BV002')) {
        bod.classList.add('BV002');
        bod.classList.add('BV002-1');

        categories.forEach(function (category, i) {
          if (address.indexOf(category.categoryUrl) > -1) {
  
            generateList(category.categoryParent);
            injectApplyButton();
  
            markActiveOnLoad();
          }
        });
      // }

    }, {
      subtree: false,
      childList: true,
      attributes: true
    });
    
  }
};

export default activate;
