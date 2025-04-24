/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import addToBagButton from './components/addToBagButton';
import basketIcon from './components/basketIcon';


const activate = () => {
  setup();
  basketIcon();
  addToBagButton();
};

export default activate;
