const metalCard = (ID, url, title, image) => {
  const card = document.createElement("div");
  card.classList.add(`${ID}-metal-card`);
  card.innerHTML = /* HTML */ `
    <a href="${url}">
      <div class="${ID}-metal-card__image">
        <img src="${image}" alt="${title}" />
      </div>
      <h4 class="${ID}-metal-card__title">${title}</h4>
    </a>
  `;
  return card;
};

export default metalCard;
