import shared from "../../../../../../core-files/shared";
import { Splide } from "@splidejs/splide";
import extrasCard from "./extrasCard";

const { ID } = shared;

const extraSlider = (data) => {
  const el = document.createElement("div");
  el.classList.add(`${ID}-extras`);
  el.innerHTML = /* HTML */ `
    <h3 class="${ID}-extras__heading">Add a little extra?</h3>
    <div class="splide" id="extras">
      <div class="splide__track">
        <ul class="splide__list" data-extras-slides></ul>
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
    el.append(extrasCard(kit.image, kit.name, kit.wasPrice, kit.price, kit.id));
    splide.add(el);
  });

  return el;
};

export default extraSlider;
