const bestSellingCard = (ID, url, image, name, price) => {
  const card = document.createElement("li");
  card.classList.add(`${ID}-bs-card`);
  card.innerHTML = /* HTML */ `
    <a href="${url}" class="${ID}-bs-card-inner">
      <div class="${ID}-bs-card-image">
        <img src="${image}" alt="${name}" />
      </div>
      <h4 class="${ID}-bs-card-name">${name}</h4>
      <p class="${ID}-bs-card-price">${price}</p>
    </a>
  `;

  return card;
};

export default bestSellingCard;
