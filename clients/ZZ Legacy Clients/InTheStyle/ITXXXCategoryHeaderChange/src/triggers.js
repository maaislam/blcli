import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body', '.category-info.has-cat-contentinfo', '.category-title',
], Experiment.init);
