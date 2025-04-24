import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.main-container .main',
  '.product-des',
  '.pro-description',
], Experiment.init);
