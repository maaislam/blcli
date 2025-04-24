import { fireEvent } from '../../../../../../core-files/services';
import shared from '../../../../../../core-files/shared';
import { pollerLite } from '../../../../../../lib/utils';

const { ID } = shared;
// const pricePoint = document.querySelector(".pr__pricepoint");
const onChangePriceTag = (target) => {
  pollerLite(['.pr__pricepoint'], (props) => {
    if (target) {
      document.querySelector(`#${ID}-product_price`)?.remove();
      const idNumber = parseInt(target.closest(`.saving-option`)?.getAttribute('id')?.split('-')[2]);
      if (idNumber >= 0 && window[`${ID}-$$savingOptions`][idNumber]) {
        props[0].insertAdjacentHTML(`afterbegin`, window[`${ID}-$$savingOptions`][idNumber].html);
      }
    } else {
      props[0].insertAdjacentHTML(`afterbegin`, window[`${ID}-$$savingOptions`][0].html);
    }
  });
};

export const autoOptionAndQuatitySelector = () => {
  onChangePriceTag();
  const selectedQuantityInputField = document.querySelector(`.pr__qty input#qty`);
  const selectedStickyQuantityInputField = document.querySelector(`.pr__qty input#sticky_qty`);
  if (document.querySelector(`.${ID}-bulk-savings--options`) && selectedQuantityInputField && selectedStickyQuantityInputField) {
    const savingOptionContainer = document.querySelector(`.${ID}-bulk-savings--options`);
    savingOptionContainer.addEventListener('click', function ({ target }) {
      if (target.closest(`.saving-option`)) {
        const option = target.closest(`.saving-option`);
        if (!option.classList.contains(`saving-option-active`)) {
          savingOptionContainer.querySelector(`.saving-option-active`).classList.remove(`saving-option-active`);
          option.classList.add(`saving-option-active`);
        }
        // console.log(parseInt(option.getAttribute(`data-value`)));
        selectedQuantityInputField.value = parseInt(option.getAttribute(`data-lowestq`));
        selectedStickyQuantityInputField.value = parseInt(option.getAttribute(`data-lowestq`));

        // Change Price Tag
        onChangePriceTag(target);

        // goals for var 1
        const opfferText = option.querySelector(`.saving-option-qty`)?.textContent?.trim();
        // console.log(`User interacts with discount option on pdp: ${opfferText}`);
        fireEvent(`User interacts with discount option on pdp: ${opfferText}`);
      }
    });
    const optionSelector = (value) => {
      function classSwaper(id) {
        savingOptionContainer.querySelector(`.saving-option-active`)?.classList.remove(`saving-option-active`);
        savingOptionContainer.querySelector(`.saving-option[data-highestq="${id}"]`)?.classList.add(`saving-option-active`);

        // Change Price Tag
        onChangePriceTag(savingOptionContainer.querySelector(`.saving-option-active`));
        // console.log(savingOptionContainer.querySelector(`.saving-option-active`).getAttribute(`data-value`));
      }
      const possiblOptions = [...savingOptionContainer.querySelectorAll(`[data-highestq]`)].map((elems) => {
        return parseInt(elems.getAttribute('data-highestq'));
      });

      if (value <= possiblOptions[0]) {
        classSwaper(possiblOptions[0]);
      } else if (value > possiblOptions[0] && value <= possiblOptions[1]) {
        classSwaper(possiblOptions[1]);
      } else {
        classSwaper(possiblOptions[possiblOptions.length - 1]);
      }
    };
    selectedQuantityInputField.value = 1;
    selectedQuantityInputField.addEventListener('keyup', function (e) {
      optionSelector(parseInt(this.value) || 1);
    });
    selectedStickyQuantityInputField.addEventListener('keyup', function (e) {
      optionSelector(parseInt(this.value) || 1);
    });
  }
};
