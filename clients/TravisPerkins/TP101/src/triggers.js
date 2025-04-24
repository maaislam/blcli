import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if (window.localStorage && document.querySelector) {
  pollerLite([
    '.ui-panel-inner',
  ], Experiment.init);
}
