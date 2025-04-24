import { fireEvent } from '../../../../../core-files/services';

export default () => {
 try {
  let e1 = false;

  let current = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';

  if(!e1) {
    fireEvent('Viewport On Load: ' + current, true);
    e1 = true;
  }

  window.addEventListener('orientationchange', () => {
    setTimeout(function() {
      const now = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';

      fireEvent('Viewport Changed: from ' + current + ' to ' + now, true);

      current = now;
    }, 1500);
  });
 } catch(e) {}
}
