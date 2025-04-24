import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#js-productDetailInner .tangiblee-button',
], activate);
