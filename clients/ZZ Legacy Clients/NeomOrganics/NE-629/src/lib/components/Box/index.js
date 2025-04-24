import shared from '../../../../../../../core-files/shared';

export default function Grid(child, size = 1) {
  const { ID } = shared;
  const element = document.createElement('ul');
  element.classList.add(`${ID}-box`);
  element.setAttribute('data-size', size);
  element.append(child);

  return element;
}
