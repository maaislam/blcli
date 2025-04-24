import Run from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '[title="About us"]', // About us link
  '[title="Contact Us"]', // Contact us
], Run);
