import {
  setup,
} from './services';
import settings from './settings';
import ProductZoom from '../components/ProductZoom/ProductZoom';
import {
  poller,
} from '../../../../../lib/uc-lib';
import stickIt from './stickIt';
import elevateZoom from './elevateZoom';
import { events } from '../../../../../lib/utils';

const {
  VARIATION,
  ID,
} = settings;

const activate = () => {
  if (VARIATION === '2') {
    events.send(ID, 'Control', 'is-active');
    return false;
  }
  setup();
  const check = document.querySelector('body').classList.contains('ProdDetails');
  const isMobile = document.querySelector('body').classList.contains('touchenabled');
  if (check) {
    new ProductZoom({
      injectInto: '#productImages',
    });
    /*
     *Starts the zoom plugin -> http://igorlino.github.io/elevatezoom-plus/examples.htm
     */
    if (isMobile) {
      poller([() => !!window.jQuery], () => {
        elevateZoom();
        jQuery(`.${ID}_prodZoom__itemImg`).ezPlus({
          zoomType: 'inner',
        });
      });
    } else {
      poller([() => !!window.jQuery], () => {
        elevateZoom();
        jQuery(`.${ID}_prodZoom__itemImg`).ezPlus({
          zoomWindowFadeIn: 500,
          zoomWindowFadeOut: 500,
          lensFadeIn: 500,
          lensFadeOut: 500,
          scrollZoom: true,
        });
        stickIt();
        jQuery(`.${ID}_productDetailsWrap`).stickit({
          screenMinWidth: 1024,
          onStick: function () {
            jQuery(`.${ID}_productDetailsWrap`).addClass('isSticky');
          },
          onUnstick: function () {
            jQuery(`.${ID}_productDetailsWrap`).removeClass('isSticky');
          },
          onEnd: function () {
            jQuery(`.${ID}_productDetailsWrap`).removeClass('isSticky');
            jQuery(`.${ID}_productDetailsWrap`).addClass('endOfParent');
          },
          onUnend: function () {
            jQuery(`.${ID}_productDetailsWrap`).removeClass('endOfParent');
            jQuery(`.${ID}_productDetailsWrap`).addClass('isSticky');
          },
        });
      });
      /*
      * Wrap productDetails content in a div
      */
      const detailsBlock = document.getElementById('productDetails');
      const content = detailsBlock.innerHTML;
      detailsBlock.innerHTML = '';
      const wrap = document.createElement('div');
      wrap.classList.add(`${ID}_productDetailsWrap`);
      wrap.innerHTML = content;
      detailsBlock.insertAdjacentElement('afterbegin', wrap);
      setTimeout(() => {
        const maxHeight = document.querySelector(`.${ID}_prodZoom`).clientHeight;
        document.querySelector('#productDetails').setAttribute('style', `height: ${maxHeight}px`);
      }, 1000);
    }
  }
};
export default activate;
