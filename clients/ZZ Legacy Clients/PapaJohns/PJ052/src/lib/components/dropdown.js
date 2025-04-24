import { pollerLite } from '../../../../../../lib/uc-lib';
import settings from '../settings';
import { events } from '../../../../../../lib/utils';

const { ID } = settings;


export default () => {
  const moveAddress = () => {
    // move address before opening times
    const address = document.querySelector('.openingHours.openingHoursResize');
    const openingTimes = document.querySelector('.storeContacts.storeContactsResize');
    address.insertAdjacentElement('beforebegin', openingTimes);
  };

  const addDeliveryOptions = () => {
    // add the collection/delivery options
    const dropDown = document.querySelector('#ctl00__objHeader_SelectStoreSection');
    const changeDelivery = document.createElement('div');
    changeDelivery.classList.add(`${ID}-change_delivery`);
    changeDelivery.innerHTML = `<h2>You are ordering for:</h2>
    <div class="${ID}-delivery_options">
      <div class="${ID}-option"><span></span><p>Collection</p></div>
      <div class="${ID}-option"><span></span><p>Delivery</p></div>
      <a class="${ID}-change_button" href="javascript:__doPostBack('ctl00$_objHeader$lbDeliveryMethod','')">Change</a>
    </div>`;

    if (dropDown) {
      dropDown.insertBefore(changeDelivery, dropDown.firstChild);

      // make the selected delivery option
      const storeDetailsTitle = document.querySelector('.storeDetailsObCont h2').textContent.trim();

      const collectionButton = document.querySelector('.PJ052-option');
      const deliveryButton = document.querySelector('.PJ052-option:last-of-type');
      if (storeDetailsTitle.indexOf('delivery') > -1) {
        deliveryButton.classList.add('PJ052-option_selected');
        collectionButton.classList.remove('PJ052-option_selected');
        sessionStorage.setItem('PJ052-method', 'delivery');
      } else {
        deliveryButton.classList.remove('PJ052-option_selected');
        collectionButton.classList.add('PJ052-option_selected');
        sessionStorage.setItem('PJ052-method', 'collection');
      }

      // on click of the options, open the lightbox
      const notSelected = document.querySelectorAll('.PJ052-option');
      const changeButton = document.querySelector('.PJ052-change_button');
      for (let index = 0; index < notSelected.length; index += 1) {
        const element = notSelected[index];
          element.addEventListener('click', () => {
            if (!element.classList.contains('PJ052-option_selected')) {
              __doPostBack('ctl00$_objHeader$lbDeliveryMethod','');
              events.send('PJ052', 'Clicked', 'Changed option in dropdown');
            }
          });
      }
    }
  };

  const changeMapImage = () => {
    // make map the background image
    const map = document.querySelector('.storeLocation.storeLocationResize');
    const mapImage = map.querySelector('img').getAttribute('src');
    map.style = `background-image: url('${mapImage}')`;
  };

  pollerLite(['#ctl00__objHeader_SelectStoreSection'], () => {
    moveAddress();
    if (!document.querySelector('.PJ052-change_delivery')) {
      addDeliveryOptions();
    }
    changeMapImage();
  });
};
