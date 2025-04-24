export const item = (id, { title, url }) => {
  const html = `
      <a class="${id}__item" href="${url}">${title}</a>
    `;
  return html;
};
