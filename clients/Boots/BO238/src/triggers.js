/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);


    
  let recentCategories = JSON.parse(localStorage.getItem(`BO238-storage-RecentlyViewedCategories`)); // change to new test ID

  if (recentCategories){
    const url = recentCategories.toString()
  fetch(`https://octopus-app-c6o8t.ondigitalocean.app/recent-history-inspired/combined/data/${url}/`)
  .then((r) => r.json())
  .then((d) => {
    if (!ieChecks) {
      if (!getCookie("Synthetic_Testing")) {
        pollerLite(["body", '.oct', '.oct-template', '.oct-image', '.oct-grid__cell', '.oct-carousel-hero', '.oct-carousel-hero__inner', '.oct-grid__row', '.oct-template', '.oct-experience-fragment', '.templateMainContentArea', '#inspire-by-test'], () => {
          activate(d.Data)
        });
      }
    }
  })
  .catch(() => {
    return;
  });
}

