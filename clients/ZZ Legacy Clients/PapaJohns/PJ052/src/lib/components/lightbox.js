import { pollerLite, poller } from '../../../../../../lib/uc-lib';
import { events } from '../../../../../../lib/utils';

export default () => {
  // get the set delivery option
  const storageOption = sessionStorage.getItem('PJ052-method');

  const confirmDeliveryQuestion = () => {
    let method;
    if (storageOption === 'delivery') {
      method = 'Collection? <span class="PJ052-collect_icon"></span>';
    } else {
      method = 'Delivery? <span class="PJ052-delivery_icon"></span>';
    }

    const changeDelivery = () => {
      if (storageOption === 'delivery') {
        __doPostBack('ctl00$_objHeader$lbOrderForCollection', '');
      } else {
        __doPostBack('ctl00$_objHeader$lbOrderForDelivery', '');
      }
    };

    // change the contents of the lightbox
    const lightbox = document.querySelector('.fancyStoreConfirm');

    pollerLite(['.fancyStoreConfirm'], () => {
      const confirmDelivery = document.createElement('div');
      confirmDelivery.classList.add('PJ052-confirm_wrapper');
      confirmDelivery.innerHTML = `<h3>Are you sure you wish to change to <span>${method}</span></h3>
      <div class="PJ052-change_delivery_button">Yes</div>
      <div class="PJ052-change_delivery_button">No</div>
      <div class="PJ052-change_return">Return to homepage</div>`;
      lightbox.appendChild(confirmDelivery);
    });


    const changeButton = document.querySelector('.PJ052-change_delivery_button');
    changeButton.addEventListener('click', () => {
      changeDelivery();
      events.send('PJ052', 'Clicked', 'Green change button on the dropdown');
    });

    // function to run when the lightbox is closed
    const closeLightbox = () => {
      const closeBoxCross = document.querySelector('.fancybox-item.fancybox-close');
      closeBoxCross.click();
      document.querySelector('.PJ052-confirm_wrapper').remove();
      window.page.reload();
    };
    const noButton = document.querySelectorAll('.PJ052-change_delivery_button')[1];
    const returnButton = document.querySelector('.PJ052-change_return');

    noButton.addEventListener('click', () => {
      // closeLightbox();
      window.location.reload();
    });
    returnButton.addEventListener('click', () => {
      // closeLightbox();
      window.location.href = '/';
      events.send('PJ052', 'Clicked', 'Return to homepage button on the lightbox');
    });

    const overLay = document.querySelector('.fancybox-overlay.fancybox-overlay-fixed');
    overLay.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        window.location.reload();
      }
    });
    // make the changes
    const storeTitle = lightbox.querySelector('h2').textContent.trim();

    if (storeTitle === 'open') {
      lightbox.classList.add('PJ052-store_open');
      lightbox.querySelector('h2').textContent = 'Open - Please choose your preferred delivery method';
    }
  };

  confirmDeliveryQuestion();
};
