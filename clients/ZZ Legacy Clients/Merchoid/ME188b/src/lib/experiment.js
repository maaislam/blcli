/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import landingPage from './landingProductpage/landingPage';

const activate = () => {
  setup();

  // add if statement here to check which page it is
  landingPage();
};

export default activate;
