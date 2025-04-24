import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  // '.widget div.branch-details .col-md-12.col-sm-6.col-xs-12 .phone_ctp a',
  '#sidebar .branch-details .col-md-12.col-sm-6.col-xs-12 .wpsl-locations-details',
  '#rest-of-page > a.btn.btn-standard',
  '#sidebar .branch-details .col-md-12.col-sm-6.col-xs-12 .wpsl-location-address',
  '#sidebar .InfinityNumber.clickable',
  '.row  p:nth-of-type(2) .InfinityNumber',
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], Experiment.init);
