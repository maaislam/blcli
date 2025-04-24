/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events, observer } from '../../../../../lib/utils'
import { setup } from './services';

export default () => {
  setup();

  const whatDay = () => {
    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var d = new Date();
    var dayName = days[d.getDay()];
    return dayName;
  }


  const codeTree = {
    monday: ['FEEDFAM', 'BIGMATCH', 'NPJSOLOMD'],
    tuesday: ['TAKETWOPIZZAS', 'BIGMATCH', 'NPJSOLOMD'],
    wednesday: ['BIGMATCH', 'FEEDFAM', 'NPJSOLOMD'],
    thursday: ['NPJSOLOMD', 'FEEDFAM', 'BIGMATCH'],
    friday: ['BIGMATCH', 'FEEDFAM', 'NPJSOLOMD'],
    saturday: ['BIGMATCH', 'FEEDFAM', 'NPJSOLOMD'],
    sunday: ['BIGMATCH', 'NPJSOLOMD', 'FEEDFAM'],
  };


  const run = () => {
    let hasOffer = document.querySelector(`${window.innerWidth < 649 ? '.main ' : ''}a[href="/dealbuilder.aspx?promo=${codeTree[whatDay()][0]}"]`);
    if (!hasOffer) {
      hasOffer = document.querySelector(`${window.innerWidth < 649 ? '.main ' : ''}a[href="/dealbuilder.aspx?promo=${codeTree[whatDay()][1]}"]`);
    }
    if (!hasOffer) {
      hasOffer = document.querySelector(`${window.innerWidth < 649 ? '.main ' : ''}a[href="/dealbuilder.aspx?promo=${codeTree[whatDay()][2]}"]`);
    }
    
    
    
    if (hasOffer) { // Has offer. Is it top row offer or bottom row?
      let parent;

      if (hasOffer.classList.contains('greenButton')) {
        parent = hasOffer.closest('.menuList');
      } else {
        parent = hasOffer.closest('.moreOffersList');
      }

      // if (!parent && window.innerWidth < 649) {
      //   parent = 
      // }

      

      if (parent) {
        const wrap = parent.parentElement;

        wrap ? wrap.insertAdjacentElement('afterbegin', parent) : null;

        if (!document.querySelector('.PJ107-banner')) {
          parent.insertAdjacentHTML('afterbegin', `
            <div class="PJ107-banner">
              <p>Popular today!</p>
            </div>
          `);
        }

        events.send('PJ107', 'PJ107 Shown', 'PJ107 Banner was shown')
      }

    } else {
      events.send('PJ107', 'PJ107 Not Shown', 'PJ107 Banner was not shown')
    }
  };

  run();


  observer.connect(document.body, () => {
    setTimeout(() => {
      if (!document.querySelector('.PJ107-banner')) {
        run();
      }
    }, 1000);
  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: true,
    }
  })

};



