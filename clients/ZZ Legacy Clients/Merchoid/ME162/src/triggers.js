import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body', '.category-page ul.products',
], Experiment.init);
