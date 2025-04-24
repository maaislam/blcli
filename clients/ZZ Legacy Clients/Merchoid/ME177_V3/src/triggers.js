import Run from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.product-gallery', // Render location
  '.flag-flag', // Check flag for location
  '.product-image-assoc-brand', // Activate test based on viewability tracker
], Run);
