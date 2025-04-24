const popularCategories = (id, data) => {
  const html = `
        <div class="${id}__popularCategoriesWrapper">
            <div class="${id}__popularCategoriesContainer">
                <h2>Popular Categories</h2>
                <ul class="${id}__categoryList">
                     ${data
                       .map(
                         (item) =>
                           `<li><a href="${item.link}" class="${id}__categoryItem" tabindex="0" aria-label="Search for ${item.title}">${item.title}</a></li>`
                       )
                       .join('\n')}
                </ul>
            </div>
        </div>
  `;
  return html.trim();
};

export default popularCategories;
