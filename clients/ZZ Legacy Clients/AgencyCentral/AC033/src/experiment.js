import { fullStory, events } from '../../../../lib/utils';

/**
 * {{AC033}} - {{Test Description}}
 */
const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'AC033',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const modal = bodyVar.querySelector('#industry-modal-container');
      const indInput = bodyVar.querySelector('#input-industry-selector');

      return {
        bodyVar,
        modal,
        indInput,
      };
    })(),
    init: () => {
      // Setup
      const { services, settings, components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.getIndustry();
      components.bindModal();
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      getIndustry() {
        const indArray = [];

        Exp.cache.indInput.parentNode.insertAdjacentHTML('beforeend', '<a class="AC033_input-button"></a>');
        Exp.cache.modal.insertAdjacentHTML('beforeend', `
        <div class="AC033_ind">
          <h2>Select a Sector</h2>
          <div class="AC033_col_wrap">
            <div class="AC033_col"></div>
            <div class="AC033_col"></div>
            <div class="AC033_col"></div>
            <div class="AC033_col"></div>
          </div>
          <a class="AC033_close">✕</a>
        </div>`);

        $.ajax('/ajax/industry_modal')
          .done((response) => {
            const div = document.createElement('div');
            div.insertAdjacentHTML('beforeend', response);
            const indChoice = div.querySelectorAll('#industries-alphabetical .alphabetical .industry-choice');
            [].forEach.call(indChoice, (el) => {
              const elText = el.innerText;
              const elLink = el.dataset.value;
              indArray.push({ text: elText, link: elLink });
            });

            const amountPerCol = indArray.length / 4;
            const amountRounded = Math.floor(amountPerCol);
            const decimalSection = amountPerCol - amountRounded;
            let col1;
            let col2;
            let col3;
            let col4;

            if (decimalSection === 0.25) {
              col1 = indArray.slice(0, amountRounded + 1);
              indArray.splice(0, amountRounded + 1);

              col2 = indArray.slice(0, amountRounded);
              indArray.splice(0, amountRounded);

              col3 = indArray.slice(0, amountRounded);
              indArray.splice(0, amountRounded);

              col4 = indArray.slice(0, amountRounded);
            } else if (decimalSection === 0.5) {
              col1 = indArray.slice(0, amountRounded + 1);
              indArray.splice(0, amountRounded + 1);

              col2 = indArray.slice(0, amountRounded + 1);
              indArray.splice(0, amountRounded + 1);

              col3 = indArray.slice(0, amountRounded);
              indArray.splice(0, amountRounded);

              col4 = indArray.slice(0, amountRounded);
            } else if (decimalSection === 0.75) {
              col1 = indArray.slice(0, amountRounded + 1);
              indArray.splice(0, amountRounded + 1);

              col2 = indArray.slice(0, amountRounded + 1);
              indArray.splice(0, amountRounded + 1);

              col3 = indArray.slice(0, amountRounded + 1);
              indArray.splice(0, amountRounded + 1);

              col4 = indArray.slice(0, amountRounded);
            }

            col1.forEach((item) => {
              Exp.cache.modal.querySelector('.AC033_ind .AC033_col:nth-child(1)').insertAdjacentHTML('beforeend', `<span class="industry-choice" data-value="${item.link}">${item.text}</div>`);
            });
            col2.forEach((item) => {
              Exp.cache.modal.querySelector('.AC033_ind .AC033_col:nth-child(2)').insertAdjacentHTML('beforeend', `<span class="industry-choice" data-value="${item.link}">${item.text}</div>`);
            });
            col3.forEach((item) => {
              Exp.cache.modal.querySelector('.AC033_ind .AC033_col:nth-child(3)').insertAdjacentHTML('beforeend', `<span class="industry-choice" data-value="${item.link}">${item.text}</div>`);
            });
            col4.forEach((item) => {
              Exp.cache.modal.querySelector('.AC033_ind .AC033_col:nth-child(4)').insertAdjacentHTML('beforeend', `<span class="industry-choice" data-value="${item.link}">${item.text}</div>`);
            });
          });
      },
      bindModal() {
        const inputBtn = Exp.cache.bodyVar.querySelector('.AC033_input-button');
        const closeBtn = Exp.cache.bodyVar.querySelector('.AC033_close');

        inputBtn.addEventListener('click', () => {
          $(Exp.cache.modal).fadeIn();
          $('#industry-modal-backdrop').fadeIn();
        });

        closeBtn.addEventListener('click', () => {
          $(Exp.cache.modal).fadeOut();
          $('#industry-modal-backdrop').fadeOut();
        });
      },
    },
  };

  Exp.init();
};

export default Run;
