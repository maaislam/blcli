/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';
import { experiment324 } from './components/experiment324';
import flexiRate from './components/flexiRate';
import calcRateDifference from './helpers/calcRateDifference';
import { setFlexRateDifferece } from './helpers/setFlexRateDifferece';

const { ID, VARIATION } = shared;

const init = () => {
  const style = document.createElement('style');
  style.innerHTML = `.TRAV-325-v2 #extraModelContent,.TRAV-325-v2__hide{display:none}.TRAV-325-v2__show{display:block!important}.TRAV-325-v2 .modal-body:has(.TRAV-325-v2-flexi-container){background:#fff}.TRAV-325-v2 .modal-body:has(.TRAV-325-v2-flexi-container.TRAV-325-v2__hide) #extraModelContent{display:block!important}.TRAV-325-v2 .TRAV-325-v2-flexi-container{width:100%;max-width:800px;background:#fff}@media screen and (max-width:768px){.TRAV-325-v2 .TRAV-325-v2-flexi-container{top:2%;width:95%;-webkit-transform:translate(-50%,0);transform:translate(-50%,0)}}@media screen and (max-width:480px){.TRAV-325-v2 .TRAV-325-v2-flexi-container{height:calc(100vh - 150px);overflow-y:auto}}.TRAV-325-v2 .TRAV-325-v2-flexi-container-head{padding:16px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center}@media screen and (max-width:767px){.TRAV-325-v2 .TRAV-325-v2-flexi-container-head{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding:8px 16px}}.TRAV-325-v2 .TRAV-325-v2-flexi-container-head h2{font-family:"FS Albert Bold",arial,sans-serif;color:#000;text-align:center;font-size:21px;font-weight:700;line-height:23px}.TRAV-325-v2 .TRAV-325-v2-flexi-container-head-skip{display:-webkit-box;display:-ms-flexbox;display:flex;max-width:114px;height:40px;padding:0;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:10px;-webkit-box-flex:1;-ms-flex:1 0 0px;flex:1 0 0;background:#fff;color:grey;text-align:center;font-family:"FS Albert Regular";font-size:16px;font-style:normal;font-weight:300;line-height:17px;border:1px solid #d3d3d3}@media screen and (max-width:767px){.TRAV-325-v2 .TRAV-325-v2-flexi-container-head-skip{margin-top:5px;max-width:300px;width:100%}}.TRAV-325-v2 .TRAV-325-v2-flexi-container-head-skip:hover{background:#d3d3d3}.TRAV-325-v2 .TRAV-325-v2-flexi-container-body{margin:0 16px 16px 16px;padding:16px 18px;border:2px solid #dd1325;display:-webkit-box;display:-ms-flexbox;display:flex;gap:16px}@media screen and (max-width:768px){.TRAV-325-v2 .TRAV-325-v2-flexi-container-body{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}}@media screen and (max-width:768px){.TRAV-325-v2 .TRAV-325-v2-flexi-container-body h3{text-align:center}}.TRAV-325-v2 .TRAV-325-v2-flexi-container-body-section{-webkit-box-flex:1;-ms-flex:1 1 0px;flex:1 1 0}.TRAV-325-v2 .TRAV-325-v2-flexi-container-body-left{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;gap:23px;-webkit-box-flex:1;-ms-flex:1 0 0px;flex:1 0 0}.TRAV-325-v2 .TRAV-325-v2-flexi-container-body-left h3{color:var(--Text-grey,#464646);font-family:"FS Albert Bold",arial,sans-serif!important;font-size:18px;font-style:normal;font-weight:700;line-height:normal}.TRAV-325-v2 .TRAV-325-v2-flexi-container-body-left p{color:var(--Text-grey,#464646);font-family:"FS Albert Light",arial,sans-serif;font-size:16px;font-style:normal;font-weight:400;line-height:normal;margin:0;display:-webkit-box;display:-ms-flexbox;display:flex;gap:12px;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.TRAV-325-v2 .TRAV-325-v2-flexi-container-body-left p:nth-child(2){gap:4px}.TRAV-325-v2 .TRAV-325-v2-flexi-container-body-left p:nth-child(2) svg{margin-left:-9px}.TRAV-325-v2 .TRAV-325-v2-flexi-container-body-left button{display:-webkit-box;display:-ms-flexbox;display:flex;max-width:350px;padding:8px 16px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:4px;-ms-flex-item-align:stretch;align-self:stretch;border-radius:5px;background:#dc1323;color:#fff;border:0;font-family:"FS Albert Bold",arial,sans-serif;font-size:18px}.TRAV-325-v2 .TRAV-325-v2-flexi-container-body-right img{width:100%;height:240px}.TRAV-325-v2 .TRAV-325-v2-flexi-container-footer{display:-webkit-box;display:-ms-flexbox;display:flex;padding:8px 24px;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:16px;-ms-flex-item-align:stretch;align-self:stretch;background:#fff;-webkit-box-shadow:0 0 10px 0 rgba(0,0,0,.15);box-shadow:0 0 10px 0 rgba(0,0,0,.15)}@media screen and (max-width:768px){.TRAV-325-v2 .TRAV-325-v2-flexi-container-footer{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}}.TRAV-325-v2 .TRAV-325-v2-flexi-container-footer-left{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.TRAV-325-v2 .TRAV-325-v2-flexi-container-footer-left p{color:#464646;font-family:"FS Albert Light",arial,sans-serif;font-size:16px;font-style:normal;font-weight:400;line-height:normal;margin:0}.TRAV-325-v2 .TRAV-325-v2-flexi-container-footer-left p span{font-family:"FS Albert Bold",arial,sans-serif}.TRAV-325-v2 .TRAV-325-v2-flexi-container-footer-right{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}@media screen and (max-width:768px){.TRAV-325-v2 .TRAV-325-v2-flexi-container-footer-right{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}}.TRAV-325-v2 .TRAV-325-v2-flexi-container-footer-right button{display:-webkit-box;display:-ms-flexbox;display:flex;max-width:350px;padding:4px 16px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;gap:10px;-webkit-box-flex:1;-ms-flex:1 0 0px;flex:1 0 0;border-radius:5px;background:#008cc6;color:#fff;text-align:center;font-family:"FS Albert Bold",arial,sans-serif;font-size:18px;font-style:normal;font-weight:700;line-height:42px;border:0}.TRAV-325-v2 .TRAV-325-v2-flexi-container-footer-section{-webkit-box-flex:1;-ms-flex:1 1 0px;flex:1 1 0}@media screen and (max-width:768px){.TRAV-325-v2 .TRAV-325-v2-flexi-container-footer-section{width:100%}}.TRAV-325-v2 .TRAV-325-v2-loader{width:16px;--b:3px;aspect-ratio:1;border-radius:70%;padding:1px;background:conic-gradient(rgba(0,0,0,0) 10%,grey) content-box;-webkit-mask:repeating-conic-gradient(rgba(0,0,0,0) 0deg,#000 1deg 20deg,rgba(0,0,0,0) 21deg 36deg),radial-gradient(farthest-side,rgba(0,0,0,0) calc(100% - var(--b) - 1px),#000 calc(100% - var(--b)));-webkit-mask-composite:destination-in;mask-composite:intersect;-webkit-animation:spin 1s infinite steps(10);animation:spin 1s infinite steps(10)}@-webkit-keyframes spin{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes spin{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}`;
  document.head.appendChild(style);

  const validDate = true; //check if date is valid
  if (!validDate) {

    //show TRAV-324
    experiment324(ID);
    return;
  }

  const modalBodyElem = document.querySelector('#extraModal .modal-body');
  const extraModelContentElem = document.querySelector('#extraModelContent');
  const saverRateElems = document.querySelectorAll('[data-room-rate-type-name="Saver"]');

  const hasSelectedClass = Array.from(saverRateElems).some(elem => elem.classList.contains('selected'));

  const rateDifference = calcRateDifference();

  setFlexRateDifferece();

  if (hasSelectedClass) {
    modalBodyElem.insertAdjacentHTML('afterbegin', flexiRate(ID, rateDifference));
    extraModelContentElem.classList.add(`${ID}__hide`);
  }

};

