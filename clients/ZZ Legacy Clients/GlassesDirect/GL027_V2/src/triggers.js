import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';
// import flicker from './flickerprevention';


// flicker();
pollerLite([
  '#silver-lens-package .highlight-text', // Silver text header
  '.lens-choice > .btn-select', // Package options, e.g bronze, silver etc..
  '#cancel-lens-package-upgrade-btn', // Continue with basic link
  '.option-value', // Package title e.g. bronze, silver
], Run);
