import shared from "../../../../../core-files/shared";

const { ID } = shared;

/**
 * Standard experiment setup
 */
export const showLightbox = () => {
  const lightbox = document.querySelector(`.${ID}-lightbox__wrapper`);

  lightbox.classList.remove("fade-out");
  lightbox.classList.add("show");
  lightbox.classList.remove("hidden");
  document.querySelector("body").classList.add(`${ID}-noScroll`);

  lightboxClickEvents(lightbox);
};

export const lightboxClickEvents = (lightbox) => {
  const lightboxOverlay = document.querySelector(`.${ID}-overlay`);
  lightboxOverlay.addEventListener("click", () => {
    lightbox.classList.remove("show");
    lightbox.classList.add("fade-out");
    setTimeout(() => {
      lightbox.classList.add("hidden");
    }, 600);
    document.querySelector("body").classList.remove(`${ID}-noScroll`);
  });

  const closeIcon = document.querySelector(`.${ID}-closeIcon`);
  closeIcon.addEventListener("click", () => {
    lightbox.classList.remove("show");
    lightbox.classList.add("fade-out");
    setTimeout(() => {
      lightbox.classList.add("hidden");
    }, 600);
    document.querySelector("body").classList.remove(`${ID}-noScroll`);
  });

  const closeBtn = document.querySelector(`.${ID}-btn#${ID}-close-btn`);
  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("show");
    lightbox.classList.add("fade-out");
    setTimeout(() => {
      lightbox.classList.add("hidden");
    }, 600);
    document.querySelector("body").classList.remove(`${ID}-noScroll`);
  });
};

export const getAge = (dob) => {
  const dateOfBirth = new Date(dob);
  const differenceMs = Date.now() - dateOfBirth.getTime();
  const dateFromEpoch = new Date(differenceMs);
  const yearFromEpoch = dateFromEpoch.getUTCFullYear();
  const age = Math.abs(yearFromEpoch - 1970);

  return age;
};
