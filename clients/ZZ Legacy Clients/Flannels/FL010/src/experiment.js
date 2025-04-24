import { fullStory, events, viewabilityTracker } from '../../../../lib/utils';
// import { fullStory, events, viewabilityTracker } from '../../../../lib/utils';

/**
 * {{FL010}} - {{Related items changes}}
 */
const Run = () => {
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL010',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const slider = bodyVar.querySelector('.borderWrap .swiper-container');

      return {
        bodyVar,
        slider,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.contentBuilder();
      components.bindAddToBag();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        events.analyticsReference = '_gaUAT';
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} - Variation ${settings.VARIATION} ran`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      contentBuilder: () => {
        /* eslint-disable */
        const slidesMarkup = Exp.cache.slider.querySelector('.swiper-wrapper').innerHTML;
        const heightSlider = Exp.cache.slider.querySelector('.swiper-wrapper').clientHeight;
        //<div class="swiper-container FL010_slider" style="height: ${heightSlider}px!important">

        const sliderStructure = `
          <div class="swiper-container FL010_slider">
            <div class="swiper-wrapper">
              ${slidesMarkup}
            </div>
            <div class="swiper-pagination"></div>
          </div>
        `;

        Exp.cache.slider.insertAdjacentHTML('afterend', sliderStructure);

        const newSlider = new Swiper('.FL010_slider', {
          mode: 'horizontal',
          slidesPerView: 'auto',
          freeMode: true,
          freeModeFluid: true,
          scrollContainer: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
        });

        Exp.cache.slider.style.display = 'none'; 
      },
      bindAddToBag: () => {
        const addToBagElOld = Exp.cache.slider.querySelectorAll('.swiper-slide');
        const addToBagWrap = document.querySelector('.FL010_slider');
        const addToBagEl = document.querySelectorAll('.FL010_slider .swiper-slide');

        [].forEach.call(addToBagEl, (item, index) => {
          const add = item.querySelector('.hotspotbuy.hotspotquickbuy');
          const heart = item.querySelector('.hotspotbuy.hotspotwishlist');

          add.addEventListener('click', () => {
            events.send(`${Exp.settings.ID}`, 'Click', 'User Clicked on Add to Bag', { sendOnce: true });
            addToBagElOld[index].querySelector('.hotspotbuy.hotspotquickbuy').click();
          });

          heart.addEventListener('click', () => {
            addToBagElOld[index].querySelector('.hotspotbuy.hotspotwishlist').click();
          });
        });

        viewabilityTracker(addToBagWrap, () => {
          events.send(`${Exp.settings.ID}`, 'Scroll', 'User scrolled Related Items into view', { sendOnce: true });
        }, {
          removeOnView: true,
        });

        addToBagWrap.addEventListener('click', () => {
          events.send(`${Exp.settings.ID}`, 'Click', 'User interacted with Related Items', { sendOnce: true });
        }); 
      },
    },
  };

  Exp.init();
};

export default Run;
