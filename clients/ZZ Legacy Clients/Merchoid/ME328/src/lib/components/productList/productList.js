import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

const productList = () => {
  const el = document.createElement("ul");
  el.classList.add(`${ID}-product-list`);

  return el;
};

export default productList;
