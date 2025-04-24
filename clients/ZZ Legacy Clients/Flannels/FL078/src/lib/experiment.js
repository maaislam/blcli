/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite } from '../../../../../lib/uc-lib';
import settings from './shared';
import { events } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  if (VARIATION == 2) {
    events.send(ID, 'FL078 Control', 'Control is active');
    return false;
  } else {
    events.send(ID, 'FL078 Active', `Variation ${VARIATION} is active`);
  }


  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


  const getScrollPos = () => {
    return document.documentElement.scrollTop || document.body.scrollTop;
  };

  function setCookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
  }

  function deleteCookie(name) { setCookie(name, '', -1); }
  
  const checkAndScroll = () => {
    
    if (getCookie('FL078Scroll')) {
      const prevUrl = getCookie('FL078Scroll');
      if (prevUrl.indexOf(document.referrer) > -1) {
        
        const obj = JSON.parse(window.localStorage.getItem('lastScrollPos'));
        
        if (window.location.href == Object.keys(obj)[0]) {
          const pos = Object.values(obj)[0];
        
          
          setTimeout(() => {
            window.scroll({
              top: pos + 50,
              left: 0,
              behavior: 'smooth'
            });

            // Remove cookie
            deleteCookie('FL078Scroll');
          }, 200);

        }

      }
    }
    
  };

  const storeScrollPos = () => {
    const pos = getScrollPos();
    const { href } = window.location;
    const obj = {}
    obj[href] = pos;

    window.localStorage.setItem('lastScrollPos', JSON.stringify(obj));
  };


  const watchPlpClicks = () => {
    const productTable = document.querySelector('.FilterProductsTable');
    productTable.addEventListener('click', storeScrollPos);
  };

  const watchAtbClick = () => {
    if (getCookie('FL078Scroll') && getCookie('FL078Scroll') == window.location.href) return;
    const atb = document.querySelector('a.addToBag');
    const miniBag = document.querySelector('#divBagItems');
    const wrap = document.querySelector('.ContentWrapper');

    atb.addEventListener('click', (e) => {
      
      
      setTimeout(() => {
        if (miniBag && miniBag.classList.contains('open')) {

          // if (window.innerWidth < 479) {
          //   window.scroll(0, 0);
          // }

          document.cookie = `FL078Scroll=${window.location.href}`;
          
          // Show loader
          wrap ? wrap.insertAdjacentHTML('beforeend', `
            <div class="FL078-fixed">
              <div class="FL078-wrap">
                <div class="FL078-wrap--center">
                  <p>Product added to bag. Taking you back to the category page</p>
                  <div class="loading-dots">
                    <div class="loading-dots--dot"></div>
                    <div class="loading-dots--dot"></div>
                    <div class="loading-dots--dot"></div>
                  </div>
                </div>
              </div>
            </div>
          `) : null;

          const loaderEl = document.querySelector('.FL078-fixed');
          if (loaderEl) {
            setTimeout(() => {
              loaderEl.parentNode.removeChild(loaderEl);
            }, 2000);
          }

          setTimeout(() => {
            window.location.href = document.referrer;
          }, 500);

        }
      }, 1500);
    });
  }


  // PLP
  pollerLite(['.FilterProductsTable'], () => {
    checkAndScroll();
    watchPlpClicks();
  });

  // PDP
  pollerLite(['a.addToBag'], () => watchAtbClick());
  

};
