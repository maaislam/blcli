import { events } from '../../../../../../lib/utils';

export default () => {

  if (!document.querySelector('.PJ052-title')) {
    const pageTitle = document.createElement('div');
    pageTitle.classList.add('PJ052-title');
    document.querySelector('.menuItems').insertAdjacentElement('beforebegin', pageTitle);

    const store = document.querySelector('#ctl00__objHeader_pnlStoreMenuHasStore .placeText');
    if (store.textContent.indexOf('Collection') > -1) {
      pageTitle.innerHTML = 'Collection only deals';
    } else {
      pageTitle.innerHTML = 'Delivery only deals';
    }
  }

  let deliveryMethod;
  const store = document.querySelector('#ctl00__objHeader_pnlStoreMenuHasStore .placeText');
  if (store.textContent.indexOf('Collection') > -1) {
    deliveryMethod = 'Delivery';
  } else {
    deliveryMethod = 'Collection';
  }

  const allCollectionButtons = document.querySelectorAll('.menuList .aspNetDisabled.blackButton');

  if (allCollectionButtons) {
    for (let index = 0; index < allCollectionButtons.length; index += 1) {
      const element = allCollectionButtons[index];

      element.addEventListener('click', () => {
        events.send('PJ052', 'Clicked', 'COLLECTION ONLY & DELIVERY ONLY button on /offers');
      });

      const slideOutBanner = document.createElement('div');
      slideOutBanner.classList.add('PJ052-changeDeliveryBanner');
      slideOutBanner.innerHTML = `<span>Change to ${deliveryMethod}</span>`;
      element.parentNode.appendChild(slideOutBanner);

      element.parentNode.addEventListener('mouseenter', () => {
        slideOutBanner.classList.add('PJ052-showSmallBanner');
      });
      element.parentNode.addEventListener('mouseleave', () => {
        slideOutBanner.classList.remove('PJ052-showSmallBanner');
      });
    }
  }


  // open the store dropdown
  const openStoreInfo = () => { 
    setTimeout(() => {
      __doPostBack('ctl00$_objHeader$lbSelectStoreMenuItem','');
    }, 500);
    // document.querySelector('#ctl00__objHeader_lbSelectStoreMenuItem').click();
  };

  // Loop through all the collection buttons, fire the dropdown
  const changeCollectionButton = document.querySelectorAll('.PJ052-changeDeliveryBanner');

  if (changeCollectionButton) {
    for (let index = 0; index < changeCollectionButton.length; index += 1) {
      const element = changeCollectionButton[index];
      element.addEventListener('click', () => {
        openStoreInfo();
        events.send('PJ052', 'Clicked', 'The slide out icons on the offers page');
      });
    }
  }
};
