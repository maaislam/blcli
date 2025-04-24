/**
 * AV003 - Sticky total and Sub-total update
 * @author User Conversion
 */
import {
  setup,
  rearrangeSummary,
  watchCartSummary,
} from './services';
import settings from './settings';
import StickyCartHeader from './components/StickyCartHeader/StickyCartHeader';
import {
  poller
} from '../../../../../lib/uc-lib';
const activate = () => {
  setup();
  const {
    ID
  } = settings;
  const rootScope = window.AppModule.RootScope;
  /**
   * Apply all page changes
   * fitamutapa@geo-crypto.com
   */
  const applyChanges = () => {
    let cartItemsCount;
    let subTotal;
    if(window.innerWidth <= 768){
      cartItemsCount = document.querySelector('.CartHeader h2 .products-count').textContent.trim().replace(/(|)/g, '');
      subTotal = document.querySelector('.Cart-Summary .Cart-SubTotal').textContent.trim();
    } else {
      cartItemsCount = document.querySelector('.CartHeader .CartHeader-left .products-count').textContent.trim().replace(/(|)/g, '');
      subTotal = document.querySelector('.Cart-SubTotal-Wrapper .Cart-SubTotal').textContent.trim();
    }
    const stickyCartHeader = new StickyCartHeader({
      cartItems: cartItemsCount,
      subTotal: subTotal,
    });
    const voucherButton = document.querySelector('.Cart-Coupon .code form a span');
    voucherButton.textContent = 'Apply voucher';
  };

  // Init
  applyChanges();
  rearrangeSummary();
  if(window.innerWidth > 768){
    const newPayment = document.createElement('div');
    newPayment.classList.add(`${ID}_paymentBlock`);
    newPayment.innerHTML = `
      <img style="width: 5rem; height: 3rem; margin: -1.2rem 0.5rem 0 0;" src="https://a57ed064b59d6d24a0db-e6a144f900fc09b8b2fc3bba00c88f87.ssl.cf3.rackcdn.com/media/2976519/maestro.png" alt="Maestro">
      <img style="width: 5rem; height: 3rem; margin: -1.2rem 0.5rem 0 0;" src="https://a57ed064b59d6d24a0db-e6a144f900fc09b8b2fc3bba00c88f87.ssl.cf3.rackcdn.com/media/2976520/mastercard.png" alt="MasterCard">
      <img style="width: 5rem; height: 3rem; margin: -1.2rem 0.5rem 0 0;" src="https://a57ed064b59d6d24a0db-e6a144f900fc09b8b2fc3bba00c88f87.ssl.cf3.rackcdn.com/media/2976525/visa.png" alt="Visa">
      <img style="width: 8.8rem; height: 3rem; margin: -1.2rem 0.5rem 0 0;" src="https://a57ed064b59d6d24a0db-e6a144f900fc09b8b2fc3bba00c88f87.ssl.cf3.rackcdn.com/media/2976557/paypal-logo-20141.png" alt="PayPal">
    `;
    document.querySelector('.Cart-BottomActions').insertAdjacentElement('beforeend', newPayment);
  }
  watchCartSummary();
  // On window resize, check if changes have been removed or layout has changed
  // If so, reapply them
  rootScope.$on('App_LayoutChanged', () => {
    // Reapply changes if component has been removed
    //applyChanges();
  });
};

export default activate;
