export const quickActionOption = (id, data) => {
  const html = `
        <button class="${id}__quickOption ${id}__${data.tag}" data-name="${data.name}" type="button">
            ${data.name}
        </button>
    `;
  return html.trim();
};
