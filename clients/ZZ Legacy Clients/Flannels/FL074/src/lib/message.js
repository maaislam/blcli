import { pollerLite } from '../../../../../lib/uc-lib';
import settings from './settings';

const { ID, VARIATION } = settings;


const closeIt = (popup) => {
  popup.parentNode ? popup.parentNode.removeChild(popup) : null;
  document.body.classList.remove('FL074-open');
};

const message = {

  html(isSuccess, isBday, bdayTreat, isLoggedIn) {

    if (isBday) {
      return `
        <div class="FL074-message${isSuccess ? ' codeAdded' : ''}">
          <div class="FL074-message--wrap">
            <div class="message-container">
              <div class="close">
                <span></span>
              </div>
              <p class="title"><strong>Oops. Something went wrong..</strong></p>

              <p>We’re sorry. You need to be logged in to use that code. We assigned the code to your account, so if you received a birthday email from us in the past 30 days, please login to your account <a href="https://www.flannels.com/Login">here</a> and try again.</p>

            </div>
          </div>
        </div>
      `;
    } else if (bdayTreat && !isLoggedIn) {
      return `
        <div class="FL074-message${isSuccess ? ' codeAdded' : ''}">
          <div class="FL074-message--wrap">
            <div class="message-container">
              <div class="close">
                <span></span>
              </div>
              <p class="title"><strong>Oops. Something went wrong..</strong></p>

              <p>Did you receive an email from us recently with a special birthday promotion? If so, please log in to your account <a href="https://www.flannels.com/Login">here</a> and type BIRTHDAYTREAT into the voucher code field on your return to this page.</p>

            </div>
          </div>
        </div>
      `;
    } else {
      if (VARIATION == 2) {
        return `
          <div class="FL074-message${isSuccess ? ' codeAdded' : ''}">
            <div class="FL074-message--wrap">
              <div class="message-container">
                <div class="close">
                  <span></span>
                </div>
                ${isSuccess ? '' : '<p class="title"><strong>Oops. Something went wrong..</strong></p>'}
  
                ${isSuccess ? '<p>Your code has been successfully applied. Please continue to checkout</p>' : '<p>You seem to have entered an invalid promotional code. Please note we currently have no discount codes live on site.</p>'}
  
                <button id="FL074Checkout" class="btn">Checkout Securely</button>
  
              </div>
            </div>
          </div>
        `;
      }
    }


  },

  addIt(html, el) {
    console.log('add it = ', {
      html, 
      el
    })
    if (!document.querySelector('.FL074-message')) {
      el.insertAdjacentHTML('beforeend', html);
      document.body.classList.add('FL074-open');
    }
  },

  addEvents(backBtn) {  
    pollerLite([
      '.FL074-message',
      '.FL074-message--wrap',
      '.FL074-message .close',
    ], () => {
      const popup = document.querySelector('.FL074-message');
      const btn = document.getElementById('FL074Checkout');
      const close = document.querySelector('.FL074-message .close');
      const popupWrap = document.querySelector('.FL074-message--wrap');
  
      if (btn) {
        btn.addEventListener('click', () => {
          backBtn.click();
        });
      }
  
      if (close) {
        close.addEventListener('click', () => {
          closeIt(popup);
        });
      }
  
      if (popupWrap && popup) {
        popup.addEventListener('click', (e) => {
          const inside = popupWrap.contains(e.target);
          if (!inside) {
            closeIt(popup);
          }
        });
      }
    });
  },

  /**
   * 
   * @param {Element} el - Ref
   * @param {Element} contBack - DOM Node
   * @param {Boolean} isSuccess Boolean
   * @param {Boolean} isBday Boolean
   * @param {Boolean} bdayTreat Boolean
   * @param {Boolean} isLoggedIn Boolean
   */
  init(el, contBack, isSuccess, isBday, bdayTreat, isLoggedIn) {
    if (el) {
      this.addIt(this.html(isSuccess, isBday, bdayTreat, isLoggedIn), el);
    }
  },
};

export default message;