/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.hero-banner.hero-banner--full-width',
    () => {
        return !!window.digitalData.page.category.primaryCategory;
    }, 
    () => {
    const cat = window.digitalData.page.category.primaryCategory;
    if(cat === 'Home') {
        return true;
    }
    }
], activate);
