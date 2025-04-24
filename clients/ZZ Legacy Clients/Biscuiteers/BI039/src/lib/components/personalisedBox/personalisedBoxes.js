import settings from '../../settings';
import { addPoller } from '../../winstack';
import { pollerLite } from '../../../../../../../lib/uc-lib';

const { ID } = settings;

export default class CustomiseBoxes {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_customBoxes`);

    /* Hide all secondary slides by default to prevent "flicker" as
    flickity slider loads in */
    element.innerHTML = `
    <div class="${ID}_customBox" data-option="non-personalised">
      <div class="${ID}_textBox">
        <span></span>
        <p>non-personalised</p>
      </div>
    </div>
    <div class="${ID}_customBox ${ID}_personalised" data-option="personalised (+£5)">
      <div class="${ID}_textBox">
        <span></span>
        <p>personalised (+£5)</p>
      </div>
    </div>
    
    `;

    this.component = element;

    element.insertAdjacentHTML('afterbegin', `<div class="${ID}_custom_error">Please select a type</div>`);
  }

  bindEvents() {
    const { component } = this;

    const selectBoxes = document.querySelectorAll('.pos-relative.m-b .select option');
    const allBoxes = component.querySelectorAll(`.${ID}_customBox`);
    for (let index = 0; index < allBoxes.length; index += 1) {
      const element = allBoxes[index];

      element.addEventListener('click', (e) => {
        const matchingTarget = e.currentTarget.getAttribute('data-option');

        [].forEach.call(selectBoxes, (optionType) => {
          // if the option clicked matches the selected attr
          if (optionType.label === matchingTarget) {
            // add active to the selected box
            const activeBox = document.querySelector(`.${ID}-active_box`);
            if (activeBox) {
              activeBox.classList.remove(`${ID}-active_box`);
            }
            e.currentTarget.classList.add(`${ID}-active_box`);

            // set the value of the select box
            const selectVal = optionType.value;
            optionType.parentNode.value = selectVal;

            // show the personalised message box
            const optionParent = optionType.parentNode;
            if ('createEvent' in document) {
              const evt = document.createEvent('HTMLEvents');
              evt.initEvent('change', false, true);
              optionParent.dispatchEvent(evt);
            } else {
              optionParent.fireEvent('onchange');
            }
          }
        });
      });
    }
  }

  render() {
    const { component } = this;
    const productImage = document.querySelector('.wrap .p-t-3 [name="choose type"] label');
    productImage.insertAdjacentElement('afterend', component);

    // if the input box is empty, stop click on buy now
    document.querySelector('.BI039_customBox.BI039_personalised').addEventListener('click', () => {
      const inputPersonal = document.querySelector('[ng-switch-when="field|area"] input');
      pollerLite([inputPersonal, '.BI039-ctaButtons .BI039-buyButton'], () => {
        const addToBagNew = document.querySelector('.BI039-ctaButtons .BI039-buyButton');
        if (inputPersonal.value === '') {
          addToBagNew.classList.add('BI039-disabled');
        }
        inputPersonal.addEventListener('keyup', () => {
          if (inputPersonal.value === '') {
            addToBagNew.classList.add('BI039-disabled');
          } else {
            addToBagNew.classList.remove('BI039-disabled');
          }
        }, false);
      });
    });

    // if the button is disabled on none personal click, remove disabled class
    pollerLite(['.BI039-ctaButtons .BI039-buyButton'], () => {
      const addToBagNew = document.querySelector('.BI039-ctaButtons .BI039-buyButton');
      document.querySelector('.BI039_customBox').addEventListener('click', () => {
        if (addToBagNew.classList.contains('BI039-disabled')) {
          addToBagNew.classList.remove('BI039-disabled');
        }
      });
    });
  }
}
