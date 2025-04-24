/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getUserProfile, getProfileType, share } from './lib/services';
import { pollerLite } from '../../../../lib/uc-lib';

const userProfile = getUserProfile();
const profileType = getProfileType(userProfile);
const { deviceType } = userProfile;
const excludedProfiles = [8];
const isExcludedProfile = excludedProfiles.indexOf(profileType) > -1;
const isActiveDevice = deviceType === 'desktop' || deviceType === 'mobile';

if (profileType && !isExcludedProfile && isActiveDevice) {
  share({
    userProfile,
    profileType,
  });

  if (deviceType === 'mobile') {
    pollerLite(['#main-nav'], activate);
  } else if (deviceType === 'desktop') {
    pollerLite(['body'], activate);
  }
}
