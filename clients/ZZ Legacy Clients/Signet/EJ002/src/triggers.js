import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.thumbnails .tangiblee-button-wrap',
], activate);
