import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '.woocommerce-main-image.zoom',
], Experiment.init);
