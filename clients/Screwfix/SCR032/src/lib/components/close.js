const close = (id, icon, text = '', classes = '') => {
  const htmlStr = `<div class='${id}__close ${classes}'>
        <span class='${id}__close-text'>${text}</span>
        <span class='${id}__close-icon'>
            ${icon}
        </span>
    </div>`;
  return htmlStr;
};

export default close;
