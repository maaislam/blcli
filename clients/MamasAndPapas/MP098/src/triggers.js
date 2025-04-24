import experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.MP081',
  !!window.jQuery
], () => {
  experiment.init();
});
