import shared from '../../../../../core-files/shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

import elements from './elements';
import checkBoxIsSide from './checkBoxIsSide';
import getPriceFromDropdown from './getPriceFromDropdown';

const handleChangeMobile = () => {
    const boxes = elements.mobileContainer.querySelectorAll('.menuList');
    const sideClass = `${ID}-sides-mobile`;
    boxes.forEach(box => {
        const title = box.querySelector('.titleWithIcon');
        const isSide = checkBoxIsSide(box);
        const portionSelect = box.querySelector('.ddlDoubleUpsDipsClass');
        const price = getPriceFromDropdown(portionSelect);
        if (isSide && !box.querySelector(`.${ID}-price`)) {
            if (!box.classList.contains(sideClass)) {
              box.classList.add(sideClass);
            }
            if (VARIATION == '1') {
                title.insertAdjacentHTML('afterend', `<span class="${ID}-price">£${price}</span>`);
            }
        }
    });
};

export default handleChangeMobile;