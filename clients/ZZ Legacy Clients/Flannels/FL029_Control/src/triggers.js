import run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'input[id*="txtAddress1"]', // Address box
], run);
