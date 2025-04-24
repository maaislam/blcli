import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.main-nav',
  '#js--main-nav a',
], activate);
