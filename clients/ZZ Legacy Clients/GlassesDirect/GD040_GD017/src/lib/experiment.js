/**
 * GD040/GD017
 * @author User Conversion
 */
import { setup } from './services';
import GD017 from './experiments/GD017/triggers';
import GD040 from './experiments/GD040/triggers';

const activate = () => {
  setup();

  // GD017
  GD017();

  // GD040
  const isMobile = window.mobileSite;
  if (!isMobile) {
    GD040();
  }
};

export default activate;
