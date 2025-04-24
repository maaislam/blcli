import { costPage, tabPage } from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

// Helper function to determine if current time meets time condition
const checkDate = () => {
  /* Time conditions
  * Mon - Fri: 8am - 7pm
  * Sat & Sun: 9am - 5:30pm
  */
  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentDay = currentDate.getDay();
  // Check if Saturday or Sunday
  if (currentDay === 0 || currentDay === 6) {
    /* Current hour greater/equal to 9am and less than 5pm
    * If time equals 5pm, check if minutes are less than 30
    * */
    if (currentHours >= 9 && currentHours < 17) {
      return true;
    } else if (currentHours === 17 && currentMinutes < 30) {
      return true;
    }
    /* If not Saturday/Sunday
    * Current hour greater/equal to 8am
    * And less than 7pm
    * */
  } else if (currentHours >= 8 && currentHours < 19) {
    return true;
  }
  return false;
};

if (checkDate()) {
  if (window.location.pathname.indexOf('costs-funding') === -1) {
    pollerLite([
      'body',
      () => {
        let priceTabFound = false;
        const allNavLinks = document.querySelectorAll('.nav-justified > li > a');
        for (let i = 0, n = allNavLinks.length; i < n; i += 1) {
          const currentText = allNavLinks[i].textContent.trim().toUpperCase();
          if (currentText.indexOf('PRICE') !== -1 || currentText.indexOf('COSTS') !== -1) {
            priceTabFound = true;
            break;
          }
        }
        return priceTabFound;
      },
    ], tabPage);
  } else if (window.location.pathname.indexOf('costs-funding') !== -1) {
    costPage();
  }
}

