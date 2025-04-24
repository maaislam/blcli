import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';
/*eslint-disable */
poller([
  'body',
  () => {
    return !!document.querySelector('.main_inner > .left.filter')
      || window.location.pathname.match(/Printers-C\d+.aspx/);
  },
  /* eslint-enable */
], Experiment.init);
