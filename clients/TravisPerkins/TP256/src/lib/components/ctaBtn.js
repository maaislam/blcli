const ctaBtn = (id, text, link, type) => {
  const htmlStr = `
        <a btn-type="${type}" href="${link}" class="${id}__ctabtn--${type}">
            ${text}
        </a>
    `;

  return htmlStr;
};
export default ctaBtn;
