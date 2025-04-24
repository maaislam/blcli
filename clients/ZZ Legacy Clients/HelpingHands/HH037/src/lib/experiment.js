/**
 * HH037 - Reonboarding Users Based on Intent
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion - Lewis Needham
 */
import { setup, updateInfinityNumbers } from './services';
import DesktopHeader from './components/DesktopHeader/DesktopHeader';
import MobileHeader from './components/MobileHeader/MobileHeader';
import shared from './shared';

export default () => {
  setup();

  const { userProfile, profileType } = shared;
  const { deviceType } = userProfile;
  let header;
  if (deviceType === 'desktop') {
    header = new DesktopHeader(profileType);
  } else if (deviceType === 'mobile') {
    header = new MobileHeader(profileType);
  }

  // Update Infinity Numbers to match patch if on a location page (/our-locations)
  const isLocationPage = /\/our-locations\/w+/.test(window.location.href);
  if (isLocationPage) {
    updateInfinityNumbers(header.component);
  }
};
