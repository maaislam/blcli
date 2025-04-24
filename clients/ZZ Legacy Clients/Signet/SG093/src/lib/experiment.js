/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';
import { ingridV1, ingridV2 } from './ingridData';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    const addInGridContent = () => {
      let category;
      if(window.digitalData.page.category.subCategory1 && window.digitalData.page.category.subCategory1 === 'Rings') {
        category = window.digitalData.page.category.subCategory1;
      } else {
        category = window.digitalData.page.category.primaryCategory;
      }

      let gridData;
      if(VARIATION === '1') {
        gridData = ingridV1[category];
      } else if (VARIATION === '2') {
        gridData = ingridV2[category];
      }
      
      Object.keys(gridData).forEach((i) => {
        const data = gridData[i];

        let link;
        if(getSiteFromHostname () === 'ernestjones') {
          if(data.EJlink) {
            link = data.EJlink;
          }
        } else {
          if(data.HSlink) {
            link = data.HSlink;
          }
        }
        const gridBlock = document.createElement('div');
        gridBlock.className = `${ID}-inGrid product-tile-list__item`;
        gridBlock.style = `background-image: url(${data.background})`;
        gridBlock.innerHTML = `
        <div class="${ID}-innerText">
          <h3>${[i][0]}</h3>
          <div class="${ID}-line"></div>
          <p>${data.innerText}</p>
          ${link ? `<a target="_blank" href="${link}">${data.linkText}</a>` : ''}
        </div>`;

        const productEl = document.querySelectorAll('.product-tile-list .product-tile-list__item')[data.position];
        if(productEl) {
          productEl.insertAdjacentElement('afterend', gridBlock);
        }

      });
    }

    addInGridContent();

    const removeAllMessages = () => {
      const allGridBlocks = document.querySelectorAll(`.${ID}-inGrid`);
      if(allGridBlocks) {
        for (let index = 0; index < allGridBlocks.length; index += 1) {
          const element = allGridBlocks[index];
          element.remove();
        }
      }
    }

    let oldHref = document.location.href;
    let bodyList = document.querySelector("body");
    const observeEl = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;


                    removeAllMessages();
                    if(document.location.href.indexOf('watches') > -1 || document.location.href.indexOf('engagement') > -1) {
                      addInGridContent();
                    }
                }
            });
        });
    const config = {
        childList: true,
        subtree: true
    };
    
    observeEl.observe(bodyList, config);
  }
};
