import { fullStory, events } from '../../../../lib/utils';

/**
 * {{PL005}} - {{Countdown to delivery cutoff}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'PL005',
    VARIATION: '{{VARIATION}}',
    TIMER: null,
    beforeSix: false,
    dayIsThursday: false,
    dayIsFriday: false,
    dayName: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthName: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    nextDayDelivery: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    scheduledDayDelivery: ['Friday'],
    bankHolidays: ['August 27, 2018', 'December 25, 2018', 'December 26, 2018', 'January 1, 2019', 'April 19, 2019', 'April 22, 2019', 'May 6, 2019'],
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    /**
     * @desc Gets current date and time
     */
    let now = new Date();
    const today = settings.monthName[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear(); // eslint-disable-line prefer-template

    // Top Sections - Changes width of columns
    // components.topSections();

    // USPS Sections - Changes width of columns
    components.uspSections();

    now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    if (settings.nextDayDelivery.indexOf(settings.dayName[now.getDay()]) > -1 && !(settings.bankHolidays.indexOf(today) > -1) && !(settings.bankHolidays.indexOf(settings.monthName[tomorrow.getMonth()] + ' ' + tomorrow.getDate() + ', ' + tomorrow.getFullYear()) > -1)) { // eslint-disable-line prefer-template
      // Sets Countdown Time
      const countDownDate = new Date(settings.monthName[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear() + ' 16:30:00').getTime(); // eslint-disable-line prefer-template
      if ((now.getHours() >= 12 && now.getHours() < 16) || (now.getHours() === 16 && now.getMinutes() <= 30)) { // eslint-disable-line prefer-template, max-len
        /**
         *  @desc Monday to Thursday, 12:00am - 16:30pm
         */
        // Creates Header Countdown Container
        // components.timerCountdownContainer();

        /**
         * @desc Checks if the page is a PDP and the product is in stock
         */
        if (document.querySelector('.productdetail-page') && document.querySelector('.instock')) {
          // Creates Sidebar and Sticky Nav Container
          components.sidebarAndStickynavContainers();
        }

        // Update the count down every 1 second
        /*eslint-disable */
        settings.TIMER = setInterval(function() {services.setTimer(countDownDate, settings.beforeSix)}, 1000);
        /* eslint-enable */
      } else if (((now.getHours() === 16 && now.getMinutes() > 30) || (now.getHours() >= 16 && now.getHours() <= 23) || (now.getHours() === 23 && now.getMinutes() <= 59)) || (now.getHours() >= 0 && now.getHours() <= 6)) { // eslint-disable-line prefer-template, max-len
      /**
       * @desc Monday to Thursday, 16:30pm - 12:00am
       * Sunday to Wednesday, 00:00am - 06:00am
       */
        if (settings.dayName[now.getDay()] !== 'Thursday' || settings.dayName[now.getDay()] === 'Sunday') {
          // It's before 6:00 am
          settings.beforeSix = true;
          // Creates Header Countdown Container
          // components.nextDayDeliveryHeaderContainer(settings.dayIsThursday, settings.dayIsFriday);

          // Update the count down every 1 second
          /*eslint-disable */
          settings.TIMER = setInterval(function() {services.setTimer(countDownDate, settings.beforeSix)}, 1000);
          /* eslint-enable */

          if (document.querySelector('.productdetail-page') && document.querySelector('.instock')) {
            // Creates Sidebar and Sticky Nav Container
            components.nextDayDeliverySidebarAndStickynavContainers();
          }
        } else {
          // It's Thursday
          settings.dayIsThursday = true;
          // Creates Header Countdown Container
          // components.nextDayDeliveryHeaderContainer(settings.dayIsThursday, settings.dayIsFriday);
        }
      } else {
        /**
         * @desc Monday to Thursday, 6:00am - 12:00pm
         */
        // Creates Header Countdown Container
        // components.beforeCountdownHeaderContainer();

        if (document.querySelector('.productdetail-page') && document.querySelector('.instock')) {
          // Creates Sidebar and Sticky Nav Container
          components.beforeCountdownSidebarAndStickynavContainers();
        }
      }
    } else if (settings.bankHolidays.indexOf(today) > -1 || settings.bankHolidays.indexOf(settings.monthName[tomorrow.getMonth()] + ' ' + tomorrow.getDate() + ', ' + tomorrow.getFullYear()) > -1) { // eslint-disable-line prefer-template
      /**
       * @desc When it's a bank holiday or the next day is a bank holiday
       */
      // Creates Header for day with no next day delivery
      // components.noNextDayDelivery(settings.dayIsThursday, settings.dayIsFriday);
      components.noNextDayDeliverySidebarAndStickynavContainers(settings.dayIsThursday, settings.dayIsFriday);
    } else {
      /**
       * @desc Weekend, Friday to Sunday til 16:30
       */
      // Creates Header for day with no next day delivery
      if (settings.dayName[now.getDay()] === 'Friday') { // eslint-disable-line no-lonely-if
        // It's Friday
        settings.dayIsFriday = true;
        // components.noNextDayDelivery(settings.dayIsThursday, settings.dayIsFriday);
        components.noNextDayDeliverySidebarAndStickynavContainers(settings.dayIsThursday, settings.dayIsFriday);
      } else {
        // components.noNextDayDelivery(settings.dayIsThursday, settings.dayIsFriday);
        components.noNextDayDeliverySidebarAndStickynavContainers(settings.dayIsThursday, settings.dayIsFriday);
      }
    }

    /**
     * @desc Delivery link - Event Listener
     */
    if (document.querySelector('#PL005-sidebarTimer__link')) {
      document.querySelector('#PL005-sidebarTimer__link').addEventListener('click', () => {
        document.querySelector('.lnkDelivery').click();
        events.send(settings.ID, 'Clicked on delivery message', 'under Add to Basket', { sendOnce: true });
      });
    }
    if (document.querySelector('#PL005-stickynavTimer__link')) {
      document.querySelector('#PL005-stickynavTimer__link').addEventListener('click', () => {
        document.querySelector('.lnkDelivery').click();
        events.send(settings.ID, 'Clicked on delivery message', 'in sticky header', { sendOnce: true });
      });
    }
    if (document.querySelector('#PL005-headerTimer__link')) {
      document.querySelector('#PL005-headerTimer__link').addEventListener('click', () => {
        document.querySelector('.lnkDelivery').click();
        events.send(settings.ID, 'Clicked on delivery message', 'in header', { sendOnce: true });
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
     * @desc Sets Countdown Timer
     */
    setTimer(countDownDate, beforeSix) {
      const { settings } = Experiment;
      // Find the distance between now an the count down date
      const nowTime = new Date().getTime();
      const distance = countDownDate - nowTime;

      // Time calculations for hours, minutes and seconds
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (hours < 10) {
        hours = '0' + hours; // eslint-disable-line prefer-template
      }
      if (minutes < 10) {
        minutes = '0' + minutes; // eslint-disable-line prefer-template
      }
      if (seconds < 10) {
        seconds = '0' + seconds; // eslint-disable-line prefer-template
      }

      // Display the result in the element #PL005-countdownTimer
      if (distance > 0 && !beforeSix) {
        /*eslint-disable */
        // document.querySelector('#PL005-countdownTimer').innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's ';
        if (document.querySelector('.productdetail-page') && document.querySelector('.instock')) {
          document.querySelector('#PL005-timer__sidebar').innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's ';
          document.querySelector('#PL005-timer__stickynav').innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's ';
        }
        /* eslint-enable */
      } else {
        // If the count down is finished and it is after 16:30pm and before 6:00am
        const nowDay = new Date();
        const tomorrow = new Date(nowDay);
        // Gets next day before or after midnight
        if (((nowDay.getHours() === 16 && nowDay.getMinutes() > 30) || (nowDay.getHours() >= 16 && nowDay.getHours() <= 23) || (nowDay.getHours() === 23 && nowDay.getMinutes() <= 59))) { // eslint-disable-line prefer-template, max-len
          tomorrow.setDate(nowDay.getDate() + 2);
        } else if ((nowDay.getHours() >= 0) && (nowDay.getHours() <= 6)) { // eslint-disable-line prefer-template, max-len
          tomorrow.setDate(nowDay.getDate() + 1);
        }

        // document.querySelector('#PL005-countdownTimer').innerHTML = settings.dayName[tomorrow.getDay()] + ' ' + tomorrow.getDate() + '<sup>th</sup> ' + settings.monthName[tomorrow.getMonth()]; // eslint-disable-line prefer-template
        if (document.querySelector('.productdetail-page') && document.querySelector('.instock')) {
          document.querySelector('#PL005-timer__sidebar').innerHTML = tomorrow.getDate() + '<sup>th</sup> ' + settings.monthName[tomorrow.getMonth()]; // eslint-disable-line prefer-template
          document.querySelector('#PL005-timer__stickynav').innerHTML = tomorrow.getDate() + '<sup>th</sup> ' + settings.monthName[tomorrow.getMonth()]; // eslint-disable-line prefer-template
        }
        this.stopCountdownTimer();
      }
    },
    /**
     * @desc Stops Timer
     */
    stopCountdownTimer() {
      const { settings } = Experiment;
      clearInterval(settings.TIMER);
    },
  },

  components: {
    /**
     * @desc Inits all page level tracking
     */
    topSections() {
      // Top Sections
      const topSections = document.querySelectorAll('section.inner > .row.middle > .col-xs-6');
      // Changes width of columns
      [].forEach.call(topSections, (section) => {
        section.classList.add('col-xs-4');
        section.classList.remove('col-xs-6');
      });
    },
    uspSections() {
      // USPS Sections
      const uspSections = document.querySelectorAll('section.usps > .row > .col-sm-4');
      // Changes width of columns
      [].forEach.call(uspSections, (section) => {
        section.classList.add('col-sm-6');
        section.classList.remove('col-sm-4');
      });
    },
    /**
     *  @desc Monday to Thursday, 12:00am - 16:30pm
     */
    timerCountdownContainer() {
      const timerSection = `<div class='PL005-timerSection col-xs-4'>
      <span>Get your order by tomorrow; order in the next</span>
      <div class='PL005-timer' id='PL005-countdownTimer'></div>
      <span><u id='PL005-headerTimer__link'>Free delivery by courier on orders over £125 ex VAT*</u></span>
      </div>`;

      document.querySelector('section.inner > .row.middle > .col-xs-4').insertAdjacentHTML('afterend', timerSection);
    },
    sidebarAndStickynavContainers() {
      // Sidebar Container
      const sidebarNavTimer = `<div class='PL005-sidebarTimer product_details shipping bold'>Order in <span class='PL005-timer' id='PL005-timer__sidebar'></span></br> For delivery tomorrow. <span class='PL005-moreInfo__link' id='PL005-sidebarTimer__link'>More info</span></div>`; // eslint-disable-line quotes
      document.querySelector('.productpricecontainer.box > div:nth-child(2) > div:last-child').insertAdjacentHTML('afterend', sidebarNavTimer);
      // Sticky Nav Container
      const stickyNavTimer = `<div class='PL005-stickynavTimer product_details shipping bold'>Order in <span class='PL005-timer' id='PL005-timer__stickynav'></span></br> For delivery tomorrow. <span class='PL005-moreInfo__link' id='PL005-stickynavTimer__link'>More info</span></div>`; // eslint-disable-line quotes
      document.querySelector('.sticky_wrapper .right .product_buttons > div').insertAdjacentHTML('beforeend', stickyNavTimer);
    },
    /**
     * @desc Monday to Thursday, 16:30pm - 12:00am
     * Sunday to Wednesday, 00:00am - 06:00am
     */
    nextDayDeliveryHeaderContainer(dayIsThursday, dayIsFriday) {
      let timerSection;
      if (!dayIsThursday) {
        timerSection = `<div class='PL005-timerSection col-xs-4'>
        <span>Delivery by</span>
        <div class='PL005-timer' id='PL005-countdownTimer'></div>
        <span>when you buy now. <span class='PL005-moreInfo__link' id='PL005-headerTimer__link'>More info</span></span>
        </div>`;

        document.querySelector('section.inner > .row.middle > .col-xs-4').insertAdjacentHTML('afterend', timerSection);
      } else {
        dayIsFriday = true; // eslint-disable-line no-param-reassign
        // this.noNextDayDelivery(dayIsThursday, dayIsFriday);
        components.noNextDayDeliverySidebarAndStickynavContainers(settings.dayIsThursday, settings.dayIsFriday);
      }
    },
    nextDayDeliverySidebarAndStickynavContainers() {
      // Siderbar Container
      const sidebarNavTimer = `<div class='PL005-sidebarTimer product_details shipping bold'>Delivery by <span class='PL005-timer' id='PL005-timer__sidebar'></span></br> when you buy now. <span class='PL005-moreInfo__link' id='PL005-sidebarTimer__link'>More info</span></div>`; // eslint-disable-line quotes
      document.querySelector('.productpricecontainer.box > div:nth-child(2) > div:last-child').insertAdjacentHTML('afterend', sidebarNavTimer);

      // Sticky Nav Container
      const stickyNavTimer = `<div class='PL005-stickynavTimer product_details shipping bold'>Delivery by <span class='PL005-timer' id='PL005-timer__stickynav'></span></br> when you buy now. <span class='PL005-moreInfo__link' id='PL005-stickynavTimer__link'>More info</span></div>`; // eslint-disable-line quotes
      document.querySelector('.sticky_wrapper .right .product_buttons > div').insertAdjacentHTML('beforeend', stickyNavTimer);
    },
    /**
     * @desc Monday to Thursday, 6:00am - 12:00pm
     */
    beforeCountdownHeaderContainer() {
      const timerSection = `<div class='PL005-timerSection col-xs-4'>
      <span class='PL005-timer'>Need it tomorrow? Order by 4:30pm</span>
      <div><u id='PL005-headerTimer__link'>Free delivery by courier on orders over £125 ex VAT*</u></div>
      </div>`;

      document.querySelector('section.inner > .row.middle > .col-xs-4').insertAdjacentHTML('afterend', timerSection);
    },
    beforeCountdownSidebarAndStickynavContainers() {
      // Siderbar Container
      const sidebarNavTimer = `<div class='PL005-sidebarTimer product_details shipping bold'>Order by <span class='PL005-timer' id='PL005-timer__sidebar'>4:30pm</span> for delivery tomorrow. <span class='PL005-moreInfo__link' id='PL005-sidebarTimer__link'>More info</span></div>`; // eslint-disable-line quotes
      document.querySelector('.productpricecontainer.box > div:nth-child(2) > div:last-child').insertAdjacentHTML('afterend', sidebarNavTimer);
      // Sticky Nav Container
      const stickyNavTimer = `<div class='PL005-stickynavTimer product_details shipping bold'>Order by <span class='PL005-timer' id='PL005-timer__stickynav'>4:30pm</span> for delivery tomorrow. <span class='PL005-moreInfo__link' id='PL005-stickynavTimer__link'>More info</span></div>`; // eslint-disable-line quotes
      document.querySelector('.sticky_wrapper .right .product_buttons > div').insertAdjacentHTML('beforeend', stickyNavTimer);
    },
    /**
     * @desc Days with no next day delivery
     */
    noNextDayDelivery(dayIsThursday, dayIsFriday) {
      let timerSection;
      const now = new Date();
      let deliveryDay;
      /**
       * @desc Thursday 16:30 - Friday 16:30, delivery day is Monday
       * Friday 16:30 - Sunday, delivery day is Tuesday
       */
      if (dayIsFriday) {
        if (!dayIsThursday && (now.getHours() >= 16)) {
          deliveryDay = 'Tuesday';
        } else {
          deliveryDay = 'Monday';
        }
        timerSection = `<div class='PL005-timerSection col-xs-4'>
        <span class='PL005-timer'>Order now for delivery on ${deliveryDay}.</span>
        <div><u id='PL005-headerTimer__link'>Safe, secure courier service to UK and Ireland</u></div>
        </div>`;
      } else {
        timerSection = `<div class='PL005-timerSection col-xs-4'>
        <span class='PL005-timer'>Order now for delivery on Tuesday.</span>
        <div><u id='PL005-headerTimer__link'>Safe, secure courier service to UK and Ireland</u></div>
        </div>`;
      }
      document.querySelector('section.inner > .row.middle > .col-xs-4').insertAdjacentHTML('afterend', timerSection);
    },
    noNextDayDeliverySidebarAndStickynavContainers(dayIsThursday, dayIsFriday) {
      let sidebarNavTimer;
      let stickyNavTimer;
      const now = new Date();
      let deliveryDay;
      /**
       * @desc Thursday 16:30 - Friday 16:30, delivery day is Monday
       * Friday 16:30 - Sunday, delivery day is Tuesday
       */
      if (dayIsFriday) {
        if (!dayIsThursday && (now.getHours() >= 16)) {
          deliveryDay = 'Tuesday';
        } else {
          deliveryDay = 'Monday';
        }
        // Siderbar Container
        sidebarNavTimer = `<div class='PL005-sidebarTimer product_details shipping bold'>
          Order now for delivery on <span class='PL005-timer' id='PL005-timer__sidebar'>${deliveryDay}</span>. 
          <span class='PL005-moreInfo__link' id='PL005-sidebarTimer__link'>More info</span></div>`; // eslint-disable-line quotes
        
        // Sticky Nav Container
        stickyNavTimer = `<div class='PL005-stickynavTimer product_details shipping bold'>
          Order now for delivery on <span class='PL005-timer' id='PL005-timer__stickynav'>${deliveryDay}</span>.
          <span class='PL005-moreInfo__link' id='PL005-stickynavTimer__link'>More info</span></div>`; // eslint-disable-line quotes
      } else {
        // Siderbar Container
        sidebarNavTimer = `<div class='PL005-sidebarTimer product_details shipping bold'>
          Order now for delivery on <span class='PL005-timer' id='PL005-timer__sidebar'>${deliveryDay}</span>. 
          <span class='PL005-moreInfo__link' id='PL005-sidebarTimer__link'>More info</span></div>`; // eslint-disable-line quotes
        
        // Sticky Nav Container
        stickyNavTimer = `<div class='PL005-stickynavTimer product_details shipping bold'>
          Order now for delivery on <span class='PL005-timer' id='PL005-timer__stickynav'>${deliveryDay}</span>.
          <span class='PL005-moreInfo__link' id='PL005-stickynavTimer__link'>More info</span></div>`; // eslint-disable-line quotes
      }
      document.querySelector('.productpricecontainer.box > div:nth-child(2) > div:last-child').insertAdjacentHTML('afterend', sidebarNavTimer);
      document.querySelector('.sticky_wrapper .right .product_buttons > div').insertAdjacentHTML('beforeend', stickyNavTimer);
    },
  },
};

export default Experiment;
