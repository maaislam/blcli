import settings from './settings';

export const qualifiesForFreeDelivery = (currentSubtotal) => {
  return settings.FREE_DELIVERY_THRESHOLD - currentSubtotal <= 0;
};
