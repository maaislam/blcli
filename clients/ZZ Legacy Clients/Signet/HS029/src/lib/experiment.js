/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();

  const mainNav = document.querySelector('.main-nav');
  mainNav.classList.add('HS029-mainNav');
  mainNav.addEventListener('mouseover', () => {
    setTimeout( () => {
      mainNav.classList.remove('HS029-mainNav');
    }, 200);
  }); 

  mainNav.addEventListener('mouseout', () => {
    setTimeout( () => {
      mainNav.classList.add('HS029-mainNav');
    }, 200);
  }); 

  const allNavLinks = document.querySelectorAll('#js--main-nav a');
  for (let index = 0; index < allNavLinks.length; index += 1) {
    const element = allNavLinks[index];
    element.addEventListener('click', () => {
      events.send('HS029 V1', 'clicked nav', 'fired', { sendOnce: true });
    });
  }
};

export default activate;
