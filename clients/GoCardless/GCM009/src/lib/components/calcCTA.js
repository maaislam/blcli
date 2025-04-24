const calcCta = (id, ...args) => {
  //clean it
  const [parentContainer, countryUrl, fireEvent, classSuffix, VARIATION] = args;
  const variation = VARIATION || '1';

  document.querySelectorAll(`.${id}__roi--button${classSuffix}`).forEach((item) => {
    item.closest(`.${id}__roi-container${classSuffix}`).remove();
  });

  const data = {
    1: {
      imgSrc: 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCOR006/clock-face.png',
      copy: 'How much time & money could you save on payment collection?',
    },
    2: {
      imgSrc: 'https://ucds.ams3.digitaloceanspaces.com/GoCardless/GCOR006/dancing-man.png',
      copy: 'Late payments causing problems?<br/>Get paid on time, every time.',
    },
  };

  const htmlStr = `
    <div class="${id}__roi-container${classSuffix}">
        <div class="${id}__roi-container--wrapper${classSuffix}">
        <div class="${id}__roi-container--img-block${classSuffix}" style="background-image: url(${data[variation].imgSrc})"></div>
        <div class="${id}__roi-container--textcontent-block${classSuffix}">
            <div class="${id}__roi--paragraph${classSuffix}">${data[variation].copy}</div>
            <a href="${countryUrl()}" class="${id}__roi--button${classSuffix}">Learn more</a>
        </div></div>
    </div>
  `;

  parentContainer?.insertAdjacentHTML('beforebegin', htmlStr);

  document.querySelector(`.${id}__roi--button${classSuffix}`)?.addEventListener('click', (e) => {
    fireEvent('user has clicked the "Learn more" button');
  });
  document.querySelector(`.${id}__roi-container${classSuffix}`)?.classList.remove(`${id}__hide`);
};

export default calcCta;
