/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { addPoller, addEventListener, addObserver } from './winstack';
import { events } from '../../../../../lib/utils';
import settings from './shared';
import { urlList } from './targeting';

export default () => {
  setup();
  
  const jqStr = 'jQ' + ''.trim() + 'uery';
  const ref = document.querySelector('header');

  const timeLeft = () => {
    const today = new Date();
    const cmas = new Date(today.getFullYear(), 11, 25);
    if (today.getMonth()==11 && today.getDate()>25) 
    {
    cmas.setFullYear(cmas.getFullYear()+1); 
    }  
    const one_day=1000*60*60*24;
    return `${Math.floor((cmas.getTime()-today.getTime())/(one_day))}`;
  };

  const time = timeLeft();
  const buildSlider = () => {
    return `
      <div class="BI052-uspSlider BI052-DOD">
        <div class="BI052-sliderWrap">
          <div class="BI052-slide">
            <p><strong>Christmas day is just <span>${time > 1 ? `${time} days` : `${time} day`}</span> away</strong></p>
            <p>Order today for guaranteed Christmas delivery - deliver to you or direct to the person you’re sending to</p>
          </div>
          <div class="BI052-slide">
            <p><strong>Tracked, courier delivery with Royal Mail</strong></p>
            <p>Select any date between now and December 23rd for delivery on that day</p>
          </div>
          <div class="BI052-slide">
            <p><strong>All our biscuits have a shelf life beyond Christmas</strong></p>
            <p>Meaning they’ll be fresh and tasty for the lucky recipient!</p>
          </div>
        </div>
        <div class="BI052-nextSlider">
        </div>
      </div>
    `;
  };
  
  const addElement = () => {
    const slider = buildSlider();
    // addPoller(() => !!slider, () => {
      if (time && ref) {
        if (!document.querySelector('.BI052-uspSlider'))    {
          ref.insertAdjacentHTML('afterend', slider);
        }
      }
    // });
  };

  const addSlick = () => {
    addPoller([
      '.BI052-sliderWrap',
      () => !!window[jqStr],
    ], () => {
      const $ = window[jqStr];

      const slickSliders = () => {
        const opts = {
          slidesToShow: 1,
          arrows: true,
          dots: false,
          autoplay: true,
          speed: 350,
          adaptiveHeight: true,
          autoplaySpeed: 4500,
          // prevArrow: $(''),
          nextArrow: $('.BI052-nextSlider')
        };
  
        $(`.${settings.ID}-sliderWrap`).slick(opts);
        
      };
  
      if($.fn.slick) {
        slickSliders();
      } else {
        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', () => {
          slickSliders();
        });
      }
    
    });
  }

  if (!document.querySelector('.BI052-uspSlider')) {
    addElement();
    addSlick();

    if(document.querySelector('local-product-view')) {
      const slider = document.querySelector('.BI052-uspSlider');
      if(slider) {
        slider.classList.add('xproductpage');
      }
    }
  }
};
