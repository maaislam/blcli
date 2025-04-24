import shared from "../../../../../core-files/shared";

const { ID } = shared;

const card = (image, title, price, url) => {
  const card = document.createElement("a");
  card.href = url;
  card.classList.add(`${ID}-card`);
  card.innerHTML = /* HTML */ `
    <div class="${ID}-card-image">
      <img src="${image}" alt="${title}" />
    </div>
    <div class="${ID}-card-content">
      <h4 class="${ID}-card-title">${title}</h4>
      <span class="${ID}-card-price">${price}</span>
      <a class="${ID}-card-cta" href="${url}">See details</a>
    </div>
  `;

  return card;
};

export default card;
