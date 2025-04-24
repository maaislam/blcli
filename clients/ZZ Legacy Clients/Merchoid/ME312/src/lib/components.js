import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

/**
 * Standard experiment setup
 */
export const generateScarcityMessages = (product) => {
  const firstContent = () => {
    let firstMessage;

    if(VARIATION === '1') {
      firstMessage = `Make the most of Christmas 2021`;
    }

    return firstMessage;

  }

  const secondContent = () => {
    let secondMessage;

    if(VARIATION === '1') {
      
      secondMessage = `Secure your ${product} now, stock is expected to sell out this year`;
      
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
