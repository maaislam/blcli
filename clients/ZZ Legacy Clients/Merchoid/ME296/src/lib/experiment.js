/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  const firstContent = () => {
    let firstMessage;

    if(VARIATION === '1') {
      firstMessage = `You’ve Found a <b>Popular Product</b>`;
    }
    if(VARIATION === '2') {
      firstMessage = `Officially Licensed Product`;
    }
    if(VARIATION === '3') {
      firstMessage = `<b>Be Quick…</b> Don’t Miss Out`;
    }

    return firstMessage;

  }

  const secondContent = () => {
    let secondMessage;

    if(VARIATION === '1') {
      secondMessage = `<b>Hurry!</b> This Product is Selling Fast`;
    }
    if(VARIATION === '2') {
      secondMessage = `<b>Hurry!</b> This Product is Selling Fast`;
    }
    if(VARIATION === '3') {
      secondMessage = `This Product is <b>Selling Fast</b>`;
    }

    return secondMessage;
    
  }

  const scarcityMessages = () => {
    const scarcityContainer = document.createElement('div');
    scarcityContainer.classList.add(`${ID}-scarcityMessages`);
    scarcityContainer.innerHTML = `
    <div class="${ID}-scarcity ${ID}-first">${firstContent()}</div>
    <div class="${ID}-scarcity ${ID}-second">${secondContent()}</div>`;

    document.querySelector('.gallery-placeholder').insertAdjacentElement('beforebegin', scarcityContainer);
  }

  scarcityMessages();

  const showHideMessages = () => {
    //  the first after 2 seconds, the second after 4 seconds.
    const firstEl = document.querySelector(`.${ID}-scarcity.${ID}-first`);
    const secondEl = document.querySelector(`.${ID}-scarcity.${ID}-second`);


    //1st message shows at 2 and disappears at 7
    setTimeout(() => {
      firstEl.classList.add(`${ID}-show`);
    }, 2000);
    setTimeout(() => {
      firstEl.classList.add(`${ID}-fadeOut`);
      firstEl.classList.remove(`${ID}-show`);
    }, 7000)

    setTimeout(() => {
      secondEl.classList.add(`${ID}-show`);
    }, 4000);
    setTimeout(() => {
      secondEl.classList.add(`${ID}-fadeOut`);
      firstEl.classList.remove(`${ID}-show`);
    }, 9000);

    setTimeout(() => {
      document.querySelector(`.${ID}-scarcityMessages`).remove();
    }, 9700);
  }
 showHideMessages();
};
