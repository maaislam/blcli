const filterCard = (ID, param, text) => {
  const card = document.createElement("li");
  card.classList.add(`${ID}-filter-card`);
  card.innerHTML = /* HTML */ `
    <button data-filter="${param}">${text}</button>
  `;

  return card;
};

export default filterCard;
