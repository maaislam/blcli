import shared from "../../../../../core-files/shared";

const { ID } = shared;

export const scrollToElement = (element) => {
  window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.getBoundingClientRect().top + window.scrollY,
  });
}