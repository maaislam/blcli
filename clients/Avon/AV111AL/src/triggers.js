/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from '../../../../core-files/shared';
import { fragrancesSamples } from './lib/data';
const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if (!ieChecks) {
  pollerLite(['body', '#product-detail', '.product-form ', () => typeof window.DYO === 'object'], () => {
    const samplesCheck = ['Trial', 'Sample'];
    const isSamplePage = samplesCheck.some(
      (sample) => document.querySelector('.product-title.main-product-title').innerText.indexOf(sample) !== -1
    );
    if (isSamplePage) return;

    // if (sessionStorage.getItem('popular-samples')) {
    //   activate();
    //   return;
    // }
    const filterConditions = 'eau';
    console.log('filterConditions', filterConditions);

    const realtimeRules = [
      {
        id: -1,
        query: {
          conditions: [
            {
              field: 'name', // Condition
              arguments: [
                {
                  action: 'CONTAINS', // Action type IS / IS_NOT / CONTAINS / EQ / GT / GTE / LT / LTE
                  value: 'sample', // Value of condition
                },
              ],
            },
            {
              field: 'name', // Condition
              arguments: [
                {
                  action: 'CONTAINS',
                  value: filterConditions,
                },
              ],
            },
            {
              field: 'in_stock', // Condition
              arguments: [
                {
                  action: 'IS',
                  value: true,
                },
              ],
            },
          ],
        },
        type: 'pinned', // Include or exclude
        slots: [], // Position in widget
      },
    ];
    //skin care : 153672

    window.DYO.recommendationWidgetData(window.strategyId, { realtimeRules }, (error, data) => {
      //const popularSamples = data.slots.map((slot) => slot.item);//DY filter in strategy does not work

      const genericSamples = data.slots
        .reduce((acc, curr) => {
          const { categories, name } = curr.item;
          const isSample =
            !name.toLowerCase().includes('set') &&
            name.toLowerCase().includes('sample') &&
            name.toLowerCase().includes(filterConditions);
          if (isSample) {
            acc.push(curr.item);
          }
          return acc;
        }, [])
        .slice(0, 3);

      console.log('popular sample', genericSamples);
      sessionStorage.setItem(`${shared.ID}__popular-samples`, JSON.stringify(genericSamples));
      activate();
    });
  });
}
