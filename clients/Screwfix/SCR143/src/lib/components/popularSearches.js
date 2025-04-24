import shared from '../../../../../../core-files/shared';

const popularSearches = (id, data) => {
  const { VARIATION } = shared;
  const html = `
        <div class="${id}__popularSearchesWrapper">
            <div class="${id}__popularSearchesContainer">
                <h2>Popular brands</h2>
                <ul class="${id}__searchList">
                     ${data
                       .map(
                         (item) =>
                           `<li>
                          <a href="${item.variationLinks[VARIATION]}" class="${id}__searchItem" tabindex="0" aria-label="Search for ${item.title}">
                            <img src="${item.imageLink}" alt="${item.title}" />
                          </a>
                          </li>`
                       )
                       .join('\n')}
                </ul>
            </div>
        </div>
  `;
  return html.trim();
};

export default popularSearches;
