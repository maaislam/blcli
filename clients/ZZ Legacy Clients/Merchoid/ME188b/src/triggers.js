import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.size-guide-wrapper',
  '.variations_form.cart',
  '#merchoid-scarcity-message',
  '#brands-widget',
], activate);
