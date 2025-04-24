import shared from "../../../../../core-files/shared";
import handleSides from "./handleSides";
import checkBoxesAreSides from "./checkBoxesAreSides";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;
import elements from "./elements";

const handleChange = () => {
  const boxes = document.querySelectorAll(".menuList");
  const sideClass = `${ID}-sides`;
  const isSides = checkBoxesAreSides(boxes);
  if (isSides) {
    handleSides(boxes);
    if (!elements.mainContainer.classList.contains(sideClass)) {
      elements.mainContainer.classList.add(sideClass);
    }
  } else {
    elements.mainContainer.classList.remove(sideClass);
  }
};

export default handleChange;
