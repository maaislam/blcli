import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  '#main_0_contentlastitem_0_searchInputContainer',
  '.form-daterange',
  function () { return window.jQuery; }, // eslint-disable-line func-names
], Experiment.init);
