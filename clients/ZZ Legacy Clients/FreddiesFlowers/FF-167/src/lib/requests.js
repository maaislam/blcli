import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events, setCookie } from '../../../../../lib/utils';

const { ID } = shared;

const successMessageRanges = {
  '1-7': `Thank you for helping us to continually improve our service.`,
  '8-10': `Thank you for helping us to continually improve our service. If you’re enjoying Freddie’s Flowers then why not refer your Friends & Family and they can receive a free box?`,
};

const scriptURL =
  'https://script.google.com/macros/s/AKfycbzpHPuH_hnTzqBdOr2zBbA9f9FfMnDs-mlLsr2dJ8WR0wowwVC4A6-Oy4wx2yKMjFPS/exec';

const cookieStorage = `${ID}_feedback`;

export const submitNPSScore = (score) => {
  fireEvent(`${ID} - User submitted score: ${score}.`);

  const formData = new FormData();

  formData.append('pagePath', window.location.pathname);
  formData.append('NPS_score', score);

  fetch(scriptURL, { method: 'POST', body: formData })
    .then((response) => response.json())
    .then((data) => {
      if (data && data.row) {
        localStorage.setItem(
          cookieStorage,
          JSON.stringify({ score, row: data.row, feedback: null })
        );
        document
          .querySelector(`.${ID}-nps--step-1`)
          .classList.add(`${ID}-nps__hidden`);
        document
          .querySelector(`.${ID}-nps--step-2`)
          .classList.remove(`${ID}-nps__hidden`);
        fireEvent(`${ID} - NPS Widget displayed on step 2.`);
        events.send('NPS Widget', `Score: ${score}`);
        setCookie(`${cookieStorage}_step-1`, score, 1);
      }
    })
    .catch((error) => console.error('Error!', error.message));
};

export const submitNPSFeedback = (feedback) => {
  if (!feedback || feedback.length === 0) return;
  const storage = JSON.parse(localStorage.getItem(cookieStorage));
  if (!storage) return;
  const formData = new FormData();
  formData.append('rowID', storage.row);
  formData.append('free_text', feedback);

  fetch(scriptURL, { method: 'POST', body: formData })
    .then((response) => response.json())
    .then((data) => {
      localStorage.removeItem(cookieStorage);
      setCookie(cookieStorage, feedback, 90);

      document
        .querySelector(`.${ID}-nps--step-2`)
        .classList.add(`${ID}-nps__hidden`);
      document
        .querySelector(`.${ID}-nps--step-3`)
        .classList.remove(`${ID}-nps__hidden`);

      const option = Number(storage.score);
      const titleElement = document.querySelector(
        `.${ID}-nps--step-3 .${ID}-nps__title`
      );
      const titleToUse =
        option < 8 ? successMessageRanges['1-7'] : successMessageRanges['8-10'];

      titleElement.textContent = titleToUse;
      fireEvent(`${ID} - NPS Widget displayed on step 3 (success message).`);
      events.send(
        'NPS Widget',
        `Score: ${storage.score}`,
        `Feedback: ${feedback}`
      );
    })
    .catch((error) => console.error('Error!', error.message));
};
