import settings from '../../lib/settings';
import globals from '../../lib/global';
import Lightbox from '../../../../../../lib/components/Lightbox/Lightbox';
import {
  events,
  getClosest,
  viewabilityTracker,
} from '../../../../../../lib/utils';

const { ID } = settings;
events.setTrackerName('tracker2');

export default class ExitIntent extends Lightbox {
  constructor() {
    // Create lightbox component
    super(ID, {
      content: `
        <div class="${ID}_ExitIntent">
          <div class="${ID}_ExitIntent__head">
            <h2>Before you go, check out these last minute breaks</h2>
          </div>
          <div class="${ID}_ExitIntent__body">
          <div class="${ID}_ExitIntent__slider"></div>
          </div>
          <div class="${ID}_ExitIntent__footer">
            <div class="${ID}_ExitIntent__cta-wrap">
              <a class="orange-btn" href="/offers">View all deals</a>
            </div>
            <div class="${ID}_ExitIntent__cta-wrap">
              <a class="orange-btn" href="https://nationalholidays.com">Search for a holiday</a>
            </div>
          </div>
        </div>
      `,
      closeOnClick: true,
    });

    this.cloneSlider();
    this.bindAdditionalEvents();

    // Wait for exit intent detection before opening lightbox
    ExitIntent.waitForExitIntent(() => {
      super.open();
    });
  }

  /** Clone slick slider and add clone to lightbox */
  cloneSlider() {
    const { slider } = globals.cacheDOM;
    const { component } = this.cache;
    const originalSlider = slider.querySelector('.price-slider');
    const newSlider = component.querySelector(`.${ID}_ExitIntent__slider`);

    // Unslick original slider to clean markup
    $(originalSlider).slick('unslick');

    // Clone markup and remove ID
    const $clone = $(originalSlider).clone().removeAttr('id');

    // Restore original slider
    window.priceSlider(originalSlider);

    // Render new slider
    $(newSlider).append($clone);

    // Slick new slider and change index to first item
    window.priceSlider($clone);
    $clone.slick('slickGoTo', 0, true);
    $clone.slick('slickSetOption', 'slidesToShow', '4', true);
    this.$clone = $clone;
  }

  bindAdditionalEvents() {
    const { callbacks, cache, $clone } = this;
    const { component } = cache;
    const { slider, $slider } = globals.cacheDOM;
    const $sliders = $slider.add($clone);

    // ------------------
    // Lightbox Events
    // ------------------
    // Slider swipes
    const sliderEvents = {
      isSliding: false,

      beforeChangeHandler: () => {
        sliderEvents.isSliding = true;
      },

      afterChangeHandler: () => {
        sliderEvents.isSliding = false;
      },

      swipeHandler: (e) => {
        const isInPopup = !!getClosest(e.target, `.${ID}_ExitIntent__slider`);
        events.send(ID, 'Clicked', `Arrow to scroll through trips ${isInPopup ? '(in pop up)' : '(not in popup)'}`);
      },

      clickHandler: (e) => {
        // If arrow was clicked, trigger swipe handler
        if (e && e.target && e.target.classList.contains('slick-arrow')) {
          sliderEvents.swipeHandler(e);
        }
      },

      itemClickHandler: (e) => {
        // If item was clicked, check if slide is in progress before sending event
        if (!sliderEvents.isSliding) {
          const isInPopup = !!getClosest(e.target, `.${ID}_ExitIntent__slider`);
          // User clicked and didn't swipe, page change expected
          events.send(ID, 'Clicked', `One of the trips ${isInPopup ? '(in pop up)' : '(not in popup)'}`, { sendOnce: true });
        }
      },

      bindAllEvents: () => {
        $sliders.on('beforeChange', sliderEvents.beforeChangeHandler);
        $sliders.on('afterChange', sliderEvents.afterChangeHandler);
        $sliders.on('swipe', sliderEvents.swipeHandler);
        $sliders.on('click', sliderEvents.clickHandler);
        $sliders.find('.item').on('click', sliderEvents.itemClickHandler);
      },

      removeAllEvents: () => {
        $sliders.off('beforeChange', sliderEvents.beforeChangeHandler);
        $sliders.off('afterChange', sliderEvents.afterChangeHandler);
        $sliders.off('swipe', sliderEvents.swipeHandler);
        $sliders.off('click', sliderEvents.clickHandler);
        $sliders.find('.item').off('click', sliderEvents.itemClickHandler);
      },
    };

    sliderEvents.bindAllEvents();

    callbacks.beforeOpen = () => {
      $clone.slick('resize'); // Refresh new slider
    };

    callbacks.afterOpen = () => {
      $clone.slick('resize'); // Refresh new slider
      setTimeout(() => {
        $clone.slick('resize'); // Refresh new slider again incase it was too quick
      }, 1000);
      events.send(ID, 'User saw', 'The exit intent pop up');
    };

    // ------------------
    // GA Events
    // ------------------
    const close = component.querySelector(`.${ID}_Lightbox__close`);
    if (close) {
      close.addEventListener('click', () => {
        events.send(ID, 'Clicked', 'X in the pop up');
      });
    }

    const viewAllCta = component.querySelector(`.${ID}_ExitIntent__cta-wrap a[href="/offers"]`);
    if (viewAllCta) {
      viewAllCta.addEventListener('click', () => {
        events.send(ID, 'Clicked', 'view all deals (in pop up)');
      });
    }

    const searchCta = component.querySelector(`.${ID}_ExitIntent__cta-wrap a[href="https://nationalholidays.com"]`);
    if (searchCta) {
      searchCta.addEventListener('click', () => {
        events.send(ID, 'Clicked', 'Search for a holiday (in pop up)');
      });
    }

    viewabilityTracker(slider, () => {
      events.send(ID, 'User saw', 'upcoming discounted trips on the page', { sendOnce: true });
    }, { removeOnView: true });
  }

  /**
   * Run a callback when exit intent is detected
   * @param {function} callback
   */
  static waitForExitIntent(callback) {
    /**
     * Returns current unix timestamp
     * @returns {number}
     */
    const getNow = Date.now || function getNow() {
      return new Date().getTime();
    };

    // Minimum time on the site before exit intent should be detected
    const startTime = getNow();
    const minTime = 30000;
    const minTimeHasPassed = () => getNow() - startTime >= minTime;

    // Exit intent detected, check if minTime has passed before running callback
    const exitIntentHandler = (e) => {
      if (e.clientY < 0 && minTimeHasPassed()) {
        document.removeEventListener('mouseleave', exitIntentHandler);
        callback();
      }
    };

    document.addEventListener('mouseleave', exitIntentHandler);
  }
}
