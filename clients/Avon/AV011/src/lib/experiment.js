/**
 * AV011 - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion (Lewis Needham)
 */
import { setup, share } from './services';
import desktopChanges from './desktop/desktop';
import mobileChanges from './mobile/mobile';

export default () => {
  const $ = window.angular.element;
  const rootScope = window.AppModule.RootScope;
  share({ $, rootScope });
  setup();

  /**
   * Get the device layout name
   * @returns {string}
   */
  const getDeviceName = () => rootScope.Layout.Name.toLowerCase();

  /**
   * Get a function that applies the experiment changes for a
   * specific device
   * @param {string} layoutName
   * @returns {Function}
   */
  const getDeviceChanges = (deviceName) => {
    const devices = {
      desktop: desktopChanges,
      tablet: desktopChanges,
      phone: mobileChanges,
      default: null,
    };

    return devices[deviceName] || devices.default;
  };

  /**
   * Make experiment changes
   */
  const applyDeviceChanges = () => {
    const device = getDeviceName();
    const deviceChanges = getDeviceChanges(device);
    if (deviceChanges instanceof Function) {
      try {
        deviceChanges();
      } catch (err) {
        console.log(err);
      }
    }
  };

  rootScope.$on('App_LayoutChanged', () => {
    applyDeviceChanges();
  });
  applyDeviceChanges();
};
