/**
 * TRG003 - Store menu user retention
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import settings from './settings';
import { pollerLite, observer } from '../../../../../lib/uc-lib';

const { ID, VARIATION } = settings;

const activate = () => {
  if (!document.querySelector(`.${settings.ID}-buttons__wrapper`)) { 
    setup();

    const urlPathname = window.location.pathname;
    const res = urlPathname.split('/');
    if (res.length >= 4) {
      const store = res[2];
      let offMessageContent = '';
      if (settings.VARIATION === '2') {
        offMessageContent = `<div class="${settings.ID}-offMessage__wrapper">
          <div class="${settings.ID}-offMessage">40% OFF!</div>
        </div>`;
      }
      
      const newButtonContainer = `<div class="${settings.ID}-buttons__wrapper ${settings.ID}-buttons__wrapper__v${settings.VARIATION}">
        <div class="${settings.ID}-btn" id="${settings.ID}-bookTable">
          <div class="${settings.ID}-btn__content">
            <a href='/restaurants/${store}/book' class="${settings.ID}-bookCta">Book a table</a>
            <div class="${settings.ID}-button__icon"></div>
          </div>
        </div>
        <div class="${settings.ID}-btn" id="${settings.ID}-clickCollect">
          ${offMessageContent}
          <div class="${settings.ID}-btn__content">
            <a href='/restaurants/${store}/takeaway/menu'>Click & Collect</a>
            <div class="${settings.ID}-button__icon"></div>
          </div>
        </div>
      </div>`;

      // // Click buttons - Update
      // const bookTableCta = document.querySelector(`#${settings.ID}-bookTable`);
      // bookTableCta.addEventListener('click', () => {
      //   window.location.href = `/restaurants/${store}/book`;
      // });
      // const clickCollectCta = document.querySelector(`#${settings.ID}-clickCollect`);
      // clickCollectCta.addEventListener('click', () => {
      //   window.location.href = `/restaurants/${store}/takeaway/menu`;
      // });

      pollerLite(['section.menu-header'], () => {
        const menuHeader = document.querySelector('section.menu-header');

        if (!document.querySelector(`${settings.ID}-buttons__wrapper`)) {
          menuHeader.insertAdjacentHTML('afterend', newButtonContainer);
          if (settings.VARIATION === '2' && window.innerWidth <= 501) {
            document.querySelector(`.${settings.ID}-bookCta`).innerHTML = 'Book a table <span>now</span>';
          }
          // Get the header
          const header = document.querySelector(`.${settings.ID}-buttons__wrapper`);

          // Get the offset position of the navbar
          const sticky = header.offsetTop;

          window.addEventListener('scroll', () => {
            if (window.pageYOffset > sticky) {
              header.classList.add("sticky");
            } else {
              header.classList.remove("sticky");
            }
          });
        }


        // Click buttons - Update
        const bookTableCta = document.querySelector(`#${settings.ID}-bookTable`);
        bookTableCta.addEventListener('click', () => {
          window.location.href = `/restaurants/${store}/book`;
        });
        const clickCollectCta = document.querySelector(`#${settings.ID}-clickCollect`);
        clickCollectCta.addEventListener('click', () => {
          window.location.href = `/restaurants/${store}/takeaway/menu`;
        });
      });

      const menuLinks = document.querySelectorAll('.library .section-container');
      [].forEach.call(menuLinks, (link) => {
        const iconLink = link.querySelector('a');
        if (iconLink) {
          const href = iconLink.getAttribute('href');
          // if (href.indexOf('/dessert') === -1) {
            // --- User clicks on submenu container
            link.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = href;
            });
            // --- User clicks on submenu icon (plus or back arrow)
            iconLink.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = href;
            });
          // }
        }
      });

      if (document.querySelector('.library h2.main')) {
        const mainMenuLink = document.querySelector('.library h2.main');
        const iconLink = mainMenuLink.querySelector('a');
        const href = iconLink.getAttribute('href');
        // --- User clicks on submenu icon (plus or back arrow)
        iconLink.addEventListener('click', () => {
          window.location.href = href;
        });
      }
    }
  }
};

export default activate;
