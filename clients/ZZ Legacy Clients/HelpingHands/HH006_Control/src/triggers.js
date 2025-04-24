import run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.child-pages', // Category tile parent
  '.child-pages .col-sm-6', // Individual tile container
], run);
