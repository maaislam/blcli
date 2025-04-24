/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from './services';
import shared from './shared';
import { events, pollerLite, observer, logMessage } from '../../../../../lib/utils';
import { addObserver, addEventListener } from './winstack';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;


const makeSizeGridChanges = () => {

  pollerLite(['.c-product-details__size-grid'], () => {
    let sizeGrid = document.querySelector('.c-product-details__size-grid');

    let sizeGridTableHeadings = sizeGrid.querySelectorAll('.c-size-grid thead th span');

    let numHeadings = sizeGridTableHeadings.length;

    let ffHolderHTML = `

      <div class="${ID}-ffinfo-holder">
        <button id="${ID}-ffinfo-trigger" class="${ID}-ffinfo-trigger"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"   viewBox="0 0 318.293 318.293" style="enable-background:new 0 0 318.293 318.293;" xml:space="preserve"><g>  <path d="M159.148,0c-52.696,0-95.544,39.326-95.544,87.662h47.736c0-22.007,21.438-39.927,47.808-39.927    c26.367,0,47.804,17.92,47.804,39.927v6.929c0,23.39-10.292,34.31-25.915,50.813c-20.371,21.531-45.744,48.365-45.744,105.899    h47.745c0-38.524,15.144-54.568,32.692-73.12c17.368-18.347,38.96-41.192,38.96-83.592v-6.929C254.689,39.326,211.845,0,159.148,0z"/><rect x="134.475" y="277.996" width="49.968" height="40.297"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></button>
        <div class="${ID}-ffinfo-modal" id="${ID}-ffinfo-modal">
          <p> We are one of only a few retailers that stock this size </p>
          <a href="#" id="${ID}-ffinfo-close" class="${ID}-ffinfo-close"> <svg height='30px' width='30px' fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 100 100"><defs><g id="a"><path fill="#000000" stroke="#000" d=" M 81.75 21.75 Q 82.503515625 21.0390625 82.5 20 82.503515625 18.9607421875 81.75 18.2 81.0390625 17.4962890625 80 17.5 78.9607421875 17.4962890625 78.2 18.2 L 50 46.45 21.75 18.2 Q 21.0390625 17.4962890625 20 17.5 18.9607421875 17.4962890625 18.2 18.2 17.4962890625 18.9607421875 17.5 20 17.4962890625 21.0390625 18.2 21.75 L 46.45 50 18.2 78.2 Q 17.4962890625 78.9607421875 17.5 80 17.4962890625 81.0390625 18.2 81.75 18.9607421875 82.503515625 20 82.5 21.0390625 82.503515625 21.75 81.75 L 50 53.55 78.2 81.75 Q 78.9607421875 82.503515625 80 82.5 81.0390625 82.503515625 81.75 81.75 82.503515625 81.0390625 82.5 80 82.503515625 78.9607421875 81.75 78.2 L 53.55 50 81.75 21.75 Z"></path></g></defs><g transform="matrix( 1, 0, 0, 1, 0,0) "><use xlink:href="#a"></use></g></svg> <p class="${ID}-closetext">CLOSE</p> </a>
        </div>
      </div>


    `;

    [].slice.call(sizeGridTableHeadings).forEach((item, index) => {

      
      if(item.innerText == "FF") {

        

        item.insertAdjacentHTML('afterbegin', ffHolderHTML);

        item.classList.add(`${ID}-heading`);

        let modalTrigger = document.getElementById(`${ID}-ffinfo-trigger`);
        let modal = document.getElementById(`${ID}-ffinfo-modal`);
        let modalClose = document.getElementById(`${ID}-ffinfo-close`);

        let numHeadingsHalf = numHeadings / 2;

        if(index < numHeadingsHalf) {
          modal.classList.add(`${ID}-left-align`);
        } else {
          modal.classList.add(`${ID}-right-align`);
        }

        addEventListener(modalTrigger, 'click', (e) => {
          e.preventDefault();

          if(modal.classList.contains(`${ID}-active`)) {
            modal.classList.remove(`${ID}-active`);
          } else {
            modal.classList.add(`${ID}-active`);

            let openMessage = "tooltip interacted with";
            logMessage(openMessage);
            fireEvent(openMessage);
          }
        });

        addEventListener(modalClose, 'click', (e) => {
          e.preventDefault();

          modal.classList.remove(`${ID}-active`);

        });

      }


    });


  });

  



}

