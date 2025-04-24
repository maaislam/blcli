import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events, setCookie } from '../../../../../lib/utils';

const { ID } = shared;

const successMessageRanges = {
    '1-7': `Danke, dass du uns hilfst, unseren Service ständig zu verbessern.`,
    '8-10': `Danke, dass du uns hilfst, unseren Service ständig zu verbessern. Wenn du Freddie's Flowers genießt, warum empfiehlst du uns nicht auch an deine Freunde und Familie? Sie können eine kostenlose Box erhalten!`,
};

const scriptURL =
    'https://script.google.com/macros/s/AKfycbx1jKVrlzuVOGj8MUmsyolr-25e5gBtYQ3S_isVXIQOHlzX6w998CpZ-iKgcplPLd4F/exec';

const cookieStorage = `${ID}_feedback`;

export const submitNPSScore = (score) => {
    fireEvent(`${ID} - User submitted score: ${score}.`);

    const formData = new FormData();
    let userData = JSON.parse(localStorage.getItem('freddiesflowers'))
    formData.append('UserId', userData.account.user.data.id);
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