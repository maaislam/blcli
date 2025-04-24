/**
 * TRG014 - Basket motivational messaging
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();
  // console.log(`${shared.ID}    IS   RUNNING`);
  const pathname = window.location.pathname;
  if (pathname.indexOf('/takeaway/menu') > -1) {
    /**
     * @desc Detect URL change 
     * Re-run test if user is on "/takeaway/basket"
     * else, reload page
     */
    window.addEventListener('locationchange', function(){
      // console.log('----- location changed!');
      if (window.location.pathname.indexOf('/takeaway/basket') > -1) {
        window.location.reload();
      }
    });
    /* These are the modifications: */
    history.pushState = ( f => function pushState(){
      let ret = f.apply(this, arguments);
      window.dispatchEvent(new Event('pushState'));
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    })(history.pushState);

    history.replaceState = ( f => function replaceState(){
      let ret = f.apply(this, arguments);
      window.dispatchEvent(new Event('replaceState'));
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    })(history.replaceState);

    window.addEventListener('popstate',()=>{
      window.dispatchEvent(new Event('locationchange'))
    });
  } else if (pathname.indexOf('/takeaway/basket') > -1) {
    pollerLite(['[data-element="desktop-summary"] [data-component="info-block"]'], () => {
      const greyInfoContainer = document.querySelector('[data-element="desktop-summary"] [data-component="info-block"]');
      greyInfoContainer.classList.add(`${shared.ID}-greyContainer`);

      // --- Get collect time
      let collectTime = '';
      if (document.querySelector('[data-element="timeslot"]')) {
        const timeContainer = document.querySelector('[data-element="timeslot"]');
        collectTime = timeContainer.innerText.split('(')[1].replace(')', '');
        collectTime = `at <span class="${shared.ID}-red" id="${shared.ID}-collectTime">${collectTime}</span>`;
      } else {
        collectTime = `which will be ready in under <span class="${shared.ID}-red">30mins</span>`;
      }

      // --- Create Grey Box Content
      const newContent = `<div class="${shared.ID}-content__wrapper">
        <div class="${shared.ID}-content">
          <p class="${shared.ID}-title">Congratulations! All you need to do now is</p>
          <ul class="${shared.ID}-list">
            <div class=${shared.ID}-listItem__wrapper>
              <h2 class="${shared.ID}-number ${shared.ID}-red">1</h2>
              <li>Pay now to benefit from the <span class="${shared.ID}-red">40%</span> discount on your order</li>
            </div>
            <div class=${shared.ID}-listItem__wrapper>
              <h2 class="${shared.ID}-number ${shared.ID}-red">2</h2>
              <li>Collect your food ${collectTime}</li>
            </div> 
            <div class=${shared.ID}-listItem__wrapper>
              <h2 class="${shared.ID}-number ${shared.ID}-red">3</h2>
              <li>Eat your food from the comfort of your own home</li>
            </div>  
          </ul>
        </div>
      </div>`;

      // Desktop
      if (window.innerWidth > 991) {
        greyInfoContainer.insertAdjacentHTML('afterbegin', newContent);
      // Tablet/Mobile
      } else {
        const newContentWrapper = `<div class="${shared.ID}-greyContainer">${newContent}</div>`;
        // document.querySelector('section.basket-page').insertAdjacentHTML('afterbegin', newContentWrapper);
        document.querySelector('[data-component="timeslot-display"]').insertAdjacentHTML('afterend', newContentWrapper);
      }
      

      // --- Time Changes
      observer.connect(document.querySelector('[data-element="timeslot-display"]'), () => {
        // console.log('[092] TIME HAS CHANGED');
        pollerLite(['[data-component="time-picker"] [data-element="button-component-container"]'], () => {
          const changeTimeBtn = document.querySelector('[data-component="time-picker"] [data-element="button-component-container"]');
          changeTimeBtn.addEventListener('click', (e) => {
            setTimeout(() => {
              const timeContainer = document.querySelector('[data-element="timeslot"]');
              let collectTime = timeContainer.innerText;
              document.querySelector(`#${shared.ID}-collectTime`).innerText = collectTime;
            }, 1000);
          });
        });
      }, {
        throttle: 200,
        config: {
          attributes: false,
          childList: true,
          // subtree: true,
        },
      });
      
    });

    /**
     * @desc Detect URL change 
     * Re-run test if user is on "/takeaway/basket"
     * else, reload page
     */
    window.addEventListener('locationchange', function(){
      // console.log('----- location changed!');
      if (window.location.pathname.indexOf('/takeaway/menu') > -1) {
        activate();
      }
    });
    /* These are the modifications: */
    history.pushState = ( f => function pushState(){
      let ret = f.apply(this, arguments);
      window.dispatchEvent(new Event('pushState'));
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    })(history.pushState);

    history.replaceState = ( f => function replaceState(){
      let ret = f.apply(this, arguments);
      window.dispatchEvent(new Event('replaceState'));
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    })(history.replaceState);

    window.addEventListener('popstate',()=>{
      window.dispatchEvent(new Event('locationchange'))
    });
  }
};

export default activate;
