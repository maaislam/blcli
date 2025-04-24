const popup = (id, parentContainer, data, fireEvent) => {
  //clean it
  document.querySelectorAll(`.${id}__popup--btns-container`).forEach((item) => {
    item.closest(`.${id}__overlay`)?.remove();
  });

  const { headline, subtitle, popupImg, cta1Copy, cta1Link, cta2Copy, cta2Link } = data;

  const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.375 0.625C16.875 0.125 16.125 0.125 15.625 0.625L9 7.25L2.375 0.625C1.875 0.125 1.125 0.125 0.625 0.625C0.125 1.125 0.125 1.875 0.625 2.375L7.25 9L0.625 15.625C0.125 16.125 0.125 16.875 0.625 17.375C0.875 17.625 1.125 17.75 1.5 17.75C1.875 17.75 2.125 17.625 2.375 17.375L9 10.75L15.625 17.375C15.875 17.625 16.25 17.75 16.5 17.75C16.75 17.75 17.125 17.625 17.375 17.375C17.875 16.875 17.875 16.125 17.375 15.625L10.75 9L17.375 2.375C17.875 1.875 17.875 1.125 17.375 0.625Z" fill="white"/>
  </svg>`;

  const htmlStr = `
    <div class="${id}__overlay ${id}__hide">
      <div class="${id}__popup ">
        <div class="${id}__close-icon">${closeIcon}</div>
        <div class="${id}__popup--headline">${headline}</div>
        <div class="${id}__popup--img-block"><img src="${popupImg}" alt="" /></div>
        <div class="${id}__popup--subtitle">${subtitle}</div>
        <div class="${id}__popup--btns-container">
            <a href="${cta1Link}"
              class="cta1">${cta1Copy}</a>
            <a href="${cta2Link}"
              class="cta2">${cta2Copy}</a>
        </div>
      </div>
    </div>`;
  // const position = classSuffix === '-middle' ? 'beforebegin' : 'afterbegin';
  parentContainer.insertAdjacentHTML('afterbegin', htmlStr);

  document.querySelector(`.${id}__popup--btns-container>.cta2`).addEventListener('click', (e) => {
    const savetimeBtnSelector = `.${id}__reopen-tab`;
    //const closeBtn = e.target.closest(`.${id}__popup`).querySelector(`.${id}__close-icon`);
    e.preventDefault();
    document.querySelector(savetimeBtnSelector).classList.remove(`${id}__hide`);
    //document.querySelector(`.${id}__popup`).classList.add(`${id}__hide`);
    document.querySelector(`.${id}__popup`).classList.add(`${id}__fade-out-bck`);
    setTimeout(() => {
      document.querySelector(`.${id}__overlay`).classList.add(`${id}__hide`);
    }, 700);
    //closeBtn.click();
    fireEvent('Interacts with secondary cta');
  });
  document.querySelector(`.${id}__popup--btns-container>.cta1`).addEventListener('click', (e) => {
    fireEvent('Interacts with primary cta');
  });
};

export default popup;
