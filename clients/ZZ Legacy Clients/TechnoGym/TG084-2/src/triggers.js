import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#form-wrapper',
  '#identity-form',
], activate);
