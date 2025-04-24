const calcCta = (id, parentContainer, countryUrl, fireEvent, classSuffix = '') => {
  //clean it

  document.querySelectorAll(`.${id}__roi--button${classSuffix}`).forEach((item) => {
    item.closest(`.${id}__roi-container${classSuffix}`).remove();
  });

  //simply update this image for var 2
  //const imgSourceV1 = 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCOR006/clock-face.png';
  const imgSourceV2 = 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCOR006/dancing-man.png';

  const htmlStr = `
    <div class="${id}__roi-container${classSuffix}">
        <div class="${id}__roi-container--wrapper${classSuffix}">
        <div class="${id}__roi-container--img-block${classSuffix}" style="background-image: url(${imgSourceV2})"></div>
        <div class="${id}__roi-container--textcontent-block${classSuffix}">
            <div class="${id}__roi--paragraph${classSuffix}">How much time & money could you save on payment collection?</div>
            <a href="${countryUrl()}" class="${id}__roi--button${classSuffix}">Calculate now</a>
        </div></div>
    </div>
  `;

  parentContainer?.insertAdjacentHTML('beforebegin', htmlStr);

  document.querySelector(`.${id}__roi--button${classSuffix}`)?.addEventListener('click', (e) => {
    fireEvent('user has clicked the "calculate now" button');
  });
  document.querySelector(`.${id}__roi-container${classSuffix}`)?.classList.remove(`${id}__hide`);
};

export default calcCta;
