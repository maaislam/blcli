/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import ScarcityBar from './components/scarcityBar';

const activate = () => {
  setup();

  const sarcityBar = new ScarcityBar();
};

export default activate;
