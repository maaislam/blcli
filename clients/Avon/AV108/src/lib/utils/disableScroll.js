// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = {
  37: 1, 38: 1, 39: 1, 40: 1,
};

const preventDefault = (e) => {
  e.preventDefault();
};

const preventDefaultForScrollKeys = (e) => {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
};

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
    get() { supportsPassive = true; },
  }));
} catch (e) {}

const wheelOpt = supportsPassive ? { passive: false } : false;
const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
export const disableScroll = () => {
  // document.querySelector('body').style.overflow = 'hidden';
  // document.querySelector('html').style.overflow = 'hidden';
  // window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  // window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  // window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  // window.addEventListener('keydown', preventDefaultForScrollKeys, false);
};

// call this to Enable
export const enableScroll = () => {
  document.querySelector('body').style.removeProperty('overflow');
  document.querySelector('html').style.removeProperty('overflow');
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
};
