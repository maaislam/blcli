/**
 * RC049 - Increase high net worth bookings
 * @author User Conversion
 */
import { events } from '../../../../../lib/utils';
import { setup } from './services';
import settings from './settings';
import { cacheDom } from './../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();

  // Experiment code
  if (window && window.location && window.location.pathname && window.location.pathname !== '/What-we-do/key-account-management-service.aspx') {
    // Step 1 - Add extra info on bookings
    const extraInfo = `<p class='RC049-extraInfo rc4-search-box__group-bookings'>or find out how you can benefit from a  
    <a href='/What-we-do/key-account-management-service.aspx'>key account managed service</a> with discounted rates</p>`;

    pollerLite(['.rc4-search-box__group-bookings',], () => {
      document.querySelector('.rc4-search-box__group-bookings').insertAdjacentHTML('afterend', extraInfo);
    });

    const extraInfoLink = document.querySelector('.RC049-extraInfo a');
    extraInfoLink.addEventListener('click', (e) => {
      e.preventDefault();
      events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - 'key account managed service' on the homepage search box`, { sendOnce: true });
      sessionStorage.setItem('RC049-redirect-to-page', true);
      window.location.href = '/What-we-do/key-account-management-service.aspx';
    });
    
    // Step 2 - Add new banner on Workplace Courses
    pollerLite(['.RC022_workplace_option'], () => {
      const workplaceSelectBtn = document.querySelector('.RC022_workplace_option');
      workplaceSelectBtn.addEventListener('click', () => {
        pollerLite([
          '.rc4-options-overlay.rc4-options-overlay--work.rc4-options-overlay--active',
          '.custom-courseTitle',
          '.RC022_options-overlay__description',
        ], () => {
          const workplaceBanner = `<div class='RC049-banner__wrapper'>
            <div class='RC049-banner'>
              <div class='RC049-banner__title'>Booking for a large workforce?</div>
              <div class='RC049-banner__text'>Find out how you can benefit from a <a href='/What-we-do/key-account-management-service.aspx'>key account managed service</a> with discounted rates</div>
            </div>
          </div>`;

          document.querySelector('.RC022_options-overlay__description').insertAdjacentHTML('afterend', workplaceBanner);

          const bannerLink = document.querySelector('.RC049-banner__text a');
          bannerLink.addEventListener('click', (e) => {
            e.preventDefault();
            events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - 'key account managed service' on the select a course workplace section`, { sendOnce: true });
            sessionStorage.setItem('RC049-redirect-to-page', true);
            window.location.href = '/What-we-do/key-account-management-service.aspx';
          });
        });
      });
    });
  } else {
    // User visits key-account-management-service page after being redirected
    if (sessionStorage.getItem('RC049-redirect-to-page')) {
      events.send(settings.ID, `Variation ${settings.VARIATION}`, `User Saw - /What-we-do/key-account-management-service.aspx`, { sendOnce: true });
      sessionStorage.removeItem('RC049-redirect-to-page');
    }
  }
};

export default activate;
