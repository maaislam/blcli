import { events } from '../../../../lib/utils';
import settings from './settings';

const activate = () => {
  const { ID, VARIATION } = settings;

  events.send(ID, 'View', `${ID} activated - Variation ${VARIATION}`);

  /* EVENTS ------------------------------------------ */
  const navToggle = document.querySelector('.navToggle');
  navToggle.addEventListener('click', () => {
    if (navToggle.classList.contains('openNav')) {
      events.send(ID, 'Open', `Opened navigation - Variation ${VARIATION}`);
    } else {
      events.send(ID, 'Close', `Closed navigation - Variation ${VARIATION}`);
    }
  });

  // Send event clicks on nav links
  const nav = document.querySelector('.siteNavigation');
  nav.addEventListener('click', (e) => {
    let node = e.target;
    let clickedLink = null;

    while (node !== nav) {
      if (node && node.nodeName && (node.nodeName === 'A' || node.nodeName === 'BUTTON')) {
        clickedLink = node;
        break;
      }
      if (node.parentNode) {
        node = node.parentNode;
      } else {
        break;
      }
    }

    if (clickedLink) {
      if (clickedLink.nodeName === 'BUTTON') {
        events.send(ID, 'Clicked Navigation', `Clicked Navigation Submenu ${clickedLink.innerText} - Variation ${VARIATION}`);
      } else {
        events.send(ID, 'Clicked Navigation', `Clicked Navigation ${clickedLink.innerText} - Variation ${VARIATION}`);
      }
    }
  });
};

export default activate;
