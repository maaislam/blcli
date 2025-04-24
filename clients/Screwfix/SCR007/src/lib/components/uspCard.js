const uspCard = (id, content) => {
  const htmlStr = `<div class="${id}__spec">
        <p class="${id}__spec--content">${content}</p>
    </div>`;

  return htmlStr.trim();
};
export default uspCard;
