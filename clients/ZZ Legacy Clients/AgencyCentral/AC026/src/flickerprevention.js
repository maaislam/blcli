export default () => {
  const hide = document.createElement('style');
  hide.type = 'text/css';
  hide.setAttribute('id', 'AC026_flickerPrevention');
  hide.appendChild(document.createTextNode('body {display:none!important}'));
  document.head.appendChild(hide);
  setTimeout(() => {
    if (document.getElementById('AC026_flickerPrevention')) {
      hide.parentElement.removeChild(hide);
    }
  }, 2000);
};
