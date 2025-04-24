/**
 * IDXXX - Description
 * @author User Conversion
 */
import {
  setup,
  ieArrayPolyfill,
  updateBundle,
  unlockcartButton,
} from './services';
import {
  cacheDom
} from '../../../../../lib/cache-dom';
import settings from './settings';
const {
  ID,
  VARIATION
} = settings;

const activate = () => {
  setup();
  ieArrayPolyfill(); // Makes Array.from available on IE 11 & <
  // Experiment code
  unlockcartButton();
  // https://www.workwearexpress.com/coats-and-jackets/p-r121a-result-classic-softshell-jacket/
  // https://www.workwearexpress.com/printed-t-shirts/
};

export default activate;
