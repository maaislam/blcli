/**
* SD011 - Prevent user from exiting
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events, getCookie, setCookie } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();
  
  const { ID, VARIATION } = settings;

  let clickedLogo = false;
  let clickBack = false;
  let showOnce = false;
  let editBag = false;
  let continueShopping = false;
  let productName = '';
  let timeLeft = 30;
  let count = 0;

  if (VARIATION == 3) {
    events.send(ID, 'SD011 Control', 'SD011 Control is active');
    return false;
  } else {
    events.send(ID, `SD011 Variation ${VARIATION} Active`, `SD011 Variation ${VARIATION} is active`);
  }

  const updateHistory = (curr) => {
    window.location.lasthash.push(window.location.hash);
    window.location.hash = curr;
  }


  const fetchTopProduct = (cb) => {
    const request = new XMLHttpRequest();
    request.open('GET', '/cart', true);

    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        const resp = this.response;
        const div = document.createElement('div');
        div.innerHTML = resp;

        const firstProductName = div.querySelector('a.productTitle');
        
        if (firstProductName) {
          cb(firstProductName.textContent);
        }
      } else {
        // We reached our target server, but it returned an error

      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();
  };

  
  let runTimer = false;
  const startTimer = () => {
    if (runTimer) return;
    setInterval(() => {
      if (timeLeft == 0) return;
      timeLeft -= 1;
    }, 1000);

  }


  const bodyWrap = document.querySelector('#BodyWrap');
  let clickCount = 0;
  bodyWrap.addEventListener('click', (e) => {
    const { target } = e;
    const inTarget = target.closest('.SD011-returnMessage');

    if (!inTarget && document.querySelector('.SD011-returnMessage') && clickCount > 0) {
      const elToRemove = document.querySelector('.SD011-returnMessage');
      if (elToRemove) {
        elToRemove.parentNode.removeChild(elToRemove);
        setTimeout(() => {
          clickCount = 0;
        }, 500);
      }
    }

    if (!inTarget) {
      clickCount += 1;
    }
    
  });


  const removeMessage = (fast = 7000) => {
    count = 0;
    setTimeout(() => {
      const addedMessage = document.querySelector('.SD011-returnMessage');
      if (addedMessage) {
        addedMessage.classList.add('toRemove');
        setTimeout(() => {
          if (addedMessage.parentNode) {
            addedMessage.parentNode.removeChild(addedMessage);
          }
        }, 1000);
      }
    }, fast);
    
  };



  const triggerBackMessage = (ref) => {
    if (showOnce && clickedLogo || showOnce && clickBack) return;

    let html = '';
    

    if (VARIATION == 2) {
      if (clickBack || clickedLogo) {
        if (!getCookie('SD011Seen')) {
          html = `
            <div class="SD011-returnMessage">
              <div class="SD-wrap">

                <p>Leaving so soon? We can't guarantee holding your item(s) and recommend that you checkout within the next <span id="time">30 minutes</span></p>
                
                <div class="SD-links">
                  <button class="SD-back">Go back</button>
                  <button class="SD-stay dnnPrimaryAction">Continue checking out</button>
                </div>

                <div class="SD-arrow"></div>
              </div>

            </div>
          `;
          setCookie('SD011Seen', 'true');
        }
      }

      if (editBag) {
        html = `
          <div class="SD011-returnMessage">
            <div class="SD-wrap">

              <p>Are you sure you want to leave the checkout? We offer full refunds within the first fourteen days.</p>

              <div class="SD-links">
                <button class="SD-stay dnnPrimaryAction">No, stay here</button>
                <a class="SD-back" href="/cart">Yes, go back</a>
              </div>

              <div class="SD-arrow"></div>
            </div>

          </div>
        `;
      }

      if (continueShopping ) {
        // <p>Forgotten something? Find something to go with your ${productName ? productName : 'product(s)'} - we'll hold it for <span id="SD-timer">${timeLeft ? timeLeft : 30}</span> minutes!</p>
        html = `
          <div class="SD011-returnMessage">
            <div class="SD-wrap">

              
              <p>Leaving so soon? We can't guarantee holding your item(s) and recommend that you checkout within the next <span id="time">30 minutes</span></p>
              <div class="SD-links">
                <button class="SD-stay dnnPrimaryAction">No, stay here</button>
                <a class="SD-back" href="https://www.sportsdirect.com/">Yes, go back</a>
              </div>

              <div class="SD-arrow"></div>
            </div>

          </div>
        `;
        

      }
      
    } else {
      html = `
      <div class="SD011-returnMessage">
        <div class="SD-wrap">

          <p>Are you sure you want to return to your shopping bag?</p>

          <div class="SD-links">
            <button class="SD-stay dnnPrimaryAction">No, stay here</button>
            <a class="SD-back" href="/cart">Yes, go back</a>
          </div>

          <div class="SD-arrow"></div>
        </div>

      </div>
    `;
    }

    if (!ref) return;

    if (document.querySelector('.SD011-returnMessage')) return;

    ref.insertAdjacentHTML('beforeend', html);

    events.send(ID, 'SD011 Shown', 'SD011 Popup shown');
 
    const close = document.querySelector('.SD-stay');
    if (close) {
      const backLink = close.nextElementSibling;
      close.addEventListener('click', () => {
        removeMessage();
        events.send(ID, 'SD011 Stay', 'SD011 Popup closed');
      });

      console.log('back link ', backLink);
      backLink.addEventListener('click', () => {
        // removeMessage();
        events.send(ID, 'SD011 Back', 'SD011 Popup back');
      });
    }
    const back = document.querySelector('.SD-back');

    if (back) {
      back.addEventListener('click', (e) => {
        e.preventDefault();
        if (clickedLogo) {
          window.location.href = 'https://www.sportsdirect.com';
        } else {
          if (window.location.href.indexOf('/deliverychoices') > -1) {
            
            window.location.href = 'https://www.sportsdirect.com/checkout/launch';
          }
          if (window.location.href.indexOf('/launch') > -1) {
            window.location.href = 'https://www.sportsdirect.com/cart';
          }
          if (window.location.href.indexOf('/payment') > -1) {
            window.location.href = 'https://www.sportsdirect.com/checkout/deliverychoices';
          }
        }
      });
    }

  };
  

  const addEvents = {
    homeLink: () => {
      let homeLinkCount = 0;
      const homeLinkEl = document.querySelector('.LogoCheck a');
      const homeLinkRef = homeLinkEl.parentElement;
      homeLinkEl.addEventListener('click', (e) => {
        if (!getCookie('SD011Seen') && homeLinkCount < 1) {
          e.preventDefault();
          clickedLogo = true;
          triggerBackMessage(homeLinkRef);
          homeLinkCount += 1;
          setCookie('SD011Seen', 'true');
        }
      });
    },
    editBag: () => {
      const editBagEl = document.querySelector('.EditText a');
      const exitLinks = document.querySelector('.ExitLinks');
      editBagEl.addEventListener('click', (e) => {
        
        e.preventDefault();
        editBag = true;
        triggerBackMessage(exitLinks);
      });
    },
    contShopping: () => {
      if (VARIATION == 2) {
        fetchTopProduct((result) => {
          productName = result ? result : false;
          const contShoppingEl = document.querySelector('.ContText a');
          const exitLinks = document.querySelector('.ExitLinks');
          contShoppingEl.addEventListener('click', (e) => {
            e.preventDefault();
            continueShopping = true;
            triggerBackMessage(exitLinks);
          });
        });
      } else {
        const contShoppingEl = document.querySelector('.ContText a');
        const exitLinks = document.querySelector('.ExitLinks');
        contShoppingEl.addEventListener('click', (e) => {
          e.preventDefault();
          continueShopping = true;
          triggerBackMessage(exitLinks);
        });
      }
    },
    browserBack: () => {
      let count = 0;
      function addEvent(obj, evt, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(evt, fn, false);
        }
        else if (obj.attachEvent) {
            obj.attachEvent("on" + evt, fn);
        }
      }
      addEvent(window,"load",function(e) {
          addEvent(document, "mouseout", function(e) {
            if (count == 0) {
              e = e ? e : window.event;
              var from = e.relatedTarget || e.toElement;
              // Check cursor position
              if (e.clientY < 100) {
                if (!from || from.nodeName == "HTML") {
                  const homeLinkEl = document.querySelector('.LogoCheck a');
                  const homeLinkRef = homeLinkEl.parentElement;
                  clickBack = true;
                  triggerBackMessage(homeLinkRef);
                  count += 1;
                  if (VARIATION == 2) {
                    showOnce = true;
                  }
                }
              }
            } else {
              return;
            }
          });
      });
    },

  }

  pollerLite(['.LogoCheck a', '.ExitLinks a'], () => {
    addEvents.homeLink();
    addEvents.editBag();
    addEvents.contShopping();
    addEvents.browserBack();
  });

  // pollerLite(['.SD011-returnMessage'], () => {
  //   const el = document.querySelector('.SD011-returnMessage');
  //   clickOutside(el);
  // });

};
