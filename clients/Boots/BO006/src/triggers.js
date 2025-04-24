/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { getUrlParameter } from '../../../../lib/utils';
import shared from './lib/shared';

if([
  '/gift',
  '/gift/',
  '/gift/him',
  '/gift/him/',
  '/gift/her',
  '/gift/her/',
  () => !!window.jQuery && !!window.jQuery.fn,
].indexOf(window.location.pathname) > -1) {
  pollerLite([
    'body', 
    '.categoryNavWidget',
    () => {
      if(window.location.pathname == '/gift/') {
        return !!document.querySelector('.cm-placement-main');
      } else {
        return document.querySelector('.cm-placement-main') || document.querySelector('#estore_category_heading');
      }
    }
  ], () =>{
    setTimeout(()=> {
        activate();
    }, 1000);
  });
} else if(window.location.hash.match(/intermediate/i)) {
  // ----------------------------------------------------
  // Intermediate URL because of broken Boots site 
  // - the site breaks when visiting a page directly with facets!
  // ----------------------------------------------------

  pollerLite([
    () => window.SearchBasedNavigationDisplayJS && window.SearchBasedNavigationDisplayJS.currencySymbol,
  ], () => {
    // Must wait for this to load
    const token = window.location.hash.replace(new RegExp(`#${shared.ID}-intermediate=(.*)`), '$1');
    window.location.hash = decodeURIComponent(token);

    // ----------------------------------------------------
    // When the page has got to its filtered end
    // ----------------------------------------------------
    pollerLite([
      '#estore_category_heading h1',
      () => window.location.hash.match(/giftfinder/i)
    ], () => {
      const h1 = document.querySelector('#estore_category_heading h1');
      if(h1) {
        h1.innerHTML = `Based on your results we think they'll love...`;
      }
    });
  });

} else if(window.location.hash.match(/giftfinder/i)) {
  // ----------------------------------------------------
  // When the page has got to its filtered end
  // ----------------------------------------------------
  pollerLite([
    '#estore_category_heading h1',
  ], () => {
    const h1 = document.querySelector('#estore_category_heading h1');

    if(h1) {
      h1.innerHTML = `Based on your results we think they'll love...`;
    }
  });
}
