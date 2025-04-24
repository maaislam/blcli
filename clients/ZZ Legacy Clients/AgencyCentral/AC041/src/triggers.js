import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#search-results-container .agency-result .contact-option-container',
], activate);
