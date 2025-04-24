/**
 * PJ035 - Clarity on offer applied
 * @author User Conversion
 */
import { setup } from './services';
import Steps from '../components/Steps/Steps';

const activate = () => {
  setup();
  new Steps();
};

export default activate;
