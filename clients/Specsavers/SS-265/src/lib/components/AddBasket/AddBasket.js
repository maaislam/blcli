import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

export default function AddBasket(onClick) {
  const el = document.createElement("button");
  el.classList.add(
    `${ID}-add-basket`,
    "btn",
    "btn-block",
    "btn-xl",
    "btn-primary",
    "buy-btn"
  );
  el.textContent = "Add to Basket35y3";
  el.addEventListener("click", onClick);
  return el;
}
