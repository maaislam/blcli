/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';
import { fireEvent } from '../../../../core-files/services';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);


pollerLite(["body", "#estore_lister_template_container",
() => {

  if(!document.querySelector('.fi-slot')) {
    return true;
  } else {
    fireEvent('FoundIt Shown', true);
    return false;
  }

}], () => {
  const url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
  const PLP = document.querySelector('#estore_lister_template_container');
  const search = window.location.href.indexOf('sitesearch?searchTerm') > -1;

  // If PLP
  if(url && PLP && !search) {
    fetch(`https://octopus-app-c6o8t.ondigitalocean.app/dynamic-navigation/data/${url}/`)
    .then((r) => r.json())
    .then((d) => {
      if (!ieChecks) {
        if (!getCookie("Synthetic_Testing")) {
        
            activate(d.Data)
          
        }
      }
    })
    .catch(() => {
      return;
    });

    // If search
  } else if(search){

    const searchTerm = window.location.href.match(/=(.*)/)[1].toLowerCase();

    fetch(`https://octopus-app-c6o8t.ondigitalocean.app/dynamic-navigation/data/searchterm-${searchTerm}/`)
    .then((r) => r.json())
    .then((d) => {
      if (!ieChecks) {
        if (!getCookie("Synthetic_Testing")) {
          activate(d.Data)
        }
      }
    })
    .catch(() => {
      return;
    });
  }
});
