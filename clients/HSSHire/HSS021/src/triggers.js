/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
// '.product_details_pg.pdp_hire .product-details.prdt-dtls-tab ul.nav.nav-tabs li',
'.HSS021-TPminiWidget',
'.HSS021-TPreviews',
], activate);
