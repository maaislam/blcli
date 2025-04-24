/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
console.log("START HOF-347");
const bagItems = document.getElementById('divBagItems');
const bagItemsAtt = JSON.parse(bagItems.getAttribute('data-basket'));

console.log(bagItemsAtt);

pollerLite(['body', '#divBagItems', '.BodyWrap'], activate);
