/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { events, poller } from '../../../../lib/utils';
import { UAParser } from './lib/ua-parser';
import shared from './lib/shared';

const parser = new UAParser();
if(parser) {
  const browserInfo = parser.getResult();

  const browserName = browserInfo.browser.name;
  const browserMajorVersion = browserInfo.browser.major;

  const allowedBrowsers = [
    () => !!(browserName == 'Chrome' && browserMajorVersion >= 70),
    () => !!(browserName == 'Safari' && browserMajorVersion >= 10),
    () => !!(browserName == 'Mobile Safari' && browserMajorVersion >= 10),
    () => !!(browserName == 'Firefox' && browserMajorVersion >= 68),
    () => !!(browserName == 'Edge' && browserMajorVersion >= 83),
    () => !!(browserName == 'Samsung Browser' && browserMajorVersion >= 11),
  ];

  if(allowedBrowsers.some((condition) => condition())) {
    // ---------------------------------------
    // Browser is supported
    // ---------------------------------------

    pollerLite([
      'body',
      '.slick-initialized',
      () => !!window.jQuery,
      () => {
        const homeCondition = document.querySelector('.af-square-buttons-carousel');
        const recentlyViewed = document.querySelector('.af-products-carousel.af-square-product-cards .slick-list .slick-track .slick-slide');
        const prodPageCondition1 = document.querySelector('.af-products-carousel.af-square-product-cards');
        const prodPageCondition2 = document.querySelector('#products-by-artist');

        if (homeCondition) {
          return recentlyViewed;
        } else if (prodPageCondition1 && prodPageCondition2) {
          return true;
        }

        return false;
      },
    ], () => {
      events.send(`${shared.ID}-${shared.VARIATION}`, 'did-run');
      if(shared.VARIATION != 'control') {
        activate();
      } else {
        pollerLite(['#main-offcanvas',
        '.af-products-carousel.af-square-product-cards .slick-list .slick-track .slick-slide',
        '.af-products-carousel.af-square-product-cards .slick-list .slick-track .slick-slide img',
        '.af-products-carousel.af-square-product-cards .slick-list .slick-track .slick-slide a'], () => {
            if (recentlyViewdTiles.length > 0) {
              events.send(`${shared.ID}-${shared.VARIATION}`, 'recently viewed products exist');
            }
        });
      }
    });
  }
}
