export default () => {
  let firstClick = false;
  const firstSection = document.querySelectorAll('.panel.panel-default')[0];

  const selectSection = document.querySelector('.UKB006-select select');
  selectSection.addEventListener('change', (e) => {
    const select = e.currentTarget;
    const sectionOptions = select.options;
    const selectedIndex = select.selectedIndex;
    const sectionSelected = sectionOptions[selectedIndex].getAttribute('href');
    
    if (document.querySelector(`${sectionSelected} a`).classList.contains('collapsed')) {
      document.querySelector(`${sectionSelected} a`).click();
    } else if (document.querySelector(`${sectionSelected} a`) === firstSection.querySelector('a')) {
    } else {
      if (!firstClick) {
        document.querySelector(`${sectionSelected} a`).click();
        firstClick = true;
      }
    }
    
    setTimeout(() => {
      if (sectionSelected !== '') {
        const elmnt = document.querySelector(`${sectionSelected}`);
        elmnt.scrollIntoView();

        // Re-add placeholder value on Select container
        setTimeout(() => {
          sectionOptions.selectedIndex = 0;
        }, 500);
      }
    }, 1000);
  });
};