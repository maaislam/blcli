import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  'input#input_SearchBox.siteSearchInput.form-control.form-control-transparent',
], activate);
