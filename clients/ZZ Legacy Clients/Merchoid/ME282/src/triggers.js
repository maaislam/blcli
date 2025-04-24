/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
//'.breadcrumbs ul li',
//'span[data-price-type="oldPrice"] span.price',
'.page-title-wrapper h1',
'#maincontent .product-info-main .price-box .old-price .price-container .price',
'.product-info-main .product-info-price',
//'.ME281-priceMessage',
//'.ME281-priceMessage .ME281-priceWrapper',
], activate);
