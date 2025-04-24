export default () => {
  const hide = document.createElement('style');
  hide.type = 'text/css';
  hide.setAttribute('id', 'TestID_flickerPrevention');
  hide.appendChild(document.createTextNode('body {display:none!important}'));
  document.head.appendChild(hide);
  setTimeout(() => {
    if (document.getElementById('TestID_flickerPrevention')) {
      hide.parentElement.removeChild(hide);
    }
  }, 2000);
};
