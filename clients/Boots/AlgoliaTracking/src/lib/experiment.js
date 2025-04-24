/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  if (sessionStorage.getItem('AlgoliaEvent') !== 'Fired') {
    const client = __algolia.algoliasearch('89JDFPR8F6', '5a97c2bd13529ed35f49366f6daa30a4');
    const index = client.initIndex('prod_live_products_uk');

    index
      .search('test phrase', {
        getRankingInfo: true,
      })
      .then((res) => {
        var ABTestID = res.abTestID;
        var ABTestVar = res.abTestVariantID;

        var checkGA = setInterval(function () {
          if (window.ga && window.ga.getAll && window.cmCreateManualLinkClickTag) {
            clearInterval(checkGA);
            addTracking();
          }
        }, 500);

        function addTracking() {
          var trackerName = window.ga.getAll()[0].get('name');

          window.ga(trackerName + '.send', 'event', 'algolia', 'index', 'ID: ' + ABTestID + ' | Variant: ' + ABTestVar + '', {
            nonInteraction: true,
          });

          setTimeout(function () {
            window.cmCreateManualLinkClickTag(
              '/algoliaTracking?cm_sp=algolia-_-index-_-ID: ' + ABTestID + ' | Variant: ' + ABTestVar + ''
            );
          }, 3000);
        }
      });

    sessionStorage.setItem('AlgoliaEvent', 'Fired');
  }
};
