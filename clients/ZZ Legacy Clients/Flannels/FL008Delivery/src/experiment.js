import { fullStory, events } from '../../../../lib/utils';
import { countdown } from '../../../../lib/uc-lib';


/**
 * {{FL008-Delivery}} - {{Expand Delivery Information}}
 */

const Run = () => {
  events.analyticsReference = '_gaUAT';
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL008-Delivery',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const FL008Markup = `
      <div class="FL008-Delivery-Wrap">

        <div class="FL008-Delivery-Options-Wrap">
          <p class="FL008-Delivery-Header">Delivery</p>
          <ul class="FL008-Delivery-Options">
            <li class="FL008-Delivery-Option">Standard UK Delivery £6.99 - 3 to 5 working days.</li>
            <li class="FL008-Delivery-Option FL008-Next-Day">Next Day Delivery £9.99. Get your order <span id="FL008-delivery-day"></span> if you order in the next <div class="FL008-Countdown-Wrapper"></div> (before 2pm)</li>
            <li class="FL008-Delivery-Option">Pick up available from over 600 locations across the UK and Europe</li>
            <li class="FL008-Delivery-Option">Track the progress of your order using a unique tracking reference number</li>
            <li class="FL008-Delivery-Option">International Delivery costs <a class="FL008-International-Delivery-Link" href="/customerservices/deliveryinfo/worldwidedeliverycosts" target="_blank">here</a></li>
          </ul>
        </div>
        
        <div class="FL008-Returns-Wrap">
          <p class="FL008-Returns-Header">Returns</p>
          <ul class="FL008-Returns-Information">
            <li class="FL008-Returns">14 day, easy returns - full purchase price refunded</li>
            <li class="FL008-Returns">Return to store or via post - more information <a class="FL008-Returns-Link" href="/customerservices/completedorders/returnsandexchanges" target="_blank">here</a></li>
          </ul>
        </div>

        <div class="FL008-Contact-Wrap">
          <p class="FL008-Email">E: <a class="FL008-Email-Link" href="mailto:cs@flannels.com">cs@flannels.com</a></p>
          <p class="FL008-Telephone">T: 0344 2459 243</p>
          <p class="FL008-Contact-Form">M: <a class="FL008-Contact-Form-Link" href="/customerservices/contactus/contactform" target="_blank">contact form</a></p>
        </div>

        <p class="FL008-Closest-Store">Find your closest store <a class="FL008-Closest-Store-Link" href="/stores" target="_blank">view here</a>
      </div>
      `;

      const deliveryInformationParent = bodyVar.querySelector('.panel-group.col-xs-12.SizenContact');

      return {
        bodyVar,
        FL008Markup,
        deliveryInformationParent,
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
        // Insert Markup
        Exp.cache.deliveryInformationParent.insertAdjacentHTML('afterend', Exp.cache.FL008Markup);
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
          Exp.cache.bodyVar.querySelector('.FL008-Next-Day').textContent = 'Next Day Delivery £9.99. Note: Next Day Delivery excludes Weekends and Public/Bank Holidays';
        } else {
          // Build countdown timer
          // Put your containers somewhere
          $('.FL008-Countdown-Wrapper').prepend([
            '<div class="FL008-countdown">',
            '<div id="FL008-countdown"></div>',
            '</div>',
          ].join(''));

          // Configure the countdown function
          countdown({
            cutoff,
            element: '#FL008-countdown',
            delivery: {
              deliveryDays: 1, // How long an item takes to arrive
              excludeDays: ['Saturday', 'Sunday'], // Non-working days built from the above code
              deliveryDayElement: '#FL008-delivery-day',
              tomorrowLabel: true,
            },
          });
          // Amend text for following conditions
          // Thursday after 2pm: Saturday delivery
          // Friday before 2pm: tomorrow
          // Default to Tuesday, if text is a Monday

          // Checking for condition: Thursday after 2pm
          if (currentDay === 4 && currentTime > cutoff) {
            $('#FL008-delivery-day').text('Saturday');
            // Checking for condition: Friday before 2pm
          } else if (currentDay === 5 && currentTime < cutoff) {
            $('#FL008-delivery-day').text('tomorrow');
            // If the text is ever Monday, default to Tuesday
          } else if ($('#FL008-delivery-day').text() === 'Monday') {
            $('#FL008-delivery-day').text('Tuesday');
          }

          // Amend text if delivery day is a day and not tomorrow
          if ($('#FL008-delivery-day').text() !== 'tomorrow') {
            $('#FL008-delivery-day').text(`on ${$('#FL008-delivery-day').text()}`);
          }
        }
      },
    },
  };

  Exp.init();
};

export default Run;
