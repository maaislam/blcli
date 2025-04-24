import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.borderWrap .swiper-container .swiper-slide',
  '.hotspotbuy.hotspotquickbuy',
], Run);
