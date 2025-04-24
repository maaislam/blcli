const checkDeliveryTime = () => {
  const now = new Date();
  const day = now.getDay(); // Get day of the week (0=Sunday, 1=Monday, ..., 6=Saturday)
  const hour = now.getHours();
  let cutoffHour;

  // Set cutoff time based on weekday or weekend
  if (day >= 1 && day <= 5) {
    // Weekdays (Monday to Friday)
    cutoffHour = 21; // 9:00 PM
  } else {
    // Weekends (Saturday and Sunday)
    cutoffHour = 16; // 4:00 PM
  }

  // Calculate remaining time until cutoff
  let remainingTime;
  if (hour < cutoffHour) {
    const cutoffTime = new Date(now);
    cutoffTime.setHours(cutoffHour, 0, 0, 0); // Set cutoff time for today
    remainingTime = cutoffTime - now; // Calculate remaining milliseconds
  } else {
    // Cutoff time has passed, calculate remaining time until next day's cutoff
    const nextDay = new Date(now);
    nextDay.setDate(nextDay.getDate() + 1); // Move to next day
    nextDay.setHours(cutoffHour, 0, 0, 0); // Set cutoff time for next day
    remainingTime = nextDay - now; // Calculate remaining milliseconds
  }

  return remainingTime;
};

// To clear the interval from any other function:
// clearInterval(intervalId);
export default checkDeliveryTime;
