import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#search_form',
  '.header.header_nav .col-xs-4.text-right.pt-sm-2',
], activate);
