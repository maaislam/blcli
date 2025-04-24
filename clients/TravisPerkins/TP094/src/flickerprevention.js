export default () => {
  if (!document.querySelector('.TP094-Wrapper')) {
    const hide = document.createElement('style');
    hide.type = 'text/css';
    hide.setAttribute('id', 'TP094_flickerPrevention');
    hide.appendChild(document.createTextNode('body {display:none!important}'));
    document.head.appendChild(hide);
    setTimeout(() => {
      if (document.getElementById('TP094_flickerPrevention')) {
        hide.parentElement.removeChild(hide);
      }
    }, 2000);
  }
};
