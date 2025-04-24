import { fireEvent } from "../../../../../../core-files/services";

// conditions met
let isFired = false;
const filterFinder = (target) => {
  if (target && !isFired) {
    var position = target.getBoundingClientRect();
    if (position.top > 80 && position.bottom < window.innerHeight) {
      //   console.log("Conditions Met");
      isFired = true;
      fireEvent("Conditions Met");
    }
  }
};
export const conditionsMet = () => {
  if (!isFired) {
    var targetDomNonSticky = document.querySelector(".sticky-left");
    var targetDomSticky = document.querySelector("header .filters-mobile");
    filterFinder(targetDomNonSticky);
    filterFinder(targetDomSticky);
  }
};

export const isNonStickyFilterFound = (target) => {
  if (target) {
    var position = target.getBoundingClientRect();
    if (position.top < 0) return false;
  }
  return true;
};
