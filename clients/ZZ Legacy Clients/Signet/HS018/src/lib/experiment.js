/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import addPriceContent from './components/priceBlockContent';

const activate = () => {
  setup();
  addPriceContent();
};

export default activate;
