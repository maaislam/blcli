import shared from '../../../../../core-files/shared';
const { ID } = shared;

const itemsSelector = `.${ID}-grid__col`;

const checkForItems = (items) => {
  const itemElements = document.querySelectorAll(itemsSelector);
  const hasAllItems = itemElements.length == items.length;
  return hasAllItems;
};

export default checkForItems;
