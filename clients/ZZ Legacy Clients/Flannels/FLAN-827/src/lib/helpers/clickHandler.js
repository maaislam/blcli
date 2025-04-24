import { targetMatched } from './targetMatcher';

const clickHandler = (ID, anchorElem) => {
  anchorElem.addEventListener('click', ({ target }) => {
    const plusIconElm = anchorElem.querySelector(`.plus-icon`);
    const minusIconElm = anchorElem.querySelector(`.minus-icon`);

    if (targetMatched(target, `.${ID}__sortlist--row1`)) {
      [plusIconElm, minusIconElm].forEach((item) => item.classList.toggle(`${ID}__hide`));
      const listItems = document.querySelector(`.${ID}__sortlist--row2`);
      const isClosed = listItems.classList.contains(`closed`);

      if (isClosed) {
        listItems.classList.remove('closed');
        //clearTimeout(closeTimer);
        return;
      }
      listItems.classList.add('closed');
    } else if (targetMatched(target, `.${ID}__sortlist--item`)) {
      const targetControlId = target.closest(`.${ID}__sortlist--item`).dataset.controlid;
      document.getElementById(targetControlId).click();
    }
  });
};

export default clickHandler;
