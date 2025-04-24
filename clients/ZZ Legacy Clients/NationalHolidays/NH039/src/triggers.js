import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body', '.seat-area',
], () => {
  setTimeout(() => {
    // Timeout works around race conditions with JavaScript
    // where site getSeatPlan function is called after our
    // code it breaks the test
    Experiment.init();
  }, 3000);
});
