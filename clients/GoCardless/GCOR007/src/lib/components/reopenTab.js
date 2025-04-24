const reopenTab = (id, parentContainer) => {
  const htmlStr = `<div class="${id}__reopen-tab ${id}__hide"><div>Save time</div></div>`;
  const anchorElem = document.querySelector('.css-1038z4s') || document.querySelector('.css-1q6zx7a');
  anchorElem.insertAdjacentHTML('afterend', htmlStr);
};
export default reopenTab;
