import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';

const Experiment = {
  /**
  * @desc Variation settings. Useful for when multiple variations are developed
  * in a single project so you can just toggle the variation number in production
  */
  settings: {
    ID: 'PJ027',
    VARIATION: '{{VARIATION}}',
  },

  init: function init() {
    // Setup
    const { settings, services, components } = Experiment;

    services.tracking();
    document.body.classList.add(settings.ID);

    window.prm.add_endRequest(function (sender, error) {
      try {
        const target = sender._postBackSettings.asyncTarget;
        console.log(target);
        console.log(target);
        if (
            target === "ctl00$_objHeader$lbEnterPostcode"
            ||
            target === "ctl00$cphBody$lbGetStarted"
            ||
            target === "ctl00$_objHeader$lbNoPostcode"
        ) {
          components.checkStoreStatus();
        }
      } catch (e) {}
    });


    /* eslint-disable */
   /* function functionWithError() {
        services.onStartClick();
      
        const changeStore = document.querySelector('.PJ027-change_store');
        if (!changeStore) {
          services.onStartClick();
        }
    }
    window.prm.add_beginRequest(function (sender, error) {
      try {
        const target = sender._postBackSettings.asyncTarget;
        if (target === 'ctl00$cphBody$lbGetStarted') {
          functionWithError();
        }
      } catch (e) {}
    });
    /* eslint-enable */
  },
  /* put outside functions in here */
  services: {
    /**
    * @desc Inits all page level tracking
    */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
    /**
    * @desc what to run when everything is polled for & in the observer
    */
    /* onStartClick: function onStartClick() {
      const { components } = Experiment;
      poller(['.fancyStoreConfirm .title', '.fancybox-item.fancybox-close'], () => {
        // hide the close button
        const closeBox = document.querySelector('.fancybox-item.fancybox-close');
        closeBox.classList.add('PJ027-hide_close');

        // run open or closed function
        const searchPostcode = document.querySelector('.fancyStoreConfirm .title').textContent;
        if (searchPostcode.indexOf('closed') > -1) {
          components.storeClosed();
          poller(['.openingHours .day'], () => {
            components.getOpeningTime();
          });
        } else if (searchPostcode.indexOf('open') > -1) {
          components.storeOpen();
        }
        // add the change store button
        const changeStore = document.querySelector('.PJ027-change_store');
        if (!changeStore) {
          components.changeStore();
        }
      });
    }, */
  },

  components: {

    /**
    * @desc Check whether the store is open or closed
    */
    checkStoreStatus() {
      const { components } = Experiment;

      const popUp = document.querySelector('.fancybox-wrap');
      const storeStatus = popUp.querySelector('.title');

      if(storeStatus.textContent.indexOf('closed') > -1){
        popUp.classList.add('PJ027-store_closed');
        storeStatus.textContent = 'Closed - However you can pre-order for when the store opens';
        components.newDeliveryButtons();
        components.returnToHomepage();
      } else {
        popUp.classList.add('PJ027-store_open');
        storeStatus.textContent = 'Open - Please choose your preferred delivery method';
        components.newDeliveryButtons();
        components.returnToHomepage();
      }
    },

    newDeliveryButtons() {
      const popUp = document.querySelector('.fancyStoreConfirm');
      let newButtons;

      if(document.querySelector('.PJ027-store_closed')){
        newButtons = {
          'Pre-Order for Delivery': '#',
          'Pre-Order for Collection': '#',
        };
      } else {
        newButtons = {
          'Order for Delivery': '#',
          'Order for Collection': '#',
        };
      }
      // change the text of the buttons
      const newButtonsWrap = document.createElement('div');
      newButtonsWrap.classList.add('PJ027-buttons_wrap');
      newButtonsWrap.innerHTML = '<h2>Select from below:</h2>';
      popUp.querySelector('.buttons').appendChild(newButtonsWrap);

      Object.keys(newButtons).forEach((i) => {
        const data = newButtons[i];
        const newButton = document.createElement('div');
        newButton.classList.add('PJ027-order_button');
        newButton.innerHTML = `<span></span><p>${[i][0]}</p>`;
        newButtonsWrap.appendChild(newButton);
      });

      // click events of new buttons
      const delivery = document.querySelector('.PJ027-order_button');
      const collection = document.querySelector('.PJ027-order_button:last-child');

      delivery.addEventListener('click',() => {
        __doPostBack('ctl00$_objHeader$lbOrderForDelivery','');
      });
      collection.addEventListener('click',() => {
        __doPostBack('ctl00$_objHeader$lbOrderForCollection','')
      });
    },

    returnToHomepage() {
      const storeDetails = document.querySelector('.storeDetails');
      const returnToHomepage = document.createElement('div');
      returnToHomepage.classList.add('PJ027-return');
      returnToHomepage.innerHTML = '<span>Return to homepage</span>';
      storeDetails.appendChild(returnToHomepage);

      returnToHomepage.addEventListener('click', () => {
        document.querySelector('.fancybox-close').click();
      });
    }
    /**
    * @desc Function to run if selected store is open
    */
    /* storeOpen: function storeOpen() {
      const popUp = document.querySelector('#fancyStoreConfirm');
      popUp.classList.remove('PJ027-store_closed');
      popUp.classList.add('PJ027-store_open');
      document.querySelector('.fancyStoreConfirm h2.title').textContent = 'Open 
      - Please choose your preferred delivery method';
    },
    /**
    * @desc Function to run if selected store is closed
    */
    /* storeClosed: function storeClosed() {
      const popUp = document.querySelector('#fancyStoreConfirm');
      popUp.classList.add('PJ027-store_closed');
      popUp.classList.remove('PJ027-store_open');
      document.querySelector('.fancyStoreConfirm h2.title').innerHTML = '<span>Closed - However you can pre-order for when the store opens</span>';

      // change buttons to pre-order
      const selectStoreCTA = document.querySelectorAll('.fancyStoreConfirmCont .storeDetails .greenButton .centerB');
      [].forEach.call(selectStoreCTA, (element) => {
        const buttons = element;
        const newText = element.textContent.replace('Order', 'Pre-Order');
        buttons.innerHTML = newText;
      });

      // add overlay over the map to show it's closed
      /*
      const mapOverlay = document.createElement('div');
      mapOverlay.classList.add('PJ027-map_hide');
      mapOverlay.innerHTML = '<span>Store Closed</span>';

      const mapLocation = document.querySelector('.fancyStoreConfirmCont .location');
      mapLocation.appendChild(mapOverlay);
      */
    },
    /**
    * @desc change store function
    */
    /* changeStore: function changeStore() {
      const changeStoreButton = document.createElement('div');
      changeStoreButton.classList.add('PJ027-change_store');
      changeStoreButton.innerHTML = '<span>Change Store</span>';

      const titleText = document.querySelector('.storeDetails .address');
      titleText.insertAdjacentElement('afterend', changeStoreButton);

      changeStoreButton.addEventListener('click', () => {
        document.querySelector('.fancybox-item.fancybox-close').click();
        const box = document.querySelector('.fancyStoreConfirm');
        let closedOrOpen;
        if (box.classList.contains('PJ027-store_closed')) {
          closedOrOpen = 'closed';
        } else {
          closedOrOpen = 'open';
        }
        events.send('CRO Test', 'PJ027', `Change Store: Store ${closedOrOpen}`, { sendOnce: true });
      });

      // on click of the green buttons
      const selectStoreCTA = document.querySelectorAll('.fancyStoreConfirmCont .storeDetails .greenButton .centerB');
      [].forEach.call(selectStoreCTA, (element) => {
        const box = document.querySelector('.fancyStoreConfirm');
        let closedOrOpen;
        if (box.classList.contains('PJ027-store_closed')) {
          closedOrOpen = 'closed';
        } else {
          closedOrOpen = 'open';
        }
        element.addEventListener('click', () => {
          const buttonText = element.textContent;
          if (buttonText.indexOf('delivery') > -1) {
            events.send('CRO Test', 'PJ027', `Order for delivery: Store ${closedOrOpen}`, { sendOnce: true });
          } else {
            events.send('CRO Test', 'PJ027', `Order for collection: Store ${closedOrOpen}`, { sendOnce: true });
          }
        });
      });
    },
    /**
    * @desc get todays day and match to the store opening times
    */
    /* getOpeningTime: function getOpeningTime() {
      const openingTimes = document.querySelectorAll('.openingHours .day');
      [].forEach.call(openingTimes, (element) => {
        const openingTimeDay = element.textContent.trim().replace().replace(':', '').substring(0, 3);
        const today = new Date();
        const todayText = today.toDateString();
        if (todayText.indexOf(openingTimeDay) > -1) {
          const openingHour = element.parentNode.querySelector('.hour').textContent.trim().match(/^\S+|\S+$/gm)[0];
          document.querySelector('.PJ027-opening_time').textContent = openingHour;
        }
      });
    },
  }, */
};

export default Experiment;
