import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

export default function productGrid() {
  const root = document.createElement("ul");
  root.classList.add(`${ID}-product-grid`);

  return root;
}
