import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '#filterlist', '#ProductContainer ul#navlist',
], activate);
