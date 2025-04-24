/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '.product-tile__image-container',
  () => {
    if(window.digitalData && window.digitalData.page.pageInfo.pageType === 'PLP') {
      return true;
    }
  },
], activate);
