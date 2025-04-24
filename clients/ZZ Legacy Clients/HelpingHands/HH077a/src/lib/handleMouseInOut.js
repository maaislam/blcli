const handleMouseInOut = (fireEvent) => {
  const menuItem = document.querySelectorAll('.primary__list');

  menuItem.forEach((item) => {
    let inTimer;
    let outTimer;
    const secondaryNav = item.querySelector('.secondary__container');

    item.addEventListener('mouseenter', (e) => {
      item.closest('.HH077a__nav-container').classList.add('dim');
      item.classList.add('hovered');
      clearTimeout(outTimer);
      inTimer = setTimeout(() => {
        secondaryNav.classList.remove('HH077a__hide', 'fade-out');
        secondaryNav.classList.add('fade-in');
        console.log(e.target);
        fireEvent(`Customer has hovered over the menu option ${e.target.querySelector('.primary__list-item--title').innerText}.`);
      }, 300);
    });

    item.addEventListener('mouseleave', () => {
      item.closest('.HH077a__nav-container').classList.remove('dim');
      item.classList.remove('hovered');
      clearTimeout(inTimer);
      item.classList.remove('open');
      secondaryNav.classList.add('fade-out');
      outTimer = setTimeout(() => {
        secondaryNav.classList.add('HH077a__hide');
        secondaryNav.classList.remove('fade-in');
      }, 300);
    });
  });
};

export default handleMouseInOut;
