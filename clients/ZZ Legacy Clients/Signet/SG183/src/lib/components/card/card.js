const card = (ID, url, title, image, description, noDescription = false) => {
  const card = document.createElement("div");
  card.classList.add(`${ID}-card`);
  card.innerHTML = /* HTML */ `
    <a href="${url}">
      <div class="${ID}-card__image">
        <img src="${image}" alt="${title}" />
      </div>
      <h4 class="${ID}-card__title">${title}</h4>
      ${noDescription
        ? ""
        : `<p class="${ID}-card__description">
      ${
        description
          ? description
          : `Discover the ${title} collection at H Samuel.`
      }
    </p>`}
    </a>
  `;
  return card;
};

export default card;
