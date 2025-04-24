/**
 * EJ001m - Mobile Navigation
 * @author Lewis Needham - User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../lib/cache-dom';
import MobileNavigation from './components/MobileNavigation/component';

const activate = () => {
  setup();

  /* COMPONENTS ------------------------------------------------ */
  const mobileNavigation = MobileNavigation();


  /* EVENTS ------------------------------------------ */
  // Toggle nav on burger menu click
  const navToggle = cacheDom.get('.navToggle');
  navToggle.addEventListener('click', () => {
    if (navToggle.classList.contains('openNav')) {
      mobileNavigation.controls.open();
      setTimeout(() => {
        if (cacheDom.get('#js-overlay').style.zIndex === '-1') {
          cacheDom.get('#js-overlay').style.zIndex = '10';
        }
      }, 600);
    } else {
      mobileNavigation.controls.close();
    }
  });

  // Close when overlay and search are clicked
  const overlay = cacheDom.get('#js-overlay');
  const search = cacheDom.get('.openSearch');
  overlay.addEventListener('click', mobileNavigation.controls.close);
  search.addEventListener('click', mobileNavigation.controls.close);


  /* RENDER ----------------------------------------------------- */
  mobileNavigation.render();
};

export default activate;
