/**
 * ME201 - Scarcity Changes
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import ScarcityBar from './components/scarcityBar';
import settings from './settings';

const activate = () => {
    setup();
    const scarcityLoader = new ScarcityBar();
  };

export default activate;
