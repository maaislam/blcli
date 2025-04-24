export default () => {
  const hide = document.createElement('style');
  hide.type = 'text/css';
  hide.setAttribute('id', 'PU018_flickerPrevention');
  hide.appendChild(document.createTextNode('#appLoading center {display:none}'));
  document.head.appendChild(hide);
  setTimeout(() => {
    hide.parentElement.removeChild(hide);
  }, 2000);
};
