import shared from '../../../../../../../core-files/shared';

export default function Grid(...children) {
  const { ID } = shared;
  const element = document.createElement('div');
  element.classList.add(`${ID}-grid`);

  children.forEach((el) => element.append(el));

  return element;
}
