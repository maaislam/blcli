import shared from '../../../../../../../core-files/shared';

export default function Grid(text) {
  const { ID } = shared;
  const element = document.createElement('p');
  element.classList.add(`${ID}-small-text`);
  element.textContent = text;

  return element;
}
