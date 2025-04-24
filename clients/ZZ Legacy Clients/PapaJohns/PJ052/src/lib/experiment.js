/**
 * @author User Conversion
 */
import { setup } from './services';
import slideoutButton from './components/slideoutButton';
import dropdown from './components/dropdown';
import lightbox from './components/lightbox';
import { poller } from '../../../../../lib/uc-lib';


// FIX - issue on control, if you go to change store dropdown, click change on delivery
  // then close the lightbox, the changr store dropdown stops working - have to click twice
  // this breaks the store lightbox
const activate = () => {
  setup();

  if (window.location.href.indexOf('/offers.aspx') > -1) {
    slideoutButton();
    window.prm.add_endRequest(function (sender, error) {
      const target = sender._postBackSettings.asyncTarget;
      try {
        slideoutButton();
      } catch (e) {
      }
    });
  }
  window.prm.add_endRequest(function (sender, error) {
    const target = sender._postBackSettings.asyncTarget;
    try {
      if (target === 'ctl00$_objHeader$lbSelectStoreMenuItem') {
        if(!document.querySelector('.PJ052-delivery_options')) {
          dropdown();
        }
      }
    } catch (e) {}
  });

  window.prm.add_beginRequest(function (sender, error) {
    const target = sender._postBackSettings.asyncTarget;
    try {
      if (target === 'ctl00$_objHeader$lbDeliveryMethod') {
        poller(['#fancyStoreConfirm'], () => {
          lightbox();
        });
        setTimeout(() => {
          if(document.querySelector('.PJ052-change_delivery')){
            document.querySelector('.PJ052-change_delivery').remove();
          }
        },500);
      }
    } catch (e) {}
  });
};

export default activate;
