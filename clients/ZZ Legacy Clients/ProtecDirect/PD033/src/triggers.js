import Run from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#content', // Render location
], Run);
