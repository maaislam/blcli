/**
 * Get logged in user profile
 */
const getLoggedInUserProfile = () => {
  const profileData = ((((window.digitalData || {}).user || [])[0] || {}).profile || [])[0];
  if(profileData && profileData.profileInfo && profileData.profileInfo.profileID != 'loggedOut') {
    return profileData;
  } else {
    return false;
  }
};

/**
 * Is user logged in?
 */
export const isUserLoggedIn = () => {
  return !!getLoggedInUserProfile();
};
