/**
 * SD041 - Mini cart returning users
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
    events.send(ID, 'SD041 Control', 'SD041 Control is active');
    return false;
  } else {
    events.send(ID, 'SD041 Variation', 'SD041 Variation is active');
  }


  FL031();

 
  pollerLite(['a.SD041_mini-close', '.SD041_mini-bag'], () => {
    // Close
    const closePerm = document.querySelector('a.SD041_mini-close');
    const component = document.querySelector('.SD041_mini-bag');
    if (closePerm && component) {
      closePerm.addEventListener('click', () => {
        setCookie('SD041NoShow', 'true');
  
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
          if (component.classList.contains('SD041_active')) {
            document.querySelector('.SD041-tab-title').classList.remove('active');
            component.classList.remove('SD041_active');
          }
        }
      })
    }

    // Remove item
    const closeLinks = document.querySelectorAll('a.SD041-remove');
    if (closeLinks.length) {
      for (let i = 0; closeLinks.length > i; i += 1) {
        closeLinks[i].addEventListener('click', (e) => {
          e.preventDefault();
          const { target } = e;
          const prodId = target.parentNode.getAttribute('productvariantitem');
          const oldRemoveLink = document.querySelector(`.bagContentItemWrap a[productvariantitem="${prodId}"]`);
          if (oldRemoveLink) {
            oldRemoveLink.click();
            window.location.reload();
          }
        })
      }
    }


    const titleLink = document.querySelector('.SD041-tab-title');
    titleLink ? titleLink.addEventListener('click', () => {
      events.send('SD041', 'SD041 Click', 'SD041 Your Saved Basket');
    }) : null;


    const scrollyCart = document.querySelector('.SD041_mini-content');
    let scrollyCartTop = document.querySelector('#SD041-cartscroll-to-top');
    let scrollyCartBottom = document.querySelector('#SD041-cartscroll-to-bottom');
    let prevScrollVal = 0;

    scrollyCartTop.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      scrollyCart.scrollTop = 0;
      scrollyCartTop.classList.add('inactive');
      scrollyCartBottom.classList.remove('inactive');
    });

    scrollyCartBottom.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      scrollyCart.scrollTop = scrollyCart.offsetHeight;
      scrollyCartTop.classList.remove('inactive');
      scrollyCartBottom.classList.add('inactive');
    });

    scrollyCart.addEventListener('scroll', function(e) {      

      if(e.target.scrollTop == 0) {
        scrollyCartTop.classList.add('inactive');
      } else if(e.target.scrollTop > 0 && scrollyCartTop.classList.contains('inactive')) {
        scrollyCartTop.classList.remove('inactive');
      } else if(e.target.scrollTop < prevScrollVal) {
        scrollyCartBottom.classList.remove('inactive');
      } else if(e.target.scrollHeight - e.target.scrollTop == scrollyCart.offsetHeight) {
        scrollyCartBottom.classList.add('inactive');
      }

      prevScrollVal = e.target.scrollTop;
    });

    



  });

};
