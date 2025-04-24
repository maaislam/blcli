import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  '.product_details',
  'section.inner > .row.middle > .col-xs-6',
  'section.usps > .row > .col-sm-4',
  /*eslint-disable */
  () => {
    if (!document.querySelector('.lowstock')) {
      return true;
    }
  },
  /* eslint-enable */
], Experiment.init);
