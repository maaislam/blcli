/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.card-grid picture:first-child', '.card-grid picture:first-child source', '.card-grid picture:first-child img',
() => {
    return !!window.digitalData.page.category.primaryCategory;
}, 
() => {
    return window.ga && window.ga.getAll;
},
() => {
const cat = window.digitalData.page.category.primaryCategory;
if(cat === 'Home') {
    return true;
}
}], activate);
