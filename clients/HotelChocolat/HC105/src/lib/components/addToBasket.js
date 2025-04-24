import shared from "../../../../../../core-files/shared";

const { ID } = shared;

const addToBasket = (onClick) => {
  const el = document.createElement("div");
  el.classList.add(`${ID}-add-to-basket__container`);
  el.innerHTML = /* HTML */ `
    <button class="${ID}-add-to-basket ${ID}-disabled">Add to bag</button>
    <p class="${ID}-add-to-basket__klarna">
      Buy Now, Pay Later With Klarna.
      <a href="https://www.hotelchocolat.com/uk/about-klarna.html"
        >Learn more</a
      >
    </p>
  `;

  el.querySelector("button").addEventListener("click", onClick);
  return el;
};

export default addToBasket;
