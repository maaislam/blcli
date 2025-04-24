const button = (id, text, type = 'primary', att = '') => {
  const classes = type === 'primary' ? `${id}__button-primary` : `${id}__button-secondary`;
  const htmlStr = `<button class='${id}__button ${classes}' data-action="${att}">${text}</button>`;
  return htmlStr;
};

export default button;
