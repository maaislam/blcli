/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    pollerLite([
      'body',
    () => {
      return !!window.dataLayer;
    },
    () => {
      let pageType = '';
      let runExperimentOnPage = false;
      pollerLite(['#listPageType'], () => {
        if (window.location.href.indexOf('searchTerm') > -1) {
          //srp
          pageType = 'srp';
          runExperimentOnPage = true;
        } else {
          pageType = 'plp';
          runExperimentOnPage = true;
        }
      });
      pollerLite(['meta[content="ProductPage"]'], () => {
        //pdp
        pageType = 'pdp';
        runExperimentOnPage = true; 
      });

      return runExperimentOnPage;
    },
    () => {
      return !!window.OnetrustActiveGroups;
    },
    () => {
        return !!window.Optanon
    },
    ], activate);
  }
}
