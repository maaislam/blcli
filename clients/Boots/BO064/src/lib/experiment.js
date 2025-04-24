/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { observer, pollerLite } from '../../../../../lib/utils';
import { ingridV2, ingridV3 } from './gridData';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;


  let title;
  let positionNumber = 14;


  /**
   * Get the position and number of products
   */
  const inGridContent = () => {
    const amountShowing = document.querySelector('.showing_products_total').textContent.trim();
    const numberAmount = amountShowing.match(/(\d*\.?\d+|\d{1,3}(?:,\d{3})*(?:\.\d+)?)(?!\S)/)[0];
    title = `You've viewed <h3>${positionNumber} of ${numberAmount}</h3> products`;
    return title;
  }
  /**
   * Create in grid block
   */
  const createInGridBlock = () => {
    const inGrid = document.createElement('li');
    inGrid.className = `${ID}-inGridBlock`;
    if(VARIATION === '1') {
      inGrid.innerHTML = `
      <div class="${ID}-inGridContent estore_product_container">
        <span class="${ID}-icon"></span>
        <div class="${ID}-title">${inGridContent()}</div>
        <p>Why not filter to refine your search?</p>
        <div class="${ID}-button">Filter</div>
      </div>`;
    }

    const fourteenth = document.querySelectorAll('.grid_mode.grid li')[13];
    if(fourteenth) {
      if(!document.querySelector(`.BO064-inGridBlock`)) {
        fourteenth.insertAdjacentElement('afterend', inGrid);
      }

     
      const filterButton = document.querySelector('.mobile_facet_controls.select_filter');
      const filters = document.querySelector('#estore_facet_navigation_widget');
      


      const inGridButton = document.querySelector(`.${ID}-button`);
      const header = document.querySelector('#estore_facet_navigation_widget');
      const footer = document.querySelector('#footer');

      function checkOffset() {
        function getRectTop(el){
          var rect = el.getBoundingClientRect();
          return rect.top;
        }
        
        if((getRectTop(header) + document.body.scrollTop) + header.offsetHeight <= (getRectTop(footer) + document.body.scrollTop) - 10){
          filters.classList.remove(`${ID}-stickyFilters`);
        }
        if(document.body.scrollTop + window.innerHeight < (getRectTop(footer) + document.body.scrollTop)){
          if(inGridButton.classList.contains(`${ID}-buttonClick`)) {
            filters.classList.add(`${ID}-stickyFilters`);
          }
        }
        if (window.scrollY < (header.offsetTop + header.offsetHeight)) {
          filters.classList.remove(`${ID}-stickyFilters`);
          inGridButton.classList.remove(`${ID}-buttonClick`);
        }
      }



      inGrid.querySelector(`.${ID}-button`).addEventListener('click', () => {
        if(window.innerWidth < 767) {
          filterButton.click();
          // add fixed filter class
        } else {
          if(VARIATION === '1') {
            filters.classList.add(`${ID}-stickyFilters`);
            inGridButton.classList.add(`${ID}-buttonClick`);
            document.addEventListener("scroll", function(){
              checkOffset();
            });
          }
        }
      });



      
    }
  }

  /* Add multiple in grid content */
  const addInGridContentV2 = () => {
    
    let gridData;
    if(VARIATION === '2') {
      gridData = ingridV2.content;
    } else if (VARIATION === '3') {
      gridData = ingridV3.content;
    }
    
    Object.keys(gridData).forEach((i) => {
      const data = gridData[i];

      const gridBlock = document.createElement('li');
      if(data.blockClass) {
        gridBlock.className = `${ID}-inGridBlock ${ID}-${data.blockClass}`;
      } else {
        gridBlock.className = `${ID}-inGridBlock`;
      }
      gridBlock.innerHTML = `
      <div class="${ID}-inGridContent estore_product_container">
      <div class="${ID}-container" style="background-color:${data.color}">
        <span class="${ID}-icon" style="background-image: url(${data.icon})"></span>
        <div class="${ID}-title"><h3>${[i][0]}</h3></div>
        <p>${data.innerText}</p>
        <a class="${ID}-button" target="_blank" href="${data.link}">${data.linkText}</a>
      </div>
      </div>`;


      const productEl = document.querySelectorAll('.grid_mode.grid li')[data.position];
      if(productEl) {
        productEl.insertAdjacentElement('afterend', gridBlock);
      }
    });
  }


  const removeBlock = () => {
    const block = document.querySelectorAll(`.${ID}-inGridBlock`);
    for (let index = 0; index < block.length; index += 1) {
      const element = block[index];
      if(element) {
        element.remove();
      }
    }
  }

  /**
   * Run functions
   */
  if(VARIATION === '1') {
    if(window.location.href.indexOf('&productBeginIndex:0') > -1 || window.location.href.indexOf('&productBeginIndex:') === -1) {
      createInGridBlock();
    }
  } else {
    addInGridContentV2();
  }

  if(VARIATION === '1') {
    pollerLite([`.${ID}-inGridBlock`, '.pageControl.number li .current_state[aria-label="Move to page 1"]'], () => {
      observer.connect(document.querySelector('.grid_mode.grid'), () => {
          removeBlock();
          createInGridBlock();
      }, {
        throttle: 200,
        config: {
          attributes: false,
          childList: true,
          // subtree: true,
        },
      });
    });
  } else {
    pollerLite([`.${ID}-inGridBlock`, '.product_listing_container .grid_mode li', '.estore_product_container', '.showing_products_current_range'], () => {
      observer.connect(document.querySelector('.grid_mode.grid'), () => {
          removeBlock();
          addInGridContentV2();
      }, {
        throttle: 200,
        config: {
          attributes: false,
          childList: true,
          // subtree: true,
        },
      });
    });
  }
};

