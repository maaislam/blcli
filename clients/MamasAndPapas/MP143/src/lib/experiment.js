/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import productPage from './components/productPage';
import categoryPage from './components/categoryPage';

const activate = () => {
  setup();
  const pageType = window.universal_variable.page.type;
  if (pageType === 'Product') {
    productPage();
  }
  if (pageType === 'Category') {
    categoryPage();
  }
};

export default activate;
