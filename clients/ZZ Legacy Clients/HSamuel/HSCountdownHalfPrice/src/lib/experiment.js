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
      const { settings, components } = Exp;

      bodyVar.classList.add(settings.ID);
      components.render();
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
          '<a href="#" class="HS_container container">',
            '<div class="HS_countdown-ingrid">',
              '<span class="HS_small-text">Use code <strong>"Halfprice"</strong> in the basket</span>',
              '<h2>Buy one get one half <br class="HS_mobile-breakpoint" /> price on <strong>Everything!<span class="HS_small-asterisk">*</span></strong></h2>',
              // '<span class="HS_small-text">Use code <strong>"Halfprice"</strong> in the basket</span>',
              // '<div class="HS_nav">',
              //   '<div class="HS_nav-half">',
              //     '<a href="#" class="HS_nav-item">Men\'s Watches</a>',
              //     '<a href="#" class="HS_nav-item">Ladies Watches</a>',
              //     '<a href="#" class="HS_nav-item">Diamond Rings</a>',
              //   '</div>',
              //   '<div class="HS_nav-half">',
              //     '<a href="#" class="HS_nav-item">Chamilia</a>',
              //     '<a href="#" class="HS_nav-item">Jewellery</a>',
              //     '<a href="#" class="HS_nav-item">Diamond Jewellery</a>',
              //   '</div>',
              // '</div>',
            '</div>',
          '</a>',
        ].join('');

        // cache.get('mainHeader').insertAdjacentHTML('beforebegin', topBanner);
        cache.get('gridWrap').insertAdjacentHTML('afterbegin', ingridCountdown);
      },
    },
  };

  Exp.init();
};

export default Run;
