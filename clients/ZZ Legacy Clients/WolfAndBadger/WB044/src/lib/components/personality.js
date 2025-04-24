const renderPersonalitySelector = (progressbar, stageWrapper, buttonsGrid, incomingData) => {
  window.giftFinderData.gender = incomingData;
  const personalities =
    window.giftFinderData[!incomingData || incomingData == "it doesn't matter" ? 'noMatter' : incomingData].personalityTraits;
  console.log(personalities);
  const defaults = {
    nextStep: 'price',
    previousStep: 'genderSelection',
    selection: '/uk/search/?q=',
  };

  document.querySelectorAll('.WB044__stage-wrapper--content').forEach((elem) => {
    elem.closest('.WB044__personalityselector')?.remove();
  });

  const renderOptions = personalities
    .map((personality) => {
      return `
            <div class="WB044__personality-selector swiper-slide border-black border-solid" data-personalityname="${
              personality.name
            }" data-personality="${personality.url}">
              
                    <div class="WB044__personality--name" data-personality="${personality.url}" data-personalityname="${
        personality.name
      }">${personality.name}</div>
                    <div class="WB044__personality--filters">${personality.filters.join(', ')}</div>
                
            </div>
            `;
    })
    .join('\n');

  const htmlStr = `<div class="WB044__personalityselector w-full my-12 absolute">
              ${progressbar('8/12')}
              <div class="WB044__optionswrapper container relative personalityFix" >
                  ${stageWrapper('which best describes them?', renderOptions, true)}
                </div>
                  ${buttonsGrid(defaults)}
             
          </div>        
      `;

  //place in DOM
  const main = document.querySelector('.WB044__main');
  main.setAttribute('data-laststagename', 'genderselector');
  main.setAttribute('data-stagename', 'personalityselector');
  main.insertAdjacentHTML('afterbegin', htmlStr);
  const nextBtn = document.querySelector('.WB044__buttons--next>button.WB044__enabled');
  const disabledBtn = document.querySelector('.WB044__buttons--next>button.WB044__disabled');
  document.querySelector(`.WB044__stage-wrapper--content`).addEventListener('click', (e) => {
    const selector = e.target.closest('.WB044__personality-selector');
    if (selector) {
      document.querySelectorAll('.WB044__personality-selector').forEach((elem) => {
        elem.classList.remove('active');
      });
      selector.classList.add('active');
      const clickedPesonalityName =
        e.target.getAttribute('data-personalityname') ||
        e.target.closest('.WB044__personality-selector').getAttribute('data-personalityname');
      nextBtn.setAttribute(
        'data-selection',
        e.target.getAttribute('data-personality') ||
          e.target.closest('.WB044__personality-selector').getAttribute('data-personality')
      );
      nextBtn.setAttribute('data-nextstep', 'price');
      nextBtn.setAttribute('data-selectedPersonality', clickedPesonalityName);
      nextBtn.classList.remove('WB044__hide');
      disabledBtn.classList.add('WB044__hide');
    }
  });
};

export default renderPersonalitySelector;
