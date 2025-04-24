import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
'body',
'.product-options-wrapper',
'.product-info-price',
'.product-add-form',
'.product-usps-wrapper',
'.product-info-main',
], activate);
