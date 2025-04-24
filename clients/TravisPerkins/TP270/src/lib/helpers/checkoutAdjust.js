import { pollerLite } from '../../../../../../lib/utils';

const MOBILE_SCROLL_ADJUSTMENT_VAL = 80;

const checkoutAdjust = (ID) => {
  pollerLite(['[data-test-id="calendar-slot"]'], () => {
    const selectedDateIndex = parseInt(sessionStorage.getItem(`${ID}__selected-delivery-date`));
    const desktopSlots = document.querySelectorAll('[data-test-id="swipeable-list"] [data-test-id="calendar-slot"]');
    const fallbackSlots = document.querySelectorAll('[data-test-id="basket-branch-entries"] [data-test-id="calendar-slot"]');
    const slots = desktopSlots.length ? desktopSlots : fallbackSlots;
    slots[selectedDateIndex]?.click();
  });
};

export default checkoutAdjust;
