/* eslint-disable import/no-cycle */
import {
  mergeObjects,
} from './utils';

/**
 * @desc Create a feedback tab component
 */
export const feedbackTab = () => {
  var $ = window.jQuery;
  var settings, component, background, css, animations, dimensions, dimensionProperty;

  var getSettings = function (options) {
    var newSettings = settings || {
      label: false,
      content: false,
      position: 'left',
      customClass: false,
      sessionClose: true,
      tabDimensions: {
        height: 'auto',
        width: '350px'
      },
      contentDimensions: {
        height: '350px',
        width: '600px'
      },
      mobileBreakpoint: 768,
      animationSpeed: 600,
      dimBackground: false,
      zIndex: 99999,
    };

    if (options) {
      // Overwrite defaults with values from options
      for (var option in options) {
        newSettings[option] = options[option];
      }
    } else {
      options = newSettings;
    }

    return newSettings;
  };

  var createComponent = function () {
    var $template = $([
        '<div class="UC_fb-tab-container">',
        '<div class="UC_fb-tab">',
        '<span class="UC_fb-tab__inner"></span>',
        '<span class="UC_fb-tab__close">&#215;</span>',
        '</div>',
        '<div class="UC_fb-content">',
        '<div class="UC_fb-content__inner"></div>',
        '</div>',
        '</div>'
      ].join('')),
      $tab = $template.find('.UC_fb-tab'),
      $content = $template.find('.UC_fb-content');
    // Optional
    if (settings.label) $tab.find('.UC_fb-tab__inner').html(settings.label);
    if (settings.content) $content.find('.UC_fb-content__inner').html(settings.content);
    if (settings.customClass) $template.addClass(settings.customClass);
    if (settings.dimBackground) background = $('<div class="UC_fb-tab-bg"></div>');

    // Set user defined styles
    $tab.css({
      'height': settings.tabDimensions.height,
      'width': settings.tabDimensions.width
    });
    $content.css({
      'height': settings.contentDimensions.height,
      'width': settings.contentDimensions.width
    });

    return $template;
  };

  var destroyComponent = function () {
    if (component) component.remove();
    if (background) background.remove();
  };

  var createCSS = function () {
    // Define positioning variables
    var tabPosStyle, contentPosStyle, containerPosStyle;
    switch (settings.position) {
      case 'left':
        tabPosStyle = '-webkit-transform:rotate(-90deg) translateX(-50%);-moz-transform:rotate(-90deg) translateX(-50%);-ms-transform:rotate(-90deg) translateX(-50%);-o-transform:rotate(-90deg) translateX(-50%);transform:rotate(-90deg) translateX(-50%);transform-origin:top left;top:50%;left:100%;';
        containerPosStyle = 'top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%);left:-100%;';
        dimensionProperty = 'width';
        break;

      case 'right':
        tabPosStyle = '-webkit-transform:rotate(-90deg) translateY(-100%);-moz-transform:rotate(-90deg) translateY(-100%);-ms-transform:rotate(-90deg) translateY(-100%);-o-transform:rotate(-90deg) translateY(-100%);transform:rotate(-90deg) translateY(-100%);transform-origin:top right;right:100%;';
        containerPosStyle = 'top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%);right:-100%;';
        dimensionProperty = 'width';
        break;

      case 'bottom':
        tabPosStyle = '-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);bottom:100%;left:50%;';
        containerPosStyle = 'left:50%;-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);bottom:-100%;';
        dimensionProperty = 'height';
        break;

      case 'top':
        tabPosStyle = '-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);top:100%;left:50%;';
        containerPosStyle = 'left:50%;-webkit-transform:translateX(-50%);-moz-transform:translateX(-50%);-ms-transform:translateX(-50%);-o-transform:translateX(-50%);transform:translateX(-50%);top:-100%;';
        dimensionProperty = 'height';
        break;

      default:
        tabPosStyle = '';
        containerPosStyle = '';
        dimensionProperty = 'width';
        break;
    }

    // Create style node
    var style = document.createElement('style');
    style.type = 'text/css';

    var css = '.UC_fb-tab,.UC_fb-tab__close{display:inline-block;cursor:pointer}.UC_fb-content,.UC_fb-tab{max-width:100%;max-height:100%;box-sizing:border-box;background:#fff}.UC_fb-tab-container{position:fixed;z-index:' + settings.zIndex + ';' + containerPosStyle + '}.UC_fb-tab{position:absolute;margin:0 auto;text-align:center;z-index:' + settings.zIndex + ';color:#333;font-size:15px;padding:10px 10px 10px 20px;' + tabPosStyle + '}.UC_fb-tab__inner{display:inline-block;margin:0 auto}.UC_fb-tab__close{position:absolute;right:10px;font-family:sans-serif}.UC_fb-content{padding:20px;text-align:left;position:relative;}.UC_fb-tab-bg{display:none;background:#000;opacity:0.7;position:fixed;top:0;right:0;bottom:0;left:0;z-index:' + (settings.zIndex - 1) + ';}';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    return style;
  };

  var destroyCSS = function () {
    if (css) css.parentElement.removeChild(css);
  };

  // Return height and width of each element
  var getDimensions = function () {
    var $container = $('.UC_fb-tab-container');
    var $tab = $container.children('.UC_fb-tab');
    var $content = $container.children('.UC_fb-content');
    var $window = $(window);

    var dimensions = {
      window: {
        width: $window.innerWidth(),
        height: $window.innerHeight()
      },
      tab: {
        width: $tab.outerWidth(),
        height: $tab.outerHeight()
      },
      content: {
        width: $content.outerWidth(),
        height: $content.outerHeight()
      }
    };

    return dimensions;
  };

  // Generate animations based on dimensions
  var getAnimations = function (dimensions) {
    if (!dimensions) dimensions = getDimensions();
    if (!settings) settings = getSettings();

    var updatedAnimations = {
      remove: {},
      open: {},
      close: {}
    };

    updatedAnimations.remove[settings.position] = '-100%';
    updatedAnimations.open[settings.position] = '0';
    updatedAnimations.close[settings.position] = '-' + dimensions.content[dimensionProperty] + 'px';

    return updatedAnimations;
  };

  // Event Handlers
  var attachEventHandlers = function (component) {
    if (!component) return false;
    var tab = component.find('.UC_fb-tab');
    var content = component.find('.UC_fb-content');
    var tabStatus = 'closed';
    var pos = settings.position;
    var orientation = (pos === 'left' || pos === 'right') ? 'horizontal' : 'vertical';

    tab.click(function () {
      var maxWidth, maxHeight, animationToPerform;

      // Refresh dimensions and animations
      dimensions = getDimensions();
      animations = getAnimations(dimensions);

      // Define max dimensions to make sure close tab is always visible
      if (orientation === 'horizontal') {
        maxWidth = dimensions.window.width - dimensions.tab.height - 5;
        maxHeight = dimensions.window.height;
      } else {
        maxWidth = dimensions.window.width;
        maxHeight = dimensions.window.height - dimensions.tab.height - 5;
      }
      content.css({
        'max-width': maxWidth,
        'max-height': maxHeight
      });

      // If dimensions.content values exeed new max dimensions, update values to reflect current render state
      if (dimensions.content.width > maxWidth) dimensions.content.width = maxWidth;
      if (dimensions.content.height > maxHeight) dimensions.content.height = maxHeight;


      // Get next animation based on whether tab is open or closed
      if (tabStatus === 'open') {
        animationToPerform = animations.close
        if (background) background.fadeOut();
      } else {
        animationToPerform = animations.open;
        if (background) background.fadeIn();
      }

      // Perform animation
      component.animate(animationToPerform, settings.animationSpeed, function () {
        tabStatus = tabStatus === 'open' ? 'closed' : 'open';
      });
    });

    tab.find('.UC_fb-tab__close').click(function (e) {
      e.stopPropagation();
      if (background) background.fadeOut();
      component.animate(animations.remove, settings.animationSpeed);

      if (settings.sessionClose) {
        // Prevent showing again using session storage
        window.sessionStorage.setItem('ucfbtab-closed', 1);
      }
    });
  };

  /*
   * Public Methods
   */
  var methods = {
    init: function (options) {
      var newSettings = getSettings(options);
      if (settings !== newSettings) settings = newSettings;

      if (settings.sessionClose && window.sessionStorage.getItem('ucfbtab-closed')) {
        return;
      }

      component = createComponent();
      css = createCSS();

      // Inject in DOM
      component.prependTo('body'); // HTML
      document.body.insertBefore(css, component[0]); // Style tag
      if (settings.dimBackground) component.before(background); // Background


      dimensions = getDimensions();
      animations = getAnimations(dimensions);
      attachEventHandlers(component);

      // Set initial position
      component.css(settings.position, '-' + dimensions.content[dimensionProperty] + 'px');
    },

    destroy: {
      component: destroyComponent,
      css: destroyCSS,
      all: function () {
        destroyComponent();
        destroyCSS();
      }
    },

    refresh: function (options) {
      this.destroy.all();
      this.init(options);
    }
  };

  return methods;
};

