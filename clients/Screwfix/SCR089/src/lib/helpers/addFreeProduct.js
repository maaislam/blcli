import { manageBasket } from "./utils";

const addFreeProduct = (id, checkBoxContainerElem, prdQty) => {
    checkBoxContainerElem.classList.add(`${id}__disabled`);
    manageBasket("Add", "602HN", prdQty)  // Adds an item
        .then(() => {
            checkBoxContainerElem.classList.remove(`${id}__disabled`);
        })
        .catch(error => {
            console.error("Error managing the basket:", error);
            checkBoxContainerElem.classList.remove(`${id}__disabled`);
        });
};
export default addFreeProduct;