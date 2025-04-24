import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#application_location',
  '#logo_upload',
  '#existing_personalisation',
  '.location',
], activate);
