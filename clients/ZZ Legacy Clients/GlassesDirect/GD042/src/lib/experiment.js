/**
 * GD042 - Sizing Messages
 * @author User Conversion
 */
import { setup } from './services';
import SizingPopup from '../components/SizingPopup/SizingPopup';

const activate = () => {
  setup();
  new SizingPopup();
};

export default activate;
