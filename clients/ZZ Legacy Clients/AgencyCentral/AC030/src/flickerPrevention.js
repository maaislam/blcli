export default () => {
  const hide = document.createElement('style');
  hide.type = 'text/css';
  hide.setAttribute('id', 'AC030_flickerPrevention');
  hide.appendChild(document.createTextNode('body {display:none!important}'));
  document.head.appendChild(hide);

  setTimeout(() => {
    if (document.getElementById('AC030_flickerPrevention')) {
      hide.parentElement.removeChild(hide);
    }
  }, 2000);
};
