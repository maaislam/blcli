/**
 * UKB006 - Itinerary pages - Mobile redesign
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import reRunSlick from './reRunSlick';
import createSelectSectionAndIcons from './createSelectSectionAndIcons';
import movePricesAndBookInSticky from './movePricesAndBookInSticky';
import iconEventListeners from './iconEventListeners';
import moveSeeMoreDates from './moveSeeMoreDates';
import increaseHotelIconSize from './increaseHotelIconSize';
import scrollToSection from './scrollToSection';

const activate = () => {
  setup();
  // Experiment code
  // De-activate Slick on Page and re-run it
  reRunSlick();

  /**
   * @desc Get Select Options from Desktop View (they are hidden on mobile)
   * and create new select section field &
   * creates Email and Shortlist icons
   */
  createSelectSectionAndIcons();


  /**
   * @desc Move Prices and Book Now CTA in a sticky container
   */
  movePricesAndBookInSticky();

  /**
   * @desc Icons - Click Event Listeners
   */
  iconEventListeners();

  /**
   * @desc Move 'See more dates'
   */
  moveSeeMoreDates();

  /**
   * @desc Increase size of Hotel icons
   */
  increaseHotelIconSize();

  /**
   * @desc Scroll to Section
   */
  scrollToSection();
};

export default activate;
