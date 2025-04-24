/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events, pollerLite } from '../../../../../lib/utils';
import shared from './shared';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();
    

    let title;
    let position;
    let positionNumber;

    // set position in grid
    if(VARIATION === '2' || VARIATION === '4') {
      position = 15;
      positionNumber = '16';
    } else if(VARIATION === '1' || VARIATION === '3') {
      position = 34;
      positionNumber = '35';
    }

    const getTitle = () => {
    // content
    if(VARIATION === '1' || VARIATION === '2') {
      const amountShowing = document.querySelector('.browse__total-result-container').textContent.trim();
      const numberAmount = amountShowing.match(/(\d*\.?\d+|\d{1,3}(?:,\d{3})*(?:\.\d+)?)(?!\S)/)[0];
      title = `You've viewed <h3>${positionNumber} of ${numberAmount}</h3> products`;
    } else if(VARIATION === '3' || VARIATION === '4') {
      title = `<h3>Need some help choosing?`;
    }


    return title;
  }

    function isScrolledIntoView(el) {
      if(el) {
        var rect = el.getBoundingClientRect();
        var elemTop = rect.top;
        var elemBottom = rect.bottom;

        // Only completely visible elements return true:
        var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        // Partially visible elements return true:
        //isVisible = elemTop < window.innerHeight && elemBottom >= 0;

        return isVisible;
      }
  }
    const createInGridBlock = () => {
      const inGrid = document.createElement('div');
      inGrid.className = `${ID}-inGridBlock product-tile-list__item js-product-list-item`;
      inGrid.innerHTML = `
      <div class="${ID}-inGridContent">
        <span class="${ID}-icon"></span>
        <div class="${ID}-title">${getTitle()}</div>
        <p>Why not filter to refine your search?</p>
        <div class="${ID}-button">Filter</div>
      </div>`;

      const filterButton = document.querySelector('.cta.js-modal-trigger.filter-toggle');
      inGrid.querySelector(`.${ID}-button`).addEventListener('click', () => {
        filterButton.click();
        events.send(`${ID} variation: ${VARIATION}`, 'click', 'in grid filter button');
      });

      

         
        const allProducts = document.querySelectorAll('.items .product-tile-list__item');
        for (let index = 0; index < allProducts.length; index += 1) {
          const element = allProducts[index];

          if(index === position) {
           element.insertAdjacentElement('afterend', inGrid);
  
          }
        }

        window.addEventListener('scroll', () => {
          if(isScrolledIntoView(document.querySelector(`.${ID}-inGridBlock`))) {
            events.send(`${ID} variation: ${VARIATION}`, 'view', 'Saw in grid box', { sendOnce: true });
          }
        });
      
    }

    const removeBlock = () => {
      const inGrid = document.querySelector(`.${ID}-inGridBlock`);
      if(inGrid) {

        inGrid.remove();
      }
    }

   

    removeBlock();
    setTimeout(function(){   
      createInGridBlock();
    }, 1000);


    
    



    var oldHref = document.location.href;
    var bodyList = document.querySelector("body");
    var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;

                    removeBlock();
                    setTimeout(function(){   
                      removeBlock();
                      createInGridBlock();
                    }, 1000);
                   
                   
                    pollerLite(['.items .product-tile-list__item', `.${ID}-inGridBlock`] , ()=> {
                      window.addEventListener('scroll', () => {
                        if(document.querySelector(`.${ID}-inGridBlock`) && isScrolledIntoView(document.querySelector(`.${ID}-inGridBlock`))) {
              
                          events.send(`${ID} variation: ${VARIATION}`, 'view', 'Saw in grid box', { sendOnce: true });
                        }
                      });
                    });
                }
            });
        });
    var config = {
            childList: true,
            subtree: true
        };
    observer.observe(bodyList, config);



    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
