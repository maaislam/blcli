import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{ID}} - {{Experiment Title}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PJ017',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);


    /**
    * if the user goes to the basket from the "order again function" show basket message
    */
    poller([
      () => window.jQuery,
    ], () => {
      if (!sessionStorage.getItem('PJ017-repeat_order')) {
        $.ajax({
          url: 'https://www.papajohns.co.uk/my-previous-orders.aspx',
          success: (data) => {
            const d = document.createElement('div');
            d.innerHTML = data;
            const lastOrders = $('.orderDate');
            if (lastOrders) {
              components.createOrderAgainButton();
              components.getLastOrder();
            }
          },
        });
      } else if (!sessionStorage.getItem('PJ017-confirm_seen')) {
        components.addConfirmation();
        setTimeout(() => {
          document.querySelector('.PJ017-basket_confirmation').remove();
        }, 5000);
        sessionStorage.setItem('PJ017-confirm_seen', 1);
      }
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * @desc Add the order again button to the homepage
     */
    createOrderAgainButton: function createOrderAgainButton() {
      let pageWrapper;
      const URL = window.location.pathname;
      if (URL.indexOf('offers.aspx') > -1) {
        if (window.innerWidth > 500) {
          pageWrapper = document.querySelector('#ctl00_cphBody__objOffers_upOffers .main');
        } else {
          pageWrapper = document.querySelector('.main.mainMobileInside');
        }
      } else {
        if (window.innerWidth > 500) { // eslint-disable-line no-lonely-if
          pageWrapper = document.querySelector('#ctl00_cphBody_pnlMain');
        } else {
          pageWrapper = document.querySelector('.main.mainMobileInside');
        }
      }
      // get the users name
      const userName = document.querySelector('#ctl00__objHeader_pnlLoggedInUserTitle .bodyText span').textContent;
      // create the new div

      const orderAgainButton = document.createElement('div');
      orderAgainButton.classList.add('PJ017-order_again_wrapper');
      orderAgainButton.innerHTML =
      `<div class="PJ017-order_text">
        <div class="PJ017-userText"><span>${userName}</span>Want to order the same as last time?</div>
        <div class="PJ017-order_content"></div>
        <a class="PJ017-order_again" href="#">Order Again</a>
      </div>`;

      pageWrapper.insertBefore(orderAgainButton, pageWrapper.firstChild);
    },
    /**
     * @desc Pull in the last order using ajax
     */
    getLastOrder: function getLastOrder() {
      const orderURL = 'https://www.papajohns.co.uk/my-previous-orders.aspx';
      const request = new XMLHttpRequest();
      request.open('GET', orderURL, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          const temp = document.createElement('div');
          temp.innerHTML = request.responseText;
          const lastOrder = temp.querySelector('.orderItem');
          document.querySelector('.PJ017-order_content').appendChild(lastOrder);

          // on click of the order again button
          const orderAgain = document.querySelector('.PJ017-order_again');
          /* eslint-disable */
          orderAgain.addEventListener('click', (e) => {
            e.preventDefault();
            events.send('PJ017','Order Again Click', 'PJ017 order again button clicked', { sendOnce: true });
            // append the form to the body
            const previousOrderform = temp.querySelector('form');
            previousOrderform.id = 'PJ017-form';
            document.body.insertAdjacentElement('beforeend', previousOrderform);
            previousOrderform.__EVENTTARGET.value = 'ctl00$cphBody$rptPreviousOrders$ctl00$lbOrderAgain';
            previousOrderform.__EVENTARGUMENT.value = '';

            // submit the form so the page does not go to the basket
            jQuery.ajax({
              url: '/my-previous-orders.aspx',
              data: jQuery('#PJ017-form').serialize(),
              type: 'post',
              success: function(data) {
                sessionStorage.setItem('PJ017-repeat_order',1); 
                location.reload();
              },
              error: function() {
                // does this get called ever?
              }
            });
            
          /* eslint-enable */
          });
        }
      };
      request.send();
    },
    /**
     * @desc add the confirmation message
     */
    addConfirmation: function addConfirmation() {
      let pageWrapper;
      const URL = window.location.pathname;
      if (URL.indexOf('offers.aspx') > -1) {
        if (window.innerWidth > 500) {
          pageWrapper = document.querySelector('#ctl00_cphBody__objOffers_upOffers .main');
        } else {
          pageWrapper = document.querySelector('.main.mainMobileInside');
        }
      } else {
        if (window.innerWidth > 500) { // eslint-disable-line no-lonely-if
          pageWrapper = document.querySelector('#ctl00_cphBody_pnlMain');
        } else {
          pageWrapper = document.querySelector('.main.mainMobileInside');
        }
      }
      const basketMessage = document.createElement('div');
      basketMessage.classList.add('PJ017-basket_confirmation');
      basketMessage.innerHTML = '<p class="PJ017-confirm_message">Thanks! Your previous order has been added to your basket!</p>';
      pageWrapper.insertBefore(basketMessage, pageWrapper.firstChild);
    },
  },
};

export default Experiment;
