import { fullStory, events } from '../../../../../lib/utils';
import occasionPicker from './occasion-picker';
import datePicker from './datepicker';
import { delivery } from './delivery';

/**
 * BI021 - Select occasion
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'BI021',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    Experiment.build();
  },
  
  build() {
    const $ = window.JQSG;

    // --------------------------------------------------------
    // Build occasion HTML
    // --------------------------------------------------------
    const targetElement = document.querySelector('.product-content__description .b-dotted-t-x');
    if (targetElement) {
      const ell = document.querySelector('.bi21-occasion');
      if (ell) {
        ell.remove();
      }

      const occasionHtml = `
        <div class="bi21-occasion">
          <h3>When's your occasion?</h3>
          ${occasionPicker.render()}
          <div id="bi21-intro" class="bi21-occasion--intro">
            <p>let us know when your occasion is and we'll give you some specific information on delivery.</p>
          </div>
          <div id="bi21-output" class="bi21-occasion--info">
          </div>
        </div>
      `;
      targetElement.insertAdjacentHTML('beforebegin', occasionHtml);

      // --------------------------------------------------------
      // Run datepicker
      // --------------------------------------------------------
      datePicker();
      $('#bi21-date').Zebra_DatePicker({
        format: 'jS F Y',
        onSelect: function onSelect(dateFormat, dateStandardFormat, dateObject) {

          const deliveryLogic = delivery.calculateDeliveryLogic(dateObject);
          const shelfLifeWeeks = delivery.getShelfLifeWeeks();
          const futureDeliveryLength = delivery.getDeliveryFutureLengthWeeks();
          const enteredValueFriendly = delivery.getFriendlyDateString(dateObject, false);
          const targetDateString = deliveryLogic.soonestDeliveryDate.friendly;

          // --------------------------------------------------------
          // Result HTML, varies depending on the delivery logic
          // --------------------------------------------------------
          const bi21Output = document.querySelector('#bi21-output');
          if (!bi21Output) {
            return;
          }

          if(typeof deliveryLogic.occasionNowDiffDays !== 'undefined') {
            events.send('BI021', deliveryLogic.occasionNowDiffDays + ' days from today', '');
          }

          const outputHtml = `
            <p><strong>great news!</strong></p>
            <ul>
              <li><p>all our biscuits have a <span id="bi21-week-box">${shelfLifeWeeks} week</span> shelf life from the moment they leave our kitchens for delivery</p></li>
              <li><p>if you order now, your biscuits will be with you by <span id="bi21-bold-date">${targetDateString}</span></p></li>
              <li class="bi21-no-tick"><p><strong>or</strong> select your own date up to ${shelfLifeWeeks} weeks in advance to arrive on or before that date! Easy peasy!</p></li>
            </ul>
          `;
          bi21Output.innerHTML = outputHtml;

          // --------------------------------------------------------
          // Hide intro and show info
          // --------------------------------------------------------
          const introElementToHide = document.querySelector('.bi21-occasion #bi21-intro');
          const infoElementToShow = document.querySelector('.bi21-occasion #bi21-output');
          if (!infoElementToShow.classList.contains('bi21-show-info')) {
            introElementToHide.classList.add('bi21-hide-intro');
            infoElementToShow.classList.add('bi21-show-info');
          }
        },
      });
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
    const elModule = document.querySelector('.bi21-occasion');
    let inView = false;
    $(window).scroll(function() {
      if (isScrolledIntoView(elModule) && inView === false) {
        events.send('BI021', 'In View', 'Element is in the users view', { sendOnce: true });
        inView = true;
      }
    });
    // On click of date input
    const dateInput = document.querySelector('.bi21-occasion input#bi21-date');
    dateInput.addEventListener('click', () => {
      events.send('BI021', 'Click', 'User clicked on the date input', { sendOnce: true });
    });
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking: function tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
    },
  },
};

export default Experiment;
