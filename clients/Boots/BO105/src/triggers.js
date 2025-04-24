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
      //'.oct-carousel-hero',
      //'.oct-carousel-hero__inner .swiper-slide a',
      '.oct-experience-fragment.oct-experience-fragment__single-row',
      '#main',
      '.templateMainContentArea',
      '.oct-template.oct-template--boots-v1.oct-template--boots-v1--standard .oct-grid.oct-aem-grid',
      () => {
        let pageUrl = window.location.pathname;
        let runExperiment = false;
        if (pageUrl == "/") {
          runExperiment = true;
        }

        return runExperiment;
      },
    ], activate);
  }
}