/**
 * @desc Create a countdown component
 */
export const countdown = (userOptions) => {
  let options = {
    cutoff: null,
    element: null,
    labels: {
      d: 'days',
      h: 'hours',
      m: 'minutes',
      s: 'seconds',
    },
    zeroPrefixHours: false,
    zeroPrefixMinutes: false,
    zeroPrefixSeconds: false,
    hoursInsteadOfDays: false,
    delivery: {
      deliveryDays: null,
      excludeDays: null,
      deliveryDayElement: null,
      tomorrowLabel: false,
      showFullDate: false,
      dayLabelStyle: 'long',
      monthLabelStyle: 'long',
    },
  };

  // Overwrite any default options with user supplied options
  if (userOptions) {
    options = mergeObjects(options, userOptions);
  }

  const now = new Date();
  let cutoff = new Date(options.cutoff);
  let countdownTimer;
  const dayLabels = [
    {
      short: 'Sun',
      long: 'Sunday',
    },
    {
      short: 'Mon',
      long: 'Monday',
    },
    {
      short: 'Tue',
      long: 'Tuesday',
    },
    {
      short: 'Wed',
      long: 'Wednesday',
    },
    {
      short: 'Thu',
      long: 'Thursday',
    },
    {
      short: 'Fri',
      long: 'Friday',
    },
    {
      short: 'Sat',
      long: 'Saturday',
    },
  ];
  const monthLabels = [
    {
      short: 'Jan',
      long: 'January',
    },
    {
      short: 'Feb',
      long: 'February',
    },
    {
      short: 'Mar',
      long: 'March',
    },
    {
      short: 'Apr',
      long: 'April',
    },
    {
      short: 'May',
      long: 'May',
    },
    {
      short: 'Jun',
      long: 'June',
    },
    {
      short: 'Jul',
      long: 'July',
    },
    {
      short: 'Aug',
      long: 'August',
    },
    {
      short: 'Sept',
      long: 'September',
    },
    {
      short: 'Oct',
      long: 'October',
    },
    {
      short: 'Nov',
      long: 'November',
    },
    {
      short: 'Dec',
      long: 'December',
    },
  ];
  const countdownData = {};
  const {
    delivery,
    labels,
  } = options;
  const {
    deliveryDays,
    excludeDays,
    deliveryDayElement,
    tomorrowLabel,
  } = delivery;

  // Change labels from plural to singular if value is 1
  const singularLabels = {
    d: labels.d === 'days'
      ? labels.d.substring(0, labels.d.length - 1)
      : labels.d,

    h: (labels.h === 'hours' || labels.h === 'hrs')
      ? labels.h.substring(0, labels.h.length - 1)
      : labels.h,

    m: (labels.m === 'minutes' || labels.m === 'mins')
      ? labels.m.substring(0, labels.m.length - 1)
      : labels.m,

    s: (labels.s === 'seconds' || labels.s === 'secs')
      ? labels.s.substring(0, labels.s.length - 1)
      : labels.s,
  };

  /**
   * Get the day string from a date object
   * @param {Date} date
   * @returns {string}
   */
  const getDayName = date => dayLabels[date.getDay()].long;

  /**
   * Tells you if a day is a working day or not
   * @param {string} day
   * @returns {boolean}
   */
  const isExcludedDay = day => excludeDays && excludeDays.indexOf(day) > -1;

  /**
   * Increments the date to the earliest day that isn't in the excludeDays array
   * e.g. If the date is a Friday and excludeDays is ['Saturday', 'Sunday'], the function will
   * return the following Monday
   * @param {object} date Date object to use as a starting point
   * @returns {object} date object for the next available date
   */
  const skipToNextAvailableDate = (date) => {
    while (isExcludedDay(getDayName(date))) {
      date.setDate(date.getDate() + 1);
    }

    return date;
  };

  /**
   * Calculates the delivery date based on the order cutoff time and the number of days it
   * takes for delivery (as provided in options.delivery.deliveryDays)
   * @returns {object} date object for the delivery date
   */
  const getDeliveryDate = () => {
    let deliveryDate = new Date(cutoff);
    let nonWorkingDays = 0;

    /*
     * Increment each day rather than adding them all in one go so we can
     * calculate how many non-working days are passed. These will be added
     * on to the total
     */
    for (let i = 0; i < deliveryDays; i += 1) {
      deliveryDate.setDate(deliveryDate.getDate() + 1);

      if (isExcludedDay(getDayName(deliveryDate))) {
        nonWorkingDays += 1;
      }
    }

    // Add the number of non working days to the expected delivery date
    if (nonWorkingDays) {
      deliveryDate.setDate(deliveryDate.getDate() + nonWorkingDays);
    }

    /*
     * If there is no delivery availble on the current delivery date, increment the date
     * by one until it's no longer a day in the excludeDays array
     */
    deliveryDate = skipToNextAvailableDate(deliveryDate);

    return deliveryDate;
  };

  /**
   * @param {object} one First date object
   * @param {object} two Second date object
   * @returns {number} The number of days between two date objects
   */
  const getDaysBetween = (one, two) => Math.round(Math.abs((+one) - (+two)) / 8.64e7);

  /**
   * Get the suffix for a date number
   * @param {number} date
   * @returns {string}
   */
  const getDateSuffix = (date) => {
    let suffix = '';

    if (date === 1) {
      suffix = 'st';
    } else if (date === 2) {
      suffix = 'nd';
    } else if (date === 3) {
      suffix = 'rd';
    } else {
      suffix = 'th';
    }

    return suffix;
  };

  // If now is an excluded day, change cutoff to next working day
  if (excludeDays && excludeDays.length && excludeDays.indexOf(dayLabels[now.getDay()].long > -1)) {
    const nextProcessingDay = skipToNextAvailableDate(new Date(now));
    const daysBetween = getDaysBetween(now, nextProcessingDay);
    cutoff.setDate(cutoff.getDate() + daysBetween);
  }

  // If the cutoff time has passed for today add an extra day
  // as the order won't be processed until tomorrow
  if (now > cutoff) {
    cutoff.setDate(cutoff.getDate() + 1);
    cutoff = skipToNextAvailableDate(cutoff);
  }

  // Store the cutoff time as a unix timestamp
  countdownData.cutoff = cutoff.getTime();

  // Create countdown timer
  // Call timer in an interval to refresh the time remaining each second
  let secondsUntilCutoff = Math.floor((cutoff.getTime() - now.getTime()) / 1000);
  const countdownElements = options.element ? document.querySelectorAll(options.element) : [];

  /**
   * Calculates the current time remaining and updates the html of all countdown elements
   */
  const timer = () => {
    // Time remaining calculations
    const days = Math.floor(secondsUntilCutoff / 24 / 60 / 60);
    const hoursLeftInSeconds = Math.floor((secondsUntilCutoff) - (days * 86400));
    let hours = Math.floor(hoursLeftInSeconds / 3600);
    const minutesLeftInSeconds = Math.floor((hoursLeftInSeconds) - (hours * 3600));
    let minutes = Math.floor(minutesLeftInSeconds / 60);
    let seconds = secondsUntilCutoff % 60;

    if (options.hoursInsteadOfDays) {
      hours = hours + (days * 24);
    }

    // Prefix numbers with 0 to occupy space of two digits
    if (options.zeroPrefixSeconds && seconds < 10) seconds = `0${seconds}`;
    if (options.zeroPrefixHours && hours < 10) hours = `0${hours}`;
    if (options.zeroPrefixMinutes && minutes < 10) minutes = `0${minutes}`;

    let countdownEl;
    for (let i = 0, ii = countdownElements.length; i < ii; i += 1) {
      countdownEl = countdownElements[i];
      countdownEl.innerHTML = `
        ${days > 0 && !options.hoursInsteadOfDays ? `<span class="UC_cd-days">${days}</span> ${days === 1 ? singularLabels.d : labels.d} ` : ''}

        ${options.labelsMarkup ? `<div>` : ''}
          <span class="UC_cd-hours">${hours}</span> 
            ${options.labelsMarkup ? '<em>' : ''}
              ${hours === 1 ? singularLabels.h : labels.h}
            ${options.labelsMarkup ? '</em>' : ''}
        ${options.labelsMarkup ? `</div>` : ''}

        ${options.labelsMarkup ? `<div>` : ''}
          <span class="UC_cd-minutes">${minutes}</span> 
            ${options.labelsMarkup ? '<em>' : ''}
              ${minutes === 1 ? singularLabels.m : labels.m}
            ${options.labelsMarkup ? '</em>' : ''}
        ${options.labelsMarkup ? `</div>` : ''}

        ${options.labelsMarkup ? `<div>` : ''}
          <span class="UC_cd-seconds">${seconds}</span> 
            ${options.labelsMarkup ? '<em>' : ''}
              ${seconds === 1 ? singularLabels.s : labels.s}
            ${options.labelsMarkup ? '</em>' : ''}
        ${options.labelsMarkup ? `</div>` : ''}
      `;
    }

    if (secondsUntilCutoff === 0) {
      clearInterval(countdownTimer);
    } else {
      secondsUntilCutoff -= 1;
    }
  };

  // Begin countdown
  countdownTimer = setInterval(timer, 1000);

  // If countdown is for delivery, create delivery day string
  if (deliveryDays) {
    const deliveryDate = getDeliveryDate();
    const deliveryEl = options.deliveryDayElement ? document.querySelectorAll(deliveryDayElement) : [];
    let deliveryDayLabel = dayLabels[deliveryDate.getDay()][options.delivery.dayLabelStyle];
    const deliveryMonthLabel = monthLabels[deliveryDate.getMonth()][options.delivery.monthLabelStyle];
    const date = deliveryDate.getDate();
    const deliveryDateLabel = `${date}${getDateSuffix(date)}`;

    // If delivery date is tomorrow and tomorrowLabel is true, change deliveryDay label
    if (tomorrowLabel) {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);

      /**
       * Check if the delivery date is tomorrow
       * @returns {boolean}
       */
      const deliveryDateIsTomorrow = () => {
        const yearMatches = () => tomorrow.getFullYear() === deliveryDate.getFullYear();
        const monthMatches = () => tomorrow.getMonth() === deliveryDate.getMonth();
        const dateMatches = () => tomorrow.getDate() === deliveryDate.getDate();

        return yearMatches() && monthMatches() && dateMatches();
      };

      if (deliveryDateIsTomorrow()) {
        deliveryDayLabel = 'tomorrow';
      }
    }

    const dateLabel = (() => {
      let label = '';

      if (deliveryDayLabel !== 'tomorrow' && options.delivery.showFullDate) {
        label = `${deliveryDayLabel} ${deliveryDateLabel} ${deliveryMonthLabel}`;
      } else {
        label = deliveryDayLabel;
      }

      return label;
    })();

    // Set content for delivery day elements to delivery day label
    for (let i = 0, ii = deliveryEl.length; i < ii; i += 1) {
      deliveryEl[i].innerHTML = dateLabel;
    }

    // Note: Delivery time will not be accurate but the date will be correct
    countdownData.deliveryDate = deliveryDate.getTime();
    countdownData.deliveryDay = dateLabel;
  }

  // Expose public data
  return countdownData;
};


