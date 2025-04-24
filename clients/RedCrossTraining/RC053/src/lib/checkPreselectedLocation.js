import { pollerLite } from '../../../../../lib/uc-lib';
import state from './state';

export default () => {
  // Desktop
  const locationField = document.querySelector('input#main_0_homepagetopcomponents_0_rctcontainer1placeholder_0_rctsubcontainer1placeholder_0_TextBox_AddressOrPostCode');
  if (locationField && locationField.value !== '') {
    state.locationChosen = true;
  }
  // Mobile
  pollerLite(['input#main_0_homepagetopcomponents_0_rctcontainer1placeholder_0_rctsubcontainer1placeholder_0_TextBox_AddressOrPostCode'], () => {
    const mobileLocationField = document.querySelector('input#main_0_homepagetopcomponents_0_rctcontainer1placeholder_0_rctsubcontainer1placeholder_0_TextBox_AddressOrPostCode');
    if (mobileLocationField && mobileLocationField.value !== '') {
      state.locationChosen = true;
    }
  });
};