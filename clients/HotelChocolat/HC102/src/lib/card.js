const card = (ID, image, title, text, type, second) => {
  const card = document.createElement("li");
  card.classList.add(`${ID}-root`, "grid-tile", type);
  if (second) card.classList.add("second");
  card.innerHTML = /* HTML */ `
    <div>
      <div class="${ID}-banner__image">
        <img src="${image}" alt="${title}" />
      </div>
      <div class="${ID}-banner__content">
        <h4>${title}</h4>
        <p>${text}</p>
        <a
          href="https://www.hotelchocolat.com/uk/home-barista-subscriptions.html"
          >Find out more</a
        >
      </div>
    </div>
  `;

  return card;
};

export default card;
