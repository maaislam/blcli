import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

/**
 * {{HD018}} - {{Binaural Hearing Aid}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'HD018',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    events.useLegacyTracker();

    /**
     * @desc Product Page
     */
    if (window.dataLayer && window.dataLayer[0] && window.dataLayer[0].pageCategory === 'product-detail') {
      // Build Message Container
      components.createMessageContainer();
      /**
       * @desc Shows message when selected value is 'Left' or 'Right'
       */
      poller(['.product__options .last .input-box > select'], () => {
        document.querySelector('.product__options .last .input-box > select').addEventListener('change', (e) => {
          const selectedValue = e.currentTarget.children[e.currentTarget.selectedIndex].textContent;
          if (selectedValue === 'Right' || selectedValue === 'Left') {
            document.querySelector('.HD018-messageWrapper').classList.remove('hidden');
          } else {
            document.querySelector('.HD018-messageWrapper').classList.add('hidden');
            if (selectedValue === 'Both') {
              events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked Both on Variation`, { sendOnce: true }); // eslint-disable-line quotes
            }
          }
        });
      });
    /**
     * @desc Checkout Page
     */
    } else if (window.location && window.location.href.indexOf('/checkout/cart') > -1) {
      const allBasketProducts = document.querySelectorAll('tbody > tr');

      let productsInBasket = []; // eslint-disable-line prefer-const
      let fullMessageShown = false;
      [].forEach.call(allBasketProducts, (product) => {
        if (product.querySelector('dd')) {
          const earDeviceSelected = product.querySelector('dd').textContent.trim();
          if (earDeviceSelected === 'Both') {
            return;
          }
          const productName = product.querySelector('.cart-item > a').getAttribute('title');
          const href = product.querySelector('.cart-info > p.title > a').href; // eslint-disable-line prefer-destructuring
          const qty = product.querySelector('td.quantity .input-qty').textContent.trim();
          if (productsInBasket.indexOf(productName) === -1 && qty <= 1) {
            productsInBasket.push(productName);
            // Shows appropriate message after product
            fullMessageShown = components.addMessageOnBasketProduct(product, fullMessageShown, href); // eslint-disable-line max-len
          }
        } else {
          return; // eslint-disable-line no-useless-return
        }
      });
    }

    // 'Go Back' Links
    const productLinks = document.querySelectorAll('.HD018-message__link');
    [].forEach.call(productLinks, (link) => {
      link.querySelector('a').addEventListener('click', () => {
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked 'Go Back' link`, { sendOnce: true }); // eslint-disable-line quotes
      });
    });

    // Edit Button
    const allEditButtons = document.querySelectorAll('tbody tr .cart-links a.link-edit');
    [].forEach.call(allEditButtons, (edit) => {
      edit.addEventListener('click', () => {
        events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked Edit Product`, { sendOnce: true }); // eslint-disable-line quotes
      });
    });
  },
  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    createMessageContainer() {
      const messageContainer = `<div class='HD018-messageWrapper hidden'>
        <div class='HD018-messageContainer'>
          <div class='HD018-message__top'>We recommend purchasing two hearing aids, instead of one</div>
          <div class='HD018-message__main'>If an evaluation by a hearing professional indicates that you have hearing loss in both ears, and especially where the degree of loss is similar, two hearing aids are usually recommended. While it may be tempting to try to limit the cost by going with a single hearing aid, the truth is that one hearing aid simply cannot do the job of two.</div>
        </div>
      </div>`;

      document.querySelector('div.product__options.product__options-separator').insertAdjacentHTML('afterend', messageContainer);
    },
    addMessageOnBasketProduct(product, fullMessageShown, href) {
      let message = '';
      switch (fullMessageShown) { // eslint-disable-line default-case
        case false:
          message = `<tr><td colspan='4'><div class='HD018-basketMessageWrapper'>
            <div class='HD018-basketMessageContainer'>
              <div class='HD018-message__top'>We recommend purchasing two hearing aids, instead of one</div>
              <div class='HD018-message__why'>Why?</div>
              <div class='HD018-message__list'>
                <ul class='message-list'>
                  <li class='list-item'>If your ears have similar levels of hearing loss, hearing in stereo rather than mono improves the quality of sound</li>
                  <li class='list-item'>Sound signals from both ears give your brain a better chance to locate where sounds are coming from</li>
                  <li class='list-item'>With two hearing aids you can have them set at a lower volume than what would be needed from just one. This helps to make listening more comfortable, especially in noisy environments. Remember that you can always return one within our 30 day money back return period if need be.</li>
                </ul>
              </div>
              <div class='HD018-message__link'><a href='${href}'>Go back to the product page to add the other hearing aid here</a></div>
            </div>
          </div></td></tr>`;
          fullMessageShown = true; // eslint-disable-line no-param-reassign
          break;
        case true:
          message = `<tr><td colspan='4'><div class='HD018-basketMessageWrapper'>
            <div class='HD018-basketMessageContainer'>
              <div class='HD018-message__top'>We recommend purchasing two hearing aids, instead of one</div>
              <div class='HD018-message__link'><a href='${href}'>Go back to the product page to add the other hearing aid here</a></div>
            </div>
          </div></td></tr>`;
          break;
      }
      product.insertAdjacentHTML('afterend', message);
      return fullMessageShown;
    },
  },
};

export default Experiment;
