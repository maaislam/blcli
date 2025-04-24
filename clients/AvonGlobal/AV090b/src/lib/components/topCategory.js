const topCategory = (anchorElm, data, id) => {
  const categoryThumb = (data, testId) => {
    const { thumbImage, url, heroImage, title, bannerTextLine1, bannerTextLine2, strategyId } = data;
    const htmlStr = `
        <div data-href="${url}" data-subtitle1="${bannerTextLine1}" data-subtitle2="${bannerTextLine2}" class="${testId}__category" data-heroimg="${heroImage}" data-strategyid="${strategyId}">
            <div class="thumb-image">
                <img src="${thumbImage}" alt="${title}" />
            </div>
            <div class="title">${title}</div>
        </div>`;
    return htmlStr;
  };

  const categories = data.map((item) => categoryThumb(item, id)).join('\n');

  const categoryPosition = window.matchMedia('(max-width: 768px)').matches ? '${mobile position}' : '${desktop position}';
  console.log('tadat');
  anchorElm.insertAdjacentHTML(
    categoryPosition,
    `<div class="${id}__categories" style="display:\${display category}">${categories}</div>`
  );
};

export default topCategory;
