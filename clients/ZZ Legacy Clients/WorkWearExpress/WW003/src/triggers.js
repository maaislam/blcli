import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#site_torso',
  '#travelator',
  '#header_logo',
], activate);
