/**
 * FL044 - Mini cart returning users
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './shared';
import { FL031 } from './FL031';
import { events, setCookie} from './../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  if (VARIATION == 2) {
    events.send(ID, 'FL044 Control', 'FL044 Control is active');
    return false;
  } else {
    events.send(ID, 'FL044 Variation', 'FL044 Variation is active');
  }
  
  FL031();

 
  pollerLite(['a.FL044_mini-close', '.FL044_mini-bag'], () => {
    // Close
    const closePerm = document.querySelector('a.FL044_mini-close');
    const component = document.querySelector('.FL044_mini-bag');
    if (closePerm && component) {
      closePerm.addEventListener('click', () => {
        setCookie('FL044NoShow', 'true');
  
        // Remove element
        component.parentNode.removeChild(component);
      });
    }
  
    // Outside click event
    const wrap = document.querySelector('.BodyWrap');
    if (wrap) {
      wrap.addEventListener('click', (e) => {
        var isClickInside = component.contains(event.target);
  
        if (!isClickInside) {
          // Check for active status on Component
          if (component.classList.contains('FL044_active')) {
            component.classList.remove('FL044_active');
          }
        }
      })
    }

    // Remove item
    const closeLinks = document.querySelectorAll('a.FL044-remove');
    if (closeLinks.length) {
      for (let i = 0; closeLinks.length > i; i += 1) {
        closeLinks[i].addEventListener('click', (e) => {
          e.preventDefault();
          const { target } = e;
          const prodId = target.getAttribute('productvariantitem');
          const oldRemoveLink = document.querySelector(`.bagContentItemWrap a[productvariantitem="${prodId}"]`);
          if (oldRemoveLink) {
            oldRemoveLink.click();
            window.location.reload();
          }
        })
      }
    }


    const titleLink = document.querySelector('.FL044-tab-title');
    titleLink ? titleLink.addEventListener('click', () => {
      events.send('FL044', 'FL044 Click', 'FL044 Your Saved Basket');
    }) : null;

  });

};
