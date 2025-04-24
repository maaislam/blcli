import shared from '../../../../../../../core-files/shared';

export default function LinkBanner(text, image, url) {
  const { ID } = shared;
  const element = document.createElement('a');
  element.classList.add(`${ID}-link-banner`);
  element.href = url;
  element.style.backgroundImage = `url(${image})`;
  element.innerHTML = `<p>${text}</p>`;

  return element;
}
