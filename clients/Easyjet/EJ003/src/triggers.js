/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';


const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

/**
 * Chrome 62 onwards, Firefox 45 onwards & Safari 5 onwards
 */
const { userAgent } = window.navigator;

let runTest = false;

if (userAgent.includes('Firefox/')) {
    if (/(45|46|47|48|49|50|52|53|54|55|56|57|58|59|60|61|63|66|68|69|70|72|75|77|80|84|90|101)/.test(userAgent)) {
        runTest = true;
    }
} else if (userAgent.includes('Chrome/')) {
  if (/(62|63|64|65|66|67|68|69|70|71|74|80|83|84|87|91|93|96|102|103|104|105|106|107)/.test(userAgent)) {
    runTest = true;
  }
} else if (userAgent.includes('Safari/')) {
  if (/(5|6|7|8|9|10|11|12|13|14|15)/.test(userAgent)) {
    runTest = true;
  }
}

if(runTest === true) {
  if(!ieChecks) {
    pollerLite([
      'body',
      'form.search-pod',
      '.ej-input.destination',
      '.outbound-date-picker .chosen-date',
      '.return-date-picker .chosen-date',
    ], activate);
  }
}

