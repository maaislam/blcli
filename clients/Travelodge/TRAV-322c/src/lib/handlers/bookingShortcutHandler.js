const bookingShortcutHandler = (ID) => {
  //default to on
  localStorage.setItem(`${ID}-bookingObjOn`, 'true');
  
    const shortCutRadio = document.querySelectorAll(`.${ID}-adding-shortcut-module-radio-container input`);
    shortCutRadio.forEach((radio) => {
      radio.addEventListener('click', () => {
        if (radio.value === 'add') {
          localStorage.setItem(`${ID}-bookingObjOn`, 'true');
          document.cookie = `${ID}-bookingObjOn=true`;
        //   fireEvent('Click - User opts in to add shortcut');
        } else {
          localStorage.removeItem(`${ID}-bookingObjOn`);
          document.cookie = `${ID}-bookingObjOn=`;
        //   fireEvent('Click - User opts out of adding shortcut');
        }
      });
    });
}

export default bookingShortcutHandler;