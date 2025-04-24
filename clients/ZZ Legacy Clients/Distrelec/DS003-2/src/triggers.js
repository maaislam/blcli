import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * Get user data from localStorage or data layer if it exists
 * @returns {object|undefined}
 */
const getUserData = () => {
  const localSegments = window.localStorage.DS003 ? JSON.parse(window.localStorage.DS003) : undefined;
  const segments = window.digitalData.user[0].segment;
  const dataLayer = Object.prototype.hasOwnProperty.call(segments, 'areaofuse') ? segments : undefined;
  if (dataLayer && localSegments !== dataLayer) {
    // Local storage is out of date, update data
    window.localStorage.DS003 = JSON.stringify(dataLayer);
  }

  return dataLayer || localSegments;
};


if (getUserData()) {
  pollerLite([
    '.skin-metahd-item-search',
    () => !!window.digitalData,
  ], activate);
}