export default () => {

  setup();

  logMessage(ID + " Variation: " + VARIATION);

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  init();

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    const flexiContainerElem = document.querySelector(`.${ID}-flexi-container`);
    const extraModelContentElem = document.querySelector('#extraModelContent');

    if (target.closest(`.${ID}-add-flexi`)) {
      const flexibleRateBtn = document.querySelector('[data-room-rate-type-name="Flexible"]');

      flexibleRateBtn.click();

      flexiContainerElem.classList.add(`${ID}__hide`);

      extraModelContentElem.classList.remove(`${ID}__hide`);
      extraModelContentElem.classList.add(`${ID}__show`);
    } else if (target.closest(`.${ID}-flexi-container-head-skip`)) {
      const flexiSkipBtn = target.closest(`.${ID}-flexi-container-head-skip`); //loader will be added for this button
      const loader = flexiSkipBtn.querySelector(`.${ID}-loader`);
      loader.classList.remove(`${ID}__hide`);

      flexiContainerElem.classList.add(`${ID}__hide`);

      extraModelContentElem.classList.remove(`${ID}__hide`);
      extraModelContentElem.classList.add(`${ID}__show`);

      // const extrasSkipBtn = document.querySelector('#extras-choice-skip');
      // extrasSkipBtn.click();
    } else if (target.closest('.rate-btn')) {
      const saverRateElems = document.querySelectorAll('[data-room-rate-type-name="Saver"]');
      const hasSelectedClass = Array.from(saverRateElems).some(elem => elem.classList.contains('selected'));

      if (hasSelectedClass) {
        flexiContainerElem.classList.remove(`${ID}__hide`);

        extraModelContentElem.classList.add(`${ID}__hide`);
        extraModelContentElem.classList.remove(`${ID}__show`);
      } else {
        flexiContainerElem.classList.add(`${ID}__hide`);

        extraModelContentElem.classList.remove(`${ID}__hide`);
        extraModelContentElem.classList.add(`${ID}__show`);
      }
    }
  });
};
