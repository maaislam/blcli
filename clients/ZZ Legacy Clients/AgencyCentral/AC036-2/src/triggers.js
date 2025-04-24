import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';
import AC024 from './lib/AC024';

if (!document.querySelector('.AC024')) {
  AC024();
}

poller([
  'body', '.AC024_call-wrap', '.AC024_call-btn',
], Experiment.init);
