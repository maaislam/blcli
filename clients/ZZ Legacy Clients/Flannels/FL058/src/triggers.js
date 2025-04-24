import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#divColour select#dnn_ctr176031_ViewTemplate_ctl00_ctl11_colourDdl',
  '#piThumbList li a img',
  '#pnlMainProductImage img',
  '#zoomMainImage',
], activate);
