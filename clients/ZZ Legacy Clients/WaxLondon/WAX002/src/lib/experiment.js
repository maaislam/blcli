/**
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

/**
 * Entry point for experiment
 */
export default () => {
  if(document.body.classList.contains(`${shared.ID}`)) {
    return;
  }

  setup();

  // --------------
  // Modify title
  // --------------
  const pageTitle = document.querySelector('#page-title');
  if(pageTitle) {
    pageTitle.innerHTML = 'Checkout';
  }
  
  // --------------
  // Order of buttons changed
  // --------------
  const registerCols = document.querySelectorAll('#checkout-login-page > .row > .col-md-6');
  if(registerCols[1]) {
    const buttons = registerCols[1].querySelectorAll('.button');

    const button1 = buttons[0];
    const button2 = buttons[1];
    const separator = registerCols[1].querySelector('.separator');

    if(button1 && button2 && separator) {
      separator.insertAdjacentElement('afterend', button1);
      separator.insertAdjacentElement('beforebegin', button2);

      button1.addEventListener('click', () => {
        events.send(`${shared.ID}-${shared.VARIATION}`, 'did-click-create-account-btn');
      });

      button2.addEventListener('click', () => {
        events.send(`${shared.ID}-${shared.VARIATION}`, 'did-click-continue-guest-btn');
      });
    }
  }
  
  // --------------
  // Convincer strip added
  // --------------
  const checkoutContainer = document.querySelector('#checkout-login-page');
  if(checkoutContainer) {
    checkoutContainer.insertAdjacentHTML('beforeend', `
      <div class="row">
        <div class="col-xs-12 ${shared.ID}-trustrow">
          <div>
            <img src="https://ucds.ams3.digitaloceanspaces.com/wax002/wax002-01.jpg">
          </div>
          <div>
            <img src="https://ucds.ams3.digitaloceanspaces.com/wax002/wax002-02.jpg">
          </div>
          <div>
            <img src="https://ucds.ams3.digitaloceanspaces.com/wax002/wax002-03.jpg">
          </div>
        </div>
      </div>
    `);

    if(window?.jQuery?.fn?.slick) {
      if(window.innerWidth < 900) {
        jQuery(`.${shared.ID}-trustrow`).slick({
          dots: false,
          arrows: false,
          mobileFirst: true,
          infinite: true,
          autoplaySpeed: 1000,
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 580,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 900,
              settings: 'unslick',
            },
          ]
        });

        setTimeout(() => {
          jQuery(`.${shared.ID}-trustrow`).slick('refresh');
        }, 1500);
      }
    }
  }
};
