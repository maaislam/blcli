import { fullStory, events } from '../../../../lib/utils';
import { observer, pollerLite } from '../../../../lib/uc-lib';

/**
 * {{TP129d}} - {{Time to Collect Message}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'TP129d',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    const currentDay = services.whatDay();
    /**
     * Observe popup
     */
    const popup = document.getElementById('cboxWrapper');
    if (popup) {
      observer.connect(popup, () => {
        const time = services.whatTime();
        const messageObj = services.changeMessageOrNot(currentDay, time);
        pollerLite(['.closest-branch-list'], () => {
          // Add observer to store list
          const popupButtons = document.querySelector('.closest-branch-list');
          observer.connect(popupButtons, () => {
            pollerLite(['#listView .collection-branch-item'], () => {
              const items = document.querySelectorAll('#listView .collection-branch-item');
              // Run scripts
              items.forEach((item) => {
                const itemStock = item.querySelector('.stock .out-of-stock-message');
      
                if (itemStock.style.display === 'block') {
                  return;
                }
                const readyMessages = item.querySelector('.collection-branch-item .oos-hours');
                if (messageObj.message === true) {
                  components.newMessage(readyMessages, messageObj, time);
                  pollerLite(['#collectionBranchLocatorPopup .collection-branch-item .operation button'], services.addTracking);
                }
              });
            });
          });
        });
      }, {
        config: {
          attributes: true,
          childList: true,
          subTree: false,
        },
      });
    }
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
    /**
     * @desc returns the day of the week.
     */
    whatDay() {
      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const date = new Date();
      const day = date.getDay();
      return days[day];
    },
    whatTime() {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : '' + date.getMinutes();
      const seconds = date.getSeconds();
      const time = {
        hours,
        minutes,
        seconds,
      };
      return time;
    },
    changeMessageOrNot(currentDay, currentTime) {
      const showMessage = {
        message: false,
        day: 'weekday',
        pickup: 'one hour',
      };
      if (currentDay !== 'sunday') {

        // Weekdays
        if (currentDay !== 'saturday') {
          // Pickup within an hour
          if (currentTime.hours > 6 && currentTime.hours < 16) {
            showMessage.message = true;
            showMessage.day = 'weekday';
            showMessage.pickup = 'one hour';
          }
          // Pickup tomorrow morning 7:30
          if (currentTime.hours >= 16 && currentTime.hours < 18) {
            showMessage.message = true;
            showMessage.day = 'weekday';
            showMessage.pickup = 'early';
          }
          // Order before 7am
          if (currentTime.hours >= 18 && currentTime.hours < 23 || currentTime.hours < 7) {
            showMessage.message = true;
            showMessage.day = 'weekday';
            showMessage.pickup = 'tomorrow';
          }
        }
        if (currentDay === 'saturday') {
          // Pickup within an hour
          if (currentTime.hours > 6 && currentTime.hours < 10) {
            showMessage.message = true;
            showMessage.day = 'saturday';
            showMessage.pickup = 'one hour';
          }
          // Pickup Monday morning 7:30
          if (currentTime.hours > 10) {
            showMessage.message = true;
            showMessage.day = 'saturday';
            showMessage.pickup = 'tomorrow';
          }
        }
      }
      if (currentDay === 'sunday') {
        showMessage.message = true;
        showMessage.day = 'saturday';
        showMessage.pickup = 'tomorrow';
      }  
      return showMessage;
    },
    addTracking() {
      const popupAddCta = document.querySelectorAll('#collectionBranchLocatorPopup .collection-branch-item .operation button');
      if (popupAddCta.length > 0) {
        popupAddCta.forEach((element) => {
          element.addEventListener('click', () => {
            events.send(Experiment.settings.ID, 'Clicked', 'Add for collection on the collection popup');
          });
        });
      }
    },
  },

  components: {
    newMessage(el, messageObject, currentTime) {
      if (messageObject.message === true) {
        const collectMessage = `Ready to collect by ${currentTime.hours + 1}:${currentTime.minutes}`;
        const pickupMessage = 'Ready to collect by tomorrow, 8:30am';
        const earlyMessage = 'Ready to collect at 8:30am';
        if (messageObject.day === 'weekday') {
          // Weekday collect in one hour
          if (messageObject.pickup === 'one hour') {
            el.textContent = collectMessage;
          }
          // Weekday collect tomorrow
          if (messageObject.pickup === 'tomorrow') {
            el.textContent = pickupMessage;
          }
          // Early collect same day
          if (messageObject.pickup === 'early') {
            el.textContent = earlyMessage;
          }
        }
        if (messageObject.day === 'saturday') {
          // Saturday collect in one hour
          if (messageObject.pickup === 'one hour') {
            el.textContent = collectMessage;
          }
          if (messageObject.pickup === 'tomorrow') {
            el.textContent = 'Ready to collect by Monday, 9am';
          }
        }
      }
    },
  },
};

export default Experiment;
