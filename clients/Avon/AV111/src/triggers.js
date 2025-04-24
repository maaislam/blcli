/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from '../../../../core-files/shared';
const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if (!ieChecks) {
  pollerLite(['body', '#product-detail', '.product-form '], () => {
    const samplesCheck = ['Trial', 'Sample'];
    const isSamplePage = samplesCheck.some(
      (sample) => document.querySelector('.product-title.main-product-title').innerText.indexOf(sample) !== -1
    );
    if (isSamplePage) return;

    if (sessionStorage.getItem('popular-samples')) {
      activate();
      return;
    }

    DYO.recommendationWidgetData(143281, {}, (error, data) => {
      //const popularSamples = data.slots.map((slot) => slot.item);//DY filter in strategy does not work
      const genericSamples = data.slots
        .reduce((acc, curr) => {
          const isSample = curr.item.name.indexOf('Sample') !== -1 || curr.item.name.indexOf('Trial') !== -1;
          if (isSample) {
            acc.push(curr.item);
          }
          return acc;
        }, [])
        .slice(0, 3);

      // console.log(genericSamples);
      sessionStorage.setItem('popular-samples', JSON.stringify(genericSamples));
      activate();
    });
  });
}
