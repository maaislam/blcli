const variantsWrapper = (id, heights, widths) => {
  const currentPageUrl = window.location.pathname;
  const html = `
        <div class="${id}__variantWrapper">
            <div class="${id}__variantContainer">
                <div class="${id}__heightWrapper">
                    <h3>Select radiator height</h3>
                    <ul>
                        ${heights
                          .map((item) => {
                            return `<li class="${id}__option ${
                              item.url.toLowerCase() === currentPageUrl.toLowerCase() ? `${id}__active` : ''
                            }">
                                        <a href="${item.url}">${item.height}mm</a>
                                    </li>`;
                          })
                          .join('\n')}
                    </ul>
                </div>
                <div class="${id}__widthWrapper">
                    <h3>Select radiator width</h3>
                     <ul>
                        ${widths
                          .map((item) => {
                            return `<li class="${id}__option ${
                              item.url.toLowerCase() === currentPageUrl.toLowerCase() ? `${id}__active` : ''
                            }">
                                        <a href="${item.url}">${item.width}mm</a>
                                    </li>`;
                          })
                          .join('\n')}
                    </ul>
                </div>
            </div>
        </div>
    `;
  return html.trim();
};

export default variantsWrapper;