const makeButtonChanges = () => {

  let mobile = false;
  let sizeGridSelector = "";
  let insertionElementSelector = "";

  if(window.outerWidth > 550) {
    sizeGridSelector = '.c-product-details__size-grid';
    insertionElementSelector = ".c-message--inform span";
    mobile = false;
  } else {
    sizeGridSelector = '.c-field-brasize__parent-container';
    insertionElementSelector = ".c-product-details__sizes";
    mobile = true;
  }


  pollerLite([sizeGridSelector], () => {

    let sizeGrid = document.querySelector(sizeGridSelector);

    sizeGrid.classList.add(`${ID}-input-check`);

    addEventListener(sizeGrid, 'click', (e) => {

      if(e.target.tagName == "INPUT") {

        let specificSizeID = e.target.id;

        let specificSizeElement = document.getElementById(specificSizeID);

        let backSize = "";

        if(mobile == false) {

          backSize = specificSizeElement.closest('tr').querySelector('th span').innerHTML;

        } else {

          backSize = specificSizeElement.closest('li.c-field-brasize__parent').getAttribute('data-value');

        }

        let backSizeCharLength = backSize.length;

        let backSizeStartPos = specificSizeID.indexOf(backSize) + backSizeCharLength;

        let cupSize = specificSizeID.substring(backSizeStartPos, specificSizeID.length);

        

        logMessage("Prod id: "+specificSizeID+" back size: "+backSize+" cup size: "+cupSize);

        if(cupSize == "G" || cupSize == "F") {

          pollerLite([insertionElementSelector], () => {
            if(!document.getElementById(`${ID}-ffinfo-additional`)) {
              let ffHTML = `<span id="${ID}-ffinfo-additional" class="${ID}-ffinfo-additional"> If you're having trouble deciding between an F and a G cup, we recommend trying an FF cup </span>`;
              let insertionPoint = document.querySelector(insertionElementSelector);

              insertionPoint.insertAdjacentHTML('afterend', ffHTML);

              let addMessage = "message shown to user";
              logMessage(addMessage);
              fireEvent(addMessage);
            }
          });
          

        } else {

          pollerLite([insertionElementSelector], () => {
            if(document.getElementById(`${ID}-ffinfo-additional`)) {
              document.getElementById(`${ID}-ffinfo-additional`).remove();
            }
          });

          

        }

      }

    });


  });

  



  

}

const addEventTracking = () => {

  let atbButton = document.querySelector('.c-product-details__add-to-bag .c-button');

  addEventListener(atbButton, 'click', (e) => {

    let currentProduct = document.querySelector('.c-product-details__name').innerHTML;
    if(!e.currentTarget.classList.contains('c-button--disabled')) {
      let atbButtonMessage = "product added to basket: "+currentProduct;
      logMessage(atbButtonMessage);
      fireEvent(atbButtonMessage);
    }

  });


}

export default () => {
    setup();

    logMessage(ID + " Variation: "+VARIATION);
    
    if(VARIATION == 1) {

      let eventMessage = "Conditions Met - page altered, tracking added";
      logMessage(eventMessage);
      fireEvent(eventMessage);

      makeSizeGridChanges();
      addEventTracking();

    } else if (VARIATION == 2) {

      let eventMessage = "Conditions Met - page altered, tracking added";
      logMessage(eventMessage);
      fireEvent(eventMessage);

      makeButtonChanges();
      addEventTracking();

    } else {

      let eventMessage = "Conditions Met - page not altered, tracking added";
      logMessage(eventMessage);
      fireEvent(eventMessage);
      addEventTracking();

    }


    
};