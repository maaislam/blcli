import shared from "../../../../../../core-files/shared";
import { Splide } from "@splidejs/splide";
import starterKitCard from "./starterKitCard";
import { fireEvent } from "../../../../../../core-files/services";

const { ID } = shared;

const starterKit = (
  updaterFn,
  updatePriceFn,
  currentPrice,
  productNameFn,
  data
) => {
  const el = document.createElement("div");
  el.classList.add(`${ID}-starter-kit`);
  el.innerHTML = /* HTML */ `
    <h3 class="${ID}-starter-kit__heading">Choose your starter kit:</h3>
    <div class="splide" id="starter-kit">
      <div class="splide__track">
        <ul class="splide__list" data-starter-kits-slides></ul>
      </div>
    </div>
  `;

  const splide = new Splide(el, {
    drag: "free",
    snap: true,
    perPage: 2.5,
    gap: "0.5rem",
    pagination: false,
    mediaQuery: "min",
    focus: "center",
    breakpoints: {
      480: {
        perPage: 3,
        perMove: 3,
      },
    },
  });

  splide.mount();

  const shouldDisplayArrows = () => {
    if (data.length <= splide._options.perPage) {
      return el.classList.add("no-arrows");
    }

    return el.classList.remove("no-arrows");
  };

  shouldDisplayArrows();

  splide.on("resized", () => {
    shouldDisplayArrows();
  });

  data.forEach((kit) => {
    const el = document.createElement("li");
    el.classList.add("splide__slide");
    el.append(
      starterKitCard(
        kit.image,
        kit.name,
        kit.wasPrice,
        kit.price,
        kit.id,
        (e) => {
          e.preventDefault();
          if (e.target.parentElement.classList.contains(`${ID}-selected`)) {
            e.target.parentElement.classList.remove(`${ID}-selected`);
            updaterFn(0);
            updatePriceFn(currentPrice);
            return;
          }

          const allKits = document.querySelectorAll(`.${ID}-starter-kit-card`);
          allKits.forEach((kit) => kit.classList.remove(`${ID}-selected`));
          e.target.parentElement.classList.add(`${ID}-selected`);
          updaterFn(e.target.dataset.starterKitId);
          updatePriceFn(currentPrice + parseFloat(kit.price.slice(1)));
          productNameFn(kit.name);

          fireEvent("User added starter kit bundle");
        }
      )
    );
    splide.add(el);
  });

  return el;
};

export default starterKit;
