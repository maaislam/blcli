/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import holdingPage from './holdingpage/holdingPage';

const activate = () => {
  setup();
  holdingPage();
};

export default activate;