/**
 * @desc Fetches JSON from an external cross site source, by adding a script tag to the header.
 * See https://app.gitbook.com/@userconversion/s/development/~/drafts/-LwOTER6UNYnTP7FWix4/uc-library-utils#fetchexternaljson for more details
 * @param {String} src URL for the external link, e.g https://storage.googleapis.com/ucimagehost/MP173/newConfigNew.json
 * @param {*} options onSuccess callback for successful request. onTimeout callback for no response after; timeout param (secs)
 */
export const fetchExternalJSON = () => {

  var that = {};

  that.send = function(src, options) {
    var callback_name = options.callbackName || 'callback',
      on_success = options.onSuccess || function(){},
      on_timeout = options.onTimeout || function(){},
      timeout = options.timeout || 10; // sec

    var timeout_trigger = window.setTimeout(function(){
      window[callback_name] = function(){};
      on_timeout();
    }, timeout * 1000);

    window[callback_name] = function(data){
      window.clearTimeout(timeout_trigger);
      on_success(data);
    }

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = src;

    document.getElementsByTagName('head')[0].appendChild(script);
  }

  return that;

};

/**
 * Re-exports
 * Export utilties that were stored here previously for backwards compatibilty
 */
export {
  poller,
  pollerLite,
  observer,
  group,
  hoverDelay,
  throttle,
} from './utils';
