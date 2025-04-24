const tagStr = (id, text) => {
  const html = `
        <p class="${id}__tag">${text}</p>
    `;
  return html.trim();
};

export default tagStr;
