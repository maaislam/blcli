/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import GiftMarkup from './markup';
import accordion from './accordion';
import video from './video';
import { events } from '../../../../../lib/utils';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  new GiftMarkup();

  const klarnaScript = () => {
    var klarnaPlacementTag = document.getElementById('klarna-placement-cart');
    var productDataPrice = 109.95;
    if (klarnaPlacementTag && productDataPrice) {
      klarnaPlacementTag.dataset.purchaseAmount = productDataPrice * 100;
      window.KlarnaOnsiteService = window.KlarnaOnsiteService || [];
      window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' });
    }
  }

  klarnaScript();

  accordion();
  video();

  const addToBag = () => {
    const addButton = document.querySelector(`.${ID}-addToBag .${ID}-button`);
    

    addButton.addEventListener('click', () => {
      const qty = document.querySelector(`.${ID}-addToBag .input-group-qty`).value;
      const productSku = document.querySelector('.pdpForm #pid').value;
      if(productSku) {

        events.send(`${ID} variation:${VARIATION}`, 'click', `Add gift card to bag`);

        window.jQuery.ajax({
          url: 'https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax',
          type: 'post',
          data: `Quantity=${qty}&cartAction=add&pid=${productSku}&dwfrm_giftcert_purchase_amount=109.95`,
          success:function(){
            window.scrollTo(0, 0);
            window.location.reload();
          }
        });
      }
    });
          
  }

  addToBag();

};
