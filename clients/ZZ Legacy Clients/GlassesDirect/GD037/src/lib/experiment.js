/**
 * GD037 - Homepage redesign
 * @author User Conversion
 */
import { setup } from './services';
import GL034 from '../lib/GL034/triggers';

const activate = () => {
  setup();
  GL034(); // Trustpilot in header
};

export default activate;
