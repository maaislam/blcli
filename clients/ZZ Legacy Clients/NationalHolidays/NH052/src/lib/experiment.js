/**
 * NH052 - Checkout - Reinforce users selection
 * @author User Conversion
 */
import { setup } from './services';
import Sidebar from '../components/Sidebar/Sidebar';
import { poller } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();
  new Sidebar();
};

export default activate;
