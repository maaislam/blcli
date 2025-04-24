/**
 * HOF-347 - Mini cart returning users
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared'; 
import { FL031 } from './FL031';
import { events, logMessage, observer, setCookie} from './../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

events.analyticsReference = '_gaUAT';

const startExperiment = () => {
  setTimeout(() => {
    FL031();
  }, 2750);
  

 
  pollerLite(['a.HOF-347_mini-close', '.HOF-347_mini-bag'], () => {
    // Close
    const closePerm = document.querySelector('a.HOF-347_mini-close');
    const component = document.querySelector('.HOF-347_mini-bag');
    if (closePerm && component) {
      closePerm.addEventListener('click', () => {
        setCookie('HOF-347NoShow', 'true');
  
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
          if (component.classList.contains('HOF-347_active')) {
            document.querySelector('.HOF-347-tab-title').classList.remove('active');
            component.classList.remove('HOF-347_active');
          }
        }
      })
    }

    // Remove item
    const closeLinks = document.querySelectorAll('a.HOF-347-remove');
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


    const titleLink = document.querySelector('.HOF-347-tab-title');
    titleLink ? titleLink.addEventListener('click', () => {
      fireEvent('Click - opening/closing Your Saved Basket');
    }) : null;


    const scrollyCart = document.querySelector('.HOF-347_mini-content');
    let scrollyCartTop = document.querySelector('#HOF-347-cartscroll-to-top');
    let scrollyCartBottom = document.querySelector('#HOF-347-cartscroll-to-bottom');
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
      scrollyCart.scrollTop = scrollyCart.scrollHeight;
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

    let visibleMessage = "Visible - mini cart displayed";
    logMessage(visibleMessage);
    fireEvent(visibleMessage);



  });


}

export default () => {
  setup();
  
  logMessage(ID + " Variation: " + VARIATION);

  fireEvent('Conditions Met')

  if (VARIATION == "control") {
    return;
  }

  if(parseInt(document.getElementById('bagQuantity').innerText) > 0) {

    startExperiment();


  } else {


    let noItemsMessage = "No items in basket - nothing displayed";
    logMessage(noItemsMessage);
    fireEvent(noItemsMessage);
  }

  let bagItems = document.getElementById('divBagItems');
  observer.connect(bagItems, () => {
      console.log("change");
      if(!document.querySelector(`.${ID}-tab-title`)) {
        console.log("if");
        startExperiment();
      } else {
        console.log("else");
      }

  }, {
      config: {
        attributes: true,
        childList: true,
        subtree: false,
      }
  })

  

};
