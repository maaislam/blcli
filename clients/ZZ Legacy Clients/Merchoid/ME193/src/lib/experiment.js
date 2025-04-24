/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import ScarcityMessage from './components/message';
import settings from './settings';
import ME159 from './components/ME159';

const activate = () => {
  setup();

  document.body.classList.add(`${settings.ID}-${settings.VARIATION}`);

  if (settings.VARIATION === 'control') {
    ME159();
  } else {
    const scarcityMessage = new ScarcityMessage();
  }
};

export default activate;
