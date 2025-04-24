/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from '../../../../core-files/shared';

const { ID } = shared;

if (window.location.href.includes('/search')) {
  pollerLite(['.qa-hotel.hotel-card'], activate);
} else if (window.location.href.includes('/hotels/')) {
  pollerLite([() => typeof window.hotelInfo === 'object'], () => {
    //store hotel info in local storage
    //keep previous data if it exists in local storage
    const prevViewedHotels = JSON.parse(localStorage.getItem(`${ID}__hotelInfo`)) || [];

    if (!prevViewedHotels.some((prevHotel) => prevHotel.title === window.hotelInfo.title)) {
      prevViewedHotels.push(window.hotelInfo);
    }

    console.log('prevViewedHotels - localStorage: ', prevViewedHotels);

    localStorage.setItem(`${ID}__hotelInfo`, JSON.stringify(prevViewedHotels));
  });
}
