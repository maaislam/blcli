import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.productCard.transition-transform.p-2',
  /*eslint-disable */
  () => {
    if (!document.body.classList.contains('.MP122') && !document.body.classList.contains('.MP093')) {
     return true;
    }
  },
  /* eslint-enable */
], Experiment.init);
