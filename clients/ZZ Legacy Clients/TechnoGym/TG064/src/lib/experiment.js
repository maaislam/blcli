/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import TG042 from './components/TG042';
import topContent from './components/topContent';
import productDescriptions from './components/productDescriptions';
import { pollerLite } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();

  TG042();
  pollerLite(['.TG064-read_more', '.custom-product-line', '.bottom-bar'], () => {
    topContent();
    productDescriptions();
  });
  // Experiment code
};

export default activate;
