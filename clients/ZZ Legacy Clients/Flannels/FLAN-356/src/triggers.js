import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.productImageCarousel .swiper-container .swiper-wrapper'], activate);
