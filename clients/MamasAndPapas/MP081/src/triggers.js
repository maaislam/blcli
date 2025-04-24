import { Experiment } from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.js-detailPane',
  '.js-galleryPane',
  '.breadcrumb_item.breadcrumb-active',
  '.productDetail_panelContent',
  '#js-desktopImageContainer',
  '.productDetail_title',
  '.price-block',
  '#inStock',
  '#productCodePost',
], Experiment.init);
