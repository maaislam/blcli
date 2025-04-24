import run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.child-pages', // Category tile parent
  '.child-pages .col-sm-6', // Individual tile container
  '.child-pages .col-sm-6 > a', // Tile link
  '.child-pages .col-sm-6 img[data-lazy-src]', // Tile Image
  '.child-pages .col-sm-6 .reduced-margin-bottom > strong', // Tile Title
  '.child-pages .col-sm-6 .caption p:nth-child(2)', // Additional text
], run);
