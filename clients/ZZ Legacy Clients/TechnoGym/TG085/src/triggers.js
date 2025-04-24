import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.TG082_form',
  '.page-container .main-content',
], activate);
