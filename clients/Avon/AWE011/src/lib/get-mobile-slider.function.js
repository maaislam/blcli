import shared from '../../../../../core-files/shared';
import { getElements } from './get-elements.function';
const { ID } = shared;

export const getSliderContent = () =>
  getElements().reduce(
    (acc, curr) =>
      acc +
      `<div class="${ID}-slider--single-element ${
        curr.url ? `${ID}-slider--single-element--url` : ''
      }">
  ${curr.icon}
  ${
    curr.url
      ? `<p class="${ID}-slider--single-element--text ${ID}-slider--single-element--text-url">${curr.text}</p>`
      : `<p class="${ID}-slider--single-element--text">${curr.text}</p>`
  }
</div>`,
    ''
  );

export const getMobileSlider = () =>
  `<div class="${ID}-slider">
    ${getSliderContent()}
  </div>`;
