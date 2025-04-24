import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.addToBasketContainer',
  '.BasketWishContainer',
], Experiment.init);
