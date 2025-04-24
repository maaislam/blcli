const productCard = (ID, url, image, name, price) => {
  const card = document.createElement("li");
  card.classList.add(`${ID}-product-card`);
  card.setAttribute("data-product", "");
  card.innerHTML = /* HTML */ `
    <a href="${url}" class="${ID}-product-card-inner">
      <div class="${ID}-product-card-image">
        <img data-src="${image}" alt="${name}" />
      </div>
      <h4 class="${ID}-product-card-name">${name}</h4>
      <p class="${ID}-product-card-price">${price}</p>
    </a>
  `;

  return card;
};

export default productCard;
