/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
() => {
    return !!window.dataLayer
},
() => {
    var array = window.dataLayer; 
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            if (element.event === "purchase") {
            return true;
            }
        }
},
() => {
var array = window.dataLayer; 
for (var index = 0; index < array.length; index++) {
  var element = array[index];
  if (element.event === "purchase") {

    if (element.ecommerce.purchase.products){
    return true;
    }
}
}
}
], activate);
