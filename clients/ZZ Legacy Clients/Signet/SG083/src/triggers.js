/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '.tangiblee-button',
  () => {
    if(!document.querySelector('.SG082__pageContent')) { 
      return true;
    }
  },
  () => {
    if(window.digitalData && window.digitalData.page.category.subCategory1 === 'Rings') {
      return true;
    }
  }
], activate);
