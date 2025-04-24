import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#basketForm',
  '.wish-list__button',
], activate);
