import settings from './settings';

/**
 * Calculate time from today to given Date-compatible string
 */
export const calculateTimeFromToday = (dateString) => {
  const chosenDate = new Date(dateString);
  const today = new Date();

  const dateDiff = (chosenDate - today) / 86400000;

  return Math.max(0, Math.ceil(dateDiff));
}

/**
 * Get the messaging for delivery given how far from today
 */
export const getMessaging = (dateString) => {
  const days = calculateTimeFromToday(dateString);

  let message = {};

  if(days >= 1 && days <= 14) {
    message.line1 = `That's great! We can deliver on or before ${dateString}`;
  } else if(days > 14 && days <= 84) {
    message.line1 = `Wow, you're organised! Order now for guaranteed delivery`;
    message.line2 = `Order today and select ${dateString} at the checkout`;
  } else if(days > 84) {
    message.line1 = `Wow, you're organised! Set yourself a reminder`;
    message.line2 = `We can only take orders for up to 12 weeks away. <a class="col-11 ${settings.ID}-init-pressie-reminder">But we can remind you</a>`;
  }

  return message;
}

/**
 * Should show countdown, depends on cutoff
 */
export const shouldShowCountdown = () => {
  const now = new Date();
  const curDow = parseInt(now.getDay(), 10);

  return settings.validDeliveryDays.indexOf(curDow) > -1 && now < settings.cutoffDate;
}
