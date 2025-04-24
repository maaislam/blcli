import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.wrapper .header-container',
  '.content-container',
  () => !!window.jQuery && !!window.jQuery.fn.slick,
], Experiment.init);
