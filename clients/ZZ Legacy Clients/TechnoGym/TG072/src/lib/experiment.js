/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import finderContent from './components/finderFunctionality';
import questions from './components/questions';
import productFinderTab from './components/productFinderTab';

const activate = () => {
  setup();

  // add the product finder tab
  productFinderTab();

  // add the product finder to the page
  finderContent();

  // add the questions
  questions();
};

export default activate;
