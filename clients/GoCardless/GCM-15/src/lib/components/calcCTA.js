const calcCta = (id, parentContainer, currentCtaData, fireEvent, classSuffix = '') => {
  //clean it
  document.querySelectorAll(`.${id}__goalcalc--button${classSuffix}`).forEach((item) => {
    item.closest(`.${id}__goalcalc-container${classSuffix}`).remove();
  });

  const htmlStr = `
    <div class="${id}__goalcalc-container${classSuffix}">
        <div class="${id}__goalcalc-container--wrapper${classSuffix} ${
    ['/fr-', '/de-'].indexOf(currentCtaData[0].countryPrefix) !== -1 ? '' : 'GCM-15__countrywisewidthfix'
  }">
          <div class="${id}__goalcalc-container--close ${id}__hide--mobile">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7 0.3C13.3 -0.1 12.7 -0.1 12.3 0.3L7 5.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L5.6 7L0.3 12.3C-0.1 12.7 -0.1 13.3 0.3 13.7C0.5 13.9 0.7 14 1 14C1.3 14 1.5 13.9 1.7 13.7L7 8.4L12.3 13.7C12.5 13.9 12.8 14 13 14C13.2 14 13.5 13.9 13.7 13.7C14.1 13.3 14.1 12.7 13.7 12.3L8.4 7L13.7 1.7C14.1 1.3 14.1 0.7 13.7 0.3Z" fill="#BDBDBD"/>
            </svg>
          </div>
          <div class="${id}__goalcalc-container--textcontent-block${classSuffix}">
              <div class="${id}__goalcalc--paragraph${classSuffix}">${currentCtaData[0].supportingCopy}</div>
              <a href="${currentCtaData[0].ctaLink}" class="${id}__goalcalc--button${classSuffix}">${
    currentCtaData[0].ctaCopy
  }</a>
          </div>
        </div>
    </div>
  `;
  const position = classSuffix === '-middle' ? 'beforebegin' : 'afterbegin';
  parentContainer.insertAdjacentHTML(position, htmlStr);

  const calcContainer = document.querySelector(`.${id}__goalcalc-container${classSuffix}`);
  console.log('test')
  calcContainer?.addEventListener('click', (e) => {
    if (e.target.matches(`.${id}__goalcalc--button${classSuffix}`)) {
      fireEvent(`user has clicked the "${currentCtaData[0].ctaCopy}" button`);
    } else if (e.target.matches(`.${id}__goalcalc-container--close`) || e.target.closest(`.${id}__goalcalc-container--close`)) {
      calcContainer.classList.add(`${id}__hide`);
    }
  });
};

export default calcCta;
