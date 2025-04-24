/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import TopBanner from './components/topBanner/topBanner';
import ProductBanner from './components/productBanner/productBanner';
import gridContent from './components/inGridContent/gridContent';
import filters from './components/filterAndSort/filters';
import settings from './settings';

const activate = () => {
  setup();

  // add the top banner
  const topBanner = new TopBanner();

  // add in grid content
  gridContent();

  // add the product banner
  if (settings.VARIATION === '1') {
    const productBanner = new ProductBanner();
  }

  // add the sort and filter
  filters();
  // Experiment code
};

export default activate;
