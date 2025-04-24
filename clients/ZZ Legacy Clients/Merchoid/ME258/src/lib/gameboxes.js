/**
 * Game box events
 */

import shared from "./shared";

export default () => {

    const { ID } = shared;

    const gameBoxes = document.querySelectorAll(`.${ID}-gameBoxes .${ID}-boxIcon`);

    for (let index = 0; index < gameBoxes.length; index += 1) {
        const element = gameBoxes[index];

        element.addEventListener(`click`, (e) => {
            document.querySelector(`.${ID}-successText`).classList.add(`${ID}-textHide`);

            // add class to others to animate them away
            for (let i = 0; i < gameBoxes.length; i += 1) {
                const boxEl = gameBoxes[i];
                boxEl.classList.add(`${ID}-boxHide`);
            }
            
            e.currentTarget.className = `${ID}-boxIcon ${ID}-boxShow`;


            // show the next one once the animation is done
            setTimeout(() => {
                document.querySelector(`.${ID}-finalStep`).classList.add(`${ID}-stepShow`)
                document.querySelector(`.${ID}-gameStep`).classList.remove(`${ID}-stepShow`);

                document.querySelector(`.${ID}-titleBox h3`).textContent = 'Winner!';
            }, 1300);
        });
    }
}