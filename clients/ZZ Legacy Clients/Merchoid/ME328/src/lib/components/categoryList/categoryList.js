import shared from "../../../../../../../core-files/shared";
import categoryButton from "../categoryButton/categoryButton";
import categories from "../../data/categories";

const { ID } = shared;

const categoryList = (onClick) => {
  const el = document.createElement("ul");
  el.classList.add(`${ID}-category-list`);

  categories.forEach((category, idx) =>
    el.append(
      categoryButton(idx, category.title, category.image, onClick, idx === 0)
    )
  );

  return el;
};

export default categoryList;
