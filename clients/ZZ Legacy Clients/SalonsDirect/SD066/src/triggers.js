import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.home-slider.desktop-banners',
  '#custommenu',
], Experiment.init);
