import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.product-info__name',
], Experiment.init);
