import { fullStory, events } from '../../../../lib/utils';
import { countdown } from '../../../../lib/uc-lib';


/**
 * {{FL019_V2}} - {{Delivery Information at Basket}}
 */

const Run = () => {
  // Flannels ga configuration
  events.analyticsReference = '_gaUAT';
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL019_V2',
      VARIATION: '2',
    },
    cache: (() => {
      const bodyVar = document.body;
      const continueSecurleyTop = bodyVar.querySelector('#divContinueSecurelyTop');
      const orderTotalText = bodyVar.querySelector('#TotalValue');
      const orderSubtotal = bodyVar.querySelector('#SubtotalRow');
      const continueShopping = bodyVar.querySelector('#divContinueShopping');
      // Add £6.99 to total delivery price
      let orderTotalValue = bodyVar.querySelector('#TotalRow').dataset.price;
      orderTotalValue = parseFloat(orderTotalValue);
      orderTotalValue += 6.99;
      // V2 specific
      const FL019Markup = `
      <div class="FL019_V2-Delivery-Wrap">

        <div class="FL019_V2-Delivery-Options-Wrap">
          <p class="FL019_V2-Delivery-Header">Delivery</p>
          <ul class="FL019_V2-Delivery-Options">
            <li class="FL019_V2-Delivery-Option">Standard UK Delivery £6.99 - 3 to 5 working days.</li>
            <li class="FL019_V2-Delivery-Option FL019_V2-Next-Day">Next Day Delivery £9.99. Get your order <span id="FL019_V2-delivery-day"></span> if you order in the next <div class="FL019_V2-Countdown-Wrapper"></div> (before 2pm)</li>
            <li class="FL019_V2-Delivery-Option">UK and Europe pick up locations available from over 600 stores</li>
            <li class="FL019_V2-Delivery-Option">Track the progress of your order using a unique tracking reference number</li>
            <li class="FL019_V2-Delivery-Option">International Delivery costs <a class="FL019_V2-International-Delivery-Link" href="/customerservices/deliveryinfo/worldwidedeliverycosts" target="_blank">here</a></li>
          </ul>
        </div>
        
        <div class="FL019_V2-Returns-Wrap">
          <p class="FL019_V2-Returns-Header">Returns</p>
          <ul class="FL019_V2-Returns-Information">
            <li class="FL019_V2-Returns">14 day, easy returns - full purchase price refunded</li>
            <li class="FL019_V2-Returns">Return to store or via post - more information <a class="FL019_V2-Returns-Link" href="/customerservices/completedorders/returnsandexchanges" target="_blank">here</a></li>
          </ul>
        </div>
      </div>
      `;

      return {
        bodyVar,
        continueSecurleyTop,
        orderTotalText,
        orderSubtotal,
        orderTotalValue,
        continueShopping,
        FL019Markup,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
      const hide = document.getElementById(`${settings.ID}_flickerPrevention`);
      hide.parentElement.removeChild(hide);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
        // Assign updated price to total price
        // Currency formatter from stackoverflow
        Exp.cache.orderTotalText.textContent = `£${Exp.cache.orderTotalValue.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`;
        // Insert basket total above top continue securely button
        Exp.cache.continueSecurleyTop.insertAdjacentHTML('beforebegin', `
          <p class="FL019_V2_Order_Total">Total: <span class="FL019_V2_Order_Total_Price">${Exp.cache.orderTotalText.textContent.trim()}</span></p>
        `);
        // Insert standard delivery text
        Exp.cache.orderSubtotal.insertAdjacentHTML('afterend', `
        <div class="FL019_V2_Standard_Delivery_Wrap">
          <p class="FL019_V2_Standard_Delivery_Text">Standard Delivery</p>
          <p class="FL019_V2_Standard_Delivery_Price">£6.99</p>
        </div>
        `);
        // Insert V2 content - delivery information
        Exp.cache.continueShopping.insertAdjacentHTML('afterend', Exp.cache.FL019Markup);
        // Setup countdown timer
        this.setupCountDown();
      },
      setupCountDown() {
        // Create cutoff date and convert to ms since epoch with getTime
        let cutoff = new Date();
        cutoff.setUTCHours(13, 0, 0);
        cutoff = cutoff.getTime();

        // Create a new date object to get the current day of the week and time
        let currentDay = new Date();
        const BHCheckCurrentDay = currentDay.toLocaleDateString();
        // Initialize current day as a bank holiday to false
        let isBankHoliday = false;
        const currentTime = currentDay.getTime();
        // Get current day as a value between 0-6
        currentDay = currentDay.getUTCDay();
        // Bank holidays stored in a DD/MM/YYYY format
        // Days leading up to a bank holiday are also excluded
        // Loop through bank holidays and days leading up to a bank holiday
        const bankHolidayArray = ['25/05/2018', '26/05/2018', '27/05/2018', '28/05/2018', '24/08/2018', '25/08/2018', '26/08/2018', '27/08/2018', '21/12/2018', '22/12/2018', '23/12/2018', '24/12/2018', '25/12/2018', '26/12/2018'];
        for (let i = 0; i < bankHolidayArray.length; i += 1) {
          // Check current day
          if (bankHolidayArray[i] === BHCheckCurrentDay) {
            isBankHoliday = true;
            break;
          }
        }
        if (isBankHoliday) {
          // Add text and hide countdown
          Exp.cache.bodyVar.querySelector('.FL019_V2-Next-Day').textContent = 'Next Day Delivery £9.99. Note: Next Day Delivery excludes Weekends and Public/Bank Holidays';
        } else {
          // Build countdown timer
          // Put your containers somewhere
          $('.FL019_V2-Countdown-Wrapper').prepend([
            '<div class="FL019_V2-countdown">',
            '<div id="FL019_V2-countdown"></div>',
            '</div>',
          ].join(''));

          // Configure the countdown function
          countdown({
            cutoff,
            element: '#FL019_V2-countdown',
            delivery: {
              deliveryDays: 1, // How long an item takes to arrive
              excludeDays: ['Saturday', 'Sunday'], // Non-working days built from the above code
              deliveryDayElement: '#FL019_V2-delivery-day',
              tomorrowLabel: true,
            },
          });
          // Amend text for following conditions
          // Thursday after 2pm: Saturday delivery
          // Friday before 2pm: tomorrow
          // Default to Tuesday, if text is a Monday

          // Checking for condition: Thursday after 2pm
          if (currentDay === 4 && currentTime > cutoff) {
            $('#FL019_V2-delivery-day').text('Saturday');
            // Checking for condition: Friday before 2pm
          } else if (currentDay === 5 && currentTime < cutoff) {
            $('#FL019_V2-delivery-day').text('tomorrow');
            // If the text is ever Monday, default to Tuesday
          } else if ($('#FL019_V2-delivery-day').text() === 'Monday') {
            $('#FL019_V2-delivery-day').text('Tuesday');
          }

          // Amend text if delivery day is a day and not tomorrow
          if ($('#FL019_V2-delivery-day').text() !== 'tomorrow') {
            $('#FL019_V2-delivery-day').text(`on ${$('#FL019_V2-delivery-day').text()}`);
          }
        }
      },
    },
  };

  Exp.init();
};

export default Run;
