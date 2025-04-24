import { fullStory, events } from '../../../../../lib/utils';
import occasionPicker from './occasion-picker';
import datePicker from './datepicker';
import productGalleryScroller from './product-gallery-scroller';
import { delivery } from './delivery';

/**
 * BI029 - Select occasion
 *
 * Modifies BI021 so most of that code is retained
 * except w/ new picker and other small amends
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'BI029',
    VARIATION: '{{VARIATION}}',
  },

  /**
   * @desc Event Listener
   *
   * @param {string} eventType
   * @param {function} listenerFunction
   */
  addEventListener(elm, eventType, listenerFunction) {
    const listener = elm.addEventListener(eventType, listenerFunction);

    Experiment.winExp.eventListeners.push({
        elm: elm,
        eventType: eventType,
        listenerFunction: listenerFunction
    });
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    Experiment.build();

    const scroller = productGalleryScroller();
    if(scroller) {
      Experiment.addEventListener(window, 'scroll', scroller);
    }
  },
  
  /**
   * Core build
   */
  build() {
    const $ = window.JQSG;

    // --------------------------------------------------------
    // Build occasion HTML
    // --------------------------------------------------------
    const targetElement = document.querySelector('.product-content__description .b-dotted-t-x');
    if (targetElement) {
      const ell = document.querySelector('.bi29-occasion');
      if (ell) {
        ell.remove();
      }

      const occasionHtml = `
        <div class="bi29-occasion">
          <h3>delivery information</h3>
          <p class="bi29-subtext">
            Let us know when your occasion is and we'll give you some specific information on delivery.
          </p>
          ${occasionPicker.render()}

          <p class="center">
            * don't worry this doesn't tie you down to a delivery date!
          </p>

          
          <div id="bi29-output" class="bi29-occasion--info">
          </div>
        </div>
      `;
      targetElement.insertAdjacentHTML('beforebegin', occasionHtml);
      
      // --------------------------------------------------------
      // Min date from next available delivery date
      // --------------------------------------------------------
      const deliveryDates = delivery.calculateDeliveryDatesFromNow();

      /**
       * Helper update messaging
       */
      const updateMessaging = (dateObject) => {
        const deliveryLogic = delivery.calculateDeliveryLogic(dateObject);
        const shelfLifeWeeks = delivery.getShelfLifeWeeks();
        const futureDeliveryLength = delivery.getDeliveryFutureLengthWeeks();
        const enteredValueFriendly = delivery.getFriendlyDateString(dateObject, false);
        const targetDateString = deliveryLogic.soonestDeliveryDate.friendly;
        const chosenDateString = delivery.getFriendlyDateString(dateObject);

        const existingPressieReminderLink = document.querySelector('a[ng-click="pressieReminder()"]');

        // --------------------------------------------------------
        // Result HTML, varies depending on the delivery logic
        // --------------------------------------------------------
        const bi29Output = document.querySelector('#bi29-output');
        if (!bi29Output) {
          return;
        }

        // Save in local storage
        localStorage.setItem('bi29-saved-date', `${dateObject.getFullYear()}-${
          ('0' + (1 + dateObject.getMonth())).substr(-2)
        }-${
          ('0' + dateObject.getDate()).substr(-2)
        }`);

        if(typeof deliveryLogic.occasionNowDiffDays !== 'undefined') {
          events.send('BI029', 'chose-date', deliveryLogic.occasionNowDiffDays + ' days from today');
        }

        let outputHtml = '';
        if(deliveryLogic.occasionNowDiffDays <= 14) {
          // Pre 2-week messsaging
          outputHtml = `
            <p>
              <strong>That's great! We can deliver on or before that date.</strong>
            </p>

          `;

          if(chosenDateString != targetDateString) {
            outputHtml += `
              <p>
                If you want your biscuits sooner we can deliver them by
                <strong>${targetDateString}</strong>.
              </p>
            `; 
          }

          outputHtml += `
            <div class="p-t-2 bi29-faux-btn-wrap center">
              <a class="bi29-faux-btn button button--pink button--bigger b-radius p-r-10 p-l-10 inline-block button">
                buy now
              </a>
            </div>

            <p>By the way, all of our biscuits will have at least 1 month's shelf life
              from the moment they leave our kitchens for delivery</p>
          `;

        } else if(deliveryLogic.occasionNowDiffDays <= 168 ) {
          // Post 2-week messsaging (pre 24 weeks)
          outputHtml = `
            <p>
              <strong>Wow, you're organised! Order now for guaranteed delivery</strong>.
            </p>

            <p>
              Order today and select <strong>${chosenDateString}</strong> at checkout and
              we'll make sure your hand-made biscuits arrive on time - to either you or the
              recipient. You can select a delivery time up to ${futureDeliveryLength} weeks away.
            </p>

            <p>All of our biscuits are fresh and will have at least 1 month's shelf life from
              the moment they leave our kitchens for delivery.</p>

            <div class="p-t-2 bi29-faux-btn-wrap center">
              <a class="bi29-faux-btn button button--pink button--bigger b-radius p-r-10 p-l-10 inline-block button">
                buy now
              </a>
            </div>

            <p>You can always get them delivered ASAP too, to either you or the recipient.</p>
          `;
        } else {
          // Post 24-week messsaging
          outputHtml = `
            <p>
              <strong>Wow, you're organised!</strong>
            </p>

            <p>
            You can pre-order up to 24 weeks in advance.

          `;

          if(existingPressieReminderLink) {
            outputHtml += `
                If you would like a reminder closer to the time, why not use our 
                <a class="bi29-init-pressie-reminder col-pink">Pressie Reminder service</a>.
            `;
          }

          outputHtml += `
            </p>

            <div class="p-t-2 bi29-faux-btn-wrap center">
              <a class="bi29-faux-btn button button--pink button--bigger b-radius p-r-10 p-l-10 inline-block button">
                buy now
              </a>
            </div>
          `;
        }

        if(outputHtml) {
          outputHtml = '<hr>' + outputHtml;

          bi29Output.innerHTML = outputHtml;

          bi29Output.classList.add('bi29-output--active');

          const pressieReminderLink = document.querySelector('.bi29-init-pressie-reminder');
          if(existingPressieReminderLink && pressieReminderLink) {
            pressieReminderLink.addEventListener('click', () => {
              existingPressieReminderLink.click();
            });
          }

          const buyBtn = document.querySelector('.bi29-faux-btn');
          const realBuyBtn = document.querySelector('ng-include[product-id="buyProducts"] .button');
          if(buyBtn && realBuyBtn) {
            buyBtn.addEventListener('click', () => {
              $('body,html').animate({
                scrollTop: $(realBuyBtn).offset().top - 150
              }, 150);

              realBuyBtn.click();

              events.send('BI029', 'clicked-buy-now', '', { sendOnce: true  });
            });
          }

        }
      };
      
      // --------------------------------------------------------
      // On load, set messaging if date saved in local storage
      // --------------------------------------------------------
      const savedDateString = localStorage.getItem('bi29-saved-date');
      if(savedDateString) {
        const savedDate = new Date(savedDateString);
        updateMessaging(savedDate);
      }

      // --------------------------------------------------------
      // Run datepicker
      // --------------------------------------------------------
      const Pikaday = datePicker();

      const picker = new Pikaday({
        field: document.getElementById('bi29-date'),
        firstDay: 1,
        format: 'jS F Y',
        minDate: deliveryDates.date,
        maxDate: new Date('2022-12-14'),
        yearRange: [2000,2020],
        onSelect: (dateObject) => {
          updateMessaging(dateObject);
        }
      });

      if(savedDateString) {
        picker.setDate(savedDateString);
      }

    }

    /*
    * Tracking
    */
    function isScrolledIntoView(elem) {
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();

      var elemTop = $(elem).offset().top;
      var elemBottom = elemTop + $(elem).height();

      return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
    const elModule = document.querySelector('.bi29-occasion');
    let inView = false;
    if(elModule) {
      $(window).scroll(function() {
        if (isScrolledIntoView(elModule) && inView === false) {
          events.send('BI029', 'In View', 'Element is in the users view', { sendOnce: true });
          inView = true;
        }
      });
      // On click of date input
      const dateInput = document.querySelector('.bi29-occasion input#bi29-date');
      dateInput.addEventListener('click', () => {
        events.send('BI029', 'Click', 'User clicked on the date input', { sendOnce: true });
      });
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send('BI029', 'Active', 'BI029 Experiment is active', { sendOnce: true });
    },
  },
};

export default Experiment;
