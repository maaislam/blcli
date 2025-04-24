import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  /*eslint-disable */
  () => {
    return window.location.search !== '';
  },
  /* eslint-enable */
], Experiment.init);
