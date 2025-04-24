import shared from "../../../../../../core-files/shared";
import { Splide } from "@splidejs/splide";
import trayCard from "./trayCard";

const { ID } = shared;

const trayCarousel = (products, heading, subheading, onClick) => {
  if (document.querySelector(`.${ID}-tray-carousel`)) {
    document.querySelector(`.${ID}-tray-carousel`).remove();
  }

  const el = document.createElement("div");
  el.classList.add(`${ID}-tray-carousel`);
  el.innerHTML = /* html */ `
    <h3 class="${ID}-tray-carousel__heading">${heading}</h3>
    <p>${subheading}</p>
    <div class="splide" id="tray-carousel" style="max-width: ${
      products.length * 150
    }px">
      <div class="splide__track">
        <ul class="splide__list" data-extras-slides></ul>
      </div>
    </div>
  `;

  const splide = new Splide(el, {
    // drag: "free",
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
      768: {
        perPage: products.length < 6 ? products.length : 6,
        perMove: products.length < 6 ? products.length : 6,
        focus: 0,
      },
    },
  });

  splide.mount();

  const shouldDisplayArrows = () => {
    if (products.length <= splide._options.perPage) {
      return el.classList.add("no-arrows");
    }

    return el.classList.remove("no-arrows");
  };

  shouldDisplayArrows();

  splide.on("resized", () => {
    shouldDisplayArrows();
  });

  products.forEach((product) => {
    const el = document.createElement("li");
    el.classList.add("splide__slide");
    el.append(
      trayCard(
        product.image,
        product.name,
        product.wasPrice,
        product.price,
        product.id,
        onClick
      )
    );
    splide.add(el);
  });

  return el;
};

export default trayCarousel;
