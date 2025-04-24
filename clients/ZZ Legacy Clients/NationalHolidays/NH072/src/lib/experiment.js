/**
 * NH072 - Offers Page Redesign
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';

const activate = () => {
  setup();

  // Experiment code
  
  /**
   * @desc User lands on Offers page
   * Loader is shown and they are redirected to the '/holidayoffers' page
   */
  if (window.location.pathname === '/offers') {
    // Change Loader Message
    const loaderMessage = document.querySelector('#divSearchPopup div.searching p');
    loaderMessage.innerText = 'Loading Holiday Offers...';
    document.querySelector('#divSearchPopup').setAttribute('style', 'display: block !important;');
    setTimeout(function(){ 
      // Redirect
      window.location.href = 'https://www.nationalholidays.com/holidayoffers';
    }, 2000);
  /**
   * @desc User is on any other page of the site
   * We replace the href on the "Offers" item on the navigation menu
   */
  } else {
    const navItems = document.querySelectorAll('.container nav ul li');
    for (let i = 0; i < navItems.length; i += 1) {
      const item = navItems[i];
      if (item.querySelector('a')) {
        const link = item.querySelector('a');
        const linkText = link.innerText.trim();
        if (linkText === 'Offers') {
          link.setAttribute('href', '/holidayoffers');

          break;
        }
      }
    }
  }
  
};

export default activate;
