import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.flag-flag', // Flag to determing country
  '.price.large', // Price area for rendering content
  '.merchoid_genuine_brand_logo', // Image src
  '[name="_merchoid_pa_brand_name"]', // Img alt text
], Run);
