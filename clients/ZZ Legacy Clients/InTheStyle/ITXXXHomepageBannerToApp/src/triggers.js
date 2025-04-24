import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body', '.banner-list', '.home-banner-mobile .slick-initialized',
], Experiment.init, {
  timeout: 20000,
});
