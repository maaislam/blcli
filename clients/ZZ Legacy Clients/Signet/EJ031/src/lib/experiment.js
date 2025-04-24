/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import hotspots from './components/hotspots';
import NewContent from './components/markup';
import shared from './shared';
import HotspotNav from './components/hotspotLinks';

export default () => {
  setup();

  // add the new content
  const markup = new NewContent();
  hotspots();

  if(shared.VARIATION === '2') {
    const hotspotNav = new HotspotNav();
  }
};
