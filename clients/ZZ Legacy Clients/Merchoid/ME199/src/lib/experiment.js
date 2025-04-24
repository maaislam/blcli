/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import ScarcityBar from './components/scarcityBar';
import settings from './settings';
import Run from './components/ME158';

const activate = () => {
  setup();
  if (settings.VARIATION === '1') {
    const scarcityLoader = new ScarcityBar();
  }
  // ME159
  if (settings.VARIATION === 'control') {
    Run();
  }
};

export default activate;
