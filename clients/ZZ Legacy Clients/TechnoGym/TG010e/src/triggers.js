import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'figcaption a',
  '.product-name h1',
  '#gallery-links > a',
], Experiment.init);
