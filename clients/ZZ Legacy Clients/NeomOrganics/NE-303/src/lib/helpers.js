import shared from '../../../../../core-files/shared';

export const menuRenderer = data => {
  let markup = `<nav class="${shared.ID}-nav">`;

  markup += `<div class="${shared.ID}-nav__inner">`;

  data.forEach(d => {
    markup += `<div class="${shared.ID}-nav__item">`;

    markup += `
      <a class="${shared.ID}-nav__item-link" href="${d.link}">${d.name}</a>
    `;

    if(d.content) {
      markup += `
        <div class="${shared.ID}-nav__secondary">
          <div class="${shared.ID}-nav__secondary-inner">
            ${d.content}
          </div>
        </div>
      `;
    }

    markup += '</div>';
  });

  markup += '</div>';

  markup += '</nav>';

  return markup;
};
