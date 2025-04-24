import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['#MainContent', '.js-product-description-overlay-bg'], activate);
