import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.siteSearch input.button',
  '#search',
  '.siteSearch.search .ui-autocomplete',
], Run);
