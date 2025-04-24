import Run from './src/experiment';
import { poller } from '../../../lib/uc-lib';
import flicker from './src/flickerPrevention';

flicker();

poller([
  '#search-results-container',
  '.agency-result.row',
], Run);
