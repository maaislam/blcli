import shared from "../../../../../../core-files/shared";

const { ID } = shared;

const imageCarousel = (imageList) => {
  if (document.querySelector(`.${ID}-image-carousel`)) {
    document.querySelector(`.${ID}-image-carousel`).remove();
  }

  const el = document.createElement("div");
  el.classList.add(`${ID}-image-carousel`);
  el.innerHTML = /* HTML */ `
    <div class="${ID}-image-carousel__main">
      ${imageList
        .map(
          (image, idx) => /* HTML */ `
            <img
              src="${image}"
              alt=""
              class="${idx === 0 ? `${ID}-active` : ""}"
            />
          `
        )
        .join("")}
    </div>
    <ul class="${ID}-image-carousel__list">
      ${imageList
        .map(
          (image, idx) => /* HTML */ `
            <li class="${ID}-image-carousel__slide">
              <button class="${ID}-image-carousel__slide-button">
                <img data-image-carousel-slide src="${image}" alt="" />
              </button>
            </li>
          `
        )
        .join("")}
    </ul>
  `;

  const images = el.querySelectorAll("[data-image-carousel-slide]");
  const mainImage = el.querySelector("[data-image-carousel-main]");

  images.forEach((image, idx) => {
    image.addEventListener("click", () => {
      const mainImages = el.querySelectorAll(`.${ID}-image-carousel__main img`);
      mainImages.forEach((i) => i.classList.remove(`${ID}-active`));
      mainImages[idx].classList.add(`${ID}-active`);
    });
  });

  return el;
};

export default imageCarousel;
