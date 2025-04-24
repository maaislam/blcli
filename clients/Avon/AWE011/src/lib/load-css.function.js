export const loadCss = (filename) => {
  let cssNode = document.createElement('link');
  cssNode.setAttribute('rel', 'stylesheet');
  cssNode.setAttribute('type', 'text/css');
  cssNode.setAttribute('href', filename);
  document.getElementsByTagName('head')[0].appendChild(cssNode);
};
