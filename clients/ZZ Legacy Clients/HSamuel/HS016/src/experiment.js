/**
 * HS016 - Sticky CTAs
 * @author Lewis Needham - User Conversion
 */
import { setup } from './services';
import StickyCTA from './components/stickyCTA/component';

const activate = () => {
  setup();
  StickyCTA();
};

export default activate;
