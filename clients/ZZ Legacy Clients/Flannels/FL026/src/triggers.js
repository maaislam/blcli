import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
    let runTest = true;
    const { dataLayer } = window.dataLayer;
    if (dataLayer) {
      const { productGender } = dataLayer[1].productGender;
      if (productGender === 'Kids') {
        runTest = false;
      }
    }
    // console.log(runTest);
    return runTest;
  },
], Experiment.init);
