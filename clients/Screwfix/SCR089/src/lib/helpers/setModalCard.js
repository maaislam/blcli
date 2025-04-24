import { pollerLite } from "../../../../../../lib/utils";
import modalCard from "../components/modalCard";
import addFreeProduct from "./addFreeProduct";
import removeFreeProduct from "./removeFreeProduct";

const setModalCard = (ID) => {
    pollerLite(['[data-qaid="promotion-content"]'], () => {
        const promotionContent = document.querySelector('[data-qaid="promotion-content"]');
        const promoCheckbox = promotionContent.querySelector('#checkbox_promoCheckbox');
        promoCheckbox.click();
        promotionContent.classList.add(`${ID}__hide`);

        promotionContent.insertAdjacentHTML('afterend', modalCard(ID));

        const checkBoxElem = document.querySelector(`.${ID}__checkbox`);
        const checkBoxContainerElem = document.querySelector(`.${ID}__checkbox-container`);
        const prdQty = 1;
        const DELAY = 250;

        setTimeout(() => {
            if (checkBoxElem.checked) {
                addFreeProduct(ID, checkBoxContainerElem, prdQty);
            } else {
                removeFreeProduct(ID, checkBoxContainerElem, prdQty);
            }
        }, DELAY);
    });
};

export default setModalCard;
