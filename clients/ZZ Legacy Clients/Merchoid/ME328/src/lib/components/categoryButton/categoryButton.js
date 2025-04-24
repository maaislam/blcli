import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

const categoryButton = (idx, title, image, onClick, isActive) => {
  const el = document.createElement("li");
  el.classList.add(`${ID}-category-button`);
  el.innerHTML = /* HTML */ `
    <div class="${ID}-category-button__header">
      <p>
        Shop
        <span> ${title} </span>
      </p>
    </div>
    <div class="${ID}-category-button__image">
      <img src="${image}" alt="${title}" />
    </div>
    <button
      data-category-button
      data-category="${idx}"
      class="${isActive ? `${ID}-active` : ""}"
    >
      <span class="${ID}-visually-hidden">Shop ${title}</span>
    </button>
  `;

  el.querySelector("[data-category-button]").addEventListener("click", onClick);

  return el;
};

export default categoryButton;
