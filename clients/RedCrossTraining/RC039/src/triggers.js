/* eslint-disable */
import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';
import { getCookie } from '../../../../lib/utils';

poller([
  '.course-search-location',
  '.course-venue-distance',
  '.course-search-sorts',
  '.course-col-price',
  '.course-venue-name',
  '.course-search-form-main',
  '.course-result-cart',
  '.course-search-summary',
  '.course-result-cart-wrapper span',
  '#main_0_contentmain_0_ctl00_numberOfPlacesRequired',
  '.js-number',
  '.tooltip-content',
  '.course-col-date',
  '.table-responsive',
  () => {
    return window.jQuery;
  },
  () => {
    return window.google.maps;
  },
], Experiment.init);

