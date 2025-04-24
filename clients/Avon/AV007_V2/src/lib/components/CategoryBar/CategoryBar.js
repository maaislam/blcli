import settings from '../../settings';
import { escapeRegExp, events, globalGetScript } from '../../../../../../../lib/utils';

const { ID } = settings;

export default class CategoryBar {
  constructor() {
    this.categories = [
      {
        name: 'Offers',
        url: 'https://www.avon.uk.com/special-offers',
      },
      {
        name: 'Make up',
        url: 'https://www.avon.uk.com/301/make-up',
      },
      {
        name: 'Skincare',
        url: 'https://www.avon.uk.com/302/skincare',
      },
      {
        name: 'Distillery',
        url: 'https://www.avon.uk.com/932/distillery',
      },
      {
        name: 'Perfume',
        url: 'https://www.avon.uk.com/304/perfume',
      },
      {
        name: 'Toiletries',
        url: 'https://www.avon.uk.com/306/toiletries',
      },
      {
        name: 'Home & Gifts',
        url: 'https://www.avon.uk.com/310/home-gifts'
      },
      {
        name: 'Sale',
        url: 'https://www.avon.uk.com/313/sale',
      },
    ];
    this.name = `${settings.ID}_CategoryBar`;
    this.$ = window.angular.element;

    CategoryBar.loadSlider(() => {
      this.create();
      this.render();
      this.createSlider();
    });
  }

  create() {
    const { categories, name, $ } = this;

    /* eslint-disable indent */
    const $component = $(`
      <div class="${name} swiper-container">
        <div class="swiper-wrapper">
          ${categories.map((data) => {
            const urlRegex = new RegExp(`${escapeRegExp(data.url)}\/?([?].*)?(#.*)?$`, 'i');
            const isActivePage = urlRegex.test(window.location.href);

            return `
              <div class="${name}_item swiper-slide${isActivePage ? ` ${name}_item--active` : ''}">
                <a href="${data.url}">${data.name}</a>
              </div>  
            `;
          }).join('')}
        </div>
        <div class="swiper-button-next ${name}_nav ${name}_nav--next"></div>
        <div class="swiper-button-prev ${name}_nav ${name}_nav--prev"></div>
      </div>
    `);
    /* eslint-enable indent */

    this.$component = $component;
  }

  render() {
    const { $component } = this;

    $component.insertAfter('#LogoBar');
  }

  /**
   * Init slider
   * Component must be rendered on page before calling this function
   */
  createSlider() {
    const { $component, name, $ } = this;

    // eslint-disable-next-line
    $(function () {
      // Sometimes there's an issue with infinite scroll happening and the
      // nav not working correctly if Swiper is called to early.
      // The hacky timeout is being used to avoid this bug
      setTimeout(() => {
        // Init Swiper
        const slider = new window.Swiper(`.${name}`, {
          slidesPerView: 'auto',
          navigation: {
            nextEl: `.${name}_nav--next`,
            prevEl: `.${name}_nav--prev`,
          },
          // slidesPerGroup: 1,
          freeMode: true,
          freeModeMomentumRatio: 0.5,
          freeModeMomentumVelocityRatio: 0.5,
        });

        // Scroll to active slide
        const $activeSlide = $component.find(`.${name}_item--active`);
        if ($activeSlide.length) {
          const activeIndex = $activeSlide.eq(0).index();
          slider.slideTo(activeIndex, 200);
        }

        // Attach events
        slider.on('slideChange', () => {
          events.send(ID, 'Move', 'User moved slider');
        });

        $component.find('a').on('click', (e) => {
          const text = $(e.target).text().trim();
          events.send(ID, 'Click', `User clicked link: ${text}`);
        });

        this.slider = slider;
      }, 500);
    });
  }

  /**
   * Load slider from CDN then run callback
   * @param {function} callback
   */
  static loadSlider(callback) {
    const $ = window.angular.element;

    // Load JS
    globalGetScript('https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/js/swiper.min.js')
      .then(() => {
        if (typeof callback === 'function') {
          callback();
        }
      });

    // Load CSS
    $('<link/>', {
      rel: 'stylesheet',
      type: 'text/css',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/css/swiper.min.css',
    }).appendTo('head');
  }
}
