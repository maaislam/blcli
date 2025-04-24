const clickHandler = (fireEvent) => {
  const levelOneItems = document.querySelectorAll('.HH077b__menu-item--lvl1 ');
  const burgerMenuBtn = document.querySelector('button.navbar-toggle');
  const navDropdown = document.querySelector('#HH077b__main-nav');
  const btnText = burgerMenuBtn.querySelector('.link');
  const menuOverlay = document.querySelector('.HH077b__menu-overlay');

  burgerMenuBtn.querySelector('i').classList.add('fa-times', 'HH077b__close--icon');

  [burgerMenuBtn, menuOverlay].forEach((elm) => {
    elm.addEventListener('click', () => {
      let timer;
      clearTimeout(timer);

      if (navDropdown.classList.contains('fade-in')) {
        navDropdown.classList.remove('fade-in');
        menuOverlay.classList.remove('fade-in');
        navDropdown.classList.add('fade-out');
        menuOverlay.classList.add('fade-out');
      } else {
        navDropdown.classList.add('fade-in');
        menuOverlay.classList.add('fade-in');
        navDropdown.classList.remove('fade-out');
        menuOverlay.classList.remove('fade-out');
      }

      timer = setTimeout(() => {
        navDropdown.classList.toggle('HH077b__hide');
        menuOverlay.classList.toggle('HH077b__hide');
      }, 300);
      burgerMenuBtn.querySelector('i').classList.toggle('fa-bars');
      if (btnText.innerText === 'Open menu') {
        btnText.innerText = 'Close menu';
      } else {
        btnText.innerText = 'Open menu';
      }
    });
  });

  levelOneItems.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      const lastItem = levelOneItems.length - 1 === i;

      const secLastItem = levelOneItems.length - 2 === i;

      if (!lastItem /*&& !secLastItem*/) {
        const closestParent = e.target.closest('li');
        closestParent.classList.toggle('active');
        closestParent.querySelector('i')?.classList.toggle('fa-angle-down');
        closestParent.querySelector('ul')?.classList.toggle('HH077b__hide');
      }
      if (secLastItem) {
        console.log('test', e);
        document.querySelector('.HH077b__main-nav').classList.toggle('padding-top-zero');
      }

      //fireEvent(`Customer has clicked a top navigation item, ${closestParent.querySelector('a').innerText}`);
    });
  });
  document.querySelectorAll('.HH077b__menu-item--lvl2').forEach((elm) => {
    elm.addEventListener('click', (e) => {
      const dataIndex = e.target.getAttribute('data-index');

      if (dataIndex === 0) {
        fireEvent(`Customer has clicked a top navigation item, ${e.target.innerText}`);
      } else {
        fireEvent(`Customer has clicked a secondary navigation item, ${e.target.innerText}`);
      }
    });
  });
};

export default clickHandler;
