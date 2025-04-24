import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.breadcrumb_item',
], Experiment.init);
