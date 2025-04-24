import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { submitNPSFeedback, submitNPSScore } from './requests';

const { ID } = shared;

const isDashboard = () => window.location.pathname === '/account/dashboard';

const answersNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const answersRanges = {
  '1-3': `We’re sorry you’re not enjoying Freddie’s Flowers, can you please tell us how we can improve the service?`,
  '4-7': `Thank you for your feedback, we’d love to hear how you think we can improve the service?`,
  '8-10': `It’s great that you are enjoying Freddie’s, what is it that you love the most?`,
};

const cookieStorage = `${ID}_feedback`;

const spinnerElement = `<svg class="rotating" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" class=""></path></svg>`;

export const renderNpsWidget = () => {
  const storage = JSON.parse(localStorage.getItem(cookieStorage));

  if (!storage) fireEvent(`${ID} - NPS Widget displayed on step 1.`);
  if (storage && storage.row)
    fireEvent(`${ID} - NPS Widget displayed on step 2.`);

  setInterval(() => {
    if (
      isDashboard() &&
      document.querySelector(
        '#app > div.footer--background.divider--container > div'
      ) &&
      window.location.pathname === '/account/dashboard'
    ) {
      if (!document.querySelector(`.${ID}-nps`)) {
        document
          .querySelector(
            '#app > div.footer--background.divider--container > div'
          )
          .insertAdjacentHTML(
            'afterbegin',
            `
        <div class="${ID}-nps">
        <div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>
          <div class="${ID}-nps--step-1">
            <h2 class="${ID}-nps__title">How likely would you be to refer us to your friends & family?</h2>
            <div class="${ID}-nps__options-wrapper">
              ${answersNumbers.reduce(
                (acc, curr) =>
                  acc +
                  `<button data-option="${curr}" class="${ID}-nps__option-single">${curr}</button>`,
                ``
              )}
            </div>
            <div class="${ID}-nps__options-info">
              <span>1 = Very low</span>
              <span>10 = Very high</span>
            </div>
          </div>
          <div class="${ID}-nps--step-2 ${ID}-nps__hidden">
            <h2 class="${ID}-nps__title"></h2>
            <div class="${ID}-nps__input-wrapper">
              <input type="text" name="${ID}-input" class="${ID}-nps__input" placeholder="Start typing here..."/>
              <button class="${ID}-nps__input-button">Send</button>
            </div>
          </div>
          <div class="${ID}-nps--step-3 ${ID}-nps__hidden">
            <h2 class="${ID}-nps__title"></h2>
          </div>
        </div>
        `
          );

        for (const element of document.querySelectorAll(
          `.${ID}-nps__option-single`
        )) {
          element.addEventListener('click', () => {
            if (element.classList.contains('disabled')) return;

            const option = Number(element.dataset.option);
            const titleElement = document.querySelector(
              `.${ID}-nps--step-2 .${ID}-nps__title`
            );

            element.innerHTML = spinnerElement;

            const titleToUse =
              option < 4
                ? answersRanges['1-3']
                : option < 8
                ? answersRanges['4-7']
                : answersRanges['8-10'];

            titleElement.textContent = titleToUse;

            document
              .querySelectorAll(`.${ID}-nps__option-single`)
              .forEach(
                (e) =>
                  !e.classList.contains('disabled') &&
                  e.classList.add('disabled')
              );

            submitNPSScore(option);
          });
        }

        const inputButtonElement = document.querySelector(
          `.${ID}-nps__input-button`
        );
        const inputElement = document.querySelector(`.${ID}-nps__input`);

        inputButtonElement.addEventListener('click', (e) => {
          e.preventDefault();
          const inputElementValue = inputElement.value;
          if (!inputElementValue || inputElementValue.length === 0) return;
          inputButtonElement.innerHTML = spinnerElement;
          submitNPSFeedback(inputElementValue);
        });

        inputElement.addEventListener('keyup', function (event) {
          if (event.key === 'Enter') {
            const inputElementValue = inputElement.value;
            if (!inputElementValue || inputElementValue.length === 0) return;
            inputButtonElement.innerHTML = spinnerElement;
            submitNPSFeedback(inputElementValue);
          }
        });

        if (storage && storage.row && storage.score) {
          const option = Number(storage.score);
          const titleElement = document.querySelector(
            `.${ID}-nps--step-2 .${ID}-nps__title`
          );
          const titleToUse =
            option < 4
              ? answersRanges['1-3']
              : option < 8
              ? answersRanges['4-7']
              : answersRanges['8-10'];
          titleElement.textContent = titleToUse;

          const step1Element = document.querySelector(`.${ID}-nps--step-1`);
          const step2Element = document.querySelector(`.${ID}-nps--step-2`);

          !step1Element.classList.contains(`${ID}-nps__hidden`) &&
            step1Element.classList.add(`${ID}-nps__hidden`);
          step2Element.classList.contains(`${ID}-nps__hidden`) &&
            step2Element.classList.remove(`${ID}-nps__hidden`);
        }
      }
    } else {
      document.querySelector(`.${ID}-nps`)?.remove();
    }
  }, 500);
};
