import { manageBasket } from "./utils";

const removeFreeProduct = (id, checkBoxContainerElem, prdQty) => {
    checkBoxContainerElem.classList.add(`${id}__disabled`);
    manageBasket("Remove", "602HN", prdQty)
        .then(() => {
            checkBoxContainerElem.classList.remove(`${id}__disabled`);
        })
        .catch(error => {
            console.error("Error managing the basket:", error);
            checkBoxContainerElem.classList.remove(`${id}__disabled`);
        });
};

export default removeFreeProduct;