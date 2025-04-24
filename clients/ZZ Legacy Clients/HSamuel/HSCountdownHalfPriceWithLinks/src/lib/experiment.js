import { fullStoryMap, eventsMap } from '../../../../../lib/utils';

/**
 * {{HS_Countdown}} - {{Test Description}}
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
      ID: 'HS_Countdown',
      VARIATION: '1',
    },
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      bodyVar.classList.add(settings.ID);
      components.render();
      components.clocksInnit();

      services.tracking();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStoryMap(settings.ID, `Variation ${settings.VARIATION}`);
        eventsMap.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      render() {
        // const topBanner = `
        //   <div class="HS_countdown-header">
        //     <h2>Black Friday Half Price Event</h2>
        //     <span>Offer ends in...</span>
        //     <div class="clock_wrap">
        //       <div class="clock_time-block">
        //         <span class="days"></span>
        //         <div class="time-info">days</div>
        //       </div>
        //       <div class="clock_time-block">
        //         <span class="hours"></span>
        //         <div class="time-info">hours</div>
        //       </div>
        //       <div class="clock-colon">:</div>
        //       <div class="clock_time-block">
        //         <span class="minutes"></span>
        //         <div class="time-info">mins</div>
        //       </div>
        //       <div class="clock-colon">:</div>
        //       <div class="clock_time-block">
        //         <span class="seconds"></span>
        //         <div class="time-info">secs</div>
        //       </div>
        //       <div class="countdown-final"><span>It's Time</span></div>
        //     </div>
        //   </div>
        // `;

        // HS_yellow-theme
        // HS_teal-theme
        // No class theme is default Red
        const ingridCountdown = [
          '<div class="HS_container container HS_teal-theme">',
            '<div class="HS_countdown-ingrid">',
              '<h2>Buy one get one half <br class="HS_mobile-breakpoint" /> price on <strong>Everything!<span class="HS_small-asterisk">*</span></strong></h2>',
              '<div class="HS_bullet-list">',
                '<p>£50 off £250 <span class="HS_bullet-highlight">Use code: Save50</span></p>',
                '<p>£50 off £250 <span class="HS_bullet-highlight">Use code: Save50</span></p>',
                '<p>£50 off £250 <span class="HS_bullet-highlight">Use code: Save50</span></p>',
              '</div>',
            '</div>',
          '</div>',
        ].join('');

        // cache.get('mainHeader').insertAdjacentHTML('beforebegin', topBanner);
        cache.get('gridWrap').insertAdjacentHTML('afterbegin', ingridCountdown);
      },
      clocksInnit() {
        const finalMsg = document.querySelectorAll('.countdown-final');
        const day = document.querySelectorAll('.days');
        const hour = document.querySelectorAll('.hours');
        const minute = document.querySelectorAll('.minutes');
        const second = document.querySelectorAll('.seconds');
        const countdownLength = day.length; 
        const deadline = new Date(Date.parse('October 19 2018 23:59:59 GMT+0100'));
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
            if (timeLeft.daysLeft === 0) {
              day[i].parentNode.classList.add('HS_hide_days');
            } else {
              day[i].innerHTML = timeLeft.daysLeft;
            }

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
