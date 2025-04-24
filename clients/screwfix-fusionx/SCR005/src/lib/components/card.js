const card = (id, { imgSrc, category, categoryLink }) => {
  const htmlStr = `
    <a href="${categoryLink}" class="${id}__categorycard" data-category="${category}">
        <div class="${id}__categorycard--imgcontainer">
            <img src="${imgSrc}" alt="${category}">
        </div>
        <div class="${id}__categorycard--title">
            ${category}
        </div>
    </a>`;
  return htmlStr.trim();
};

export default card;
