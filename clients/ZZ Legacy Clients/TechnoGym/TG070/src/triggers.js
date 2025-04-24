import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.hp-top-slider-background .lazybg.lazy-loaded',
  '.hp-top-slider-foreground .swiper-slide',
  '.hp-top-slider-foreground .swiper-slide .title',
], activate);
