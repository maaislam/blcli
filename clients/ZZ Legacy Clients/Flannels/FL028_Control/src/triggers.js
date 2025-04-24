import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#dnn_ctr176031_ViewTemplate_ctl00_ctl13_lblWishListToLoginButton', // Add to wish list text
  '#dnn_ctr176031_ViewTemplate_ctl00_ctl13_aWishListToLogin', // Add to wish list button
  '#dnn_ctr176031_ViewTemplate_ctl00_ctl12_aAddToBag', // Add to bag
  '#addToWishListContainer', // Add to wishlist container
  '#divBagItems', // minicart
  '#dnn_ctr176031_ViewTemplate_ctl00_ctl12_sAddToBagWrapper', // Add to bag container
], Experiment.init);
