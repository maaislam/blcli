import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  '.info',
  '.entry-content > h3',
  '.footer-wrapper',
], Experiment.init);
