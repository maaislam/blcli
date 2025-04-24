const productOptions = (id, variants) => {
  const optionHtml = variants.map((variant) => {
    const { id: sku, title, available } = variant;
    return `<button class="${id}-sizebutton ${!available ? `${id}-disabled` : ''}" data-variant-id="${sku}">${title}</button>`;
  });
  const htmlStr = `
    <div class="${id}-size-modal--content ">
        <h2>${variants[0].name}</h2>

        <p>Choose size</p>
        <div class="${id}-size-modal--sizes">
            ${optionHtml.join('\n')}
        </div>

        <button class="${id}-size-modal--atb">Add to Bag</button>

        <button class="${id}-size-modal--close">Go back</button>
    </div>
  `;
  return htmlStr;
};

export default productOptions;
