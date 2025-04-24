import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

// Local triggers
pollerLite([
  '#prescription-options',
  '.prescription-choices',
  '#prescription-tab-header-later',
  '#prescription-tab-header-add',
  '#prescription-tab-header-saved',
], activate);


// Qubit triggers
/*
const prescriptionPageRegex = /https?:\/\/www\.glassesdirect\.co\.uk\/basket\/personalise\/\d+\/prescription\/?(\?.*)?(\#.*)?$/;
if (prescriptionPageRegex.test(window.location.href)) {
  options.poll([
    '#prescription-options',
    '.prescription-choices',
    '#prescription-tab-header-later',
    '#prescription-tab-header-add',
    '#prescription-tab-header-saved',
  ]).then(cb);
}
*/
