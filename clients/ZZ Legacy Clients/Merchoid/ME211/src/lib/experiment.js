/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import SizeBox from './components/sizingBox';
import sizeSelect from './components/sizeSelect';

const activate = () => {
  setup();
 
  const sizeBox = new SizeBox();
  sizeSelect();
};

export default activate;
