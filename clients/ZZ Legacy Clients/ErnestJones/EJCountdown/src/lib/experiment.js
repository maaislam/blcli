/**
 * {{EJ_Countdown}} - {{Test Description}}
 */
const Run = (cache) => {
  const doc = document;
  const bodyVar = doc.body;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'EJ_Countdown',
      VARIATION: '1',
    },
    init: () => {
      // Setup
      const { settings, components } = Exp;

      bodyVar.classList.add(settings.ID);
      components.render();
      components.clocksInnit();
    },
    components: {
      render() {
        const topBanner = [
          // You can change the countdown header to be a clickable by changing the tag
          // '<a href="#" class="EJ_countdown-header">',
          // You can change the color theme by adding EJ_lilac-theme to the classes also
          // '<div class="EJ_countdown-header EJ_lilac-theme">',
          '<div class="EJ_countdown-header">',
            '<h2>Black Friday Half Price Event</h2>',
            '<span>Offer ends in...</span>',
            '<div class="clock_wrap">',
              '<div class="clock_time-block">',
                '<span class="days"></span>',
                '<div class="time-info">days</div>',
              '</div>',
              '<div class="clock_time-block">',
                '<span class="hours"></span>',
                '<div class="time-info">hours</div>',
              '</div>',
              '<div class="clock-colon">:</div>',
              '<div class="clock_time-block">',
                '<span class="minutes"></span>',
                '<div class="time-info">mins</div>',
              '</div>',
              '<div class="clock-colon">:</div>',
              // Adding the class 'EJ_hide' to the clock_time-block will hide it
              // '<div class="clock_time-block EJ_hide">',
              // This can be done with any of the time blocks and the colons also
              '<div class="clock_time-block">',
                '<span class="seconds"></span>',
                '<div class="time-info">secs</div>',
              '</div>',
              '<div class="countdown-final"><span>Time is up!</span></div>',
            '</div>',
          '</div>',
        ].join('');
        
        // You can change the countdown header to be a clickable by changing the tag
        // '<a href="#" class="EJ_countdown-header">',
        // You can change the color theme by adding EJ_lilac-theme to the classes also
        // '<div class="EJ_countdown-header EJ_lilac-theme">',
        const ingridCountdown = [
          '<div class="EJ_countdown-ingrid">',
            '<h2>Black Friday Half Price Event</h2>',
            '<span>Offer ends in...</span>',
            '<div class="clock_wrap">',
              '<div class="clock_time-block">',
                '<span class="days"></span>',
                '<div class="time-info">days</div>',
              '</div>',
              '<div class="clock_time-block">',
                '<span class="hours"></span>',
                '<div class="time-info">hours</div>',
              '</div>',
              '<div class="clock-colon">:</div>',
              '<div class="clock_time-block">',
                '<span class="minutes"></span>',
                '<div class="time-info">mins</div>',
              '</div>',
              '<div class="clock-colon">:</div>',
              '<div class="clock_time-block">',
                '<span class="seconds"></span>',
                '<div class="time-info">secs</div>',
              '</div>',
              '<div class="countdown-final"><span>Time is up!</span></div>',
            '</div>',
          '</div>',
        ].join('');

        cache.get('mainHeader').insertAdjacentHTML('beforebegin', topBanner);
        cache.get('gridWrap').insertAdjacentHTML('afterbegin', ingridCountdown);
      },
      clocksInnit() {
        const finalMsg = document.querySelectorAll('.countdown-final');
        const day = document.querySelectorAll('.days');
        const hour = document.querySelectorAll('.hours');
        const minute = document.querySelectorAll('.minutes');
        const second = document.querySelectorAll('.seconds');
        const countdownLength = day.length; 
        const deadline = new Date(Date.parse('October 15 2020 23:59:59 GMT+0100'));
        const timeinterval = setInterval(updateClock, 1000);
        updateClock(deadline);

        function getTimeRemaining(endtime) {
          const timeLeft = Date.parse(endtime) - Date.parse(new Date());
          const seconds = Math.floor((timeLeft / 1000) % 60);
          const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
          const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
          const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

          return {
            'total': timeLeft,
            'daysLeft': days,
            'hoursLeft': hours,
            'minutesLeft': minutes,
            'secondsLeft': seconds
          };
        }

        function updateClock() {
          const timeLeft = getTimeRemaining(deadline);
          for (let i = 0; i < countdownLength; i += 1) {
            day[i].innerHTML = timeLeft.daysLeft;
            hour[i].innerHTML = ('0' + timeLeft.hoursLeft).slice(-2);
            minute[i].innerHTML = ('0' + timeLeft.minutesLeft).slice(-2);
            second[i].innerHTML = ('0' + timeLeft.secondsLeft).slice(-2);
          }
          
          if (timeLeft.total <= 0) {
            clearInterval(timeinterval);
            for (let i = 0; i < countdownLength; i += 1) {
              finalMsg[i].classList.add('show-final');
            }
          }
        }
      },
    },
  };

  Exp.init();
};

export default Run;
