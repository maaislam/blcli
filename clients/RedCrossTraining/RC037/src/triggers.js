import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  () => window.jQuery,
  () => window.navigator.userAgent.indexOf('MSIE ') === -1, // Not IE <= 10,
  () => !(/Trident.*rv[ :]*11\./.test(window.navigator.userAgent)),
], Experiment.init);
