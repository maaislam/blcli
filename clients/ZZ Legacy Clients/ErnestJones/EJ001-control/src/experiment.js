import { events } from '../../../../lib/utils';

events.send('EJ001', 'View', 'EJ001 activated - Control');

// Send event clicks on nav links
const nav = document.querySelector('.siteNavigation');
nav.addEventListener('click', (e) => {
  let node = e.target;
  let clickedLink = null;

  while (node !== this) {
    if (node && node.nodeName && node.nodeName === 'A') {
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
    events.send('EJ001', 'Clicked Navigation', `Clicked Navigation ${clickedLink.innerText}`);
  }
});

// Send event if hovered over level 1 link for 1s
const primaryLinks = nav.querySelectorAll('.topLevel > li > a');
[].forEach.call(primaryLinks, (link) => {
  let hoverIntent;
  let throttleExtraEvents;
  link.addEventListener('mouseover', () => {
    hoverIntent = true;
    setTimeout(() => {
      if (hoverIntent) {
        if (!throttleExtraEvents) {
          events.send('EJ001', 'Navigation Hover', 'Hovered Over Main Nav');
          throttleExtraEvents = true;
        }

        setTimeout(() => {
          throttleExtraEvents = false;
        }, 800);
      }
    }, 1000);
  });

  link.addEventListener('mouseout', () => {
    hoverIntent = false;
  });
});
