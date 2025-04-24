const renderGenderSector = (progressbar, stageWrapper, buttonsGrid) => {
  const genders = ['him', 'her', "it doesn't matter"];
  const defaults = {
    nextStep: 'personality',
    selection: "it doesn't matter",
  };

  document.querySelectorAll('.WB044__stage-wrapper--content').forEach((elem) => {
    elem.closest('.WB044__genderselector')?.remove();
  });

  const renderOptions = genders
    .map((gender) => {
      return `
        <div class="WB044__gender-selector block mx-auto border border-black border-solid ">
            <div data-gender="${gender}">${gender}</div>
        </div>
        `;
    })
    .join('\n');

  const htmlStr = `<div class="WB044__genderselector w-full my-12 absolute">
            ${progressbar('1/3')}
            <div class="WB044__optionswrapper container relative">
                ${stageWrapper('Who are you shopping for today?', renderOptions)}
            </div>
            ${buttonsGrid(defaults)}
        </div>        
    `;

  //place in DOM
  const main = document.querySelector('.WB044__main');
  main.setAttribute('data-stagename', 'genderselector');

  main.insertAdjacentHTML('afterbegin', htmlStr);
  main.classList.add('set');
  const nextBtn = document.querySelector('.WB044__buttons--next>button.WB044__enabled');
  const disabledBtn = document.querySelector('.WB044__buttons--next>button.WB044__disabled');
  document.querySelector(`.WB044__stage-wrapper--content`).addEventListener('click', (e) => {
    const selector = e.target.closest('.WB044__gender-selector');
    if (selector) {
      document.querySelectorAll('.WB044__gender-selector').forEach((elem) => {
        elem.classList.remove('active');
      });
      selector.classList.add('active');
      nextBtn.setAttribute('data-selection', e.target.getAttribute('data-gender'));
      nextBtn.setAttribute('data-nextstep', 'personality');
      nextBtn.classList.remove('WB044__hide');
      disabledBtn.classList.add('WB044__hide');
    }
  });
};

export default renderGenderSector;
