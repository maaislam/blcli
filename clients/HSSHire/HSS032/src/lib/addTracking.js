import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
const { ID } = shared;

const addTracking = () => {
  const itemLinks = document.querySelectorAll(`.${ID}-product-link`);
  itemLinks.forEach((itemLink) => {
    itemLink.addEventListener('click', (e) => {
      const type = itemLink.dataset.type;
      const eventString = `${type} - clicked`;
      fireEvent(eventString);
    });
  });
};

export default addTracking;
