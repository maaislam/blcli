/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import inGridContent from './gridData';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID } = shared;

  const createInGrid = () => {
    const gridContent = inGridContent;
    const url = window.location.href;

    

    Object.keys(gridContent).forEach((i) => {
      const data = gridContent[i];

      let contentBlock;

      if(url.indexOf([i][0]) > -1) {

        if(url.indexOf('search') > -1) {
          contentBlock = `
          <a href="${data.link}">
          <li class="${ID}-gridBlock estore_product_container ${data.classType} ${data.secondClass ? data.secondClass : ''}">
          <div class="${ID}-image" style="background-image:url(${data.image})"></div>
              <div class="${ID}-innerText">
                ${data.logo ? `<div class="${ID}-logo" style="background-image:url(${data.logo})"></div>` : ''}
                <h3>${data.title}</h3>
                ${data.subText ? `<p>${data.subText}</p>` : ''}
              </div>
              <a href="${data.link}" class="${ID}-button">Find out more</a>
             
          </li>
          </a>
          `;
        } else {
          contentBlock = `
          
          <li class="${ID}-block">
          <a href="${data.link}">
            <div class="${ID}-gridBlock estore_product_container ${data.classType} ${data.classType} ${data.secondClass ? data.secondClass : ''}">
            <div class="${ID}-image" style="background-image:url(${data.image})"></div>
              <div class="${ID}-innerText">
                ${data.logo ? `<div class="${ID}-logo" style="background-image:url(${data.logo})"></div>` : ''}
                <h3>${data.title}</h3>
                ${data.subText ? `<p>${data.subText}</p>` : ''}
              </div>
              <a href="${data.link}" class="${ID}-button">Find out more</a>
              
              </div>
              </a>
          </li>
         
          `;
        }
       
        const thirdProd = document.querySelectorAll('.product_listing_container .grid_mode > li')[1]; 
        const fourteenProd = document.querySelectorAll('.product_listing_container .grid_mode > li')[13]; 
        
       
        if(thirdProd) {
          thirdProd.insertAdjacentHTML('afterend', contentBlock)
        }
        if(fourteenProd) {
          fourteenProd.insertAdjacentHTML('afterend', contentBlock)
        }
      }
    });
  }

  createInGrid();
};
