const renderPriceSelector = (progressbar, stageWrapper, buttonsGrid, incomingData) => {
  const defaults = {
    nextStep: 'loader',
    selection: incomingData,
    previousStep: 'personality',
  };

  document.querySelectorAll('.WB044__stage-wrapper--content').forEach((elem) => {
    elem.closest('.WB044__priceselector')?.remove();
  });

  const renderOptions = `
              <div class="WB044__price-selector swiper-slide border-black border-solid ">
                <div class="WB044__price--input-wrapper">
                    <input type="number" class="WB044__price--min" name="minVal" placeholder="MIN" />
                </div>
                <div class="WB044__price--input-wrapper">
                    <input type="number" class="WB044__price--max" name="maxVal" placeholder="MAX" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57" />
                </div>
                <div class ="WB044__seperator"> OR </div>
                <div class="WB044__price--showall" data-selection = "${defaults.selection}">Show me everything</div>
              </div>`;

  const htmlStr = `<div class="WB044__priceselector w-full my-12 absolute">
              ${progressbar('full')}
              <div class="WB044__optionswrapper container relative">
                  ${stageWrapper('What is your budget?', renderOptions)}
                </div>
                 ${buttonsGrid(defaults)}
             
          </div>        
      `;

  //place in DOM
  const main = document.querySelector('.WB044__main');
  main.setAttribute('data-laststagename', 'personalityselector');
  main.setAttribute('data-stagename', 'priceselector');
  main.insertAdjacentHTML('afterbegin', htmlStr);
  const nextBtn = document.querySelector('.WB044__buttons--next>button.WB044__enabled');
  const disabledBtn = document.querySelector('.WB044__buttons--next>button.WB044__disabled');

  document.querySelectorAll('.WB044__price-selector input').forEach((input, index) => {
    input.addEventListener('input', (e) => {
      const giftUrl = (val, i) => {
        return `&price_${i == 0 ? 'min' : 'max'}=${val}`;
      };
      const value = giftUrl(e.target.value, index);
      index == 0 ? nextBtn.setAttribute('data-minSelection', value) : nextBtn.setAttribute('data-maxSelection', value);

      if (e.target.value >= 0) {
        nextBtn.classList.remove('WB044__hide');
        disabledBtn.classList.add('WB044__hide');
      }

      //validate
      const validate = () => {
        const minValue = parseFloat(document.querySelector('.WB044__price--min').value) || 0;
        const maxValue = parseFloat(document.querySelector('.WB044__price--max').value) || 0;

        if (minValue > maxValue) {
          disabledBtn.classList.remove('WB044__hide');
          nextBtn.classList.add('WB044__hide');
          document.querySelector('.WB044__price--input-wrapper > .WB044__error')?.remove();
          document
            .querySelector('.WB044__price--min')
            .insertAdjacentHTML('afterend', '<span class="WB044__error">min value must not be more than max value</span>');
          document.querySelector('.WB044__price--min').classList.add('WB044_error');
        } else if (minValue <= minValue) {
          nextBtn.classList.remove('WB044__hide');
          disabledBtn.classList.add('WB044__hide');
          document.querySelector('.WB044__price--input-wrapper > .WB044__error')?.remove();
          document.querySelector('.WB044__price--min').classList.remove('WB044_error');
        }
      };

      validate();
    });
  });

  document.querySelector('.WB044__price--showall').addEventListener('click', (e) => {
    document.querySelector('.WB044__buttons--skip').click();
  });
};

export default renderPriceSelector;
