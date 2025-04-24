const variantsWrapper = (id, data) => {
  const html = `
        <div class="${id}__variantWrapper">
            <div class="${id}__variantContainer">
                <div class="${id}__diameterwrapper">
                    <h3>Select screw diameter</h3>
                    <ul>
                        ${data
                          .map((item) => {
                            return `<li class="${id}__option" data-size="${item.diameter}" data-sku="${item.sku}"><a data-href="${item.diameter}">${item.diameter}</a>
                                    </li>`;
                          })
                          .join('\n')}
                    </ul>
                </div>
                <div class="${id}__lengthwrapper">
                    <h3>Select screw length</h3>
                     <ul>
                        ${data
                          .map((item) => {
                            return `<li class="${id}__option ${id}__diabled" data-size="${item.length}" data-sku="${item.sku}"><a data-href="${item.length}">${item.length}</a>
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
