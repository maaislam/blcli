import activate from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.prescription-form--has-validation',
  '.field-label',
  '.toggle-extra-info__content',
], activate);
