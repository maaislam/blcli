import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.menuList',
  'h3.titleWithIcon span',
  'select.variationDropDown.ddlDoubleUpsDipsClass.ddlProductVariations',
], activate);
