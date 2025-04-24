/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import ScarcityBar from './components/scarcityBar';
import settings from './settings';

const activate = () => {
  setup();
  const scarcityLoader = new ScarcityBar();
};

export default activate;
