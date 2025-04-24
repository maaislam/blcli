const popularBrands = (id, data) => {
  const html = `
          <div class="${id}__popularBrandsWrapper">
              <div class="${id}__popularBrandsContainer">
                  <h2>Popular Brands</h2>
                  <ul class="${id}__brandsList">
                      ${data
                        .map(
                          (item) =>
                            `<li><a href="${item.link}" class="${id}__brandItem" tabindex="0" aria-label="Search for ${item.title}">${item.title}</a></li>`
                        )
                        .join('\n')}
                  </ul>
              </div>
          </div>
    `;
  return html.trim();
};

export default popularBrands;
