const brandCard = (ID, url, title, image) => {
  const card = document.createElement("div");
  card.classList.add(`${ID}-brand-card`);
  card.innerHTML = /* HTML */ `
    <a href="${url}">
      <div class="${ID}-brand-card__image">
        <img src="${image}" alt="${title}" />
      </div>
    </a>
  `;
  return card;
};

export default brandCard;
